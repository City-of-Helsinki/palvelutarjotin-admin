import type { Page } from '@playwright/test';

import { Language } from '../../types';
import { LANGUAGES } from '../constants';
import { expect } from '../testWithFixtures';
import type { Translations } from '../types';
import { AuthenticatedPage } from './authenticated.page';

const EVENT_SUMMARY_PAGE_PATHNAME_REGEX = new RegExp(
  `^/(${LANGUAGES.join('|')})/events/kultus:[^/]+/summary$`
);

export type EventSummaryPagePathname =
  `/${Language}/events/kultus:${string}/summary`;

// Translations used by the event summary page
const TRANS = {
  cancelPublication: {
    fi: /^Peruuta$/i,
    sv: /^Avbryt$/i,
    en: /^Cancel$/i,
  },
  confirmPublication: {
    fi: /^Vahvista$/i,
    sv: /^Bekräfta$/i,
    en: /^Confirm$/i,
  },
  eventPublished: {
    // Prefix matches, these have the publication date after the prefix:
    fi: /^Tapahtuma julkaistu/i,
    sv: /^Evenemanget har publicerats/i,
    en: /^Event published/i,
  },
  eventSummary: {
    fi: /^Tapahtuman esikatselu$/i,
    sv: /^Sammanfattning av evenemang$/i,
    en: /^Event summary$/i,
  },
  publishEvent: {
    fi: /^Julkaise tapahtuma$/i,
    sv: /^Publicera evenemang$/i,
    en: /^Publish event$/i,
  },
  setPublicationDate: {
    fi: /^Aseta julkaisuajankohta$/i,
    sv: /^Ställ in publiceringsdatum$/i,
    en: /^Set publication date$/i,
  },
} as const satisfies Translations;

type TranslationKey = keyof typeof TRANS;

export class EventSummaryPage extends AuthenticatedPage {
  // The test translation language for the page
  protected lang: Language = 'fi';

  constructor(page: Page) {
    super(page);
  }

  get publishEventButton() {
    return this.mainContent.getByRole('button', {
      name: this.t('publishEvent'),
    });
  }

  get modalDialog() {
    return this.page
      .getByRole('dialog')
      .and(this.page.locator('[aria-modal="true"]'));
  }

  get cancelPublicationButton() {
    return this.modalDialog.getByRole('button', {
      name: this.t('cancelPublication'),
    });
  }

  get confirmPublicationButton() {
    return this.modalDialog.getByRole('button', {
      name: this.t('confirmPublication'),
    });
  }

  get eventPublishedText() {
    return this.page.getByText(this.t('eventPublished'));
  }

  /**
   * Sets the test translation language for the page.
   * @param lang - The language to set as the test translation language.
   * This is used to determine which translations to use for the page elements
   * in the tests.
   */
  setTestTranslationLanguage(lang: Language) {
    this.lang = lang;
  }

  /**
   * Returns the translation for the given key in the test translation language.
   * @param key - The key for the translation.
   * @return The translated string in the test translation language.
   */
  t(key: TranslationKey) {
    return TRANS[key][this.lang];
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
