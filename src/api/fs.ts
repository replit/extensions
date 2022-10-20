import { extensionPort } from "src/util/comlink";
import { request } from "src/util/talk";

export async function readFile(path: string) {
  const fileContent = await extensionPort.readFile(path);
  
  return fileContent;
}

export async function writeFile(path: string, content: string|Blob) {
  return request({
    type: "writeFile",
    path,
    content,
  });
}

export async function readDir(path: string) {
  return request({
    type: "readDir",
    path,
  });
}

export async function createDir(path: string) {
  return request({
    type: "createDir",
    path,
  });
}
