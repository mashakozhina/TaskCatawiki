import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "./tests/e2e-tests",
  testMatch: "**/*.spec.ts",
  timeout: 60_000,
  fullyParallel: false, // can run sequentially to reduce bot-detection risk
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [
    [
      "html",
      {
        outputFolder: `playwright-report-${new Date().toISOString().replace(/[:.]/g, "-")}`,
      },
    ],
  ],
  use: {
    baseURL: process.env.BASE_URL ?? "https://www.catawiki.com",
    screenshot: "only-on-failure",
    video: "on-first-retry",
    trace: "on-first-retry",
    // Real Chrome bypasses most CDN bot filters; Chromium is used on CI
    channel: process.env.CI ? undefined : "chrome",
    headless: true,
    // Mimic a real desktop session
    viewport: { width: 1280, height: 720 },
    locale: "en-GB",
    timezoneId: "Europe/London",
    extraHTTPHeaders: {
      "Accept-Language": "en-GB,en;q=0.9",
    },
  },
  projects: [
    {
      name: "chrome",
      use: {
        ...devices["Desktop Chrome"],
        channel: process.env.CI ? undefined : "chrome",
      },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "mobile-safari",
      use: { ...devices["iPhone 12"] },
    },
  ],
});
