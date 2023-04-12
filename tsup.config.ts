import { defineConfig } from "tsup";

export default defineConfig({
  entryPoints: ["src/extensions/index.ts", "src/extensions-react/index.ts"],
  format: ["esm", "cjs", "iife"],
  dts: true,
  sourcemap: true,
  globalName: "replit",
});