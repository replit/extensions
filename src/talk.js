/**
Methods for the client to speak with the workspace
**/


/*
  A handler to route incoming messages
*/
const messageQueue = {}
const messageHandler = (ev) => {
  const { data } = ev;

  messageQueue[data.id](data.payload)
  delete messageQueue[data.id];
}

/*
  Registers listener for incoming messages
*/
export function registerExtension() {
  window.addEventListener('message', messageHandler)

  return () => {
    window.removeEventListener('message', messageHandler);
  }
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