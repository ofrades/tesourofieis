import { defineConfig, devices } from "@playwright/test";

const externalServer = process.env.E2E_BASE_URL;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: externalServer ?? "http://localhost:8081",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: externalServer
    ? undefined
    : {
        command: "bunx expo start --web",
        url: "http://localhost:8081",
        reuseExistingServer: !process.env.CI,
      },
});
