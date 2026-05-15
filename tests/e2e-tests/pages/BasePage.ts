import { Page, expect } from "@playwright/test";

export class BasePage {
  constructor(protected page: Page) {}

  //Header

  get header() {
    return this.page.locator("header.c-header");
  }

  get logo() {
    return this.page.locator('a[aria-label="homepage"]');
  }

  get categoriesHeaderButton() {
    return this.header.getByRole("button", { name: "categories" });
  }

  //.first() needed becausepage renders multiple search inputs (header, mobile drawer, footer)
  get magnifierBtn() {
    return this.page
      .locator('[data-testid="text-field-prefix"] button[aria-label="Search"]')
      .first();
  }

  get searchInput() {
    return this.page.locator('[data-testid="search-field"]').first();
  }

  get howItWorksLink() {
    return this.page.locator('[data-testid="header-how-it-works-button"]');
  }

  get helpLink() {
    return this.page.locator('[data-testid="header-help-button"]');
  }

  get favouritesLink() {
    return this.page.locator('[data-testid="header-favorites-button"]');
  }

  get signInHeaderButton() {
    return this.header.getByRole("button", { name: "Sign in" });
  }

  //Footer

  get footer() {
    return this.page.locator("footer").first();
  }

  //Cookie banner

  private get acceptAllCookiesButton() {
    return this.page.getByRole("button", { name: "Accept All" });
  }

  private get registrationSlideIn() {
    return this.page.locator('[class*="RegistrationSlideIn_box]');
  }

  private get registrationSlideInCloseButton() {
    return this.registrationSlideIn.locator(
      '[class*="RegistrationSlideIn_close-btn"]',
    );
  }

  //Actions

  async acceptCookies() {
    try {
      await this.acceptAllCookiesButton.waitFor({
        state: "visible",
        timeout: 5000,
      });
      await this.acceptAllCookiesButton.click();
    } catch {
      //banner not shown — already accepted or not triggered
    }
  }

  async dismissRegistrationSlideInIfVisible() {
    try {
      await this.registrationSlideIn.waitFor({
        state: "visible",
        timeout: 8000,
      });
      await this.registrationSlideInCloseButton.click();
      await this.registrationSlideIn.waitFor({
        state: "hidden",
        timeout: 3000,
      });
    } catch {
      // slide-in not shown or already dismissed
    }
  }

  async search(keyword: string) {
    await this.dismissRegistrationSlideInIfVisible();
    await this.page.evaluate(() => window.scrollTo(0, 0));
    await this.searchInput.fill(keyword);
    await this.magnifierBtn.click();
  }

  async searchPressEnter(keyword: string) {
    await this.searchInput.fill(keyword);
    await this.searchInput.press("Enter");
  }

  //Assertions

  async assertPage(urlPattern: RegExp) {
    await expect(this.page).toHaveTitle(/Catawiki|Online Marketplace/i);
    await expect(this.page).toHaveURL(urlPattern);
  }

  async assertHeader() {
    await expect(this.header).toBeVisible();
    await expect(this.logo).toBeVisible();
    await expect(this.categoriesHeaderButton).toBeVisible();
    await expect(this.magnifierBtn).toBeVisible();
    await expect(this.searchInput).toBeVisible();
    await expect(this.searchInput).toHaveAttribute(
      "placeholder",
      /Search for brand, model/,
    );
    await expect(this.howItWorksLink).toBeVisible();
    await expect(this.helpLink).toBeVisible();
    await expect(this.favouritesLink).toBeVisible();
    await expect(this.signInHeaderButton).toBeVisible();
  }

  async assertFooter() {
    await expect(this.footer).toBeVisible();
  }
}
