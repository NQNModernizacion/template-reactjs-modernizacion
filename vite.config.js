/* eslint-disable no-undef */
import react from "@vitejs/plugin-react";
import fs from "fs/promises";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  base: "/apps/appname/",
  build: {
    sourcemap: true,
  },
  plugins: [react()],
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    // loader: "tsx",
    // include: /src\/.*\.[tj]sx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: "load-js-files-as-jsx",
          setup(build) {
            build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
              loader: "jsx",
              contents: await fs.readFile(args.path, "utf8"),
            }));
          },
        },
      ],
      loader: {
        ".js": "jsx",
      },
    },
  },
}));
