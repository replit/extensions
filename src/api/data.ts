import { extensionPort } from "src/util/comlink";

/**
 * Exposes the user API wrapper
 */
export async function user() {
  return await extensionPort.user;
}

/**
 * Exposes the repl API wrapper
 */
export async function repl() {
  return await extensionPort.repl;
}