import { registerMessageListener, handshake } from "src/util/talk";
import { debug, setDebugMode } from "src/util/log";
import { extensionPort } from "./util/comlink";
export * from "./api";
export * from "./jets";
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
  const disposeMessageListener = registerMessageListener();

  try {
    await handshake({ permissions, timeout });
  } catch (e) {
    console.error(e);
    disposeMessageListener();
    throw e;
  }

  return () => {
    disposeMessageListener();
  };
}
