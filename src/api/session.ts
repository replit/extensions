import { extensionPort, proxy } from "src";

/**
 * Sets up a listener to handle when the active file is changed
 */
export function onActiveFileChange(
  callback: (file: string) => void
): VoidFunction {
  let dispose = () => {
    console.log("disposing existing watcher");
  };

  extensionPort.watchActiveFile(proxy(callback)).then((d: () => void) => {
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
