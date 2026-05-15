import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { LotPage } from "../pages/LotPage";
import { SearchKeyword } from "../fixtures/testData";

const locale = process.env.LOCALE ?? "en";
const searchKeyword = SearchKeyword.Watch;
let home: HomePage;
let searchResults: SearchResultsPage;

test.describe("Search", () => {
  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    searchResults = new SearchResultsPage(page);
    await home.goto(locale);
    await home.search(searchKeyword);
  });

  test("Validates the search results", async () => {
    await searchResults.assertSearchResultsPage(locale, searchKeyword);
  });

  test("At least one result title contains the keyword", async () => {
    const titles = await Promise.all(
      [0, 1, 2].map((i) => searchResults.getLotCardTitle(i)),
    );
    const anyMatch = titles.some((t) =>
      t.toLowerCase().includes(searchKeyword),
    );
    expect(anyMatch).toBe(true);
  });

  test("Each lot card shows a price and a time-left label", async ({
    page,
  }) => {
    const cardsCount = Math.min(await searchResults.lotCards.count(), 3);

    for (let i = 0; i < cardsCount; i++) {
      const price = await searchResults.getLotCardPrice(i);
      const timeLeft = await searchResults.getLotCardTimeLeft(i);
      expect(price).toMatch(/€[\d,.]+/);
      expect(timeLeft).not.toBe("");
    }
  });
  //   test("Category page images have alt text", async () => {
  //     await home.clickFirstCategory();
  //     await category.assertCategoryPage(locale);
  //     await category.assertImagesHaveAltText();
  //   });
});
