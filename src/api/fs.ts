import { extensionPort, proxy } from "src/util/comlink";
import { WatchFileWatchers } from "src/types";

/**
 * Reads the file specified at `path` and returns an object containing the contents, or an object containing an error if there was one
 */
export async function readFile(path: string) {
  return extensionPort.readFile(path);
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
 * Watches the file at `path` for changes with the provided `watchers`. Returns a dispose method which cleans up the watchers
 */
export async function watchFile(path: string, watchers: WatchFileWatchers) {
  return extensionPort.watchFile(path, proxy(watchers));
}