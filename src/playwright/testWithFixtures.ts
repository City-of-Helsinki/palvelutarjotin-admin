// Disable linter rule that erroneously thinks Playwright's use function is a React hook:
/* eslint-disable react-hooks/rules-of-hooks */
import { test as base } from '@playwright/test';
import type { Page } from '@playwright/test';

import { MOCK_ADD_OCCURRENCE_MUTATION_RESPONSE } from './mocks/addOccurrenceMutation.mock';
import { MOCK_EMPTY_CMS_MENU_QUERY_RESPONSE } from './mocks/cmsMenuQuery.mock';
import { MOCK_CREATE_EVENT_MUTATION_RESPONSE_ON_PAGE_1_SAVE } from './mocks/createEventMutation.mock';
import { MOCK_EDIT_EVENT_MUTATION_RESPONSE } from './mocks/editEventMutation.mock';
import { MOCK_EDIT_VENUE_MUTATION_RESPONSE } from './mocks/editVenueMutation.mock';
import {
  MOCK_EVENT_QUERY_RESPONSE,
  MOCK_EVENT_QUERY_RESPONSE_AFTER_PAGE_1_SAVE,
  MOCK_EVENT_QUERY_RESPONSE_AFTER_PAGE_2_SAVE,
  MOCK_EVENT_QUERY_RESPONSE_AFTER_PUBLISHING,
} from './mocks/eventQuery.mock';
import { MOCK_EVENTS_QUERY_RESPONSE } from './mocks/eventsQuery.mock';
import {
  MOCK_ADDITIONAL_CRITERIA_KEYWORD_SET_QUERY_RESPONSE,
  MOCK_CATEGORY_KEYWORD_SET_QUERY_RESPONSE,
  MOCK_TARGET_GROUP_KEYWORD_SET_QUERY_RESPONSE,
} from './mocks/keywordSetQuery.mock';
import { MOCK_MUSIIKKI_KEYWORDS_QUERY_RESPONSE } from './mocks/keywordsQuery.mock';
import { MOCK_ANNANTALO_PLACES_QUERY_RESPONSE } from './mocks/placesQuery.mock';
import { MOCK_PUBLISH_SINGLE_EVENT_MUTATION_RESPONSE } from './mocks/publishSingleEventMutation.mock';
import { MOCK_ANNANTALO_VENUE_QUERY_RESPONSE } from './mocks/venueQuery.mock';
import { CreateEventBasicInfoPage } from './pages/createEventBasicInfo.page';
import { CreateEventOccurrencesPage } from './pages/createEventOccurrences.page';
import { EventSummaryPage } from './pages/eventSummary.page';
import { LoginPage } from './pages/login.page';
import { MyProfilePage } from './pages/myProfile.page';
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
  eventSummaryPage: EventSummaryPage;
  myProfilePage: MyProfilePage;
  searchPage: SearchPage;
  // Parametrized versions of base page fixtures
  loginPage: LoginPage;
  loginPageFi: LoginPage;
  loginPageSv: LoginPage;
  loginPageEn: LoginPage;
  // Base data mock fixtures
  mockEventQuery: void;
  mockEventsQuery: void;
  mockAnnantaloPlacesQuery: void;
  mockAdditionalCriteriaKeywordSetQuery: void;
  mockCategoryKeywordSetQuery: void;
  mockTargetGroupKeywordSetQuery: void;
  mockMusiikkiKeywordsQuery: void;
  mockAnnantaloVenueQuery: void;
  mockCreateEventMutationForPage1Save: void;
  mockEventQueryAfterPage1Save: void;
  mockEventQueryAfterPage2Save: void;
  mockEventQueryAfterPublishing: void;
  mockAddOccurrenceMutation: void;
  mockEditEventMutation: void;
  mockEditVenueMutation: void;
  mockPublishSingleEventMutation: void;
  // Compilations of base data mock fixtures
  mockKeywordQueries: void;
};

export const test = base.extend<TestFixtures>({
  //--------------------------------------------------------------------------
  // Base page fixtures
  //--------------------------------------------------------------------------

  /**
   * Override the default page fixture, that all other page fixtures use, to:
   * 1. Block GraphQL mutations by default to prevent unintentional data changes.
   * 2. Mock the CMS menu query to help with slow CMS.
   */
  page: async ({ page }, use) => {
    await blockGraphQLMutations(page);
    await mockGraphQL(page, 'menu', MOCK_EMPTY_CMS_MENU_QUERY_RESPONSE);
    await use(page);
  },

  createEventBasicInfoPage: async ({ page }, use) => {
    await use(new CreateEventBasicInfoPage(page));
  },

  createEventOccurrencesPage: async ({ page }, use) => {
    await use(new CreateEventOccurrencesPage(page));
  },

  eventSummaryPage: async ({ page }, use) => {
    await use(new EventSummaryPage(page));
  },

  myProfilePage: async ({ page }, use) => {
    await use(new MyProfilePage(page));
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

  mockAnnantaloPlacesQuery: async ({ page }, use) => {
    await use(
      await mockGraphQL(page, 'Places', MOCK_ANNANTALO_PLACES_QUERY_RESPONSE)
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

  mockMusiikkiKeywordsQuery: async ({ page }, use) => {
    await use(
      await mockGraphQL(page, 'Keywords', MOCK_MUSIIKKI_KEYWORDS_QUERY_RESPONSE)
    );
  },

  mockAnnantaloVenueQuery: async ({ page }, use) => {
    await use(
      await mockGraphQL(
        page,
        'Venue',
        MOCK_ANNANTALO_VENUE_QUERY_RESPONSE,
        // Annantalo place: https://api.hel.fi/linkedevents/v1/place/tprek:7254/
        { id: 'tprek:7254' }
      )
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

  mockEventQueryAfterPage2Save: async ({ page }, use) => {
    await use(
      await mockGraphQL(
        page,
        'Event',
        MOCK_EVENT_QUERY_RESPONSE_AFTER_PAGE_2_SAVE
      )
    );
  },

  mockEventQueryAfterPublishing: async ({ page }, use) => {
    await use(
      await mockGraphQL(
        page,
        'Event',
        MOCK_EVENT_QUERY_RESPONSE_AFTER_PUBLISHING
      )
    );
  },

  mockAddOccurrenceMutation: async ({ page }, use) => {
    await use(
      await mockGraphQL(
        page,
        'AddOccurrence',
        MOCK_ADD_OCCURRENCE_MUTATION_RESPONSE
      )
    );
  },

  mockEditEventMutation: async ({ page }, use) => {
    await use(
      await mockGraphQL(page, 'EditEvent', MOCK_EDIT_EVENT_MUTATION_RESPONSE)
    );
  },

  mockEditVenueMutation: async ({ page }, use) => {
    await use(
      await mockGraphQL(page, 'EditVenue', MOCK_EDIT_VENUE_MUTATION_RESPONSE)
    );
  },

  mockPublishSingleEventMutation: async ({ page }, use) => {
    await use(
      await mockGraphQL(
        page,
        'publishSingleEvent',
        MOCK_PUBLISH_SINGLE_EVENT_MUTATION_RESPONSE
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
      mockMusiikkiKeywordsQuery,
    },
    use
  ) => {
    await use();
  },
});

export { expect } from '@playwright/test';
