import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import { configDefaults, coverageConfigDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [tanstackRouter({
    target: 'react',
    autoCodeSplitting: true,
    routesDirectory: "./src/app/routes"
  }), react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src')
    }
  },
  server: {
    host: true,
    port: 3030,
    watch: {
      usePolling: true
    }
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/setupTests.ts"],
    exclude: [
      ...configDefaults.exclude,
      "e2e/**"
    ],
    coverage: {
      reporter: ["text", "html", "json-summary"],
      thresholds: {
        lines: 60,
        functions: 60,
        branches: 60,
        statements: 60,
      },
      exclude: [
        ...coverageConfigDefaults.exclude,
        "src/test/**",
        "**/*.d.ts",
        "**/*.config.*",
        "src/main.ts",
        // "src/**/*.stories.tsx",      // НА БУДУЩЕЕ ЕСЛИ ПРИКРУЧУ STORYBOOK
      ]
    },
  }
});