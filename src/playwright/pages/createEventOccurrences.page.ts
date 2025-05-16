import type { Locator, Page } from '@playwright/test';

import { Language } from '../../types';
import { LANGUAGES } from '../constants';
import { expect } from '../testWithFixtures';
import type { Translation, Translations } from '../types';
import { AuthenticatedPage } from './authenticated.page';

const START_HOURS = {
  fi: /^Alkamisajankohdan tuntivalitsin$/i,
  sv: /^Starttidens timväljare$/i,
  en: /^Start time hour selector$/i,
} as const satisfies Translation;

const START_MINUTES = {
  fi: /^Alkamisajankohdan minuuttivalitsin$/i,
  sv: /^Starttidens minutväljare$/i,
  en: /^Start time minute selector$/i,
} as const satisfies Translation;

const END_HOURS = {
  fi: /^Loppumisajankohdan tuntivalitsin$/i,
  sv: /^Sluttidens timväljare$/i,
  en: /^Hour selector for end time$/i,
} as const satisfies Translation;

const END_MINUTES = {
  fi: /^Loppumisajankohdan minuuttivalitsin$/i,
  sv: /^Sluttidens minutväljare$/i,
  en: /^Minute selector for end time$/i,
} as const satisfies Translation;

// Translations used by the create event occurrences page
const TRANS = {
  annantalo: {
    fi: /^Annantalo$/i,
    sv: /^Annegården$/i,
    en: /^Annantalo Arts Centre$/i,
  },
  annantaloWithAddress: {
    fi: /^Annantalo, Annankatu 30$/i,
    sv: /^Annegården, Annegatan 30$/i,
    en: /^Annantalo Arts Centre, Annankatu 30$/i,
  },
  areaForGroupWork: {
    fi: /^Ryhmätyötilaa$/i,
    sv: /^Grupparbetsrum$/i,
    en: /^Area for group work$/i,
  },
  autoAcceptanceMessage: {
    fi: /^Mahdolliset lisätiedot vahvistusviestiin$/i,
    sv: /^Eventuell tilläggsinformation i bekräftelsemeddelandet$/i,
    en: /^Any additional information to the confirmation message$/i,
  },
  addNewOccurrence: {
    fi: /^Lisää uusi tapahtuma-aika$/i,
    sv: /^Lägg till evenemangstid$/i,
    en: /^Add new occurrence$/i,
  },
  arabicLanguage: {
    fi: /^arabia$/,
    sv: /^Arabiska$/,
    en: /^Arabic$/,
  },
  autoAcceptRegistrations: {
    fi: /^Vahvista ilmoittautumiset automaattisesti osallistujamäärän puitteissa$/i,
    sv: /^Bekräfta anmälningar automatiskt inom ramen för maximalt antal deltagare$/i,
    en: /^Automatically confirm registrations within the number of participants$/i,
  },
  bookableEvent: {
    fi: /^Tilattavissa omaan toimipaikkaan$/i,
    sv: /^Kan bokas till eget verksamhetsställe$/i,
    en: /^The event will be held at customers place$/i,
  },
  chineseLanguage: {
    fi: /^kiina$/,
    sv: /^Kinesiska$/,
    en: /^Chinese$/,
  },
  clothingStorage: {
    fi: /^Ulkovaatesäilytys$/i,
    sv: /^Förvaring av ytterkläder$/i,
    en: /^Clothing storage$/i,
  },
  defaultVenue: {
    // Prefix matches, can have e.g. " *" suffix
    fi: /^Oletustapahtumapaikka/i,
    sv: /^Standardevenemangsplats/i,
    en: /^Default venue/i,
  },
  englishLanguage: {
    fi: /^englanti$/,
    sv: /^Engelska$/,
    en: /^English$/,
  },
  enrolment: {
    fi: /^Ilmoittautuminen$/i,
    sv: /^Anmälan$/i,
    en: /^Enrolment$/i,
  },
  enrolmentStartDate: {
    // Prefix matches, can have e.g. " *" suffix
    fi: /^Ilmoittautuminen alkaa/i,
    sv: /^Registrering börjar/i,
    en: /^Enrolment begins/i,
  },
  enrolmentStartHours: { ...START_HOURS },
  enrolmentStartMinutes: { ...START_MINUTES },
  enrolmentEndDays: {
    // Prefix matches, can have e.g. " *" suffix
    fi: /^Ilmoittautuminen sulkeutuu X päivää ennen tapahtuma-aikaa/i,
    sv: /^Anmälan stänger X dagar före evenemangstiden/i,
    en: /^Enrollment closes X days before the event time/i,
  },
  extEnrolmentUrlOrEmail: {
    fi: /^Sähköposti- tai www-osoite ilmoittautumiseen$/i,
    sv: /^E-post- eller webbadress för anmälan$/i,
    en: /^Email or web address for enrolment$/i,
  },
  externalEnrolment: {
    fi: /^Ilmoittautuminen muulla sivustolla$/i,
    sv: /^Anmälan på en annan webbplats$/i,
    en: /^Enrolments on another site$/i,
  },
  finnishLanguage: {
    fi: /^suomi$/,
    sv: /^Finska$/,
    en: /^Finnish$/,
  },
  goToPublishing: {
    fi: /^Siirry julkaisuun$/i,
    sv: /^Gå till publicering$/i,
    en: /^Go to publishing$/i,
  },
  maxNumPersons: {
    fi: /^Maksimi henkilömäärä$/i,
    sv: /^Maximalt antal personer$/i,
    en: /^Maximum number of persons$/i,
  },
  minNumPersons: {
    fi: /^Minimi henkilömäärä$/i,
    sv: /^Minsta antal personer$/i,
    en: /^Minimum number of persons$/i,
  },
  multiDayEvent: {
    fi: /^Tapahtuma-aika on monipäiväinen$/i,
    sv: /^Evenemanget pågår i flera dagar$/i,
    en: /^The event is multi-day$/i,
  },
  newEvent: {
    fi: /^Uusi tapahtuma$/i,
    sv: /^Nytt evenemang$/i,
    en: /^New event$/i,
  },
  indoorPlayingArea: {
    fi: /^Leikkitilaa sisällä$/i,
    sv: /^Lekplats inomhus$/i,
    en: /^Indoor playing area$/i,
  },
  internalEnrolment: {
    fi: /^Ilmoittautuminen Kultuksessa$/i,
    sv: /^Anmälan i Kultus$/i,
    en: /^Internal enrolments at Kultus$/i,
  },
  location: {
    fi: /^Tapahtumapaikka$/i,
    sv: /^Plats$/i,
    en: /^Location$/i,
  },
  locationDescription: {
    // Prefix matches, can have e.g. " (FI)" or " (SV)" suffix
    fi: /^Tapahtumapaikan kuvaus/i,
    sv: /^Beskrivning av evenemangsplatsen/i,
    en: /^Description of the venue/i,
  },
  necessaryVisits: {
    // Prefix matches, can have e.g. " *" suffix
    fi: /^Tarvittavat käyntikerrat/i,
    sv: /^Nödvändiga besök/i,
    en: /^Necessary visits/i,
  },
  noEnrolment: {
    fi: /^Ei ilmoittautumista$/i,
    sv: /^Ingen anmälan$/i,
    en: /^No enrolments$/i,
  },
  occurrences: {
    fi: /^Tapahtuma-aika$/i,
    sv: /^Evenemangets tidpunkt$/i,
    en: /^Occurrences$/i,
  },
  occurrenceLocation: {
    fi: /^Tapahtumapaikka$/i,
    sv: /^Evenemangets plats$/i,
    en: /^Event location$/i,
  },
  occurrenceDate: {
    fi: /^Päivämäärä$/i,
    sv: /^Datum$/i,
    en: /^Date$/i,
  },
  occurrenceEndHours: { ...END_HOURS },
  occurrenceEndMinutes: { ...END_MINUTES },
  occurrenceStartHours: { ...START_HOURS },
  occurrenceStartMinutes: { ...START_MINUTES },
  occurrenceLanguage: {
    // Prefix matches, can have e.g. " Valitse..." suffix,
    // because occurrence language dropdown button uses
    // aria-labelledby="languages-label languages-toggle-button" i.e.
    // the aria label is a combination of two different labels:
    fi: /^Tapahtuman kieli/i,
    sv: /^Evenemangets språk/i,
    en: /^Event language/i,
  },
  oneGroupFillsEvent: {
    fi: /^Yksi ryhmä täyttää tapahtuman$/i,
    sv: /^En grupp fyller evenemanget$/i,
    en: /^One group fills the event$/i,
  },
  outdoorActivity: {
    fi: /^Toiminta tapahtuu ulkona$/i,
    sv: /^Verksamheten sker utomhus$/i,
    en: /^Outdoor activity$/i,
  },
  outdoorPlayingArea: {
    fi: /^Leikkitilaa ulkona$/i,
    sv: /^Lekplats utomhus$/i,
    en: /^Outdoor playing area$/i,
  },
  russianLanguage: {
    fi: /^venäjä$/,
    sv: /^Ryska$/,
    en: /^Russian$/,
  },
  save: {
    fi: /^Tallenna tiedot$/i,
    sv: /^Spara$/i,
    en: /^Save$/i,
  },
  snackEatingPlace: {
    fi: /^Eväidensyöntipaikka$/i,
    sv: /^Plats för att äta matsäck$/i,
    en: /^Snack eating place$/i,
  },
  swedishLanguage: {
    fi: /^ruotsi$/,
    sv: /^Svenska$/,
    en: /^Swedish$/,
  },
  toiletNearby: {
    fi: /^WC lähellä tilaa$/i,
    sv: /^Toalett nära utrymmet$/i,
    en: /^Toilet nearby$/i,
  },
  totalSeats: {
    fi: /^Paikkoja$/i,
    sv: /^Platser$/i,
    en: /^Total seats$/i,
  },
  virtuallyHeldEvent: {
    fi: /^Tapahtuma järjestetään virtuaalisesti$/i,
    sv: /^Evenemanget ordnas virtuellt$/i,
    en: /^Event is held virtually$/i,
  },
} as const satisfies Translations;

