import { extensionPort } from "../util/comlink";
import { Data } from "../types";

/**
 * Logs information to the Extension Devtools
 */
export async function info(message: string, data?: Data) {
  if (typeof message !== "string") {
    throw new Error("Message must be a string");
  }

  return await extensionPort.debug.info(message, data);
}

/**
 * Logs a warning to the extension devtools
 */
export async function warn(message: string, data?: Data) {
  if (typeof message !== "string") {
    throw new Error("Message must be a string");
  }

  return await extensionPort.debug.warn(message, data);
}

/**
 * Logs an error message to the extension devtools
 */
export async function error(message: string, data?: Data) {
  if (typeof message !== "string") {
    throw new Error("Message must be a string");
  }

  return await extensionPort.debug.error(message, data);
}
