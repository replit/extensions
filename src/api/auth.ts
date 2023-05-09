import { extensionPort } from "src/util/comlink";
import { decodeJwt, decodeProtectedHeader, jwtVerify, importSPKI } from 'jose'

export async function getAuthToken() {
  return extensionPort.internal.auth.getAuthToken();
}

export async function verifyAuthToken(token: string) {
  const tokenHeaders = decodeProtectedHeader(token);

  if (tokenHeaders.typ !== 'JWT') {
    throw new Error('Expected typ: JWT');
  }

  if (tokenHeaders.alg !== 'RS256') {
    throw new Error('Expected alg: RS256');
  }

  if (!tokenHeaders.kid) {
    throw new Error('Expected `kid` to be defined');
  }

  const res = await fetch(`http://localhost:3000/data/extensions/publicKey/${tokenHeaders.kid}`);

  const publicKey = await res.text();

  const importedPublicKey = await importSPKI(publicKey, 'RS256')

  const decodedToken = await jwtVerify(token, importedPublicKey);

  return decodedToken
}