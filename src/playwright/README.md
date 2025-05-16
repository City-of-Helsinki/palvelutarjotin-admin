# Playwright Tests

This directory contains [Playwright](https://playwright.dev/) tests for the Palvelutarjotin Admin project.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Project Structure](#project-structure)
- [Setup](#setup)
  - [Environment variables](#environment-variables)
    - [Which `.env*` files are used?](#which-env-files-are-used)
    - [Which env vars are required?](#which-env-vars-are-required)
    - [Which env vars need to match?](#which-env-vars-need-to-match)
    - [How to generate test JWT signing secret?](#how-to-generate-test-jwt-signing-secret)
    - [How to make Playwright tests and UI build use same env vars?](#how-to-make-playwright-tests-and-ui-build-use-same-env-vars)
- [Running Tests](#running-tests)
- [Mocks](#mocks)
  - [Authentication](#authentication)
  - [Data](#data)
- [Page Object Model](#page-object-model)
- [Test Fixtures](#test-fixtures)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Project Structure

```
src/playwright/
├── mocks/                      # Mock data for tests
│   ...
│   └── eventQuery.mock.ts      # e.g. EventQuery mock data
├── pages/                      # Page object models
│   ...
│   └── login.page.ts           # e.g. LoginPage page object model
├── tests/                      # Tests
│   ...
│   └── languageChange.spec.ts  # e.g. language change related tests
├── testWithFixtures.ts         # Test fixtures setup
```

## Setup

- Run `yarn` to install dependencies
- Run `yarn test:browser:install` to install the [browsers](https://playwright.dev/docs/browsers)
- Copy `.env.playwright.local.example` to `.env.playwright.local` in project root
  - This is necessary only for local development, not for CI
- Configure the environment variables using information from the section below (i.e. ["Environment variables" section](#environment-variables))

### Environment variables

#### Which `.env*` files are used?

Playwright and the Admin UI use different execution engines (Node.js vs. Vite) and different environment variables files:

| Component        | Execution engine | Env files                                                                                        |
|------------------|------------------|--------------------------------------------------------------------------------------------------|
| Playwright tests | Node.js          | `.env.playwright.local` if not in CI, see [Playwright configuration](../../playwright.config.ts) |
| Admin frontend   | Vite             | Multiple `.env*` files, see [Vite docs](https://vite.dev/guide/env-and-mode#env-files)           |

#### Which env vars are required?

Environment variables required by the Playwright tests (used in [Playwright configuration](../../playwright.config.ts) and [BrowserTestJWTConfig](./utils/jwt/config.ts)):

| Variable Name                   | Description                     | Usage                                                                                           |
|---------------------------------|---------------------------------|-------------------------------------------------------------------------------------------------|
| `BROWSER_TESTS_JWT_SIGN_SECRET` | Test JWT signing secret         | Used for signing test JWTs, must match API's JWT signing secret for login mocking to work.      |
| `BROWSER_TESTS_JWT_ISSUER`      | Test JWT issuer                 | Test JWT's [issuer (iss) claim](https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.1).   |
| `VITE_APP_ORIGIN`               | Admin UI's URL                  | Used for finding the Admin UI instance to test.                                                 |
| `VITE_APP_API_URI`              | API's GraphQL endpoint URL      | Used for authorizing API requests with API token using Playwright's network mocking.            |
| `VITE_APP_OIDC_API_CLIENT_ID`   | API's OIDC Client ID            | Test JWT's [audience (aud) claim](https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.3). |
| `VITE_APP_OIDC_CLIENT_ID`       | Admin UI's OIDC Client ID       | In OIDC user manager's session storage key [1].                                                 |
| `VITE_APP_OIDC_AUTHORITY`       | OIDC authentication service URL | In OIDC user manager's session storage key [1], and fetching OIDC configuration.                |
- [1] The OIDC user manager's session storage key is `oidc.user:<VITE_APP_OIDC_AUTHORITY>:<VITE_APP_OIDC_CLIENT_ID>`, e.g. `oidc.user:https://tunnistus.test.hel.ninja/auth/realms/helsinki-tunnistus:kultus-admin-ui-test`

#### Which env vars need to match?

The environment variables required by Playwright tests must match between different parts of the test system:

| Playwright                      | API                                                         | Admin UI build (i.e. `yarn build`)       |
|---------------------------------|-------------------------------------------------------------|------------------------------------------|
| `BROWSER_TESTS_JWT_SIGN_SECRET` | Must match `TOKEN_AUTH_BROWSER_TEST_JWT_256BIT_SIGN_SECRET` | -                                        |
| `BROWSER_TESTS_JWT_ISSUER`      | Must be in `TOKEN_AUTH_BROWSER_TEST_JWT_ISSUER`             | -                                        |
| `VITE_APP_OIDC_API_CLIENT_ID`   | Must be in `TOKEN_AUTH_ACCEPTED_AUDIENCE`                   | Must match `VITE_APP_OIDC_API_CLIENT_ID` |
| `VITE_APP_OIDC_CLIENT_ID`       | -                                                           | Must match `VITE_APP_OIDC_CLIENT_ID`     |
| `VITE_APP_OIDC_AUTHORITY`       | -                                                           | Must match `VITE_APP_OIDC_AUTHORITY`     |

#### How to generate test JWT signing secret?

A test JWT signing secret can be generated with e.g. Python:
```python
print(__import__('secrets').token_hex(32))
```

#### How to make Playwright tests and UI build use same env vars?

A relatively straightforward way to ensure that Playwright tests and the UI build use the same
environment variables when run locally is to:
1. Remove all `.env*` files
2. Set up `.env` file so that you can build the UI with `yarn build` and it connects and authenticates to the API
3. Copy the `.env` to `.env.playwright.local`

Now the Admin UI build will use `.env` and Playwright tests will use `.env.playwright.local`.

You can also use multiple `.env*` files for the Admin UI build (see [Vite docs](https://vite.dev/guide/env-and-mode#env-files)),
if you want, but that makes the setup more complex and thus, less simply apparent.

## Running Tests

First, you need to build the Admin UI:
```bash
yarn build
```

Unless you  opt to use the development server (not recommended, but can be
done with `PLAYWRIGHT_WEB_SERVER=development` in `.env.playwright.local`).

Then run the Playwright tests:
```bash
yarn test:browser
```
which will spin up the Admin UI and open the Playwright UI
where you can choose what tests to run (all or only some).

Other useful commands (from [Running and debugging tests](https://playwright.dev/docs/running-tests)):

- Run all tests non-interactively in parallel: `yarn test:browser:ci`
  - Useful for fast testing locally
- Run all tests non-interactively & sequentially: `yarn test:browser:ci -j1`
- Run tests only on Desktop Chrome: `yarn test:browser --project=chromium`
- Run tests in a specific file: `yarn test:browser filename`
- Run tests in debug mode: `yarn test:browser --debug`
- Run last failed tests: `yarn test:browser --last-failed`
- Autogenerate tests with [codegen](https://playwright.dev/docs/codegen): `yarn codegen:browser <User interface URL>`
- Show last report generated by Playwright tests: `yarn test:browser:report`

## Mocks

### Authentication

Part of the Keycloak & Helsinki Profile login/authentication process is mocked by using test JWTs
for authentication. The API supports these test JWTs for testing purposes.

The test JWTs are signed using a secret that should be only known to the Playwright tests and the API
(see [Environment variables](#environment-variables) for the test JWT signing secret's environment variable).

### Data

- The tests use a lot of [mock data](./mocks/) to avoid making real API requests.
- The mock data has mostly been copied from actual test environment API requests' responses, and manually edited to fit the tests.
  - The mock data have been typed with generated GraphQL types to ensure that the data is and continues to be of correct form.
  - Enum values have been replaced to match the TypeScript types, e.g. `language: 'FI'` → `language: Language.Fi`

## Page Object Model

The tests use the [Page Object Model](https://playwright.dev/docs/pom) pattern to represent different pages in the application:

- [BasePage](./pages/base.page.ts) - Base class for all page objects
  - [LoginPage](pages/login.page.ts) - Login page
  - [AuthenticatedPage](pages/authenticated.page.ts) - Base class for all authenticated pages
    - [CreateEventBasicInfoPage](pages/createEventBasicInfo.page.ts) - Create event's basic info page (Page 1/3 of event creation process)
    - [CreateEventOccurrencesPage](pages/createEventOccurrences.page.ts) - Create event's occurrences page (Page 2/3 of event creation process)
    - [EventSummaryPage](pages/eventSummary.page.ts) - Event summary page / Create event's publishing page (Page 3/3 of event creation process)
    - [MyProfilePage](pages/myProfile.page.ts) - My profile page
    - [SearchPage](pages/search.page.ts) - Search page

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
