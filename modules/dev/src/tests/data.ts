import { TestNamespace } from "../types";
import { data } from "@replit/extensions";
import assert from "assert";

const tests: Record<string, () => Promise<void> | void> = {
  "data.currentUser should work": async () => {
    const res = await data.currentUser();

    assert(res.user);
    assert(typeof res.user.id === "number")
  }
};

const DataTests: TestNamespace = {
  module: "data",
  tests,
};

export default DataTests;
