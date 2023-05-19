import { extensionPort } from "../util/comlink";

/**
 * Returns the path to the current file the extension is opened with, if it is a [File Handler](/extensions/key-concepts#file-handler).
 */
export function filePath() {
  return extensionPort.filePath;
}
