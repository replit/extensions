import { extensionPort } from "../util/comlink";

export type Primitive = string | boolean | number | null | undefined | never;

export interface ObjectType {
  [n: string | number]: Serializable;
}

export interface NumericIndexType {
  [n: number]: Serializable;
}

export type Serializable = ObjectType | Primitive | NumericIndexType;

export type Data = Record<string, Serializable>;

/**
 * Logs information to the Extension Devtools
 */
async function info(message: string, data?: Data) {
  if (typeof message !== "string") {
    console.info(message, data);
    extensionPort.debug.warn(
      "Attempted to log non-serializable message. See your browser devtools to access the logged object."
    );

    return;
  }

  return await extensionPort.debug.info(message, data);
}

/**
 * Logs a warning to the extension devtools
 */
async function warn(message: string, data?: Data) {
  if (typeof message !== "string") {
    console.warn(message, data);
    extensionPort.debug.warn(
      "Attempted to log non-serializable message. See your browser devtools to access the logged object."
    );

    return;
  }

  return await extensionPort.debug.warn(message, data);
}

/**
 * Logs an error message to the extension devtools
 */
async function error(message: string, data?: Data) {
  if (typeof message !== "string") {
    console.error(message, data);
    extensionPort.debug.warn(
      "Attempted to log non-serializable message. See your browser devtools to access the logged object."
    );

    return;
  }

  return await extensionPort.debug.error(message, data);
}

// Log is just an alias for info for now
const log = info;

export { info, warn, error, log };
