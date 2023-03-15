import { extensionPort } from "src/util/comlink";

export async function user() {
  return await extensionPort.user;
}

export async function repl() {
  return await extensionPort.repl;
}