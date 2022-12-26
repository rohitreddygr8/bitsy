import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "node:path";
import svgr from "vite-plugin-svgr";
import postcssPresetEnv from "postcss-preset-env";
import { Plugin } from "postcss";

export default defineConfig(({ mode }) => ({
  build: {
    chunkSizeWarningLimit: undefined,
    rollupOptions: {
      input: {
        index: "./index.html",
        // "service-worker": "./src/app/service-worker/service-worker.ts",
      },
      output: {
        entryFileNames: (chunkInfo) => (chunkInfo.name === "service-worker" ? "[name].js" : "assets/[name].[hash].js"),
      },
    },
  },
  css: {
    modules: {
      localsConvention: "camelCase",
      generateScopedName: mode === "development" ? "[name]_[local]" : "[hash:base64:8]",
    },
    postcss: {
      plugins: [postcssPresetEnv({ stage: 1 }) as Plugin],
    },
  },
  envDir: "./src/config/",
  publicDir: "./src/public/",
  plugins: [react(), svgr({ exportAsDefault: true, svgrOptions: { icon: true } })],
  resolve: {
    alias: {
      "@assets": resolve(__dirname, "./src/assets"),
      "@components": resolve(__dirname, "./src/components"),
      "@pages": resolve(__dirname, "./src/pages"),
      "@hooks": resolve(__dirname, "./src/hooks"),
      "@utils": resolve(__dirname, "./src/utils"),
    },
  },
  server: { host: true, port: 3000 },
}));
