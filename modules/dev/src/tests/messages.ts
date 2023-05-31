import { TestNamespace } from "../types";
import { messages } from "@replit/extensions";
import assert from "assert";

const tests: Record<string, () => Promise<void> | void> = {
  "messages.showConfirm should work": async () => {
    const res = await messages.showConfirm("Test confirmation");

    assert(res);
    assert(typeof res === "string");
  }
};

const MessagesTests: TestNamespace = {
  module: "messages",
  tests,
};

export default MessagesTests;
