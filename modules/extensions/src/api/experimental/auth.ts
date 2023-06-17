import { extensionPort } from "../../util/comlink";
import * as jose from "jose";
import { polyfillEd25519 } from "../../polyfills/ed25519";
import { AuthenticateResult, JWTVerifyResult } from "../../types";

if(typeof window !== "undefined") {
	const success = polyfillEd25519();
	if (!success) {
	  console.warn(
	    "Failed to polyfill ed25519: crypto.subtle is not available in the environment. This will cause issues with the auth API."
	  );
	}
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
export async function verifyAuthToken(token: string): Promise<JWTVerifyResult> {
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

  let res: Response;
	
	if(typeof window !== "undefined") {
		res = await fetch(
  	  `https://replit.com/data/extensions/publicKey/${tokenHeaders.kid}`
  	);
	} else {
		res = await fetch(
      `https://replit.com/data/extensions/publicKey/${tokenHeaders.kid}`,
        {
          headers: {
            "Referrer": "https://replit.com/",
            "Origin": "https://replit.com/",
            "X-Requested-With": "XMLHttpRequest",
            "User-Agent": "Mozilla/5.0 (@replit/extensions)",
          },
        }
    );
	}

  const { ok, value: publicKey } = await res.json();

  if (!ok) {
    throw new Error("Extension Auth: Failed to fetch public key");
  }

  try {
    const importedPublicKey = await jose.importSPKI(publicKey, "EdDSA");

    const decodedToken = await jose.jwtVerify(token, importedPublicKey);

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
