import { LANGUAGES } from '../constants';
import { test, expect } from '../testWithFixtures';

LANGUAGES.forEach((lang) => {
  test(`add new event button goes to valid event creation page using language ${lang}`, async ({
    searchPage,
    createEventBasicInfoPage,
  }) => {
    await searchPage.gotoSearchPage(lang);
    await searchPage.hasVisibleAddNewEventButton(lang);
    await searchPage.clickAddNewEventButton(lang);

    // Page 1 of the event creation process
    const p1 = createEventBasicInfoPage;

    // Create event basic info page is ready and using the correct language
    await p1.isReady();
    await p1.isInLanguage(lang);
    p1.setTestTranslationLanguage(lang);

    //-----------------------------------------------------------------
    // "Basic information" section is correctly initialized
    //-----------------------------------------------------------------
    await expect(p1.basicInfoHeading).toBeVisible();

    await expect(p1.eventNameTextBox).toBeVisible();
    await expect(p1.eventNameTextBox).toBeEnabled();
    await expect(p1.eventNameTextBox).toBeEmpty();

    await expect(p1.shortDescriptionTextBox).toBeVisible();
    await expect(p1.shortDescriptionTextBox).toBeEnabled();
    await expect(p1.shortDescriptionTextBox).toBeEmpty();

    await expect(p1.descriptionTextBox).toBeVisible();
    await expect(p1.descriptionTextBox).toBeEnabled();
    await expect(p1.descriptionTextBox).toBeEmpty();

    await expect(p1.mandatoryExtraInfoCheckbox).toBeVisible();
    await expect(p1.mandatoryExtraInfoCheckbox).toBeEnabled();
    await expect(p1.mandatoryExtraInfoCheckbox).not.toBeChecked();

    await expect(p1.isQueueingAllowedCheckbox).toBeVisible();
    await expect(p1.isQueueingAllowedCheckbox).toBeEnabled();
    await expect(p1.isQueueingAllowedCheckbox).toBeChecked();

    await expect(p1.addImageButton).toBeVisible();
    await expect(p1.addImageButton).toBeEnabled();

    await expect(p1.infoUrlTextBox).toBeVisible();
    await expect(p1.infoUrlTextBox).toBeEnabled();
    await expect(p1.infoUrlTextBox).toBeEmpty();

    //-----------------------------------------------------------------
    // "Event classifications" section is correctly initialized
    //-----------------------------------------------------------------
    await expect(p1.eventClassificationsHeading).toBeVisible();

    await expect(p1.targetGroupsDropdownButton).toBeVisible();
    await expect(p1.targetGroupsDropdownButton).toBeEnabled();

    await expect(p1.categoriesDropdownButton).toBeVisible();
    await expect(p1.categoriesDropdownButton).toBeEnabled();

    await expect(p1.activitiesDropdownButton).toBeVisible();
    await expect(p1.activitiesDropdownButton).toBeEnabled();

    await expect(p1.eventKeywordsTextBox).toBeVisible();
    await expect(p1.eventKeywordsTextBox).toBeEnabled();

    await expect(p1.targetGroupsListBox).toBeHidden();
    await expect(p1.categoriesListBox).toBeHidden();
    await expect(p1.activitiesListBox).toBeHidden();
    await expect(p1.eventKeywordsListBox).toBeHidden();

    //-----------------------------------------------------------------
    // "Event pricing" section is correctly initialized
    //-----------------------------------------------------------------
    await expect(p1.eventPricingHeading).toBeVisible();

    await expect(p1.priceTextBox).toBeVisible();
    await expect(p1.priceTextBox).toBeDisabled();
    await expect(p1.priceTextBox).toBeEmpty();

    await expect(p1.eventIsFreeCheckbox).toBeVisible();
    await expect(p1.eventIsFreeCheckbox).toBeEnabled();
    await expect(p1.eventIsFreeCheckbox).toBeChecked();

    await expect(p1.additionalInfoTextBox).toBeVisible();
    await expect(p1.additionalInfoTextBox).toBeDisabled();

    //-----------------------------------------------------------------
    // "Contact person" section is correctly initialized
    //-----------------------------------------------------------------
    await expect(p1.contactPersonHeading).toBeVisible();
    await expect(p1.contactPersonHeading).toBeEnabled();

    await expect(p1.contactPersonNameDropdownButton).toBeVisible();
    await expect(p1.contactPersonNameDropdownButton).toBeEnabled();

    await expect(p1.contactPersonNameListBox).toBeHidden();

    await expect(p1.emailTextBox).toBeVisible();
    await expect(p1.emailTextBox).toBeEnabled();
    await expect(p1.emailTextBox).toBeEmpty();

    await expect(p1.phoneTextBox).toBeVisible();
    await expect(p1.phoneTextBox).toBeEnabled();
    await expect(p1.phoneTextBox).toBeEmpty();

    //-----------------------------------------------------------------
    // Action buttons at the end of the page are correctly initialized
    //-----------------------------------------------------------------
    await expect(p1.cancelButton).toBeVisible();
    await expect(p1.cancelButton).toBeEnabled();

    await expect(p1.saveAndGoToOccurrencesButton).toBeVisible();
    await expect(p1.saveAndGoToOccurrencesButton).toBeEnabled();
  });
});

