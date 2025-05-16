// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// });

// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from 'path';

const optimizeDeps = {
  include: ['@emotion/styled'],
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // "@": "/src",
      utils: path.resolve(__dirname, './src/utils'),
      config: path.resolve(__dirname, './src/config'),
      components: path.resolve(__dirname, './src/components'),
      // contexts: path.resolve(__dirname, './src/contexts'),
      // This was originally called "events" and that breaks some NPM dependency
      // so do not rename it "events":
      // telemetry: path.resolve(__dirname, './src/telemetry'),
      store: path.resolve(__dirname, './src/store'),
      routes: path.resolve(__dirname, './src/routes'),
      icons: path.resolve(__dirname, './src/icons'),
      hooks: path.resolve(__dirname, './src/hooks'),
      // consts: path.resolve(__dirname, './src/consts'),
      sdklegacy: path.resolve(__dirname, './src/sdklegacy'),
      // public: path.resolve(__dirname, './public'),
      // views: path.resolve(__dirname, './src/views'),
      'process/': 'process',
      'buffer/': 'buffer',
    },
  },
  // optimizeDeps,
});
