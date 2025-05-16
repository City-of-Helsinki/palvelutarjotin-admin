// Disable linter rule that erroneously thinks Playwright's use function is a React hook:
/* eslint-disable react-hooks/rules-of-hooks */
import { test as base } from '@playwright/test';
import type { Page } from '@playwright/test';

import {
  MOCK_ADDITIONAL_CRITERIA_KEYWORD_SET_QUERY_RESPONSE,
  MOCK_ANNANTALO_PLACES_QUERY_RESPONSE,
  MOCK_CATEGORY_KEYWORD_SET_QUERY_RESPONSE,
  MOCK_CREATE_EVENT_MUTATION_RESPONSE_ON_PAGE_1_SAVE,
  MOCK_EVENT_QUERY_RESPONSE,
  MOCK_EVENT_QUERY_RESPONSE_AFTER_PAGE_1_SAVE,
  MOCK_EVENTS_QUERY_RESPONSE,
  MOCK_KEYWORDS_QUERY_RESPONSE,
  MOCK_TARGET_GROUP_KEYWORD_SET_QUERY_RESPONSE,
} from './mocks';
import { CreateEventBasicInfoPage } from './pages/createEventBasicInfo.page';
import { CreateEventOccurrencesPage } from './pages/createEventOccurrences.page';
import { CreateEventPublishPage } from './pages/createEventPublish.page';
import { EventSummaryPage } from './pages/eventSummary.page';
import { LoginPage } from './pages/login.page';
import { SearchPage } from './pages/search.page';
import { blockGraphQLMutations, mockGraphQL } from './routeInterceptors';
import {
  setupApiJwtBearerAuthorization,
  setupAuthServiceInterception,
} from './utils/jwt/mocks/testJWTAuthRequests';

type TestFixtures = {
  // Base page fixtures
  page: Page;
  createEventBasicInfoPage: CreateEventBasicInfoPage;
  createEventOccurrencesPage: CreateEventOccurrencesPage;
  createEventPublishPage: CreateEventPublishPage;
  eventSummaryPage: EventSummaryPage;
  searchPage: SearchPage;
  // Parametrized versions of base page fixtures
  loginPage: LoginPage;
  loginPageFi: LoginPage;
  loginPageSv: LoginPage;
  loginPageEn: LoginPage;
  // Base data mock fixtures
  mockEventQuery: void;
  mockEventsQuery: void;
  mockPlacesQuery: void;
  mockAdditionalCriteriaKeywordSetQuery: void;
  mockCategoryKeywordSetQuery: void;
  mockTargetGroupKeywordSetQuery: void;
  mockKeywordsQuery: void;
  mockCreateEventMutationForPage1Save: void;
  mockEventQueryAfterPage1Save: void;
  // Compilations of base data mock fixtures
  mockKeywordQueries: void;
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

  createEventBasicInfoPage: async ({ page }, use) => {
    await use(new CreateEventBasicInfoPage(page));
  },

  createEventOccurrencesPage: async ({ page }, use) => {
    await use(new CreateEventOccurrencesPage(page));
  },

  createEventPublishPage: async ({ page }, use) => {
    await use(new CreateEventPublishPage(page));
  },

  eventSummaryPage: async ({ page }, use) => {
    await use(new EventSummaryPage(page));
  },

  searchPage: async ({ page }, use) => {
    await setupAuthServiceInterception(page);
    await setupApiJwtBearerAuthorization(page);
    const searchPage = new SearchPage(page);
    await searchPage.gotoSearchPage('fi');
    await searchPage.authorize();
    await searchPage.reload();
    await use(searchPage);
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

  mockEventQuery: async ({ page }, use) => {
    await use(await mockGraphQL(page, 'Event', MOCK_EVENT_QUERY_RESPONSE));
  },

  mockEventsQuery: async ({ page }, use) => {
    await use(await mockGraphQL(page, 'Events', MOCK_EVENTS_QUERY_RESPONSE));
  },

  mockPlacesQuery: async ({ page }, use) => {
    await use(
      await mockGraphQL(
        page,
        'PlacesQuery',
        MOCK_ANNANTALO_PLACES_QUERY_RESPONSE
      )
    );
  },

  mockAdditionalCriteriaKeywordSetQuery: async ({ page }, use) => {
    await use(
      await mockGraphQL(
        page,
        'KeywordSet',
        MOCK_ADDITIONAL_CRITERIA_KEYWORD_SET_QUERY_RESPONSE,
        { setType: 'ADDITIONAL_CRITERIA' }
      )
    );
  },

  mockCategoryKeywordSetQuery: async ({ page }, use) => {
    await use(
      await mockGraphQL(
        page,
        'KeywordSet',
        MOCK_CATEGORY_KEYWORD_SET_QUERY_RESPONSE,
        { setType: 'CATEGORY' }
      )
    );
  },

  mockTargetGroupKeywordSetQuery: async ({ page }, use) => {
    await use(
      await mockGraphQL(
        page,
        'KeywordSet',
        MOCK_TARGET_GROUP_KEYWORD_SET_QUERY_RESPONSE,
        { setType: 'TARGET_GROUP' }
      )
    );
  },

  mockKeywordsQuery: async ({ page }, use) => {
    await use(
      await mockGraphQL(page, 'Keywords', MOCK_KEYWORDS_QUERY_RESPONSE)
    );
  },

  mockCreateEventMutationForPage1Save: async ({ page }, use) => {
    await use(
      await mockGraphQL(
        page,
        'CreateEvent',
        MOCK_CREATE_EVENT_MUTATION_RESPONSE_ON_PAGE_1_SAVE
      )
    );
  },

  mockEventQueryAfterPage1Save: async ({ page }, use) => {
    await use(
      await mockGraphQL(
        page,
        'Event',
        MOCK_EVENT_QUERY_RESPONSE_AFTER_PAGE_1_SAVE
      )
    );
  },

  //--------------------------------------------------------------------------
  // Compilations of base data mock fixtures
  //--------------------------------------------------------------------------
  mockKeywordQueries: async (
    {
      mockAdditionalCriteriaKeywordSetQuery,
      mockCategoryKeywordSetQuery,
      mockTargetGroupKeywordSetQuery,
      mockKeywordsQuery,
    },
    use
  ) => {
    await use();
  },
});

export { expect } from '@playwright/test';
