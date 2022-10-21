import { extensionPort } from "src/util/comlink";
import { request } from "src/util/talk";

export async function readFile(path: string) {
  return extensionPort.readFile(path);
}

export async function writeFile(path: string, content: string | Blob) {
  return extensionPort.writeFile(path, content);
}

export async function readDir(path: string) {
  return extensionPort.readDir(path);
}

export async function createDir(path: string) {
  return extensionPort.createDir(path);
}
