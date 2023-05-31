import { TestNamespace } from "../types";
import { themes } from "@replit/extensions";
import assert from "assert";

const tests: Record<string, () => Promise<void> | void> = {
  "session.getActiveFile should work": async () => {
    const res = await themes.getCurrentTheme();

    assert(res);
    assert(res.customTheme);
  }
};

const ThemeTests: TestNamespace = {
  module: "session",
  tests,
};

export default ThemeTests;
