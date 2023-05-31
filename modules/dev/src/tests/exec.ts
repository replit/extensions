import { TestNamespace, TestObject } from "../types";
import { experimental, fs } from "@replit/extensions";
import { assert } from "chai";

const { exec } = experimental;

const tests: TestObject = {
  exec: async () => {
    await exec({
      args: ["touch", "test_text_file.txt"],
    });
    const res = await fs.readFile("test_text_file.txt");

    assert.isObject(res);

    if ("content" in res) {
      assert.isString(res.content);
    } else {
      throw new Error("Expected a string");
    }

    // Cleanup
    await fs.deleteFile("test_text_file.txt");
  },
};

const ExecTests: TestNamespace = {
  module: "exec",
  tests,
};

export default ExecTests;
