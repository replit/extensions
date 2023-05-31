import { TestNamespace } from "../types";
import { session } from "@replit/extensions";
import assert from "assert";

const tests: Record<string, () => Promise<void> | void> = {
  "session.getActiveFile should work": async () => {
    const res = await session.getActiveFile();

    assert(res);
    assert(typeof res === "string" || typeof res === "undefined")
  }
};

const SessionTests: TestNamespace = {
  module: "session",
  tests,
};

export default SessionTests;
