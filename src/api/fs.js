import { request } from "../talk";

export async function readFile(path) {
  return request({
    type: "readFile",
    path,
  });
}

export async function writeFile(path, content) {
  return request({
    type: "writeFile",
    path,
    content,
  });
}

export async function readDir(path) {
  return request({
    type: "readDir",
    path,
  });
}

export async function createDir(path) {
  return request({
    type: "createDir",
    path,
  });
}
