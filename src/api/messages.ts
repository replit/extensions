import { extensionPort } from "src";

export const showConfirm = async (str: string) => {
  return extensionPort.showConfirm(str);
};

export const showError = async (str: string) => {
  return extensionPort.showError(str);
};

export const showNotice = async (str: string) => {
  return extensionPort.showNotice(str);
};

export const showWarning = async (str: string) => {
  return extensionPort.showWarning(str);
};

export const hideMessage = async (id: string) => {
  return extensionPort.hideMessage(id);
};

export const hideAllMessages = async () => {
  return extensionPort.hideAllMessages();
};
