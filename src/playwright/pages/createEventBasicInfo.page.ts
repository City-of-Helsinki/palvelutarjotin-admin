import type { Locator, Page } from '@playwright/test';

import { Language } from '../../types';
import { LANGUAGES } from '../constants';
import { expect } from '../testWithFixtures';
import type { Translations } from '../types';
import { AuthenticatedPage } from './authenticated.page';

// Translations used by the create event page
const TRANS = {
  activities: {
    // Prefix matches, can have e.g. " *" suffix
    fi: /^Aktiviteetit/i,
    sv: /^Aktiviteter/i,
    en: /^Activities/i,
  },
  addImage: {
    fi: /^Lisää kuva$/i,
    sv: /^Lägg till bild$/i,
    en: /^Add image$/i,
  },
  additionalInfo: {
    // Prefix matches, can have e.g. " (FI)" or " (SV)" suffix
    fi: /^Lisätiedot/i,
    sv: /^Tilläggsinformation/i,
    en: /^Additional information/i,
  },
  artMusic: {
    fi: /^Taidemusiikki$/i,
    sv: /^Konstmusik$/i,
    en: /^Art music$/i,
  },
  basicInfo: {
    fi: /^Tapahtuman perustiedot$/i,
    sv: /^Grundläggande information om evenemanget$/i,
    en: /^Basic information$/i,
  },
  cancel: {
    fi: /^Peruuta$/i,
    sv: /^Avbryt$/i,
    en: /^Cancel$/i,
  },
  categories: {
    // Prefix matches, can have e.g. " *" suffix
    fi: /^Kategoriat/i,
    sv: /^Kategorier/i,
    en: /^Categories/i,
  },
  concert: {
    fi: /^Konsertti$/i,
    sv: /^Konsert$/i,
    en: /^Concert$/i,
  },
  contactPerson: {
    fi: /^Yhteyshenkilö$/i,
    sv: /^Kontaktperson$/i,
    en: /^Contact person$/i,
  },
  contactPersonName: {
    // Prefix matches, can have e.g. " *" suffix
    fi: /^Nimi/i,
    sv: /^Namn/i,
    en: /^Name/i,
  },
  description: {
    // Prefix matches, can have e.g. " (FI) *" or " (SV) *" suffix
    fi: /^Kuvaus/i,
    sv: /^Beskrivning/i,
    en: /^Description/i,
  },
  email: {
    fi: /^Sähköpostiosoite$/i,
    sv: /^E-post$/i,
    en: /^Email$/i,
  },
  eventClassifications: {
    fi: /^Tapahtuman luokittelut$/i,
    sv: /^Klassificeringar av evenemang$/i,
    en: /^Event classifications$/i,
  },
  eventIsFree: {
    fi: /^Tapahtuma on ilmainen$/i,
    sv: /^Evenemanget är gratis$/i,
    en: /^Event is free of charge$/i,
  },
  eventName: {
    // Prefix matches, can have e.g. " (FI) *" or " (SV) *" suffix
    fi: /^Tapahtuman nimi/i,
    sv: /^Evenemangets namn/i,
    en: /^Event name/i,
  },
  eventKeywords: {
    fi: /^Tapahtuman avainsanat$/i,
    sv: /^Evenemangets nyckelord$/i,
    en: /^Event keywords$/i,
  },
  eventPicture: {
    fi: /^Tapahtuman kuva$/i,
    sv: /^Bild av evenemanget$/i,
    en: /^Event picture$/i,
  },
  eventPricing: {
    fi: /^Tapahtuman hinnoittelu$/i,
    sv: /^Evenemangets prissättning$/i,
    en: /^Event pricing$/i,
  },
  imageAltText: {
    fi: /^Kuvan alt-teksti$/i,
    sv: /^Bildens alt-text$/i,
    en: /^Picture alt-text$/i,
  },
  infoUrl: {
    // Prefix matches, can have e.g. " (FI) *" or " (SV) *" suffix
    fi: /^WWW-osoite, josta saa lisätietoja tapahtumasta/i,
    sv: /^Webbadress där du hittar mer information om evenemanget/i,
    en: /^A web address where you can find more information about the event/i,
  },
  isQueueingAllowed: {
    fi: /^Tapahtumaan saa jonottaa$/i,
    sv: /^Det är tillåtet att köa till detta evenemang$/i,
    en: /^Queueing to this event is allowed$/i,
  },
  mandatoryExtraInfo: {
    fi: /^Lisätietojen syöttäminen on ilmoittautujalle pakollista$/i,
    sv: /^De som anmäler sig måste ange tilläggsinformation$/i,
    en: /^Entering additional information is mandatory for the registrant$/i,
  },
  music: {
    fi: /^Musiikki$/i,
    sv: /^Musik$/i,
    en: /^Music$/i,
  },
  newEvent: {
    fi: /^Uusi tapahtuma$/i,
    sv: /^Nytt evenemang$/i,
    en: /^New event$/i,
  },
  phone: {
    fi: /^Puhelinnumero$/i,
    sv: /^Telefon$/i,
    en: /^Phone$/i,
  },
  photographer: {
    fi: /^Valokuvaaja$/i,
    sv: /^Fotograf$/i,
    en: /^Photographer$/i,
  },
  price: {
    fi: /^Hinta, €$/i,
    sv: /^Pris, €$/i,
    en: /^Price, €$/i,
  },
  saveAndGoToOccurrences: {
    fi: /^Tallenna ja siirry tapahtuma-aikoihin$/i,
    sv: /^Spara och gå till evenemangstiderna$/i,
    en: /^Save and go to occurrences$/i,
  },
  shortDescription: {
    // Prefix matches, these have more at the end like the length limit
    fi: /^Lyhyt kuvaus/i,
    sv: /^Kort beskrivning/i,
    en: /^Short description/i,
  },
  targetGroups: {
    // Prefix matches, can have e.g. " *" suffix
    fi: /^Kohderyhmät/i,
    sv: /^Målgrupper/i,
    en: /^Target groups/i,
  },
  zeroToTwoYears: {
    fi: /^0-2 vuotiaat$/i,
    sv: /^0-2 år$/i,
    en: /^0-2 years$/i,
  },
  upper2ndVocEd: {
    fi: /^Lukio ja ammatillinen opetus$/i,
    sv: /^Gymnasium och yrkesutbildning$/i,
    en: /^Upper secondary and vocational education$/i,
  },
} as const satisfies Translations;

