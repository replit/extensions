import { TestNamespace, TestObject } from "../types";
import { session } from "@replit/extensions";
import { assert } from "chai";

const tests: TestObject = {
  "getActiveFile should return the active file / null": async () => {
    const res = await session.getActiveFile();

    assert.isTrue(typeof res === "string" || res === null);
  },
};

const SessionTests: TestNamespace = {
  module: "session",
  tests,
};

export default SessionTests;
