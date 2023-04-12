// @ts-nocheck temporary (@lunaroyster)
import { HandshakeStatus } from "src/extensions/types";
import { debug } from "./log";

/**
Methods for the client to speak with the workspace
**/

/*
  A handler to route incoming messages
*/
const messageQueue = {};
const messageHandler = (ev) => {
  debug("message received", ev);
  const { data } = ev;

  if (!messageQueue[data?.id]) {
    return;
  }

  messageQueue[data.id](data.payload);
  delete messageQueue[data.id];
};

/*
  Registers listener for incoming messages
*/
export function registerMessageListener() {
  debug("registering message handler");
  window.addEventListener("message", messageHandler);

  return () => {
    debug("deregistering message handler");
    window.removeEventListener("message", messageHandler);
  };
}

let handshakeStatus: HandshakeStatus = HandshakeStatus.Loading;

export const setHandshakeStatus = (status: HandshakeStatus) => {
  handshakeStatus = status;
};

export const getHandshakeStatus = () => handshakeStatus;

export async function handshake({ permissions, timeout }) {
  debug("🤝");

  const response = await new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      debug("handshake timed out");
      reject(new Error("handshake timed out"));
    }, timeout);

    return request({ type: "handshake", permissions })
      .then((res) => {
        if (handshakeStatus === HandshakeStatus.Ready) {
          resolve(res);
        }

        if (res.error) {
          throw res.error;
        }

        if (res.success !== true) {
          throw "handshake not successful";
        }

        setHandshakeStatus(HandshakeStatus.Ready);
        debug("handshake succeeded");
        clearTimeout(timeoutId);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        reject(err);
      });
  });

  return response;
}

/*
  Send a message, expect a response
*/
export async function request(
  payload
): Promise<{ id: string; payload: any; error: any; success: boolean }> {
  const id = Math.random();

  return new Promise((resolve) => {
    messageQueue[id] = resolve;

    parent.postMessage(
      {
        id,
        payload,
      },
      "*"
    );
  });
}
