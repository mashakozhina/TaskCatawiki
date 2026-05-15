import { test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { LotPage } from "../pages/LotPage";
import { CategoryPage } from "../pages/CategoryPage";
import { AuctionPage } from "../pages/AuctionPage";
import { LoginPage } from "../pages/LoginPage";
import { SearchKeyword } from "../fixtures/testData";

const locale = process.env.LOCALE ?? "en";
const searchKeyword = SearchKeyword.Train;

test.describe("Guest User Scenarios", () => {
  let home: HomePage;
  let results: SearchResultsPage;
  let lot: LotPage;
  let category: CategoryPage;
  let auction: AuctionPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    results = new SearchResultsPage(page);
    lot = new LotPage(page);
    category = new CategoryPage(page);
    auction = new AuctionPage(page);
    loginPage = new LoginPage(page);
    await home.goto(locale);
    await home.assertHomePage(locale);
  });

  test("Guest customer searches for train, opens 2nd lot and validates the lot page", async () => {
    await home.search(searchKeyword);
    await results.assertSearchResultsPage(locale, searchKeyword);
    await results.clickLot(1);
    await lot.assertLotPage(locale);
    await lot.printLotDetails();
  });

  test("Guest customer navigates to a category page and returns home using logo", async () => {
    await home.clickFirstCategory();
    await category.assertCategoryPage(locale);
    await category.logo.click();
    await home.assertHomePage(locale);
  });

  test("Guest customer opens an auction page from home, views a lot and tries to place a bid", async () => {
    await home.clickFirstAuction();
    await auction.assertAuctionPage(locale);
    await auction.clickFirstLot();
    await lot.assertLotPage(locale);
    await lot.placeBidButton.click();
    await loginPage.assertLoginModal();
  });
});
