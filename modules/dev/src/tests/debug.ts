import { TestNamespace, TestObject } from "../types";
import { debug } from "@replit/extensions";

const tests: TestObject = {
  "info should log general information to the Extension Devtools Logs":
    async () => {
      debug.info("[Extension Tester (info)]", {
        this: {
          is: "test info",
        },
      });
    },
  "warn should log a warning to the Extension Devtools Logs": async (log) => {
    debug.warn("[Extension Tester (warn)]", {
      this: {
        is: "test warning",
      },
    });
  },
  "error should log an error to the Extension Devtools Logs": async (log) => {
    debug.error("[Extension Tester (error)]", {
      this: {
        is: "test error",
      },
    });
  },
};

const ExecTests: TestNamespace = {
  module: "debug",
  tests,
};

export default ExecTests;
