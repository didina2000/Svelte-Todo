import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import * as path from "path";

export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      $root: path.resolve("./src"),
    },
  },
});
