import { extensionPort } from "src";

/**
 * Shows a confirmation toast message within the Replit workspace for `length` milliseconds.  Returns the ID of the message as a UUID
 */
export const showConfirm = async (
  str: string,
  length: number = 4000,
  style?: React.CSSProperties
) => {
  return extensionPort.showConfirm(str, length, style);
};

/**
 * Shows an error toast message within the Replit workspace for `length` milliseconds.  Returns the ID of the message as a UUID
 */
export const showError = async (
  str: string,
  length: number = 4000,
  style?: React.CSSProperties
) => {
  return extensionPort.showError(str, length, style);
};

/**
 * Shows a notice toast message within the Replit workspace for `length` milliseconds.  Returns the ID of the message as a UUID
 */
export const showNotice = async (
  str: string,
  length: number = 4000,
  style?: React.CSSProperties
) => {
  return extensionPort.showNotice(str, length, style);
};

/**
 * Shows a warning toast message within the Replit workspace for `length` milliseconds.  Returns the ID of the message as a UUID
 */
export const showWarning = async (
  str: string,
  length: number = 4000,
  style?: React.CSSProperties
) => {
  return extensionPort.showWarning(str, length, style);
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
