import { TestNamespace, TestObject } from "../types";
import { session } from "@replit/extensions";
import { assert } from "chai";

const tests: TestObject = {
  "getActiveFile should return the active file / null": async () => {
    const res = await session.getActiveFile();

    assert.isTrue(typeof res === "string" || res === null);
  },
  "onActiveFileChange should watch the current active file": async (log) => {
    log("⚠️ Please focus three different files for this test to finish ⚠️");

    let fileVisits = 0;

    await new Promise<void>((resolve) => {
      const dispose = session.onActiveFileChange((file) => {
        if (typeof file === "string") {
          log(file + ` (${fileVisits}/3)`);
          fileVisits++;
          if (fileVisits >= 3) {
            dispose();
            resolve();
          }
        }
      });
    });
  },
};

const SessionTests: TestNamespace = {
  module: "session",
  tests,
};

export default SessionTests;
