import { TestNamespace } from "../types";
import { experimental, fs } from "@replit/extensions";
import assert from "assert";

const { exec } = experimental;

const tests: Record<string, () => Promise<void> | void> = {
  "exec should work": async () => {
    await exec({
      args: ["touch", "test_text_file.txt"]
    })
    const res = await fs.readFile("test_text_file.txt");

    assert(res);
    assert('content' in res);
    assert(typeof res.content === "string");

    // Cleanup
    await fs.deleteFile("test_text_file.txt");
  }
};

const ExecTests: TestNamespace = {
  module: "exec",
  tests,
};

export default ExecTests;
