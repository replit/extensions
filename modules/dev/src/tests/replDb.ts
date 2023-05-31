import { TestNamespace } from "../types";
import { replDb } from "@replit/extensions";
import assert from "assert";

const tests: Record<string, () => Promise<void> | void> = {
  "messages.showConfirm should work": async () => {
    const res = await replDb.list();

    assert(res);
    assert('keys' in res);
    assert(typeof res.keys === "object" && Array.isArray(res.keys));
  }
};

const ReplDBTests: TestNamespace = {
  module: "replDb",
  tests,
};

export default ReplDBTests;
