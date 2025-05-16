import type { Language } from '../../types';
import { LANGUAGES } from '../constants';
import { expect, test } from '../testWithFixtures';

const getTestPageUrl = (lang: Language) =>
  `/${lang}/events/kultus:agls75a3jm/occurrences/create` as const;

// (['fi'] as const).forEach((lang) => {
LANGUAGES.forEach((lang) => {
  test(`create event's 2nd page opens in correct state with data saved on 1st page using language ${lang}`, async ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    searchPage, // TODO: Used here only for authorization, refactoring needed
    createEventOccurrencesPage,
    mockKeywordQueries,
    mockEventQueryAfterPage1Save,
  }) => {
    // Page 2 of the event creation process
    const p2 = createEventOccurrencesPage;

    // Create event occurrences page is ready and using the correct language
    await p2.gotoCreateEventOccurrencesPage(getTestPageUrl(lang));
    await p2.isReady();
    await p2.hasTitle('Testitapahtuman nimi');
    await p2.isInLanguage(lang);
    p2.setTestTranslationLanguage(lang);

    //-----------------------------------------------------------------
    // "Location" section is correctly initialized
    //-----------------------------------------------------------------
    await expect(p2.locationHeading).toBeVisible();

    await expect(p2.virtuallyHeldEventCheckbox).toBeVisible();
    await expect(p2.virtuallyHeldEventCheckbox).toBeEnabled();
    await expect(p2.virtuallyHeldEventCheckbox).not.toBeChecked();

    await expect(p2.bookableEventCheckbox).toBeVisible();
    await expect(p2.bookableEventCheckbox).toBeEnabled();
    await expect(p2.bookableEventCheckbox).not.toBeChecked();

    await expect(p2.defaultVenueTextBox).toBeVisible();
    await expect(p2.defaultVenueTextBox).toBeEnabled();
    await expect(p2.defaultVenueTextBox).toBeEmpty();

    await expect(p2.defaultVenueListBox).toBeHidden();

    await expect(p2.locationDescriptionTextBox).toBeHidden();

    for (const locationFeatureCheckbox of p2.locationFeatureCheckboxes) {
      await expect(locationFeatureCheckbox).toBeHidden();
    }

    //-----------------------------------------------------------------
    // "Enrolment" section is correctly initialized
    //-----------------------------------------------------------------
    await expect(p2.enrolmentHeading).toBeVisible();

    // Enrolment type radio button group & its buttons
    await expect(p2.enrolmentTypeRadioGroup).toHaveCount(3);

    await expect(p2.internalEnrolmentRadioButton).toBeVisible();
    await expect(p2.internalEnrolmentRadioButton).toBeEnabled();
    await expect(p2.internalEnrolmentRadioButton).toBeChecked();

    await expect(p2.externalEnrolmentRadioButton).toBeVisible();
    await expect(p2.externalEnrolmentRadioButton).toBeEnabled();
    await expect(p2.externalEnrolmentRadioButton).not.toBeChecked();

    await expect(p2.extEnrolmentUrlOrEmailTextBox).toBeHidden();

    await expect(p2.noEnrolmentRadioButton).toBeVisible();
    await expect(p2.noEnrolmentRadioButton).toBeEnabled();
    await expect(p2.noEnrolmentRadioButton).not.toBeChecked();

    // Enrolment start date & start time
    await expect(p2.enrolmentStartDateTextBox).toBeVisible();
    await expect(p2.enrolmentStartDateTextBox).toBeEnabled();
    await expect(p2.enrolmentStartDateTextBox).toBeEmpty();

    await expect(p2.enrolmentStartHoursTextBox).toBeVisible();
    await expect(p2.enrolmentStartHoursTextBox).toBeEnabled();
    await expect(p2.enrolmentStartHoursTextBox).toBeEmpty();

    await expect(p2.enrolmentStartMinutesTextBox).toBeVisible();
    await expect(p2.enrolmentStartMinutesTextBox).toBeEnabled();
    await expect(p2.enrolmentStartMinutesTextBox).toBeEmpty();

    // Enrolment's end time & necessary visits
    await expect(p2.enrolmentEndDaysSpinButton).toBeVisible();
    await expect(p2.enrolmentEndDaysSpinButton).toBeEnabled();
    await expect(p2.enrolmentEndDaysSpinButton).toBeEmpty();

    await expect(p2.necessaryVisitsSpinButton).toBeVisible();
    await expect(p2.necessaryVisitsSpinButton).toBeEnabled();
    await expect(p2.necessaryVisitsSpinButton).toHaveValue('1');

    // Enrolment's auto-acceptance details
    await expect(p2.autoAcceptRegistrationsCheckbox).toBeVisible();
    await expect(p2.autoAcceptRegistrationsCheckbox).toBeEnabled();
    await expect(p2.autoAcceptRegistrationsCheckbox).not.toBeChecked();

    await expect(p2.autoAcceptanceMessageTextBox).toBeHidden();

    //-----------------------------------------------------------------
    // "Occurrences" section is correctly initialized
    //-----------------------------------------------------------------
    await expect(p2.occurrencesHeading).toBeVisible();

    await expect(p2.occurrenceLocationTextBox).toBeVisible();
    await expect(p2.occurrenceLocationTextBox).toBeEnabled();
    await expect(p2.occurrenceLocationTextBox).toBeEmpty();

    await expect(p2.occurrenceDateTextBox).toBeVisible();
    await expect(p2.occurrenceDateTextBox).toBeEnabled();
    await expect(p2.occurrenceDateTextBox).toBeEmpty();

    await expect(p2.occurrenceStartHoursTextBox).toBeVisible();
    await expect(p2.occurrenceStartHoursTextBox).toBeEnabled();
    await expect(p2.occurrenceStartHoursTextBox).toBeEmpty();

    await expect(p2.occurrenceStartMinutesTextBox).toBeVisible();
    await expect(p2.occurrenceStartMinutesTextBox).toBeEnabled();
    await expect(p2.occurrenceStartMinutesTextBox).toBeEmpty();

    await expect(p2.occurrenceLanguageDropdownButton).toBeVisible();
    await expect(p2.occurrenceLanguageDropdownButton).toBeEnabled();

    await expect(p2.occurrenceLanguageListBox).toBeHidden();

    await expect(p2.totalSeatsSpinButton).toBeVisible();
    await expect(p2.totalSeatsSpinButton).toBeEnabled();
    await expect(p2.totalSeatsSpinButton).toBeEmpty();

    await expect(p2.minNumPersonsSpinButton).toBeVisible();
    await expect(p2.minNumPersonsSpinButton).toBeEnabled();
    await expect(p2.minNumPersonsSpinButton).toBeEmpty();

    await expect(p2.maxNumPersonsSpinButton).toBeVisible();
    await expect(p2.maxNumPersonsSpinButton).toBeEnabled();
    await expect(p2.maxNumPersonsSpinButton).toBeEmpty();

    await expect(p2.multiDayEventCheckbox).toBeVisible();
    await expect(p2.multiDayEventCheckbox).toBeEnabled();
    await expect(p2.multiDayEventCheckbox).not.toBeChecked();

    await expect(p2.oneGroupFillsEventCheckbox).toBeVisible();
    await expect(p2.oneGroupFillsEventCheckbox).toBeEnabled();
    await expect(p2.oneGroupFillsEventCheckbox).not.toBeChecked();

    await expect(p2.addNewOccurrenceButton).toBeVisible();
    await expect(p2.addNewOccurrenceButton).toBeEnabled();

    //-----------------------------------------------------------------
    // "Submit buttons" section is correctly initialized
    //-----------------------------------------------------------------
    await expect(p2.saveButton).toBeVisible();
    await expect(p2.saveButton).toBeDisabled();

    await expect(p2.goToPublishingButton).toBeVisible();
    await expect(p2.goToPublishingButton).toBeEnabled();
  });
});

