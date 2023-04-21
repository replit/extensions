import { setDebugMode } from "src/util/log";
import { HandshakeStatus, ReplitInitArgs } from "./types";
import { extensionPort, proxy } from "./util/comlink";
import { getHandshakeStatus, setHandshakeStatus } from "./util/handshake"
export * from "./api";
export * from "./util/log";
export { extensionPort, proxy };
export * from "./types";

function promiseWithTimeout<T>(promise: Promise<T>, timeout: number) {
  return Promise.race([
    promise,
    new Promise((_resolve, reject) =>
      setTimeout(() => reject(new Error("timeout")), timeout)
    ),
  ]);
}

export async function init(args?: ReplitInitArgs) {
  if (extensionPort === null) {
    console.warn(`extensionPort is null. Was init() called in SSR?`);
    return () => {};
  }

  args?.onHandshakeStatus?.(getHandshakeStatus());

  setDebugMode(args?.debug || false);

  const onExtensionClick = () => {
    extensionPort.activatePane();
  };

  const windDown = () => {
    window.document.removeEventListener("click", onExtensionClick);
  };

  try {
    await promiseWithTimeout(extensionPort.handshake(), args?.timeout || 2000);

    setHandshakeStatus(HandshakeStatus.Ready);
    args?.onHandshakeStatus?.(getHandshakeStatus());

    if (window) {
      window.document.addEventListener("click", onExtensionClick);
    }
  } catch (e) {
    setHandshakeStatus(HandshakeStatus.Error);
    args?.onHandshakeStatus?.(getHandshakeStatus());
    console.error(e);
    windDown();
    throw e;
  }

  return windDown;
}
