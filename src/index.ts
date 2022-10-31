import { registerMessageListener, handshake } from "src/util/talk";
import { debug } from "src/util/log";
import { extensionPort } from "./util/comlink";
export * from "./api";
export * from "./jets";
export * from "./util/log";
export { extensionPort };

export async function init({ permissions = [], timeout = 1000 }) {
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
