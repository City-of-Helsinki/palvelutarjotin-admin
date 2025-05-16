import type { Page } from '@playwright/test';

import { LANGUAGES } from '../constants';
import { expect } from '../testWithFixtures';
import { BasePage } from './base.page';
import { Language } from '../../types';
import { Translation } from '../types';

const EVENT_SUMMARY_PAGE_PATHNAME_REGEX = new RegExp(
  `^/(${LANGUAGES.join('|')})/events/kultus:[^/]+/summary$`
);

// Translations used by the event summary page
const TRANS = {
  eventSummary: {
    fi: /^Tapahtuman esikatselu$/i,
    sv: /^Sammanfattning av evenemang$/i,
    en: /^Event summary$/i,
  },
} as const satisfies Record<string, Translation>;

export class EventSummaryPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async isReady() {
    await super.isReady();
    await expect(this.page).toHaveURL(EVENT_SUMMARY_PAGE_PATHNAME_REGEX);
  }

  async isInLanguage(lang: Language) {
    await this.hasVisibleHeading(TRANS.eventSummary[lang]);
  }
}
