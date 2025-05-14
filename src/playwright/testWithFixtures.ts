// Disable linter rule that erroneously thinks Playwright's use function is a React hook:
/* eslint-disable react-hooks/rules-of-hooks */
import { test as base } from '@playwright/test';
import type { Page } from '@playwright/test';

import { LoginPage } from './pages/login.page';
import { blockGraphQLMutations } from './routeInterceptors';

type TestFixtures = {
  // Base page fixtures
  page: Page;
  // Parametrized versions of base page fixtures
  loginPage: LoginPage;
  loginPageFi: LoginPage;
  loginPageSv: LoginPage;
  loginPageEn: LoginPage;
};

export const test = base.extend<TestFixtures>({
  //--------------------------------------------------------------------------
  // Base page fixtures
  //--------------------------------------------------------------------------

  /**
   * Override the default page fixture, that all other page fixtures use,
   * to block GraphQL mutations by default. This is done to prevent unintentional data changes.
   */
  page: async ({ page }, use) => {
    await blockGraphQLMutations(page);
    await use(page);
  },

  //--------------------------------------------------------------------------
  // Parametrized versions of base page fixtures
  //--------------------------------------------------------------------------
  loginPage: async ({ page }, use) => {
    await use(await LoginPage.create(page, '/'));
  },

  loginPageFi: async ({ page }, use) => {
    await use(await LoginPage.create(page, '/fi'));
  },

  loginPageSv: async ({ page }, use) => {
    await use(await LoginPage.create(page, '/sv'));
  },

  loginPageEn: async ({ page }, use) => {
    await use(await LoginPage.create(page, '/en'));
  },
});

export { expect } from '@playwright/test';
