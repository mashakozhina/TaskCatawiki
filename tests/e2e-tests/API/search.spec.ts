import { test, expect } from "@playwright/test";
import type { Response } from "@playwright/test";

test.describe("Search API", () => {
  let searchResponse: Response | null;

  test.beforeEach(async ({ page }) => {
    searchResponse = await page.goto("/en/s?q=watch");
  });

  test("returns 200 for a valid keyword", async () => {
    expect(searchResponse?.status()).toBe(200);
  });

  test("response contains lot URLs", async ({ page }) => {
    const body = await page.content();
    const lotUrls = body.match(/\/en\/l\/\d+/g) ?? [];
    expect(lotUrls.length).toBeGreaterThan(0);
  });

  test("GET /en/this-page-does-not-exist returns 404", async ({ page }) => {
    const response = await page.goto("/en/this-page-does-not-exist-xyz");
    expect(response?.status()).toBe(404);
  });
});
