import { ponyfillEd25519 } from "./ed25519";
import * as base64 from "./base64";

const TOLERANCE = 60;

export function decodeComponentToJSON(component: string) {
  try {
    return JSON.parse(decoder.decode(base64.decode(component)));
  } catch (e) {
    throw new Error("Invalid JWT. Failed to parse component");
  }
}

export function decodeProtectedHeader(token: string) {
  const { 0: protectedHeader } = token.split(".");

  if (typeof protectedHeader !== "string") {
    throw new Error("Invalid JWT. JWT must have 3 parts");
  }

  return decodeComponentToJSON(protectedHeader);
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function concat(...buffers: Uint8Array[]): Uint8Array {
  const size = buffers.reduce((acc, { length }) => acc + length, 0);
  const buf = new Uint8Array(size);
  let i = 0;
  buffers.forEach((buffer) => {
    buf.set(buffer, i);
    i += buffer.length;
  });
  return buf;
}

export async function verifyJWTAndDecode(token: string, key: string) {
  if (typeof token !== "string") {
    throw new TypeError("JWT must be a string");
  }

  const {
    0: protectedHeader,
    1: payload,
    2: signature,
    length,
  } = token.split(".");

  if (
    length !== 3 ||
    typeof protectedHeader !== "string" ||
    typeof payload !== "string" ||
    typeof signature !== "string"
  ) {
    throw new Error("Invalid Token. Token must have 3 parts");
  }

  // 1. Check header for alg and typ
  let parsedProt = decodeComponentToJSON(protectedHeader);

  const { alg, typ } = parsedProt;

  if (!typ || typeof typ !== "string") {
    throw new Error("Invalid Token. Missing typ in protected header");
  }

  if (typ !== "JWT") {
    throw new Error("Invalid JWT. Expected typ to be JWT");
  }

  if (!alg || typeof alg !== "string") {
    throw new Error("Invalid JWT. Missing alg in protected header");
  }

  if (alg !== "EdDSA") {
    throw new Error("Invalid JWT. Expected alg to be EdDSA");
  }

  // 2. Validate the signature
  const data = concat(
    encoder.encode(protectedHeader ?? ""),
    encoder.encode("."),
    encoder.encode(payload ?? "")
  );
  const decodedSignature = base64.decode(signature);
  const verified = await verifySignature(key, decodedSignature, data);

  if (!verified) {
    throw new Error("Invalid JWT. Signature verification failed");
  }

  let parsedPayload = decodeComponentToJSON(payload);

  // 3. Validate claims in the payload
  const now = Math.floor(Date.now() / 1000);

  let iat = parsedPayload.iat;
  if (typeof iat !== "number") {
    throw new Error("Invalid JWT. Missing claim iat in payload");
  }

  if (iat > now + TOLERANCE) {
    throw new Error("Invalid JWT. iat claim must be in the past");
  }

  let exp = parsedPayload.exp;
  if (typeof exp !== "number") {
    throw new Error("Invalid JWT. Missing claim exp in payload");
  }

  if (exp < now + TOLERANCE) {
    throw new Error("Expired JWT. exp claim must be in the future");
  }

  return {
    protectedHeader: parsedProt,
    payload: parsedPayload,
  };
}

const verifySignature = async (
  key: string,
  sig: Uint8Array | Buffer,
  data: Uint8Array | Buffer
) => {
  if (typeof process === "undefined") {
    // Browser
    return verifyBrowser(key, sig, data);
  } else {
    // Node
    return verifyNode(key, sig, data);
  }
};

const verifyBrowser = async (
  key: string,
  signature: Uint8Array | Buffer,
  data: Uint8Array | Buffer
) => {
  const subtle = ponyfillEd25519(crypto.subtle);

  if (!subtle) {
    throw new Error("Ed25519 is not supported in this browser");
  }

  let decodedKey = base64.decode(
    key.replace(/(?:-----(?:BEGIN|END) PUBLIC KEY-----|\s)/g, "")
  );

  const cryptoKey = await subtle.importKey(
    "spki",
    decodedKey,
    { name: "Ed25519" },
    false,
    ["verify"]
  );

  const res = await subtle.verify(
    { name: "Ed25519" },
    cryptoKey,
    signature,
    data
  );

  return res;
};

const verifyNode = async (
  key: string,
  signature: Uint8Array | Buffer,
  data: Uint8Array | Buffer
) => {
  try {
    const crypto: typeof import("crypto") = require("crypto");

    const keyObject = crypto.createPublicKey(key);

    if (keyObject.type !== "public") {
      throw new TypeError("The key is not a public key");
    }

    if (keyObject.asymmetricKeyType !== "ed25519") {
      throw new TypeError("The key is not of type ed25519");
    }

    return await crypto.verify(undefined, data, keyObject, signature);
  } catch {
    return false;
  }
};
