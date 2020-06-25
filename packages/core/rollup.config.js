import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

const join = (...paths) => paths.join("/");

const OUTPUT_BASE = "dist";
const OUTPUT_JS = join(OUTPUT_BASE, "js");
const OUTPUT_DEFINITIONS = join(OUTPUT_BASE, "definitions");

export default [
  {
    input: "src/main.ts",
    output: [
      { file: join(OUTPUT_JS, "main.bundle.js"), format: "cjs" },
      {
        file: join(OUTPUT_JS, "main.bundle.min.js"),
        format: "cjs",
        plugins: [terser()],
      },
      { file: join(OUTPUT_JS, "main.bundle.esm.js"), format: "esm" },
    ],
    plugins: [typescript({ lib: ["es6", "dom"], module: "es6" })],
  },
  {
    input: "src/main.ts",
    output: { dir: OUTPUT_DEFINITIONS },
    plugins: [
      typescript({
        declaration: true,
        declarationDir: OUTPUT_DEFINITIONS,
        module: "es6",
      }),
    ],
  },
];
