import * as Comlink from "comlink";
import { ExtensionPortAPI } from "src/types";

export const extensionPort = (() =>
  typeof window !== "undefined"
    ? Comlink.wrap<ExtensionPortAPI>(
        Comlink.windowEndpoint(self.parent, self, "*")
      ) as Comlink.Remote<ExtensionPortAPI>
    : null)();

export const proxy = Comlink.proxy;
