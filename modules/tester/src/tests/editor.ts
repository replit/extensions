import { TestNamespace, TestObject } from "../types";
import { experimental } from "@replit/extensions";
import { assert } from "chai";

const { editor } = experimental;

const tests: TestObject = {
  "getPreferences returns the current editor preferences": async (log) => {
    const res = await editor.getPreferences();

    assert.isObject(res);
    assert.isNumber(res.fontSize);

    for (const [key, value] of Object.entries(res)) {
      log(`${key}: ${value}`);
    }
  },
};

const EditorTests: TestNamespace = {
  module: "editor",
  tests,
};

export default EditorTests;
