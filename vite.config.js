import { defineConfig } from "vite";

import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [
    nodePolyfills({
      // Incluye los polyfills necesarios para PouchDB
      include: ["buffer", "process", "util"],
    }),
  ],
  resolve: {
    alias: {
      // Asegúrate de que PouchDB use la versión del navegador
      pouchdb: "pouchdb-browser",
    },
  },
});
