import { TestNamespace, TestObject } from "../types";
import { themes } from "@replit/extensions";
import { assert } from "chai";

const tests: TestObject = {
  "getCurrentTheme gets the current theme": async (log) => {
    const res = await themes.getCurrentTheme();

    assert.isObject(res);
    assert.isTrue(
      typeof res.id === "number" ||
        ["replitDark", "replitLight"].includes(res.id)
    );

    if (res.customTheme) {
      assert.isTrue(
        res.customTheme?.colorScheme === "dark" ||
          res.customTheme?.colorScheme === "light"
      );
      assert.isString(res.customTheme?.title);
      assert.isString(res.customTheme?.author.username);
    }

    log(
      `Theme: ${res.customTheme?.title} by ${res.customTheme?.author.username} (${res.customTheme?.colorScheme})`
    );
  },
  "getCurrentThemeValues gets the current theme values": async () => {
    const res = await themes.getCurrentThemeValues();

    assert.isObject(res);
    assert.isTrue(Object.values(res).every((t) => typeof t === "string"));
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

const ThemeTests: TestNamespace = {
  module: "themes",
  tests,
};

export default ThemeTests;
