import type { Page } from '@playwright/test';

import { Language } from '../../types';
import { LANGUAGES } from '../constants';
import { expect } from '../testWithFixtures';
import type { Translations } from '../types';
import { AuthenticatedPage } from './authenticated.page';

// Translations for the my profile page
const TRANS = {
  contactEmail: {
    fi: /^Sähköpostiosoite yhteydenotoille$/i,
    sv: /^Kontakt e-post$/i,
    en: /^Contact email$/i,
  },
  finnishLanguage: {
    fi: /^suomi$/,
    sv: /^Finska$/,
    en: /^Finnish$/,
  },
  language: {
    // Prefix matches, these have helper text and selected language after the prefix,
    // because language dropdown button is labelled by:
    // aria-labelledby="language-label language-helper language-toggle-button"
    fi: /^Kieli/i,
    sv: /^Språk/i,
    en: /^Language/i,
  },
  myProfile: {
    fi: /^Omat tiedot$/i,
    sv: /^Min profil$/i,
    en: /^My profile$/i,
  },
  myProfileSaveSuccess: {
    fi: /^Omat tiedot tallennettu onnistuneesti$/i,
    sv: /^Min profil har sparats$/i,
    en: /^My profile saved successfully$/i,
  },
  name: {
    fi: /^Nimi$/i,
    sv: /^Namn$/i,
    en: /^Name$/i,
  },
  phoneNumber: {
    fi: /^Puhelinnumero$/i,
    sv: /^Telefonnummer$/i,
    en: /^Phone number$/i,
  },
  saveUpdatedInfo: {
    fi: /^Tallenna päivitetyt tiedot$/i,
    sv: /^Spara uppdaterade informationen$/i,
    en: /^Save updated information$/i,
  },
  venues: {
    fi: /^Tapahtumapaikat$/i,
    sv: /^Plats för evenemang$/i,
    en: /^Venues$/i,
  },
} as const satisfies Translations;

type TranslationKey = keyof typeof TRANS;

export class MyProfilePage extends AuthenticatedPage {
  // The test translation language for the page
  protected lang: Language = 'fi';

  constructor(page: Page) {
    super(page);
  }

  get myProfileSaveSuccessHeading() {
    return this.mainContent.getByRole('heading', {
      name: this.t('myProfileSaveSuccess'),
    });
  }

  get saveUpdatedInfoButton() {
    return this.mainContent.getByRole('button', {
      name: this.t('saveUpdatedInfo'),
    });
  }

  get nameTextBox() {
    return this.mainContent.getByRole('textbox', {
      name: this.t('name'),
    });
  }

  get contactEmailTextBox() {
    return this.mainContent.getByRole('textbox', {
      name: this.t('contactEmail'),
    });
  }

  get phoneNumberTextBox() {
    return this.mainContent.getByRole('textbox', {
      name: this.t('phoneNumber'),
    });
  }

  get venuesTextBox() {
    return this.mainContent.getByRole('textbox', {
      name: this.t('venues'),
    });
  }

  get languageDropdownButton() {
    return this.mainContent.getByRole('button', {
      name: this.t('language'),
    });
  }

  async isReady() {
    await super.isReady();
    await expect(this.page).toHaveURL((url) =>
      LANGUAGES.some((lang) => url.pathname == `/${lang}/profile`)
    );
  }

  /**
   * Go to my profile page for the given language.
   * @param lang - Language
   */
  async gotoMyProfilePage(lang: Language) {
    await this.page.goto(`/${lang}/profile`);
    await this.isReady();
  }

  async isInLanguage(lang: Language) {
    await this.hasTitle(TRANS.myProfile[lang]);
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
}
