import { extensionPort } from "../../util/comlink";
import { AuthenticateResult } from "../../types";
import { verifyJWTAndDecode, decodeProtectedHeader } from "../../auth/verify";

/**
 * Returns a unique JWT token that can be used to verify that an extension has been loaded on Replit by a particular user
 */
export async function getAuthToken() {
  return extensionPort.experimental.auth.getAuthToken();
}

/**
 * Verifies a provided JWT token and returns the decoded token.
 */
export async function verifyAuthToken(
  token: string
): Promise<{ payload: any; protectedHeader: any }> {
  const tokenHeaders = decodeProtectedHeader(token);

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

  const { ok, value: publicKey } = await res.json();

  if (!ok) {
    throw new Error("Extension Auth: Failed to fetch public key");
  }

  try {
    const decodedToken = await verifyJWTAndDecode(token, publicKey);

    return decodedToken;
  } catch (e) {
    throw new Error("Extension Auth: Failed to verify token");
  }
}

/**
 * Performs authentication and returns the user and installation information
 */
export async function authenticate(): Promise<AuthenticateResult> {
  const token = await getAuthToken();
  const decodedToken = await verifyAuthToken(token);

  if (
    typeof decodedToken.payload.userId !== "number" ||
    typeof decodedToken.payload.installationId !== "string" ||
    typeof decodedToken.payload.extensionId !== "string"
  ) {
    throw new Error("Failed to authenticate");
  }

  return {
    user: {
      id: decodedToken.payload.userId,
    },
    installation: {
      id: decodedToken.payload.installationId,
      extensionId: decodedToken.payload.extensionId,
    },
  };
}
