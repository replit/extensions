import {debug} from './log';
/**
Methods for the client to speak with the workspace
**/


/*
  A handler to route incoming messages
*/
const messageQueue = {}
const messageHandler = (ev) => {
  debug("message received", ev);
  const { data } = ev;

  messageQueue[data.id](data.payload)
  delete messageQueue[data.id];
}

/*
  Registers listener for incoming messages
*/
export function registerMessageListener() {
  debug("registering message handler");
  window.addEventListener('message', messageHandler)

  return () => {
    debug("deregistering message handler");
    window.removeEventListener('message', messageHandler);
  }
}

export async function handshake(permissions) {
  debug('🤝')
  const res = await request({ type: 'handshake', permissions })

  return res;
}

/*
  Send a message, expect a response
*/
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