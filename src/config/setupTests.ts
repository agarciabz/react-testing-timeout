import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
// Vitest does not include some matchers by default, so we need to import them here.
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
});
