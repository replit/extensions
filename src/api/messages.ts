import { extensionPort } from "src";

/**
 * Shows a confirmation toast message within the Replit workspace for `length` milliseconds.  Returns the ID of the message as a UUID
 */
export const showConfirm = async (str: string, length: number = 4000) => {
  return extensionPort.showConfirm(String(str), length);
};

/**
 * Shows an error toast message within the Replit workspace for `length` milliseconds.  Returns the ID of the message as a UUID
 */
export const showError = async (str: string, length: number = 4000) => {
  return extensionPort.showError(String(str ), length);
};

/**
 * Shows a notice toast message within the Replit workspace for `length` milliseconds.  Returns the ID of the message as a UUID
 */
export const showNotice = async (str: string, length: number = 4000) => {
  return extensionPort.showNotice(String(str), length);
};

/**
 * Shows a warning toast message within the Replit workspace for `length` milliseconds.  Returns the ID of the message as a UUID
 */
export const showWarning = async (str: string, length: number = 4000) => {
  return extensionPort.showWarning(String(str), length);
};

/**
 * Hides a message by its IDs
 */
export const hideMessage = async (id: string) => {
  return extensionPort.hideMessage(id);
};

/**
 * Hides all toast messages visible on the screens
 */
export const hideAllMessages = async () => {
  return extensionPort.hideAllMessages();
};
