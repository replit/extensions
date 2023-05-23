/**
 * @jest-environment jsdom
 */
import fs from "fs";
import { version } from "../package.json";

declare global {
  interface Window {
    replit: any;
  }
};

describe("dist/index.global.js (IIFE)", () => {
  test("exists", () => {
    expect(fs.existsSync("./dist/index.global.js")).toBe(true);
  });
  test("sourcemap file exists", () => {
    expect(fs.existsSync("./dist/index.global.js.map")).toBe(true);
  });
  test("evaluates to produce `replit` object on window", async () => {
    let replitPromise = new Promise((resolve, reject) => {
      const code = fs.readFileSync("./dist/index.global.js", "utf8");

      const scriptTag = document.createElement("script");
      scriptTag.type = "text/javascript";
      scriptTag.text = code;
      scriptTag.onload = () => {
        resolve(window.replit);
      };
      scriptTag.onerror = () => {
        reject(new Error("Failed to load script"));
      };
      document.body.appendChild(scriptTag);
    });

    expect(replitPromise).resolves.toBeDefined();

    const replit = await replitPromise;
    expect(replit).toBeDefined();
    expect((replit as any).version).toEqual(version);
  });
});

describe("dist/index.cjs (CommonJS)", () => {
  test("exists", () => {
    expect(fs.existsSync("./dist/index.cjs")).toBe(true);
  });
  test("sourcemap file exists", () => {
    expect(fs.existsSync("./dist/index.cjs.map")).toBe(true);
  });
});

describe("dist/index.js (ES Module)", () => {
  test("exists", () => {
    expect(fs.existsSync("./dist/index.js")).toBe(true);
  });
  test("sourcemap file exists", () => {
    expect(fs.existsSync("./dist/index.js.map")).toBe(true);
  });
});

describe("dist/index.d.ts (TypeScript defs)", () => {
  test("exists", () => {
    expect(fs.existsSync("./dist/index.d.ts")).toBe(true);
  });
});
