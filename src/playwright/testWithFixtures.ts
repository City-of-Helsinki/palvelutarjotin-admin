// Disable linter rule that erroneously thinks Playwright's use function is a React hook:
/* eslint-disable react-hooks/rules-of-hooks */
import { test as base } from '@playwright/test';
import type { Page } from '@playwright/test';

import { CreateEventPage } from './pages/createEvent.page';
import { EventSummaryPage } from './pages/eventSummary.page';
import { LoginPage } from './pages/login.page';
import { SearchPage } from './pages/search.page';
import { blockGraphQLMutations } from './routeInterceptors';

type TestFixtures = {
  // Base page fixtures
  page: Page;
  createEventPage: CreateEventPage;
  eventSummaryPage: EventSummaryPage;
  searchPage: SearchPage;
  // Parametrized versions of base page fixtures
  loginPage: LoginPage;
  loginPageFi: LoginPage;
  loginPageSv: LoginPage;
  loginPageEn: LoginPage;
  // Base data mock fixtures
  mockAuthenticatedLogin: void;
  // Compilations of base data mock fixtures
  mocksForCreateEventPage: void;
  mocksForEventSummaryPage: void;
  mocksForSearchPage: void;
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

  createEventPage: async ({ page }, use) => {
    await use(new CreateEventPage(page));
  },

  eventSummaryPage: async ({ page }, use) => {
    await use(new EventSummaryPage(page));
  },

  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
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

  //--------------------------------------------------------------------------
  // Base data mock fixtures
  //--------------------------------------------------------------------------

  // TODO: Implement this mock
  // eslint-disable-next-line no-empty-pattern
  mockAuthenticatedLogin: async ({}, use) => {
    await use();
  },

  //--------------------------------------------------------------------------
  // Compilations of base data mock fixtures
  //--------------------------------------------------------------------------

  // TODO: Implement these mocks
  mocksForCreateEventPage: async ({ mockAuthenticatedLogin }, use) => {
    await use();
  },

  // TODO: Implement these mocks
  mocksForEventSummaryPage: async ({ mockAuthenticatedLogin }, use) => {
    await use();
  },

  // TODO: Implement these mocks
  mocksForSearchPage: async ({ mockAuthenticatedLogin }, use) => {
    await use();
  },
});

export { expect } from '@playwright/test';
