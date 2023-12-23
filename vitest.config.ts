import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["src/config/setupTests.ts"],
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    name: "Movie DB App",
    environment: "jsdom",
    coverage: {
      reporter: ["text", "json", "html"],
      include: ["src/**/*"],
      extension: [".ts", ".tsx"],
    },
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
  },
});
