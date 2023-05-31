import { TestNamespace } from "../types";
import { fs } from "@replit/extensions";
import assert from "assert";

const tests: Record<string, () => Promise<void> | void> = {
  "fs.readFile should work": async () => {
    const res = await fs.readFile("package.json")

    assert(res);
    assert('content' in res);
    assert(typeof res.content === "string");
  }
};

const FsTests: TestNamespace = {
  module: "fs",
  tests,
};

export default FsTests;
