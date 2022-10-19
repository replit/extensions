import { registerMessageListener, handshake } from "src/util/talk";
import { debug } from "src/util/log";
export * from "./api";
export * from "./jets"
export * from "./util/log";

export async function init({ permissions = [], timeout = 1000 }) {
  const disposeMessageListener = registerMessageListener();

  try {
    await handshake({permissions, timeout})
  } catch (e) {
    console.error(e);
    disposeMessageListener();
    throw e;
  }

  return () => {
    disposeMessageListener();
  };
}
