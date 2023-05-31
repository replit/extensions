import { TestNamespace } from "../types";
import { experimental } from "@replit/extensions";
import assert from "assert";

const { exec } = experimental;

const tests: Record<string, () => Promise<void> | void> = {
  "exec should work": async () => {
    
  }
};

const DataTests: TestNamespace = {
  module: "editor",
  tests,
};

export default DataTests;
