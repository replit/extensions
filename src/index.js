import { registerMessageListener, handshake } from "./talk";
import { debug } from "./log";
export * from "./api";
export * from "./log";

export async function init({ permissions = [], timeout = 1000 }) {
  const disposeMessageListener = registerMessageListener();

  try {
    await handshake({permissions, timeout})
  } catch (e) {
    console.error(e);
  }

  return () => {
    disposeMessageListener();
  };
}
