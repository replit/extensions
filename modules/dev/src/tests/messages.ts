import { TestNamespace, TestObject } from "../types";
import { messages } from "@replit/extensions";
import { assert } from "chai";

const tests: TestObject = {
  showConfirm: async () => {
    const res = await messages.showConfirm("Test confirmation");

    assert.isString(res);
  },
};

const MessagesTests: TestNamespace = {
  module: "messages",
  tests,
};

export default MessagesTests;