type TranslationKey = keyof typeof TRANS;

const CREATE_EVENT_OCCURRENCES_PAGE_PATHNAME_REGEX = new RegExp(
  `^/(${LANGUAGES.join('|')})/events/kultus:[^/]+/occurrences/create$`
);

type CreateEventOccurrencesPagePathname =
  `/${Language}/events/kultus:${string}/occurrences/create`;

export class CreateEventOccurrencesPage extends AuthenticatedPage {
  // The test translation language for the page
  protected lang: Language = 'fi';
  protected locationForm: Locator;
  protected locationDropdown: Locator;
  protected enrolmentInfoForm: Locator;
  protected occurrencesForm: Locator;
  protected submitButtonsSection: Locator;
  protected hasListBoxPopUp: Locator;

  constructor(page: Page) {
    super(page);
    this.locationForm = this.page.getByTestId('location-form');
    this.locationDropdown = this.locationForm.getByTestId('location-dropdown');
    this.enrolmentInfoForm = this.page.getByTestId('enrolment-info-form');
    this.occurrencesForm = this.page.getByTestId('occurrences-form');
    this.submitButtonsSection = this.page.getByTestId('submit-buttons-section');
    this.hasListBoxPopUp = this.page.locator('[aria-haspopup="listbox"]');
  }

