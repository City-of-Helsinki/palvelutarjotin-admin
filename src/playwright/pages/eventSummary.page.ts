import type { Page } from '@playwright/test';

import { Language } from '../../types';
import { LANGUAGES } from '../constants';
import { expect } from '../testWithFixtures';
import type { Translations } from '../types';
import { AuthenticatedPage } from './authenticated.page';

const EVENT_SUMMARY_PAGE_PATHNAME_REGEX = new RegExp(
  `^/(${LANGUAGES.join('|')})/events/kultus:[^/]+/summary$`
);

type EventSummaryPagePathname = `/${Language}/events/kultus:${string}/summary`;

// Translations used by the event summary page
const TRANS = {
  eventSummary: {
    fi: /^Tapahtuman esikatselu$/i,
    sv: /^Sammanfattning av evenemang$/i,
    en: /^Event summary$/i,
  },
} as const satisfies Translations;

export class EventSummaryPage extends AuthenticatedPage {
  constructor(page: Page) {
    super(page);
  }

  async gotoEventSummaryPage(url: EventSummaryPagePathname) {
    await this.page.goto(url);
    await this.isReady();
  }

  async isReady() {
    await super.isReady();
    await expect(this.page).toHaveURL((url) =>
      EVENT_SUMMARY_PAGE_PATHNAME_REGEX.test(url.pathname)
    );
  }

  async isInLanguage(lang: Language) {
    await this.hasVisibleHeading(TRANS.eventSummary[lang]);
  }
}
