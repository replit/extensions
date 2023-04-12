import { setDebugMode } from "src/extensions/api/util/log";
import { HandshakeOuput } from "./types";
import { extensionPort, proxy } from "./api/util/comlink";
export * from "./api";
export * from "./api/util/log";
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

export async function init(args?: {
  timeout?: number;
  debug?: boolean;
}): HandshakeOuput {
  if (extensionPort === null) {
    console.warn(`extensionPort is null. Was init() called in SSR?`);
    return null;
  }

  setDebugMode(args?.debug || false);

  const onExtensionClick = () => {
    extensionPort.activatePane();
  };

  const windDown = () => {
    window.document.removeEventListener("click", onExtensionClick);
  };

  try {
    await promiseWithTimeout(extensionPort.handshake(), args?.timeout || 2000);

    if (window) {
      window.document.addEventListener("click", onExtensionClick);
    }
  } catch (e) {
    console.error(e);
    windDown();
    throw e;
  }

  return windDown;
}
