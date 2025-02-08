import { build, emptyDir } from "@deno/dnt";
import deno from "../deno.json" with { type: "json" };

await emptyDir("./npm");

await build({
  entryPoints: ["./index.ts"],
  outDir: "./npm",
  shims: {
    deno: true,
  },
  package: {
    name: deno.name,
    version: deno.version,
    description: deno.description,
    license: deno.license,
    repository: {
      type: "git",
      url: "git+https://github.com/silverbucket/ajv-formats-draft2019.git",
    },
    bugs: {
      url: "https://github.com/silverbucket/ajv-formats-draft2019/issues",
    },
  },
  postBuild() {
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
