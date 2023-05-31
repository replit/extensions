import { TestNamespace, TestObject } from "../types";
import { data } from "@replit/extensions";
import { assert } from "chai";

const tests: TestObject = {
  currentUser: async () => {
    const res = await data.currentUser();

    assert.isObject(res.user);

    assert.isTrue(typeof res.user.id === "number");
  },
};

const DataTests: TestNamespace = {
  module: "data",
  tests,
};

export default DataTests;
