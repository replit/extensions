"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = exports.handshake = exports.getHandshakeStatus = exports.setHandshakeStatus = exports.registerMessageListener = void 0;
// @ts-nocheck temporary (@lunaroyster)
const types_1 = require("src/extensions/types");
const log_1 = require("./log");
/**
Methods for the client to speak with the workspace
**/
/*
  A handler to route incoming messages
*/
const messageQueue = {};
const messageHandler = (ev) => {
    (0, log_1.debug)("message received", ev);
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
function registerMessageListener() {
    (0, log_1.debug)("registering message handler");
    window.addEventListener("message", messageHandler);
    return () => {
        (0, log_1.debug)("deregistering message handler");
        window.removeEventListener("message", messageHandler);
    };
}
exports.registerMessageListener = registerMessageListener;
let handshakeStatus = types_1.HandshakeStatus.Loading;
const setHandshakeStatus = (status) => {
    handshakeStatus = status;
};
exports.setHandshakeStatus = setHandshakeStatus;
const getHandshakeStatus = () => handshakeStatus;
exports.getHandshakeStatus = getHandshakeStatus;
async function handshake({ permissions, timeout }) {
    (0, log_1.debug)("🤝");
    const response = await new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            (0, log_1.debug)("handshake timed out");
            reject(new Error("handshake timed out"));
        }, timeout);
        return request({ type: "handshake", permissions })
            .then((res) => {
            if (handshakeStatus === types_1.HandshakeStatus.Ready) {
                resolve(res);
            }
            if (res.error) {
                throw res.error;
            }
            if (res.success !== true) {
                throw "handshake not successful";
            }
            (0, exports.setHandshakeStatus)(types_1.HandshakeStatus.Ready);
            (0, log_1.debug)("handshake succeeded");
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
exports.handshake = handshake;
/*
  Send a message, expect a response
*/
async function request(payload) {
    const id = Math.random();
    return new Promise((resolve) => {
        messageQueue[id] = resolve;
        parent.postMessage({
            id,
            payload,
        }, "*");
    });
}
exports.request = request;
