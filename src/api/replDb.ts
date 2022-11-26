import { extensionPort } from "src/util/comlink";

/**
 * Sets the value for a given key
 */
export async function set(args: { key: string, value: any }) {
  return extensionPort.setReplDbValue(args.key, args.value);
}

/**
 * Returns a value associated with the given key
 */
export async function get(args: { key: string }) {
  return extensionPort.getReplDbValue(args.key);
}

/**
 * Lists keys in the replDb. Accepts an optional `prefix`, which filters for keys beginning with the given prefix.
 */
export async function list(args: { prefix: string }) {
  return extensionPort.listReplDbKeys(args.prefix);
}
