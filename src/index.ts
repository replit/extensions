import { setDebugMode } from "src/util/log";
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

  const onExtensionClick = () => {
    extensionPort.activatePane();
  }

  const windDown = () => {
    window.document.removeEventListener('click', onExtensionClick)
  }

  try {
    await extensionPort.handshake({ permissions });

    if (window) {
      window.document.addEventListener('click', onExtensionClick)
    }

  } catch (e) {
    console.error(e);
    windDown();
    throw e;
  }

  return windDown
}
