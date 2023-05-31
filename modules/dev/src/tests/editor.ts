import { TestNamespace } from "../types";
import { experimental } from "@replit/extensions";
import assert from "assert";

const { editor } = experimental;

const tests: Record<string, () => Promise<void> | void> = {
  "editor.getPreferences should work": async () => {
    const res = await editor.getPreferences();

    assert(res);
    assert(typeof res.fontSize === "number");
  }
};

const EditorTests: TestNamespace = {
  module: "editor",
  tests,
};

export default EditorTests;
