import { extensionPort } from "../../util/comlink";
import jose from 'jose'

export async function getAuthToken() {
  return extensionPort.internal.auth.getAuthToken();
}

export async function verifyAuthToken(token: string) {
  const tokenHeaders = jose.decodeProtectedHeader(token);

  if (tokenHeaders.typ !== 'JWT') {
    throw new Error('Expected typ: JWT');
  }

  if (tokenHeaders.alg !== 'EdDSA') {
    throw new Error('Expected alg: EdDSA');
  }

  if (!tokenHeaders.kid) {
    throw new Error('Expected `kid` to be defined');
  }

  const res = await fetch(`https://replit.com/data/extensions/publicKey/${tokenHeaders.kid}`);

  const publicKey = await res.text();

  const importedPublicKey = await jose.importSPKI(publicKey, 'RS256')

  const decodedToken = await jose.jwtVerify(token, importedPublicKey);

  return decodedToken
}