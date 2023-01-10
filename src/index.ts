import { setDebugMode } from "src/util/log";
import { extensionPort } from "./util/comlink";
export * from "./api";
export * from "./jets";
export * from './ui'
export * from "./util/log";
export { extensionPort };
export * from './types'

export async function init({
  permissions = [],
  timeout = 1000,
  debug = false,
}: {
  permissions?: string[];
  timeout?: number;
  debug?: boolean;
}) {
  setDebugMode(debug);

  try {
    await extensionPort.handshake({ permissions });
  } catch (e) {
    console.error(e);
    // wind down
    throw e;
  }

  return () => {
    // wind down
  };
}
