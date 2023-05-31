import { TestNamespace, TestObject } from "../types";
import { replDb } from "@replit/extensions";
import { assert } from "chai";

const tests: TestObject = {
  list: async (log) => {
    await replDb.set({
      key: "__extensions_test_key__",
      value: "test value",
    });

    const res = await replDb.list({ prefix: "" });

    assert.isObject(res);
    if ("keys" in res) {
      assert.isArray(res.keys);
    } else {
      throw new Error("failed to list keys");
    }

    // Cleanup
    await replDb.del({
      key: "__extensions_test_key__",
    });
  },
};

const ReplDBTests: TestNamespace = {
  module: "replDb",
  tests,
};

export default ReplDBTests;
