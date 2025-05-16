import type { Page } from '@playwright/test';

import { LANGUAGES } from '../constants';
import { expect } from '../testWithFixtures';
import { BasePage } from './base.page';
import { Language } from '../../types';
import { Translation } from '../types';

// Translations used by the create event page
const TRANS = {
  newEvent: {
    fi: /^Uusi tapahtuma$/i,
    sv: /^Nytt evenemang$/i,
    en: /^New event$/i,
  },
} as const satisfies Record<string, Translation>;

export class CreateEventPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async isReady() {
    await super.isReady();
    await expect(this.page).toHaveURL((url) =>
      LANGUAGES.some((lang) => url.pathname == `/${lang}/events/create`)
    );
  }

  async isInLanguage(lang: Language) {
    await this.hasTitle(TRANS.newEvent[lang]);
  }
}
