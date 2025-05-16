import type { Language } from '../../types';
import { LANGUAGES } from '../constants';
import { MOCK_EVENT_QUERY_RESPONSE_AFTER_PAGE_2_SAVE } from '../mocks/eventQuery.mock';
import { expect, test } from '../testWithFixtures';

const getTestPage2Url = (lang: Language) =>
  `/${lang}/events/kultus:agls75a3jm/occurrences/create` as const;

LANGUAGES.forEach((lang) => {
  test(`create event's 2nd page opens in correct state with data saved on 1st page using language ${lang}`, async ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    searchPage, // TODO: Used here only for authorization, refactoring needed
    createEventOccurrencesPage,
    mockKeywordQueries,
    mockEventQueryAfterPage1Save,
    mockEditEventMutation,
    mockEditVenueMutation,
  }) => {
    // Page 2 of the event creation process
    const p2 = createEventOccurrencesPage;

    // Create event occurrences page is ready and using the correct language
    await p2.gotoCreateEventOccurrencesPage(getTestPage2Url(lang));
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

    await expect(p2.occurrencesTable).toBeHidden();

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

LANGUAGES.forEach((lang) => {
  test(`a new event's occurrences (page 2/3) can be added using language ${lang}`, async ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    searchPage, // TODO: Used here only for authorization, refactoring needed
    createEventOccurrencesPage,
    eventSummaryPage,
    mockKeywordQueries,
    mockEventQueryAfterPage1Save,
    mockAnnantaloPlacesQuery,
    mockAnnantaloVenueQuery,
    mockAddOccurrenceMutation,
    mockEditEventMutation,
    mockEditVenueMutation,
  }) => {
    // Page 2 of the event creation process
    const p2 = createEventOccurrencesPage;

    // Create event occurrences page is ready and using the correct language
    await p2.gotoCreateEventOccurrencesPage(getTestPage2Url(lang));
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

    // The location description should be pre-filled using the mocked venue query
    await expect(p2.locationDescriptionTextBox).toBeVisible();
    await expect(p2.locationDescriptionTextBox).toBeEnabled();
    await expect(p2.locationDescriptionTextBox).toHaveValue(
      'Suomenkielinen oletuskuvaus Annantalolle.'
    );

    for (const locationFeatureCheckbox of p2.locationFeatureCheckboxes) {
      await expect(locationFeatureCheckbox).toBeVisible();
      await expect(locationFeatureCheckbox).toBeEnabled();
    }

    // The location features should be pre-(un)checked using the mocked venue query
    await expect(p2.clothingStorageCheckbox).toBeChecked();
    await expect(p2.indoorPlayingAreaCheckbox).toBeChecked();
    await expect(p2.toiletNearbyCheckbox).toBeChecked();
    await expect(p2.areaForGroupWorkCheckbox).not.toBeChecked();
    await expect(p2.outdoorActivityCheckbox).not.toBeChecked();
    await expect(p2.outdoorPlayingAreaCheckbox).not.toBeChecked();
    await expect(p2.snackEatingPlaceCheckbox).not.toBeChecked();

    await p2.fillTextBox(
      p2.locationDescriptionTextBox,
      'Annantalo on taidekeskus Helsingissä.'
    );

    // Add a non-default location feature
    await p2.areaForGroupWorkCheckbox.check();

    // A date that won't run out during this application's lifetime
    await p2.fillTextBox(p2.enrolmentStartDateTextBox, '31.12.2199');
    await p2.fillTextBox(p2.enrolmentStartHoursTextBox, '16');
    await p2.fillTextBox(p2.enrolmentStartMinutesTextBox, '30');

    await p2.fillTextBox(p2.enrolmentEndDaysSpinButton, '2');
    await p2.fillTextBox(p2.necessaryVisitsSpinButton, '1');

    await p2.autoAcceptRegistrationsCheckbox.check();

    await expect(p2.autoAcceptanceMessageTextBox).toBeVisible();
    await expect(p2.autoAcceptanceMessageTextBox).toBeEnabled();
    await expect(p2.autoAcceptanceMessageTextBox).toBeEmpty();

    p2.fillTextBox(p2.autoAcceptanceMessageTextBox, 'Peruutukset 2pv ennen');

    //-----------------------------------------------------------------
    // Fill "Occurrences" section data
    //-----------------------------------------------------------------

    // Occurrence location should be pre-filled with the selected default venue
    await p2.hasSelectedOccurrenceLocation(p2.t('annantalo'));

    // A date that won't run out during this application's lifetime
    await p2.fillTextBox(p2.occurrenceDateTextBox, '21.6.2200');

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

    //-----------------------------------------------------------------
    // Add the occurrence to the event
    //-----------------------------------------------------------------
    const addOccurrenceRequestPromise =
      p2.waitForGraphQLRequest('AddOccurrence');

    await expect(p2.occurrencesTable).toBeHidden();
    await p2.addNewOccurrenceButton.click();
    await p2.isReady();
    await expect(p2.occurrencesTable).toBeVisible();
    await expect(p2.occurrencesTableRows).toHaveCount(2); // Header & occurrence row

    //-----------------------------------------------------------------
    // Test that AddOccurrence request is sent using the filled data
    //-----------------------------------------------------------------
    const addOccurrenceRequest = await addOccurrenceRequestPromise;
    const addOccurrenceVariables =
      addOccurrenceRequest.postDataJSON().variables;

    expect(addOccurrenceVariables).toEqual(
      expect.objectContaining({
        input: {
          startTime: '2200-06-21T05:00:00.000Z',
          endTime: '2200-06-21T06:00:00.000Z',
          languages: [{ id: 'fi' }, { id: 'sv' }, { id: 'en' }],
          pEventId: 'UGFsdmVsdXRhcmpvdGluRXZlbnROb2RlOjE1NjY=',
          placeId: 'tprek:7254',
          amountOfSeats: 80,
          minGroupSize: 2,
          maxGroupSize: 10,
          seatType: 'CHILDREN_COUNT',
        },
      })
    );

    //-----------------------------------------------------------------
    // Go to the next step
    //-----------------------------------------------------------------

    // Start waiting for the expected upcoming mutations
    const editEventRequestPromise = p2.waitForGraphQLRequest('EditEvent');
    const editVenueRequestPromise = p2.waitForGraphQLRequest('EditVenue');

    // Override the already mocked event query response to return the new data at page 2 save
    // i.e. including the added occurrence and the edited venue:
    await p2.mockGraphQL({
      operationName: 'Event',
      responseData: MOCK_EVENT_QUERY_RESPONSE_AFTER_PAGE_2_SAVE,
    });

    await p2.goToPublishingButton.click();

    // Test that the EditEvent request was sent with the correct data
    const editEventRequest = await editEventRequestPromise;
    const editEventVariables = editEventRequest.postDataJSON().variables;

    expect(editEventVariables).toEqual(
      expect.objectContaining({
        event: {
          id: 'kultus:agls75a3jm',
          name: {
            en: '',
            fi: 'Testitapahtuman nimi',
            sv: '',
          },
          startTime: '2025-06-02T09:23:35.687000Z',
          endTime: null,
          offers: [
            {
              isFree: false,
              description: {
                en: '',
                fi: 'Vain korttimaksu',
                sv: '',
              },
              price: {
                en: '10',
                fi: '10',
                sv: '10',
              },
              infoUrl: null,
            },
          ],
          shortDescription: {
            en: '',
            fi: 'Lyhyt kuvaus',
            sv: '',
          },
          description: {
            en: '',
            fi: '<p>Pitempi kuvaus</p>\n',
            sv: '',
          },
          images: [],
          infoUrl: {
            en: '',
            fi: 'https://example.org/testi/',
            sv: '',
          },
          audience: [
            {
              internalId:
                'https://linkedevents.api.test.hel.ninja/v1/keyword/kultus:40/',
            },
            {
              internalId:
                'https://linkedevents.api.test.hel.ninja/v1/keyword/kultus:58/',
            },
          ],
          inLanguage: [],
          keywords: [
            {
              internalId:
                'https://linkedevents.api.test.hel.ninja/v1/keyword/kultus:17/',
            },
            {
              internalId:
                'https://linkedevents.api.test.hel.ninja/v1/keyword/kultus:5/',
            },
            {
              internalId:
                'https://linkedevents.api.test.hel.ninja/v1/keyword/yso:p18434/',
            },
          ],
          location: {
            internalId:
              // The location's internalId DOES NOT come from the mocked queries
              // as with the other fields like audience and keywords. Frontend
              // instead uses the Linked Events API's URL from environment, so
              // matching with a hardcoded URL does not work, e.g. with:
              // 'https://linkedevents.api.test.hel.ninja/v1/place/tprek:7254/'
              //
              // Therefore let's just match on the start & end of the URL:
              expect.stringMatching(/^http.*\/v1\/place\/tprek:7254\/$/),
          },
          draft: true,
          organisationId: 'T3JnYW5pc2F0aW9uTm9kZTox',
          pEvent: {
            contactEmail: 'admin@example.com',
            contactPersonId:
              'UGVyc29uTm9kZTpjZjNkN2NlYS0xNGQxLTQzNmQtOTNmZS0zOTI4Mzc2ZTQ2YTE=',
            contactPhoneNumber: '+358-50-123456789',
            mandatoryAdditionalInformation: false,
            enrolmentStart: '2199-12-31T14:30:00.000Z',
            enrolmentEndDays: 2,
            neededOccurrences: 1,
            autoAcceptance: true,
            translations: [
              {
                languageCode: 'FI',
                autoAcceptanceMessage: 'Peruutukset 2pv ennen',
              },
            ],
            externalEnrolmentUrl: null,
          },
        },
      })
    );

    // Test that the EditVenue request was sent with the correct data
    const editVenueRequest = await editVenueRequestPromise;
    const editVenueVariables = editVenueRequest.postDataJSON().variables;

    expect(editVenueVariables).toEqual(
      expect.objectContaining({
        venue: {
          id: 'tprek:7254',
          hasClothingStorage: true,
          hasSnackEatingPlace: false,
          outdoorActivity: false,
          hasToiletNearby: true,
          hasAreaForGroupWork: true, // The added non-default location feature
          hasIndoorPlayingArea: true,
          hasOutdoorPlayingArea: false,
          translations: [
            {
              languageCode: 'FI',
              // Manually overwritten description
              description: 'Annantalo on taidekeskus Helsingissä.',
            },
            {
              languageCode: 'SV',
              // Value from the mocked venue query
              description: 'Annegården är ett konstcentrum i Helsingfors.',
            },
            {
              languageCode: 'EN',
              // Value from the mocked venue query
              description: 'Annantalo is an arts centre in Helsinki.',
            },
          ],
        },
      })
    );

    //-----------------------------------------------------------------
    // Test that the next page is loaded in the current language
    //-----------------------------------------------------------------
    await eventSummaryPage.isReady();
    await eventSummaryPage.isInLanguage(lang);
  });
});