  get locationHeading() {
    return this.locationForm.getByRole('heading', {
      name: this.t('location'),
    });
  }

  get bookableEventCheckbox() {
    return this.locationForm.getByRole('checkbox', {
      name: this.t('bookableEvent'),
    });
  }

  get virtuallyHeldEventCheckbox() {
    return this.locationForm.getByRole('checkbox', {
      name: this.t('virtuallyHeldEvent'),
    });
  }

  get defaultVenueTextBox() {
    return this.locationForm.getByRole('textbox', {
      name: this.t('defaultVenue'),
    });
  }

  get defaultVenueListBox() {
    return this.locationDropdown.getByRole('listbox');
  }

  get locationDescriptionTextBox() {
    return this.locationForm.getByRole('textbox', {
      name: this.t('locationDescription'),
    });
  }

  get areaForGroupWorkCheckbox() {
    return this.locationForm.getByRole('checkbox', {
      name: this.t('areaForGroupWork'),
    });
  }

  get clothingStorageCheckbox() {
    return this.locationForm.getByRole('checkbox', {
      name: this.t('clothingStorage'),
    });
  }

  get indoorPlayingAreaCheckbox() {
    return this.locationForm.getByRole('checkbox', {
      name: this.t('indoorPlayingArea'),
    });
  }

