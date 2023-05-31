import { TestNamespace, TestObject } from "../types";
import { fs } from "@replit/extensions";
import { assert } from "chai";

const tests: TestObject = {
  readFile: async () => {
    const res = await fs.readFile("package.json");

    assert.isOk(res, "res is truthy");
    if ("content" in res) {
      assert.isTrue(typeof res.content === "string");
    } else {
      throw new Error("failed to read package.json");
    }
  },
};

const FsTests: TestNamespace = {
  module: "fs",
  tests,
};

export default FsTests;
