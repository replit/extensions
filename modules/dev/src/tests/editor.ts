import { TestNamespace, TestObject } from "../types";
import { experimental } from "@replit/extensions";
import { assert } from "chai";

const { editor } = experimental;

const tests: TestObject = {
  getPreferences: async () => {
    const res = await editor.getPreferences();

    assert.isObject(res);
    assert.isNumber(res.fontSize);
  },
};

const EditorTests: TestNamespace = {
  module: "editor",
  tests,
};

export default EditorTests;
