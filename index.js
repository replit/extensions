const messageQueue = {}

export async function request(payload) {
  const id = Math.random();

  return new Promise(resolve => {
    messageQueue[id] = resolve;

    parent.postMessage({
      id,
      payload,
    }, "*")
  })
}

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

export async function readReplInfo() {
  return request({ type: 'readReplInfo' })
}

export async function readUserInfo() {
  return request({ type: 'readUserInfo' })
}

export async function handshake(permissions) {
  const res = await request({ type: 'handshake', permissions })
  
  return res;
}

const messageHandler = (ev) => {
  const { data } = ev;

  messageQueue[data.id](data.payload)
  delete messageQueue[data.id];
}

export function registerExtension() {
  window.addEventListener('message', messageHandler)

  return () => {
    window.removeEventListener('message', messageHandler);
  }
}
