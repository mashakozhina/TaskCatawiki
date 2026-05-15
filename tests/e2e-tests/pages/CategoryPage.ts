import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CategoryPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get heading() {
    return this.page.locator("h1");
  }

  private get subcategories() {
    return this.page.locator('[data-testid="subcategories"]');
  }

  private get categoriesNavigation() {
    return this.page.locator('[class*="FeedAndCategoryNavigation_wrapper"]');
  }

  private get scrollableContainer() {
    return this.page
      .locator('[class*="ScrollabeWrapper_scrollableWrapper"]')
      .first();
  }

  async goto(locale: string, categorySlug: string) {
    await this.page.goto(`/${locale}/c/${categorySlug}`);
  }

  async clickFirstCollection() {
    await this.page.locator("a.c-auction-card__link").first().click();
  }

  private get images() {
    return this.page.locator("img");
  }

  //Assertions

  async assertImagesHaveAltText() {
    const imgs = await this.images.all();
    for (const img of imgs) {
      const alt = img;
      await expect(
        alt,
        `Image missing alt text: ${await img.getAttribute("src")}`,
      ).toHaveAttribute("alt");
    }
  }

  async assertCategoryPage(locale: string) {
    await this.assertPage(new RegExp(`/${locale}/c/`));
    await this.assertHeader();
    await expect(this.heading).toBeVisible();
    expect((await this.heading.innerText()).length).toBeGreaterThan(0);
    await expect(this.categoriesNavigation).toBeVisible();
    await expect(this.subcategories).toBeVisible();
    await expect(this.scrollableContainer).toBeVisible();
    await this.assertFooter();
  }
}
