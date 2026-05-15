import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get authModal() {
    return this.page.locator('[role="dialog"]');
  }

  get authModalTitle() {
    return this.page.locator("#dialog-title");
  }

  get closeButton() {
    return this.authModal.locator('[data-testid="dialog-header-close-button"]');
  }

  get emailInput() {
    return this.authModal.getByLabel("Email address");
  }

  get passwordInput() {
    return this.authModal.getByLabel("Password");
  }

  get signInButton() {
    return this.authModal.getByRole("button", { name: "Sign in" });
  }

  get createAccountButton() {
    return this.authModal.getByRole("button", { name: "Create account" });
  }

  get firstNameInput() {
    return this.authModal.getByLabel("First name");
  }

  // After login, the header shows the user account area instead of Sign in
  get userAccountButton() {
    return this.header.locator('[data-testid="header-user-account-button"]');
  }

  get invalidLoginMessage() {
    return this.authModal.locator(".c-alert.error");
  }

  //Actions

  async openModal() {
    await this.signInHeaderButton.click();
    await expect(this.authModal).toBeVisible();
  }

  async closeModal() {
    await this.closeButton.click();
  }

  async switchToRegistration() {
    await this.createAccountButton.click();
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  //Assertions

  async assertLoginModal() {
    await expect(this.authModal).toBeVisible();
    await expect(this.authModalTitle).toHaveText(
      /Sign in or create an account/i,
    );
    await expect(this.closeButton).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.signInButton).toBeVisible();
    await expect(this.createAccountButton).toBeVisible();
  }

  async assertLoggedIn(locale: string) {
    await this.assertPage(new RegExp(`/${locale}/?$`));
    await expect(this.signInHeaderButton).toBeHidden();
    await expect(this.userAccountButton).toBeVisible();
  }

  async assertInvalidMessage() {
    await expect(this.invalidLoginMessage).toBeVisible();
  }
}
