import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs"],
  target: "es2017",
  platform: "browser",
  bundle: true,
  minify: true,
  dts: true,
  clean: true,
  external: ["react", "react-dom"],
  noExternal: [],
});
