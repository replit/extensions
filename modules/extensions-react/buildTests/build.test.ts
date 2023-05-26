import fs from 'fs';

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