LANGUAGES.forEach((lang) => {
  test(`a new event's basic info (page 1/3) can be added using language ${lang}`, async ({
    searchPage,
    createEventBasicInfoPage,
    createEventOccurrencesPage,
    mockKeywordQueries,
    mockCreateEventMutationForPage1Save,
    mockEventQueryAfterPage1Save,
  }) => {
    await searchPage.gotoSearchPage(lang);
    await searchPage.hasVisibleAddNewEventButton(lang);
    await searchPage.clickAddNewEventButton(lang);

    // Page 1 of the event creation process
    const p1 = createEventBasicInfoPage;

    // Create event basic info page is ready and using the correct language
    await p1.isReady();
    await p1.isInLanguage(lang);
    p1.setTestTranslationLanguage(lang);

    //-----------------------------------------------------------------
    // Fill "Basic information" section
    //-----------------------------------------------------------------
    await p1.fillTextBox(p1.eventNameTextBox, 'Testitapahtuman nimi');
    await p1.fillTextBox(p1.shortDescriptionTextBox, 'Lyhyt kuvaus');
    await p1.fillRichEditorTextBox(p1.descriptionTextBox, 'Pitempi kuvaus');
    await p1.fillTextBox(p1.infoUrlTextBox, 'https://example.org/testi/');

    //-----------------------------------------------------------------
    // Fill "Event classifications" section
    //-----------------------------------------------------------------
    await p1.openDropdown(p1.targetGroupsDropdownButton);
    await p1.checkListBoxOption(p1.targetGroupsListBox, p1.t('zeroToTwoYears'));
    await p1.checkListBoxOption(p1.targetGroupsListBox, p1.t('upper2ndVocEd'));
    await p1.closeDropdown(p1.targetGroupsDropdownButton);

    await p1.openDropdown(p1.categoriesDropdownButton);
    await p1.checkListBoxOption(p1.categoriesListBox, p1.t('music'));
    await p1.closeDropdown(p1.categoriesDropdownButton);

    await p1.openDropdown(p1.activitiesDropdownButton);
    await p1.checkListBoxOption(p1.activitiesListBox, p1.t('concert'));
    await p1.closeDropdown(p1.activitiesDropdownButton);

    await p1.fillTextBox(p1.eventKeywordsTextBox, 'musiikki'); // Initialize search
    await p1.waitForAutoSuggestListsToBeLoaded();
    await p1.clickListBoxOption(p1.eventKeywordsListBox, p1.t('artMusic'));

    //-----------------------------------------------------------------
    // Fill "Event pricing" section
    //-----------------------------------------------------------------
    await p1.eventIsFreeCheckbox.click();
    await expect(p1.eventIsFreeCheckbox).not.toBeChecked();

    await expect(p1.priceTextBox).toBeEnabled();
    await p1.fillTextBox(p1.priceTextBox, '10'); // Euros

    await expect(p1.additionalInfoTextBox).toBeEnabled();
    await p1.fillTextBox(p1.additionalInfoTextBox, 'Vain korttimaksu');

    //-----------------------------------------------------------------
    // Fill "Contact person" section
    //-----------------------------------------------------------------
    await p1.openDropdown(p1.contactPersonNameDropdownButton);
    await p1.clickSingleSelectListBoxOption(
      p1.contactPersonNameListBox,
      'Test-admin'
    );
    await p1.isDropdownClosed(p1.contactPersonNameDropdownButton);
    await p1.fillTextBox(p1.emailTextBox, 'admin@example.com');
    await p1.fillTextBox(p1.phoneTextBox, '+358-50-123456789');

    const createEventRequestPromise = p1.waitForGraphQLRequest('CreateEvent');

    //-----------------------------------------------------------------
    // Save and go to next step
    //-----------------------------------------------------------------
    await p1.saveAndGoToOccurrencesButton.click();

    //-----------------------------------------------------------------
    // Test that event creation request is sent using the filled data
    //-----------------------------------------------------------------
    const createEventRequest = await createEventRequestPromise;
    const createEventVariables = createEventRequest.postDataJSON().variables;

    const expectedCreateEventVariables = {
      event: {
        name: {
          fi: 'Testitapahtuman nimi',
          sv: '',
          en: '',
        },
        startTime: expect.any(String), // Test more below
        offers: [
          {
            isFree: false,
            price: {
              fi: '10',
              en: '10',
              sv: '10',
            },
            description: {
              fi: 'Vain korttimaksu',
              sv: '',
              en: '',
            },
          },
        ],
        shortDescription: {
          fi: 'Lyhyt kuvaus',
          sv: '',
          en: '',
        },
        description: {
          fi: '<p>Pitempi kuvaus</p>\n',
          sv: '',
          en: '',
        },
        images: [],
        infoUrl: {
          fi: 'https://example.org/testi/',
          sv: '',
          en: '',
        },
        audience: [
          {
            // 0-2 years
            internalId:
              'https://linkedevents.api.test.hel.ninja/v1/keyword/kultus:40/',
          },
          {
            // Upper secondary and vocational education
            internalId:
              'https://linkedevents.api.test.hel.ninja/v1/keyword/kultus:58/',
          },
        ],
        inLanguage: [],
        keywords: [
          {
            // Art music
            internalId:
              'https://linkedevents.api.test.hel.ninja/v1/keyword/yso:p18434/',
          },
          {
            // Concert
            internalId:
              'https://linkedevents.api.test.hel.ninja/v1/keyword/kultus:5/',
          },
          {
            // Music
            internalId:
              'https://linkedevents.api.test.hel.ninja/v1/keyword/kultus:17/',
          },
        ],
        pEvent: {
          contactEmail: 'admin@example.com',
          contactPersonId: expect.any(String), // Test more below
          contactPhoneNumber: '+358-50-123456789',
          neededOccurrences: 1,
          mandatoryAdditionalInformation: false,
          isQueueingAllowed: true,
          translations: [],
        },
        organisationId: expect.any(String), // Test more below
        draft: true,
      },
    };

    expect(createEventVariables).toEqual(
      expect.objectContaining(expectedCreateEventVariables)
    );

    const startTime = createEventVariables?.event?.startTime;
    const contactPersonId =
      createEventVariables?.event?.pEvent?.contactPersonId;
    const organisationId = createEventVariables?.event?.organisationId;

    // Check that startTime is exactly ISO 8601 format datetime
    // e.g. startTime: '2025-06-02T10:29:59.239Z'
    expect(new Date(startTime).toISOString()).toBe(startTime);

    // Check that contactPersonId and organisationId are valid base64 encoded strings, e.g.
    // contactPersonId: 'UGVyc29uTm9kZTpiOTg5ZjE2Ny05YmZjLTQxYjMtODk4Zi1hNmMyMTdlMGI0N2U=',
    // organisationId: 'T3JnYW5pc2F0aW9uTm9kZTox'
    expect(Buffer.from(contactPersonId, 'base64').toString('base64')).toBe(
      contactPersonId
    );
    expect(Buffer.from(organisationId, 'base64').toString('base64')).toBe(
      organisationId
    );

    const decodedContactPersonId = Buffer.from(
      contactPersonId,
      'base64'
    ).toString('utf-8');

    const decodedOrganisationId = Buffer.from(
      organisationId,
      'base64'
    ).toString('utf-8');

    // Make sure the decoded IDs have correct prefixes
    expect(decodedContactPersonId).toMatch(/^PersonNode:/);
    expect(decodedOrganisationId).toMatch(/^OrganisationNode:/);

    //-----------------------------------------------------------------
    // Test that the next page is loaded in the current language
    //-----------------------------------------------------------------
    await createEventOccurrencesPage.isReady();
    await createEventOccurrencesPage.isInLanguage(lang);
  });
});
