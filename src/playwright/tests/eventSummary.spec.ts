import { LANGUAGES } from '../constants';
import { test } from '../testWithFixtures';

const TEST_EVENT_NAME = 'Testitapahtuman nimi' as const;

LANGUAGES.forEach((lang) => {
  test(`event summary can be opened from search results using language ${lang}`, async ({
    searchPage,
    eventSummaryPage,
    mockEventsQuery, // To ensure there are search results
    mockEventQuery, // To ensure there is an event to show in event summary
  }) => {
    await searchPage.gotoSearchPage(lang);
    await searchPage.hasVisibleOpenEventButton(lang, TEST_EVENT_NAME);
    await searchPage.openEvent(lang, TEST_EVENT_NAME);

    await eventSummaryPage.isReady();
    await eventSummaryPage.isInLanguage(lang);
    await eventSummaryPage.hasTitle(TEST_EVENT_NAME);
  });
});
