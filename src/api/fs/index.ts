import { extensionPort, proxy } from "src/util/comlink";
import {
  WatchDirListeners,
  WatchFileListeners,
  WatchTextFileListeners,
} from "src/types";
import { fileWatcherManager } from "src/api/fs/watching";

/**
 * Reads the file specified at `path` and returns an object containing the contents, or an object containing an error if there was one
 */
export async function readFile(
  path: string,
  encoding: "utf8" | "binary" | null = "utf8"
) {
  return extensionPort.readFile(path, encoding);
}

/**
 * Writes the file specified at `path` with the contents `content`
 */
export async function writeFile(path: string, content: string | Blob) {
  return extensionPort.writeFile(path, content);
}

/**
 * Reads the directory specified at `path` and returns an object containing the contents, or an object containing an error if there was one
 */
export async function readDir(path: string) {
  return extensionPort.readDir(path);
}

/**
 * Creates a directory at the specified path
 */
export async function createDir(path: string) {
  return extensionPort.createDir(path);
}

/**
 * Deletes the file at the specified path
 */
export async function deleteFile(path: string) {
  return extensionPort.deleteFile(path);
}

/**
 * Deletes the directory at the specified path
 */
export async function deleteDir(path: string) {
  return extensionPort.deleteDir(path);
}

/**
 * Moves the file or directory at `from` to `to`
 */
export async function move(path: string, to: string) {
  return extensionPort.move(path, to);
}

/**
 * Copies the file at `from` to `to`
 */
export async function copyFile(path: string, to: string) {
  return extensionPort.copyFile(path, to);
}

/**
 * Watches the file at `path` for changes with the provided `listeners`. Returns a dispose method which cleans up the listeners
 */
export async function watchFile(path: string, listeners: WatchFileListeners) {
  // Note: comlink does not let us test for functions being present, so we provide default functions for all callbacks in case the user does not pass those, to keep the API flexible
  return extensionPort.watchFile(
    path,
    proxy({
      onMoveOrDelete: () => {},
      onError: () => {},
      ...listeners,
    })
  );
}

export async function watchDir(path: string, listeners: WatchDirListeners) {
  return extensionPort.watchDir(
    path,
    proxy({
      onMoveOrDelete: () => {},
      ...listeners,
    })
  );
}

/**
 * Watches a text file at `path` for changes with the provided `listeners`. Returns a dispose method which cleans up the listeners.
 *
 * Use this for watching text files, and receive changes as versioned operational transform (OT) operations annotated with their source.
 */
export function watchTextFile(path: string, listeners: WatchTextFileListeners) {
  return fileWatcherManager.watch(path, listeners);
}
