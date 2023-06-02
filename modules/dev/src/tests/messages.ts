import { TestNamespace, TestObject } from "../types";
import { messages } from "@replit/extensions";
import { assert } from "chai";

const tests: TestObject = {
  "showConfirm should create a popup and return an ID": async () => {
    const res = await messages.showConfirm("Test confirmation");

    assert.isString(res);
  },
  "showError should create a popup and return an ID": async () => {
    const res = await messages.showError("Test error");

    assert.isString(res);
  },
  "showNotice should create a popup and return an ID": async () => {
    const res = await messages.showNotice("Test notice");

    assert.isString(res);
  },
  "showWarning should create a popup and return an ID": async () => {
    const res = await messages.showWarning("Test warning");

    assert.isString(res);
  },
  "hideMessage should close a popup by its ID": async () => {
    const res = await messages.showConfirm("This should close");

    assert.isString(res);

    await messages.hideMessage(res);
  },
  "hideAllMessages should close all popups": async () => {
    await messages.showConfirm("This should close");
    await messages.showConfirm("This should close as well");
    await messages.showConfirm("This should close like the others");

    await messages.hideAllMessages();
  },
};

const MessagesTests: TestNamespace = {
  module: "messages",
  tests,
};

export default MessagesTests;
