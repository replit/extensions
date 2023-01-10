import { extensionPort } from "src";

let warned = false;

export async function evalCode({ code }) {
  if (!warned) {
    console.warn("@replit/extensions: evalCode() will be deprecated very soon");
    warned = true;
  }

  return await extensionPort.eval(code);
}
