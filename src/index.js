import { request } from './talk';
export * from './api'

export async function handshake(permissions) {
  const res = await request({ type: 'handshake', permissions })

  return res;
}