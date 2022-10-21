import { extensionPort } from "src/util/comlink";
import { request } from "src/util/talk";

export async function readFile(path: string): Promise<{content: string}|{error: string}> {
  return extensionPort.fs.readFile(path);
}

export async function writeFile(path: string, content: string|Blob): Promise<{success: boolean}|{error: string}> {
  return extensionPort.fs.writeFile(path, content);
}

export async function readDir(path: string): Promise<{children: Array<{filename: string, type: 'FILE'|'DIRECTORY'}>, error:string}> {
  return extensionPort.fs.readDir(path);
}

export async function createDir(path: string): Promise<null> {
  return extensionPort.fs.createDir(path);
}
