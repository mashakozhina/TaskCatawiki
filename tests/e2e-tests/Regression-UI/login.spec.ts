import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { existingUser } from "../fixtures/customer";

const locale = process.env.LOCALE ?? "en";

test.describe("Login Modal", () => {
  let home: HomePage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    loginPage = new LoginPage(page);
    await home.goto(locale);
    await loginPage.openModal();
  });

  test("Login modal opens with all required elements", async () => {
    await loginPage.assertLoginModal();
  });

  test("Login modal closes by clicking the close button", async () => {
    await loginPage.closeModal();
    await expect(loginPage.authModal).toBeHidden();
  });

  test("Login modal switches to registration form when Create account is clicked", async () => {
    await loginPage.switchToRegistration();
    await expect(loginPage.firstNameInput).toBeVisible();
  });

  test("User can´t log in with invalid credentials", async () => {
    await loginPage.login("invalidemail@gmail.com", existingUser.password);
    await loginPage.assertInvalidMessage();
    await loginPage.login(existingUser.email, "invalidpassword");
    await loginPage.assertInvalidMessage();
  });
});
