import { HandshakeStatus, ReplitInitArgs, ReplitInitOutput } from "./types";
import { extensionPort, proxy } from "./util/comlink";
import { getHandshakeStatus, setHandshakeStatus } from "./util/handshake";
export * from "./api";
import * as debug from "./api/debug";
export { extensionPort, proxy };
export * from "./types";
export * from "./commands";
import * as replit from ".";

import { version } from "../package.json";

export { version };

function promiseWithTimeout<T>(promise: Promise<T>, timeout: number) {
  return Promise.race([
    promise,
    new Promise((_resolve, reject) =>
      setTimeout(() => reject(new Error("timeout")), timeout)
    ),
  ]);
}

async function windowIsReady() {
  return new Promise<void>((resolve) => {
    if (document.readyState === "complete") {
      resolve();
      return;
    }

    const loadHandler = () => {
      resolve();
      window.removeEventListener("load", loadHandler);
    };

    window.addEventListener("load", loadHandler);
  });
}

function patchConsole() {
  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;
  const originalInfo = console.info;

  console.log = (...args: any[]) => {
    originalLog(...args);
    debug.log(args[0], { args: args.slice(1) });
  };

  console.warn = (...args: any[]) => {
    originalWarn(...args);
    debug.warn(args[0], { args: args.slice(1) });
  };

  console.error = (...args: any[]) => {
    originalError(...args);
    debug.error(args[0], { args: args.slice(1) });
  };

  console.info = (...args: any[]) => {
    originalInfo(...args);
    debug.info(args[0], { args: args.slice(1) });
  };
}

export async function init(args?: ReplitInitArgs): Promise<ReplitInitOutput> {
  if (extensionPort === null) {
    throw new Error("Extension must be initialized in a browser context");
  }

  const onExtensionClick = () => {
    extensionPort.activatePane();
  };

  const windDown = () => {
    window.document.removeEventListener("click", onExtensionClick);
  };

  try {
    if (window) {
      await windowIsReady();
    }

    await promiseWithTimeout(
      extensionPort.handshake({
        clientName: "@replit/extensions",
        clientVersion: version,
      }),
      args?.timeout || 2000
    );

    patchConsole();

    setHandshakeStatus(HandshakeStatus.Ready);

    if (window) {
      window.document.addEventListener("click", onExtensionClick);
    }
  } catch (e) {
    setHandshakeStatus(HandshakeStatus.Error);
    console.error(e);
    windDown();
    throw e;
  }

  return {
    dispose: windDown,
    status: getHandshakeStatus(),
  };
}
