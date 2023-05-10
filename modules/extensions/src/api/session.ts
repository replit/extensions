import { DisposerFunction, OnActiveFileChangeListener } from "../types";
import { extensionPort, proxy } from "../util/comlink";

/**
 * Sets up a listener to handle when the active file is changed
 */
export function onActiveFileChange(
  listener: OnActiveFileChangeListener
): DisposerFunction {
  let dispose = () => {
    console.log("disposing existing watcher");
  };

  extensionPort.watchActiveFile(proxy(listener)).then((d: () => void) => {
    dispose = d;
  });

  return () => {
    dispose();
  };
}

/**
 * Returns the current file the user is focusing
 */
export async function getActiveFile() {
  return await extensionPort.getActiveFile();
}
