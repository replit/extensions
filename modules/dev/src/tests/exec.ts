import { TestNamespace, TestObject } from "../types";
import { exec, fs } from "@replit/extensions";
import { assert } from "chai";
import { assertFileExists, createTestDirIfNotExists } from "../utils/tests";

const tests: TestObject = {
  "exec should run a bash command": async () => {
    await createTestDirIfNotExists();

    await exec.exec("touch extension_tester/test_text_file.txt");
    const res = await assertFileExists("extension_tester/test_text_file.txt");

    assert.isString(res.content);

    // Cleanup
    await fs.deleteFile("extension_tester/test_text_file.txt");
  },
  "spawn should successfully spawn a connection instance": async (log) => {
    const { resultPromise, dispose } = exec.spawn({
      args: ["echo", "hello"],
      onOutput: (output) => {
        assert.isString(output);
        log("> " + output);
      },
    });

    const out = await resultPromise;

    console.log(out, Date.now());

    // Cleanup
    dispose();
  },
};

const ExecTests: TestNamespace = {
  module: "exec",
  tests,
};

export default ExecTests;
