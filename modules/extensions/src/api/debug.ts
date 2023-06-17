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
    throw new Error("Message must be a string");
  }

  return await extensionPort.debug.info(message, data);
}

/**
 * Logs a warning to the extension devtools
 */
async function warn(message: string, data?: Data) {
  if (typeof message !== "string") {
    throw new Error("Message must be a string");
  }

  return await extensionPort.debug.warn(message, data);
}

/**
 * Logs an error message to the extension devtools
 */
async function error(message: string, data?: Data) {
  if (typeof message !== "string") {
    throw new Error("Message must be a string");
  }

  return await extensionPort.debug.error(message, data);
}

// Log is just an alias for info for now
const log = info;

export { info, warn, error, log };