// (['fi'] as const).forEach((lang) => {
LANGUAGES.forEach((lang) => {
  test(`a new event's occurrences (page 2/3) can be added using language ${lang}`, async ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    searchPage, // TODO: Used here only for authorization, refactoring needed
    createEventOccurrencesPage,
    mockKeywordQueries,
    mockPlacesQuery,
    mockEventQueryAfterPage1Save,
  }) => {
    // Page 2 of the event creation process
    const p2 = createEventOccurrencesPage;

    // Create event occurrences page is ready and using the correct language
    await p2.gotoCreateEventOccurrencesPage(getTestPageUrl(lang));
    await p2.isReady();
    await p2.hasTitle('Testitapahtuman nimi');
    await p2.isInLanguage(lang);
    p2.setTestTranslationLanguage(lang);

    //-----------------------------------------------------------------
    // Fill "Location" section data
    //-----------------------------------------------------------------
    await p2.fillTextBox(p2.defaultVenueTextBox, 'annantalo'); // Initialize search
    await p2.waitForAutoSuggestListsToBeLoaded();
    await p2.clickListBoxOption(
      p2.defaultVenueListBox,
      p2.t('annantaloWithAddress')
    );

    await expect(p2.locationDescriptionTextBox).toBeVisible();
    await expect(p2.locationDescriptionTextBox).toBeEnabled();
    await expect(p2.locationDescriptionTextBox).toBeEmpty();

    await p2.fillTextBox(
      p2.locationDescriptionTextBox,
      'Annantalo on taidekeskus Helsingissä.\n' +
        'Se tarjoaa monipuolisia kulttuuri- ja taidetapahtumia.'
    );

    for (const locationFeatureCheckbox of p2.locationFeatureCheckboxes) {
      await expect(locationFeatureCheckbox).toBeVisible();
      await expect(locationFeatureCheckbox).toBeEnabled();
      await expect(locationFeatureCheckbox).not.toBeChecked();
    }

    // Add a few location features
    await p2.clothingStorageCheckbox.check();
    await p2.toiletNearbyCheckbox.check();
    await p2.indoorPlayingAreaCheckbox.check();

    await p2.fillTextBox(p2.enrolmentStartDateTextBox, '31.12.2199');
    await p2.fillTextBox(p2.enrolmentStartHoursTextBox, '16');
    await p2.fillTextBox(p2.enrolmentStartMinutesTextBox, '30');

    await p2.fillTextBox(p2.enrolmentEndDaysSpinButton, '2');
    await p2.fillTextBox(p2.necessaryVisitsSpinButton, '1');

    await p2.autoAcceptRegistrationsCheckbox.check();

    await expect(p2.autoAcceptanceMessageTextBox).toBeVisible();
    await expect(p2.autoAcceptanceMessageTextBox).toBeEnabled();
    await expect(p2.autoAcceptanceMessageTextBox).toBeEmpty();

    p2.fillTextBox(
      p2.autoAcceptanceMessageTextBox,
      'Peruutukset test@example.org viim. 2pv ennen tapahtuma-aikaa, kiitos!'
    );

    //-----------------------------------------------------------------
    // Fill "Occurrences" section data
    //-----------------------------------------------------------------

    // Occurrence location should be pre-filled with the selected default venue
    await expect(p2.selectedOccurrenceLocation).toHaveText(p2.t('annantalo'));

    await p2.fillTextBox(p2.occurrenceDateTextBox, '1.1.2200');

    await p2.fillTextBox(p2.occurrenceStartHoursTextBox, '8');
    await p2.fillTextBox(p2.occurrenceStartMinutesTextBox, '0');

    await p2.fillTextBox(p2.occurrenceEndHoursTextBox, '09');
    await p2.fillTextBox(p2.occurrenceEndMinutesTextBox, '00');

    // Select occurrence languages
    await p2.openDropdown(p2.occurrenceLanguageDropdownButton);
    const langListBox = p2.occurrenceLanguageListBox;
    for (const language of p2.possibleOccurrenceLanguages) {
      await p2.hasListBoxOption(langListBox, language);
    }
    await p2.checkListBoxOption(langListBox, p2.t('finnishLanguage'));
    await p2.checkListBoxOption(langListBox, p2.t('swedishLanguage'));
    await p2.checkListBoxOption(langListBox, p2.t('englishLanguage'));
    await p2.closeDropdown(p2.occurrenceLanguageDropdownButton);

    await p2.fillTextBox(p2.totalSeatsSpinButton, '80');
    await p2.fillTextBox(p2.minNumPersonsSpinButton, '2');
    await p2.fillTextBox(p2.maxNumPersonsSpinButton, '10');

    await p2.goToPublishingButton.click();
  });
});
