import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SearchResultsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get heading() {
    return this.page.locator("h1");
  }

  get filters() {
    return this.page.locator('[data-testid="sticky-filters"]');
  }

  get resultsCountLabel() {
    return this.page.locator('[data-testid="object-amount"]');
  }

  get lotList() {
    return this.page.locator('[class*="LotList_container"]');
  }

  get lotCards() {
    return this.page.locator("article");
  }

  //Actions
  async getResultsCount(): Promise<number> {
    const text = await this.resultsCountLabel.innerText();
    const match = text.match(/[\d,]+/);
    return match ? parseInt(match[0].replace(",", ""), 10) : 0;
  }

  async clickLot(index: number) {
    await this.lotCards.nth(index).locator("a").first().click();
  }

  async getLotCardTitle(index: number): Promise<string> {
    return await this.lotCards.nth(index).locator("p").first().innerText();
  }

  async getLotCardPrice(index: number): Promise<string> {
    return await this.lotCards
      .nth(index)
      .locator("p")
      .filter({ hasText: /€/ })
      .first()
      .innerText();
  }

  async getLotCardTimeLeft(index: number): Promise<string> {
    return await this.lotCards.nth(index).locator("time").innerText();
  }

  //Assertions
  async assertSearchResultsPage(locale: string, keyword: string) {
    await this.assertPage(
      new RegExp(`/${locale}/s\\?q=${encodeURIComponent(keyword)}`),
    );
    await this.assertHeader();
    await expect(this.heading).toHaveText(new RegExp(keyword, "i"));
    await expect(this.lotList).toBeVisible();
    await expect(this.lotCards.first()).toBeVisible();
    await this.assertFooter();
  }
}