  get outdoorActivityCheckbox() {
    return this.locationForm.getByRole('checkbox', {
      name: this.t('outdoorActivity'),
    });
  }

  get outdoorPlayingAreaCheckbox() {
    return this.locationForm.getByRole('checkbox', {
      name: this.t('outdoorPlayingArea'),
    });
  }

  get snackEatingPlaceCheckbox() {
    return this.locationForm.getByRole('checkbox', {
      name: this.t('snackEatingPlace'),
    });
  }

  get toiletNearbyCheckbox() {
    return this.locationForm.getByRole('checkbox', {
      name: this.t('toiletNearby'),
    });
  }

  get locationFeatureCheckboxes() {
    return [
      this.areaForGroupWorkCheckbox,
      this.clothingStorageCheckbox,
      this.indoorPlayingAreaCheckbox,
      this.outdoorActivityCheckbox,
      this.outdoorPlayingAreaCheckbox,
      this.snackEatingPlaceCheckbox,
      this.toiletNearbyCheckbox,
    ];
  }

  get enrolmentHeading() {
    return this.enrolmentInfoForm.getByRole('heading', {
      name: this.t('enrolment'),
    });
  }

  get enrolmentTypeRadioGroup() {
    return this.enrolmentInfoForm.locator(
      'input[type="radio"][name="enrolmentType"]'
    );
  }

  get internalEnrolmentRadioButton() {
    return this.enrolmentInfoForm
      .getByRole('radio', {
        name: this.t('internalEnrolment'),
      })
      .and(this.enrolmentTypeRadioGroup); // To make sure it is in the correct radio group
  }

  get externalEnrolmentRadioButton() {
    return this.enrolmentInfoForm
      .getByRole('radio', {
        name: this.t('externalEnrolment'),
      })
      .and(this.enrolmentTypeRadioGroup); // To make sure it is in the correct radio group
  }

  get noEnrolmentRadioButton() {
    return this.enrolmentInfoForm
      .getByRole('radio', {
        name: this.t('noEnrolment'),
      })
      .and(this.enrolmentTypeRadioGroup); // To make sure it is in the correct radio group
  }

  get autoAcceptanceMessageTextBox() {
    return this.enrolmentInfoForm.getByRole('textbox', {
      name: this.t('autoAcceptanceMessage'),
    });
  }

  get autoAcceptRegistrationsCheckbox() {
    return this.enrolmentInfoForm.getByRole('checkbox', {
      name: this.t('autoAcceptRegistrations'),
    });
  }

  get extEnrolmentUrlOrEmailTextBox() {
    return this.enrolmentInfoForm.getByRole('textbox', {
      name: this.t('extEnrolmentUrlOrEmail'),
    });
  }

  get enrolmentStartDateTextBox() {
    return this.enrolmentInfoForm.getByRole('textbox', {
      name: this.t('enrolmentStartDate'),
    });
  }

  get enrolmentStartHoursTextBox() {
    return this.enrolmentInfoForm.getByLabel(this.t('enrolmentStartHours'));
  }

  get enrolmentStartMinutesTextBox() {
    return this.enrolmentInfoForm.getByLabel(this.t('enrolmentStartMinutes'));
  }

  get enrolmentEndDaysSpinButton() {
    return this.enrolmentInfoForm.getByRole('spinbutton', {
      name: this.t('enrolmentEndDays'),
    });
  }

  get necessaryVisitsSpinButton() {
    return this.enrolmentInfoForm.getByRole('spinbutton', {
      name: this.t('necessaryVisits'),
    });
  }

  get occurrencesHeading() {
    return this.occurrencesForm.getByRole('heading', {
      name: this.t('occurrences'),
    });
  }

  get occurrencesTable() {
    return this.occurrencesForm.getByTestId('occurrences-table');
  }

  get occurrencesTableRows() {
    return this.occurrencesTable.getByRole('row');
  }

  get occurrenceLocationTextBox() {
    return this.occurrencesForm.getByRole('textbox', {
      name: this.t('occurrenceLocation'),
    });
  }

  get occurrenceLocationListBox() {
    return this.occurrenceLocationTextBox.getByRole('listbox');
  }

