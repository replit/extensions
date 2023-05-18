import * as Comlink from "comlink";
import { ExtensionPort } from "../types";

export const extensionPort = (() =>
  typeof window !== "undefined"
    ? Comlink.wrap(
        Comlink.windowEndpoint(self.parent, self, "*")
      ) as any as ExtensionPort
    : null)() as ExtensionPort;

export const proxy = Comlink.proxy;
export const releaseProxy = Comlink.releaseProxy;