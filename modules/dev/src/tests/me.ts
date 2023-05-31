import { TestNamespace } from "../types";
import { me } from "@replit/extensions";
import assert from "assert";

const tests: Record<string, () => Promise<void> | void> = {
  "me.filePath should work": async () => {
    const res = await me.filePath();

    assert(res);
    assert(typeof res === "string");
  }
};

const MeTests: TestNamespace = {
  module: "me",
  tests,
};

export default MeTests;