  get occurrenceDateTextBox() {
    return this.occurrencesForm.getByRole('textbox', {
      name: this.t('occurrenceDate'),
    });
  }

  get occurrenceStartHoursTextBox() {
    return this.occurrencesForm.getByLabel(this.t('occurrenceStartHours'));
  }

  get occurrenceStartMinutesTextBox() {
    return this.occurrencesForm.getByLabel(this.t('occurrenceStartMinutes'));
  }

  get occurrenceEndHoursTextBox() {
    return this.occurrencesForm.getByLabel(this.t('occurrenceEndHours'));
  }

  get occurrenceEndMinutesTextBox() {
    return this.occurrencesForm.getByLabel(this.t('occurrenceEndMinutes'));
  }

  get occurrenceLanguageDropdownButton() {
    return this.occurrencesForm
      .getByRole('button', {
        name: this.t('occurrenceLanguage'),
      })
      .and(this.hasListBoxPopUp); // To distinguish from the selected tags
  }

  get occurrenceLanguageListBox() {
    return this.occurrencesForm.getByRole('listbox', {
      name: this.t('occurrenceLanguage'),
    });
  }

  get totalSeatsSpinButton() {
    return this.occurrencesForm.getByRole('spinbutton', {
      name: this.t('totalSeats'),
    });
  }

  get minNumPersonsSpinButton() {
    return this.occurrencesForm.getByLabel(this.t('minNumPersons'));
  }

  get maxNumPersonsSpinButton() {
    return this.occurrencesForm.getByLabel(this.t('maxNumPersons'));
  }

  get multiDayEventCheckbox() {
    return this.occurrencesForm.getByRole('checkbox', {
      name: this.t('multiDayEvent'),
    });
  }

  get oneGroupFillsEventCheckbox() {
    return this.occurrencesForm.getByRole('checkbox', {
      name: this.t('oneGroupFillsEvent'),
    });
  }

  get addNewOccurrenceButton() {
    return this.occurrencesForm.getByRole('button', {
      name: this.t('addNewOccurrence'),
    });
  }

  /**
   * Names of the languages that can be selected for the occurrence language
   * in the current test translation language.
   */
  get possibleOccurrenceLanguages() {
    return [
      this.t('finnishLanguage'),
      this.t('swedishLanguage'),
      this.t('englishLanguage'),
      this.t('arabicLanguage'),
      this.t('chineseLanguage'),
      this.t('russianLanguage'),
    ];
  }

  get saveButton() {
    return this.submitButtonsSection.getByRole('button', {
      name: this.t('save'),
    });
  }

  get goToPublishingButton() {
    return this.submitButtonsSection.getByRole('button', {
      name: this.t('goToPublishing'),
    });
  }

  // Test that the given location is selected as the occurrence's location.
  async hasSelectedOccurrenceLocation(selectedLocation: string | RegExp) {
    // NOTE: The selected location is in a <div> sibling element of the
    // occurrence location text box. Going through the parent is more robust
    // against HTML structure changes than locating the sibling with locator("+ div").
    const occurrenceLocationTextBoxParent =
      this.occurrenceLocationTextBox.locator('..');

    // The occurrence location list box should be hidden when a location has been selected
    await expect(this.occurrenceLocationListBox).toBeHidden();
    await expect(occurrenceLocationTextBoxParent).toHaveText(selectedLocation);
  }

  /**
   * Returns the translation for the given key in the test translation language.
   * @param key - The key for the translation.
   * @return The translated string in the test translation language.
   */
  t(key: TranslationKey) {
    return TRANS[key][this.lang];
  }

  async gotoCreateEventOccurrencesPage(
    url: CreateEventOccurrencesPagePathname
  ) {
    await this.page.goto(url);
    await this.isReady();
  }

  async isReady() {
    await super.isReady();
    await expect(this.page).toHaveURL((url) =>
      CREATE_EVENT_OCCURRENCES_PAGE_PATHNAME_REGEX.test(url.pathname)
    );
  }

  async isInLanguage(lang: Language) {
    await this.hasVisibleLocationHeading(lang);
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

  async hasVisibleLocationHeading(lang: Language) {
    await this.hasVisibleHeading(TRANS.location[lang]);
  }
}
