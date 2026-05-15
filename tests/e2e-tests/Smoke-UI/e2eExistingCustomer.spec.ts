// TESTS ARE BLOCKED BECAUSE OF LOGIN RESRICTION

// import { test, expect } from "@playwright/test";
// import { HomePage } from "../pages/HomePage";
// import { SearchResultsPage } from "../pages/SearchResultsPage";
// import { LotPage } from "../pages/LotPage";
// import { AuctionPage } from "../pages/AuctionPage";
// import { LoginPage } from "../pages/LoginPage";
// import { existingUser } from "../fixtures/customer";
// import { SearchKeyword } from "../fixtures/testData";

// const locale = process.env.LOCALE ?? "en";
// const searchKeyword = SearchKeyword.Train;

// test.describe("Existing Customer Scenarios", () => {
//   let home: HomePage;
//   let results: SearchResultsPage;
//   let lot: LotPage;
//   let auction: AuctionPage;
//   let loginPage: LoginPage;

//   test.beforeEach(async ({ page }) => {
//     home = new HomePage(page);
//     results = new SearchResultsPage(page);
//     lot = new LotPage(page);
//     auction = new AuctionPage(page);
//     loginPage = new LoginPage(page);
//     await home.goto(locale);
//     await loginPage.openModal();
//     await loginPage.login(existingUser.email, existingUser.password);
//     await loginPage.assertLoggedIn(locale);
//   });

//   test("Existing customer searches for train, opens 2nd lot and validates the lot page", async () => {
//     await home.search(searchKeyword);
//     await results.assertSearchResultsPage(locale, searchKeyword);
//     await results.clickLot(1);
//     await lot.assertLotPage(locale);
//     await lot.printLotDetails();
//   });

//   test("Existing customer opens the daily collection, selects first lot and places a bid", async () => {
//     await home.openDailyDiscoverySection();
//     await auction.assertAuctionPage(locale);
//     await results.clickLot(0);
//     await lot.assertLotPage(locale);
//     await lot.quickBidButtons.first().click();
//     await lot.placeBidButton.click();
//     await expect(lot.bidConfirmationModal).toBeVisible();
//     await expect(lot.confirmBidButton).toBeVisible();
//   });
// });
