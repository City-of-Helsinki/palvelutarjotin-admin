import { LANGUAGES, TEST_ORGANISATIONS } from '../constants';
import { test } from '../testWithFixtures';

LANGUAGES.forEach((lang) => {
  test(`search page is available in language ${lang}`, async ({
    searchPage,
  }) => {
    await searchPage.gotoSearchPage(lang);
    await searchPage.isInLanguage(lang);
  });
});

LANGUAGES.forEach((lang) => {
  test(`selected organisation is shown on search page in language ${lang}`, async ({
    searchPage,
  }) => {
    await searchPage.gotoSearchPage(lang);
    await searchPage.hasTitle(/^Kulttuurin ja vapaa-ajan toimiala$/i);
  });
});

LANGUAGES.forEach((lang) => {
  test(`search page has correctly filled user menu in ${lang}`, async ({
    searchPage,
  }) => {
    await searchPage.gotoSearchPage(lang);

    // Open user menu
    await searchPage.hasVisibleUserMenuButton(lang);
    await searchPage.clickUserMenuButton(lang);

    // Test that user menu opened and contains correct information
    const userName = /^Test-admin$/i;
    await searchPage.hasVisibleHeadingInUserMenuDropdown(userName);
    await searchPage.hasVisibleMyProfileButton(lang);
    await searchPage.hasVisibleHelsinkiProfileButton(lang);
    await searchPage.hasVisibleLogOutButton(lang);
    for (const org of TEST_ORGANISATIONS) {
      await searchPage.hasVisibleButtonInUserMenuDropdown(org);
    }
  });
});

LANGUAGES.forEach((lang) => {
  test(`my profile page can be opened from search page's user menu using language ${lang}`, async ({
    searchPage,
    myProfilePage,
  }) => {
    await searchPage.gotoSearchPage(lang);
    await searchPage.clickUserMenuButton(lang);
    await searchPage.clickMyProfileButton(lang);

    await myProfilePage.isReady();
    await myProfilePage.isInLanguage(lang);
  });
});
