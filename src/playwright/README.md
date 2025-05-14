# Playwright Tests

This directory contains [Playwright](https://playwright.dev/) tests for the Palvelutarjotin Admin project.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Project Structure](#project-structure)
- [Setup](#setup)
- [Running Tests](#running-tests)
- [Page Object Model](#page-object-model)
- [Test Fixtures](#test-fixtures)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Project Structure

```
src/playwright/
├── pages/                      # Page object models
│   ...
│   └── login.page.ts           # e.g. LoginPage page object model
├── tests/                      # Tests
│   ...
│   └── languageChange.spec.ts  # e.g. language change related tests
├── testWithFixtures.ts         # Test fixtures setup
```

## Setup

- Run `yarn playwright install` to install the [browsers](https://playwright.dev/docs/browsers)
- Copy `.env.playwright.local.example` to `.env.playwright.local` in project root
  - This is needed to set `VITE_APP_ORIGIN` (i.e. where the UI is) for the Playwright tests

## Running Tests

See [Playwright's Running and debugging tests](https://playwright.dev/docs/running-tests) documentation.

Using the **production build** of the UI for testing is **recommended**,
because the development server can be so slow as to make the tests fail.

But, if it happens that in your environment the development server is fast enough,
you can use it by setting:
- `PLAYWRIGHT_WEB_SERVER=development` in `.env.playwright.local`

Otherwise the Playwright tests will use the production build.

If you chose to use the production build, build it with `yarn build` before running the tests.

Then run the Playwright tests:
```bash
yarn test:browser
```
which will spin up the web server and run all tests.

Other useful commands (from [Running and debugging tests](https://playwright.dev/docs/running-tests)):

- Start interactive UI mode: `yarn test:browser --ui`
- Run tests only on Desktop Chrome: `yarn test:browser --project=chromium`
- Run tests in a specific file: `yarn test:browser filename`
- Run tests in debug mode: `yarn test:browser --debug`
- Run last failed tests: `yarn test:browser --last-failed`
- Autogenerate tests with [codegen](https://playwright.dev/docs/codegen): `yarn codegen:browser`

## Page Object Model

The tests use the [Page Object Model](https://playwright.dev/docs/pom) pattern to represent different pages in the application:

- [BasePage](./pages/base.page.ts) - Base class for all page objects
  - [LoginPage](pages/login.page.ts) - Login page with language variants

## Test Fixtures

[Fixtures](https://playwright.dev/docs/test-fixtures) provide convenient access to page objects in tests, e.g.:

```typescript
// NOTE: Must import test from testWithFixtures or custom fixtures won't be available!
import { test } from '../testWithFixtures';

test('language change works', async ({ loginPage }) => {
  await loginPage.clickHeaderButton('Svenska');
  await loginPage.isReady();
  await loginPage.isSwedish();
});
```

Available custom fixtures can be seen in [custom fixtures file](./testWithFixtures.ts).