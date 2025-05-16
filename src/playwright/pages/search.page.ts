import type { Page } from '@playwright/test';

import { Language } from '../../types';
import { LANGUAGES } from '../constants';
import { expect } from '../testWithFixtures';
import type { Timeout, Translations } from '../types';
import { AuthenticatedPage } from './authenticated.page';

// Translations for the search page
const TRANS = {
  eventCountRegex: {
    fi: /^Tapahtumat \d+ kpl/i,
    sv: /^Evenemang \d+ st/i,
    en: /^Events \d+ pc/i,
  },
  addNewEvent: {
    fi: /^Lisää uusi tapahtuma$/i,
    sv: /^Lägg till ett nytt evenemang$/i,
    en: /^Add new event$/i,
  },
} as const satisfies Translations;

export class SearchPage extends AuthenticatedPage {
  constructor(page: Page) {
    super(page);
  }

  async isReady() {
    await super.isReady();
    await expect(this.page).toHaveURL((url) =>
      LANGUAGES.some((lang) => url.pathname == `/${lang}`)
    );
  }

  /**
   * Go to the search page for the given language.
   * @param lang - Language
   */
  async gotoSearchPage(lang: Language) {
    await this.page.goto(`/${lang}`);
    await this.isReady();
  }

  async isInLanguage(lang: Language) {
    await this.hasVisibleHeading(TRANS.eventCountRegex[lang]);
  }

  async hasVisibleAddNewEventButton(lang: Language) {
    await expect(this.getAddNewEventButton(lang)).toBeVisible();
  }

  async clickAddNewEventButton(lang: Language) {
    await this.getAddNewEventButton(lang).click();
  }

  async hasVisibleOpenEventButton(
    lang: Language,
    eventName: string,
    timeout?: Timeout
  ) {
    await expect(this.getOpenEventButton(lang, eventName)).toBeVisible(timeout);
  }

  async openEvent(lang: Language, eventName: string) {
    await this.getOpenEventButton(lang, eventName).click();
  }

  protected getOpenEventButton(lang: Language, eventName: string) {
    function getButtonText() {
      switch (lang) {
        case 'fi':
          return `Siirry tapahtuman ${eventName} tapahtuma-aikoihin`;
        case 'sv':
          return `Gå till evenemangstid av ${eventName}`;
        case 'en':
          return `Go to event times of ${eventName}`;
      }
    }

    return this.mainContent
      .getByRole('button', { name: getButtonText(), exact: true })
      .first();
  }

  protected getAddNewEventButton(lang: Language) {
    return this.mainContent.getByRole('button', {
      name: TRANS.addNewEvent[lang],
    });
  }
}
