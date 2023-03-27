import { extensionPort, proxy } from "src";

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

export async function getActiveFile() {
  return await extensionPort.getActiveFile();
}
