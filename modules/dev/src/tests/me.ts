import { TestNamespace, TestObject } from "../types";
import { me } from "@replit/extensions";
import { assert } from "chai";

const tests: TestObject = {
  "filePath should be a string (file handler) or null (tool)": async () => {
    const res = await me.filePath();

    assert.isTrue(typeof res === "string" || res === null);
  },
};

const MeTests: TestNamespace = {
  module: "me",
  tests,
};

export default MeTests;