type TranslationKey = keyof typeof TRANS;

export class CreateEventBasicInfoPage extends AuthenticatedPage {
  // The test translation language for the page
  protected lang: Language = 'fi';
  protected eventForm: Locator;
  protected basicInfoSection: Locator;
  protected eventClassificationsSection: Locator;
  protected eventKeywordsDropdown: Locator;
  protected eventPricingSection: Locator;
  protected contactPersonSection: Locator;
  protected actionButtonsSection: Locator;
  protected hasListBoxPopUp: Locator;

  constructor(page: Page) {
    super(page);
    this.eventForm = this.page.getByTestId('event-form');
    this.basicInfoSection = this.eventForm.getByTestId('basic-info-section');
    this.eventClassificationsSection = this.eventForm.getByTestId(
      'event-classifications-section'
    );
    this.eventKeywordsDropdown =
      this.eventClassificationsSection.getByTestId('keywords-dropdown');
    this.eventPricingSection = this.eventForm.getByTestId(
      'event-pricing-section'
    );
    this.contactPersonSection = this.eventForm.getByTestId(
      'contact-person-section'
    );
    this.actionButtonsSection = this.eventForm.getByTestId(
      'action-buttons-section'
    );
    this.hasListBoxPopUp = this.eventForm.locator('[aria-haspopup="listbox"]');
  }

  get basicInfoHeading() {
    return this.basicInfoSection.getByRole('heading', {
      name: this.t('basicInfo'),
    });
  }

  get eventNameTextBox() {
    return this.basicInfoSection.getByRole('textbox', {
      name: this.t('eventName'),
    });
  }

  get shortDescriptionTextBox() {
    return this.basicInfoSection.getByRole('textbox', {
      name: this.t('shortDescription'),
    });
  }

