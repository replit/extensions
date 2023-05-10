import { HandshakeStatus } from "../types";

let handshakeStatus: HandshakeStatus = HandshakeStatus.Loading;

export const setHandshakeStatus = (status: HandshakeStatus) => {
  handshakeStatus = status;
};

export const getHandshakeStatus = () => handshakeStatus;
