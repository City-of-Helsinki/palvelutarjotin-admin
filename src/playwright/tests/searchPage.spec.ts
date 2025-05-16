import { LANGUAGES } from '../constants';
import { test } from '../testWithFixtures';

LANGUAGES.forEach((lang) => {
  // TODO: Fix mocks & expect this test to pass
  test.fail(
    `search page is available in language ${lang}`,
    async ({ mocksForSearchPage, searchPage }) => {
      await searchPage.gotoSearchPage(lang);
      await searchPage.isInLanguage(lang);
    }
  );
});

LANGUAGES.forEach((lang) => {
  // TODO: Fix mocks & expect this test to pass
  test.fail(
    `event summary can be opened from search results using language ${lang}`,
    async ({
      mocksForSearchPage,
      mocksForEventSummaryPage,
      searchPage,
      eventSummaryPage,
    }) => {
      await searchPage.gotoSearchPage(lang); // To load the search results
      await searchPage.openEvent(lang, 'Testitapahtuman nimi');

      await eventSummaryPage.isReady();
      await eventSummaryPage.isInLanguage(lang);
      await eventSummaryPage.hasTitle('Testitapahtuman nimi');
    }
  );
});

LANGUAGES.forEach((lang) => {
  // TODO: Fix mocks & expect this test to pass
  test.fail(
    `event creation can be started from search page using language ${lang}`,
    async ({
      mocksForSearchPage,
      mocksForCreateEventPage,
      searchPage,
      createEventPage,
    }) => {
      await searchPage.gotoSearchPage(lang); // To load the search results
      await searchPage.openEvent(lang, 'Testitapahtuman nimi');

      await createEventPage.isReady();
      await createEventPage.isInLanguage(lang);
    }
  );
});
