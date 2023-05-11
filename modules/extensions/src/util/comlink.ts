import * as Comlink from "comlink";
import { ExperimentalAPIs, ExtensionPortAPI } from "../types";

export const extensionPort = (() =>
  typeof window !== "undefined"
    ? (Comlink.wrap<ExtensionPortAPI>(
        Comlink.windowEndpoint(self.parent, self, "*")
      ) as Comlink.Remote<ExtensionPortAPI> & {
        experimental: Comlink.Remote<ExperimentalAPIs>;
      })
    : null)() as Comlink.Remote<ExtensionPortAPI> & {
  experimental: Comlink.Remote<ExperimentalAPIs>;
};

export const proxy = Comlink.proxy;
export const releaseProxy = Comlink.releaseProxy;
