import type { Page } from '@playwright/test';

import { Language } from '../../types';
import { expect } from '../testWithFixtures';
import type { Translations } from '../types';
import { EventSummaryPage } from './eventSummary.page';

// Translations used by the create event page
const TRANS = {
  publishEvent: {
    fi: /^Julkaise tapahtuma$/i,
    sv: /^Publicera evenemang$/i,
    en: /^Publish event$/i,
  },
} as const satisfies Translations;

export class CreateEventPublishPage extends EventSummaryPage {
  constructor(page: Page) {
    super(page);
  }

  async hasVisiblePublishEventButton(lang: Language) {
    await expect(this.getPublishEventButton(lang)).toBeVisible();
  }

  protected getPublishEventButton(lang: Language) {
    return this.page.getByRole('button', {
      name: TRANS.publishEvent[lang],
    });
  }
}
