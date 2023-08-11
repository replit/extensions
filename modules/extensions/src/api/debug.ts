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

function isSerializable(thing: any): thing is Serializable {
  if (["string", "number", "boolean", "undefined"].includes(typeof thing)) {
    return true;
  }

  if (thing === null) {
    return true;
  }

  return false;
}

/**
 * Logs information to the Extension Devtools
 */
async function info(message: string, data?: Data) {
  if (!isSerializable(message)) {
    // if someone uses console.info / console.log, the wrapper defined in index.ts will log the object to the console.
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
  if (!isSerializable(message)) {
    // if someone uses console.warn, the wrapper defined in index.ts will log the object to the console.
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
  if (!isSerializable(message)) {
    // if someone uses console.error, the wrapper defined in index.ts will log the object to the console.
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
