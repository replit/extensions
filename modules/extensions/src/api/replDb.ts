import { extensionPort } from "../util/comlink";

/**
 * Sets the value for a given key. Required [permissions](/extensions/api/manifest#scopetype): `repldb:read`, `repldb:write`.
 */
export async function set(args: { key: string; value: any }) {
  return extensionPort.setReplDbValue(args.key, args.value);
}

/**
 * Returns a value associated with the given key. Required [permissions](/extensions/api/manifest#scopetype): `repldb:read`.
 */
export async function get(args: { key: string }) {
  return extensionPort.getReplDbValue(args.key);
}

/**
 * Lists keys in the replDb. Accepts an optional `prefix`, which filters for keys beginning with the given prefix. Required [permissions](/extensions/api/manifest#scopetype): `repldb:read`.
 */
export async function list(args: { prefix?: string } = {}) {
  return extensionPort.listReplDbKeys(args?.prefix || "");
}

/**
 * Deletes a key in the replDb. Required [permissions](/extensions/api/manifest#scopetype): `repldb:read`, `repldb:write`.
 */
export async function del(args: { key: string }) {
  return extensionPort.deleteReplDbKey(args.key);
}
