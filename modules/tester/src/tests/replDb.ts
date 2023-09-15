import { TestNamespace, TestObject } from "../types";
import { replDb } from "@replit/extensions";
import { assert, expect } from "chai";
import { createReplDBKey } from "../utils/tests";
import { randomString } from "../utils/assertions";

const tests: TestObject = {
  "list should list all replDB keys": async (log) => {
    const { dispose } = await createReplDBKey();

    // List keys
    const res = await replDb.list({ prefix: "" });

    // Assertions and logging
    assert.isObject(res);
    if ("keys" in res) {
      assert.isArray(res.keys);
      res.keys.forEach(log);
    } else {
      throw new Error("failed to list keys");
    }

    // Cleanup
    dispose();
  },
  "set(): update a replDB kv, get(): check, del(): dispose": async () => {
    const { keyName, dispose } = await createReplDBKey();

    const newValue = randomString();

    await replDb.set({
      key: keyName,
      value: newValue,
    });

    const res = await replDb.get({
      key: keyName,
    });

    assert.isString(res);
    expect(res).to.equal(newValue);

    dispose();
  },
};

const ReplDBTests: TestNamespace = {
  module: "replDb",
  tests,
};

export default ReplDBTests;
