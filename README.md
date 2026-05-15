# Catawiki Test Suite

End-to-end and API test suite for [Catawiki](https://www.catawiki.com) built with Playwright and TypeScript, following the Page Object Model pattern.

## Project structure

```
tests/
  e2e-tests/
    API/          # API tests using Playwright request context
    Smoke-UI/     # Critical user journey tests
    Regression-UI/ # Regression tests
    pages/        # Page Objects
    fixtures/     # Test data and custom fixtures
  api-tests/      # Jest-based API tests (not implemented)
```

## Core task

The main scenario from the task brief is covered in both guest and existing customer smoke tests:

1. Open `https://www.catawiki.com/en/`
2. Type `train` in the search field and click the magnifier button
3. Verify the search results page is opened
4. Click on the second lot in the search results
5. Verify the lot page is opened
6. Collect and print to console:
   - Lot name
   - Favorites counter
   - Current bid

This flow is implemented in `e2eGuestUser.spec.ts` and `e2eExistingCustomer.spec.ts`. Both specs extend it with additional scenarios covering category navigation, auction pages, bidding flows, and login.

## How to run

**Install dependencies:**

```bash
npm install
npx playwright install
```

**Run all tests locally:**

```bash
npx playwright test --project=chrome
```

**Run only UI tests:**

```bash
npx playwright test --project=chrome tests/e2e-tests/Smoke-UI tests/e2e-tests/Regression-UI
```

**Run only API tests:**

```bash
npx playwright test --project=chrome tests/e2e-tests/API
```

## CI/CD

The GitHub Actions workflow has two jobs — `api-tests` runs first, `ui-tests` only runs if API tests pass.

> **Note:** Both CI jobs are currently disabled (`if: false`) because Catawiki uses Akamai CDN bot detection which blocks automated browsers in CI environments, even when using real browser profiles. Tests pass when run locally with a real Chrome browser.

> **Note:** Existing customer smoke tests (`e2eExistingCustomer.spec.ts`) are included but may not run successfully — during development, the login flow consistently returned a "technical issues" error from Catawiki's side, preventing authentication.
