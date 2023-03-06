import { setDebugMode } from "src/util/log";
import { extensionPort } from "./util/comlink";
export * from "./api";
export * from "./jets";
export * from "./util/log";
export { extensionPort };
export * from "./types";

function promiseWithTimeout<T>(promise: Promise<T>, timeout: number) {
  return Promise.race([
    promise,
    new Promise((_resolve, reject) =>
      setTimeout(() => reject(new Error("timeout")), timeout)
    ),
  ]);
}

export async function init({
  permissions = [],
  timeout = 2000,
  debug = false,
}: {
  permissions?: string[];
  timeout?: number;
  debug?: boolean;
}) {
  setDebugMode(debug);

  const onExtensionClick = () => {
    extensionPort.activatePane();
  };

  const windDown = () => {
    window.document.removeEventListener("click", onExtensionClick);
  };

  try {
    await promiseWithTimeout(extensionPort.handshake({ permissions }), timeout);

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
