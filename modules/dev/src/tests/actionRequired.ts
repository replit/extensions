import { TestNamespace, TestObject } from "../types";
import { themes, session } from "@replit/extensions";
import { assert } from "chai";

const tests: TestObject = {
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
  "onThemeChange fires when the theme changes": async (log) => {
    log("⚠️ Please change your theme to run this test ⚠️");

    await new Promise<void>(async (resolve) => {
      const dispose = await themes.onThemeChange(() => {
        dispose();
        resolve();
      });
    });
  },
  "onThemeChangeValues fires when the theme changes": async (log) => {
    log("⚠️ Please change your theme to run this test ⚠️");

    await new Promise<void>(async (resolve) => {
      const dispose = await themes.onThemeChangeValues((values) => {
        assert.isObject(values);
        assert.isTrue(
          Object.values(values).every((t) => typeof t === "string")
        );

        dispose();
        resolve();
      });
    });
  },
};

const ActionRequiredTests: TestNamespace = {
  module: "actionRequired",
  tests,
};

export default ActionRequiredTests;
