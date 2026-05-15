import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LotPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get favoritesCounter() {
    return this.page.locator('[class*="FavoriteChip_count"]').first();
  }

  get biddingCountdown() {
    return this.page.locator('[data-testid="timer-countdown"]');
  }

  get title() {
    return this.page.locator("h1");
  }

  get bidStatusSection() {
    return this.page.locator('[data-testid="lot-bid-status-section"]');
  }

  get placeBidButton() {
    return this.page.getByRole("button", { name: "Place bid" }).first();
  }

  get quickBidButtons() {
    return this.page.locator('[class*="Chip_chip"]').filter({ hasText: /€/ });
  }

  get bidConfirmationModal() {
    return this.page.locator('[role="dialog"]');
  }

  get confirmBidButton() {
    return this.bidConfirmationModal.getByRole("button", {
      name: "Confirm your bid",
    });
  }

  get gallery() {
    return this.page.locator('[class*="Gallery_"]').first();
  }

  get lotSpecifications() {
    return this.page.locator('[class*="LotSpecifications_container"]');
  }

  get sellerSection() {
    return this.page.locator('[data-testid="odp-new-seller-section"]');
  }

  get similarLots() {
    return this.page.locator('[class*="OtherInterestingLots_"]').first();
  }

  //Actions
  async getLotName(): Promise<string> {
    return this.title.innerText();
  }

  async getFavoritesCount(): Promise<string> {
    return (await this.favoritesCounter.innerText()).trim();
  }

  async getCurrentBid(): Promise<string> {
    const text = await this.bidStatusSection.innerText();
    const match = text.match(/€\s*[\d,.]+/);
    return match ? match[0].replace(/\s/g, "") : "";
  }

  async printLotDetails() {
    const name = await this.getLotName();
    const favorites = await this.getFavoritesCount();
    const bid = await this.getCurrentBid();
    console.log("=== Lot Details ===");
    console.log(`Lot Name: ${name}`);
    console.log(`Favorites: ${favorites}`);
    console.log(`Current Bid: ${bid}`);
    console.log("==================");
  }

  //Assertions
  async assertLotPage(locale: string) {
    await this.assertPage(new RegExp(`/${locale}/l/\\d+`));
    await this.assertHeader();
    expect((await this.getLotName()).length).toBeGreaterThan(0);
    await expect(this.favoritesCounter).toBeVisible();
    await expect(this.biddingCountdown).toBeVisible();
    await expect(this.bidStatusSection).toBeVisible();
    expect(await this.getCurrentBid()).toMatch(/€[\d,.]+/);
    await expect(this.placeBidButton).toBeVisible();
    await expect(this.gallery).toBeVisible();
    await expect(this.lotSpecifications).toBeVisible();
    await expect(this.sellerSection).toBeVisible();
    await expect(this.similarLots).toBeVisible();
    await this.assertFooter();
  }
}
