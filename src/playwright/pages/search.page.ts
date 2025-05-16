import type { Page } from '@playwright/test';

import { BasePage } from './base.page';
import { Language } from '../../types';
import { interpolateString } from '../../utils/translateUtils';
import { LANGUAGES } from '../constants';
import { expect } from '../testWithFixtures';
import { Translation } from '../types';

// Translations for the search page
const TRANS = {
  eventCountRegex: {
    fi: /^Tapahtumat \d+ kpl/i,
    sv: /^Evenemang \d+ st/i,
    en: /^Events \d+ pc/i,
  },
  openOccurrences: {
    fi: 'Siirry tapahtuman ${eventName} tapahtuma-aikoihin',
    sv: 'Gå till evenemangstid  av ${eventName}',
    en: 'Go to event times of ${eventName}',
  },
} as const satisfies Record<string, Translation>;

export class SearchPage extends BasePage {
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

  async openEvent(lang: Language, eventName: string) {
    await this.mainContent
      .getByRole('link', {
        name: interpolateString(TRANS.openOccurrences[lang], { eventName }),
      })
      .first()
      .click();
  }
}
