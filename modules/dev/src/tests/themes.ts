import { TestNamespace, TestObject } from "../types";
import { themes } from "@replit/extensions";
import { assert } from "chai";

const tests: TestObject = {
  getCurrentTheme: async () => {
    const res = await themes.getCurrentTheme();

    assert.isObject(res);
    assert.isNumber(res.id);
  },
};

const ThemeTests: TestNamespace = {
  module: "themes",
  tests,
};

export default ThemeTests;
