import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AuctionPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get heading() {
    return this.page.locator("h1");
  }

  private get followSimilarToggle() {
    return this.page.locator('[class*="AuctionFollowSimilarToggle_toggle"]');
  }

  private get viewModeContainer() {
    return this.page.locator('[data-testid="view-mode-container"]');
  }

  private get viewGalleryButton() {
    return this.page.locator('[data-testid="view-mode-gallery"]');
  }

  private get viewNormalButton() {
    return this.page.locator('[data-testid="view-mode-normal"]');
  }

  private get lotList() {
    return this.page.locator('[class*="LotList_container"]');
  }

  private get lotCards() {
    return this.page.locator('[data-testid*="lot-card-container"]');
  }

  private get firstLotCardImage() {
    return this.lotCards.first().locator(".c-lot-card__image");
  }

  private get firstLotCardContent() {
    return this.lotCards.first().locator(".c-lot-card__content");
  }

  private get followToggle() {
    return this.page.locator('[class*="FollowToggle_container"]');
  }

  // /a/t/{slug} is a permanent type URL that always resolves to the latest active auction
  async goto(locale: string, auctionTypeSlug: string) {
    await this.page.goto(`/${locale}/a/t/${auctionTypeSlug}`);
  }

  async clickFirstLot() {
    await this.lotCards.first().locator("a").first().click();
  }

  //Assertions
  async assertAuctionPage(locale: string) {
    await this.assertPage(new RegExp(`/${locale}/a/\\d+`));
    await this.assertHeader();
    await expect(this.heading).toBeVisible();
    expect((await this.heading.innerText()).length).toBeGreaterThan(0);
    await expect(this.followSimilarToggle).toBeVisible();
    await expect(this.viewModeContainer).toBeVisible();
    await expect(this.viewGalleryButton).toBeVisible();
    await expect(this.viewNormalButton).toBeVisible();
    await expect(this.lotList).toBeVisible();
    await expect(this.lotCards.first()).toBeVisible();
    await expect(this.firstLotCardImage).toBeVisible();
    await expect(this.firstLotCardContent).toBeVisible();
    await expect(this.followToggle).toBeVisible();
    await this.assertFooter();
  }
}