  get descriptionTextBox() {
    return this.basicInfoSection.getByRole('textbox', {
      name: this.t('description'),
    });
  }

  get mandatoryExtraInfoCheckbox() {
    return this.basicInfoSection.getByRole('checkbox', {
      name: this.t('mandatoryExtraInfo'),
    });
  }

  get isQueueingAllowedCheckbox() {
    return this.basicInfoSection.getByRole('checkbox', {
      name: this.t('isQueueingAllowed'),
    });
  }

  get addImageButton() {
    return this.basicInfoSection.getByRole('button', {
      name: this.t('addImage'),
    });
  }

  get infoUrlTextBox() {
    return this.basicInfoSection.getByRole('textbox', {
      name: this.t('infoUrl'),
    });
  }

  get eventClassificationsHeading() {
    return this.eventClassificationsSection.getByRole('heading', {
      name: this.t('eventClassifications'),
    });
  }

  get targetGroupsDropdownButton() {
    return this.eventClassificationsSection
      .getByRole('button', {
        name: this.t('targetGroups'),
      })
      .and(this.hasListBoxPopUp); // To distinguish from the selected tags
  }

  get targetGroupsListBox() {
    return this.eventClassificationsSection.getByRole('listbox', {
      name: this.t('targetGroups'),
    });
  }

  get categoriesDropdownButton() {
    return this.eventClassificationsSection
      .getByRole('button', {
        name: this.t('categories'),
      })
      .and(this.hasListBoxPopUp); // To distinguish from the selected tags
  }

  get categoriesListBox() {
    return this.eventClassificationsSection.getByRole('listbox', {
      name: this.t('categories'),
    });
  }

  get activitiesDropdownButton() {
    return this.eventClassificationsSection
      .getByRole('button', {
        name: this.t('activities'),
      })
      .and(this.hasListBoxPopUp); // To distinguish from the selected tags
  }

  get activitiesListBox() {
    return this.eventClassificationsSection.getByRole('listbox', {
      name: this.t('activities'),
    });
  }

  get eventKeywordsTextBox() {
    return this.eventClassificationsSection.getByRole('textbox', {
      name: this.t('eventKeywords'),
    });
  }

  get eventKeywordsListBox() {
    return this.eventKeywordsDropdown.getByRole('listbox');
  }

  get eventPricingHeading() {
    return this.eventPricingSection.getByRole('heading', {
      name: this.t('eventPricing'),
    });
  }

  get priceTextBox() {
    return this.eventPricingSection.getByRole('textbox', {
      name: this.t('price'),
    });
  }

  get eventIsFreeCheckbox() {
    return this.eventPricingSection.getByRole('checkbox', {
      name: this.t('eventIsFree'),
    });
  }

  get additionalInfoTextBox() {
    return this.eventPricingSection.getByRole('textbox', {
      name: this.t('additionalInfo'),
    });
  }

  get contactPersonHeading() {
    return this.contactPersonSection.getByRole('heading', {
      name: this.t('contactPerson'),
    });
  }

  get contactPersonNameDropdownButton() {
    return this.contactPersonSection.getByRole('button', {
      name: this.t('contactPersonName'),
    });
  }

  get contactPersonNameListBox() {
    return this.contactPersonSection.getByRole('listbox', {
      name: this.t('contactPersonName'),
    });
  }

  get emailTextBox() {
    return this.contactPersonSection.getByRole('textbox', {
      name: this.t('email'),
    });
  }

  get phoneTextBox() {
    return this.contactPersonSection.getByRole('textbox', {
      name: this.t('phone'),
    });
  }

  get cancelButton() {
    return this.actionButtonsSection.getByRole('button', {
      name: this.t('cancel'),
    });
  }

  get saveAndGoToOccurrencesButton() {
    return this.actionButtonsSection.getByRole('button', {
      name: this.t('saveAndGoToOccurrences'),
    });
  }

  async isReady() {
    await super.isReady();
    await expect(this.page).toHaveURL((url) =>
      LANGUAGES.some((lang) => url.pathname == `/${lang}/events/create`)
    );
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

  async isInLanguage(lang: Language) {
    await this.hasTitle(TRANS.newEvent[lang]);
  }
}
