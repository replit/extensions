import {request} from '../talk';

export async function readFile(path) {
  return request({
    type: 'readFile',
    path,
  })
}

export async function writeFile(path, content) {
  return request({
    type: 'writeFile',
    path,
    content,
  })
}

export async function readDirectory(path) {
  return request({
    type: 'readDirectory',
    path,
  })
}

export async function createDirectory(path) {
  return request({
    type: 'createDirectory',
    path,
  })
}