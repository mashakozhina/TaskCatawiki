import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private get mainSection() {
    return this.page.locator("main");
  }

  private get trustpilotWidget() {
    return this.page.locator(
      '[class*="TrustpilotMicroWidget_trustpilot-widget-wrapper"]',
    );
  }

  get categoriesSection() {
    return this.page.locator('[class*="FeedAndCategoryNavigation_wrapper"]');
  }

  private get categoryTabs() {
    return this.page.locator('[role="tab"]');
  }

  private get heroBannerSection() {
    return this.page
      .locator('[data-testid="hero-banner-lane-element"]')
      .first();
  }

  private get dailyDiscoverySection() {
    return this.page.locator('[class*="DailyDiscoveryLane_"]').first();
  }

  private get expertsSection() {
    return this.page.locator('[class*="ExpertsLane_"]').first();
  }

  private get popularCollections() {
    return this.page.locator('[data-testid="HomepageCollections"]');
  }

  private get popularCategoriesSection() {
    return this.page.locator('[class*="PopularCategories_container"]');
  }

  private get whyCatawikiSection() {
    return this.page.locator('[class*="TrustElements_trust-elements-section"]');
  }

  private get exploreCategoriesSection() {
    return this.page.locator('[class*="HomeExploreCategories_"]').first();
  }

  private get downloadBanner() {
    return this.page.locator('[class*="HomeAppDownloadBanner_container"]');
  }

  private get welcomeSlideIn() {
    return this.page.locator('[data-testid="welcome-slide-in"]');
  }

  private get welcomeSlideInCloseButton() {
    return this.page.locator('[data-testid="welcome-slide-in-close-button"]');
  }

  private get welcomeSlideInRegisterButton() {
    return this.page.locator(
      '[data-testid="welcome-slide-in-register-button"]',
    );
  }

  // Auction collection cards in the scrollable lane
  private get auctionCardLinks() {
    return this.page.locator("a.c-auction-card__link");
  }

  // Category links inside the top navigation
  private get categoryLinks() {
    return this.categoriesSection.locator('a[href*="/c/"]');
  }

  // Feed link inside the daily discovery section
  private get dailyDiscoveryFeedFirstLink() {
    return this.dailyDiscoverySection.locator('a[href*="/feed"]').first();
  }

  //Actions

  async goto(locale: string) {
    await this.page.goto(`/${locale}/`);
    await this.acceptCookies();
  }

  async clickFirstAuction() {
    await this.auctionCardLinks.first().click();
  }

  async openDailyDiscoverySection() {
    await this.dailyDiscoveryFeedFirstLink.click();
  }

  async clickFirstCategory() {
    await this.categoryLinks.first().click();
  }

  //Assertions

  async assertHomePage(locale: string) {
    await this.assertPage(new RegExp(`/${locale}/?$`));
    await this.assertHeader();
    await this.assertHomepageSections();
    const tabCount = await this.categoryTabs.count();
    expect(tabCount).toBeGreaterThan(5);
    await this.dismissRegistrationSlideInIfVisible();
    await this.assertFooter();
  }

  async assertHomepageSections() {
    await expect(this.mainSection).toBeVisible();
    await expect(this.trustpilotWidget).toBeVisible();
    await expect(this.categoriesSection).toBeVisible();
    await expect(this.heroBannerSection).toBeVisible();
    await expect(this.dailyDiscoverySection).toBeVisible();
    await this.expertsSection.scrollIntoViewIfNeeded();
    await expect(this.expertsSection).toBeVisible();
    await this.popularCollections.scrollIntoViewIfNeeded();
    await expect(this.popularCollections).toBeVisible();
    await this.popularCategoriesSection.scrollIntoViewIfNeeded();
    await expect(this.popularCategoriesSection).toBeVisible();
    await this.whyCatawikiSection.scrollIntoViewIfNeeded();
    await expect(this.whyCatawikiSection).toBeVisible();
    await this.exploreCategoriesSection.scrollIntoViewIfNeeded();
    await expect(this.exploreCategoriesSection).toBeVisible();
    await this.downloadBanner.scrollIntoViewIfNeeded();
    await expect(this.downloadBanner).toBeVisible();
    await this.dismissRegistrationSlideInIfVisible();
  }

  async assertWelcomeSlideIn() {
    await expect(this.welcomeSlideIn).toBeVisible();
    await expect(this.welcomeSlideInCloseButton).toBeVisible();
    await expect(this.welcomeSlideInRegisterButton).toBeVisible();
  }
}
