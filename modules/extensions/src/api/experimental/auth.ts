import { extensionPort } from "../../util/comlink";
import * as jose from "jose";
import { polyfillEd25519 } from "../../polyfills/ed25519";

const success = polyfillEd25519();
if (!success) {
  console.warn(
    "Failed to polyfill ed25519: crypto.subtle is not available in the environment. This will cause issues with the auth API."
  );
}

/**
 * Returns a unique JWT token that can be used to verify that an extension has been loaded on Replit by a particular user
 */
export async function getAuthToken() {
  return extensionPort.experimental.auth.getAuthToken();
}

/**
 * Verifies a provided JWT token and returns the decoded token.
 */
export async function verifyAuthToken(token: string) {
  const tokenHeaders = jose.decodeProtectedHeader(token);

  if (tokenHeaders.typ !== "JWT") {
    throw new Error("Expected typ: JWT");
  }

  if (tokenHeaders.alg !== "EdDSA") {
    throw new Error("Expected alg: EdDSA");
  }

  if (!tokenHeaders.kid) {
    throw new Error("Expected `kid` to be defined");
  }

  const res = await fetch(
    `https://replit.com/data/extensions/publicKey/${tokenHeaders.kid}`
  );

  const { value: publicKey } = await res.json();

  const importedPublicKey = await jose.importSPKI(publicKey, "EdDSA");

  const decodedToken = await jose.jwtVerify(token, importedPublicKey);

  return decodedToken;
}
