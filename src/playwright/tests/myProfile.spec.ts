import {
  Language,
  OrganisationsOrganisationTypeChoices,
} from '../../generated/graphql';
import { LANGUAGES } from '../constants';
import { expect, test } from '../testWithFixtures';

LANGUAGES.forEach((lang) => {
  test(`my profile's contact info is shown & can be changed using language ${lang}`, async ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    searchPage, // TODO: Used here only for authorization, refactoring needed
    myProfilePage,
    // This test should TEST the REAL BACKEND connection, so NO MOCK FIXTURES here!
    // This is to ensure that not all tests just pass because of mocked responses.
  }) => {
    await myProfilePage.gotoMyProfilePage(lang);

    await myProfilePage.isInLanguage(lang);
    await myProfilePage.setTestTranslationLanguage(lang);

    //-----------------------------------------------------------------
    // Test initial state of the page
    //-----------------------------------------------------------------
    await expect(myProfilePage.nameTextBox).toBeVisible();
    await expect(myProfilePage.nameTextBox).toBeEnabled();
    await expect(myProfilePage.nameTextBox).toHaveValue('Test-admin');

    await expect(myProfilePage.contactEmailTextBox).toBeVisible();
    await expect(myProfilePage.contactEmailTextBox).toBeEnabled();
    await expect(myProfilePage.contactEmailTextBox).toHaveValue(
      'kultus-admin-ui-browser-test-admin-user@kultus.hel.fi'
    );

    await expect(myProfilePage.phoneNumberTextBox).toBeVisible();
    await expect(myProfilePage.phoneNumberTextBox).toBeEnabled();

    // Phone number is initially empty, but it's changed by this test, and
    // different language versions of this test can be run in parallel,
    // so it may have been set by another run already. So allow both:
    await expect(myProfilePage.phoneNumberTextBox).toHaveValue(
      /^(\+358 321 654 987)?$/
    );

    await expect(myProfilePage.venuesTextBox).toBeVisible();
    await expect(myProfilePage.venuesTextBox).toBeEnabled();
    await expect(myProfilePage.venuesTextBox).toBeEmpty();

    await expect(myProfilePage.languageDropdownButton).toBeVisible();
    await expect(myProfilePage.languageDropdownButton).toBeEnabled();
    await expect(myProfilePage.languageDropdownButton).toHaveText(
      myProfilePage.t('finnishLanguage')
    );

    await expect(myProfilePage.saveUpdatedInfoButton).toBeVisible();
    await expect(myProfilePage.saveUpdatedInfoButton).toBeEnabled();

    //-----------------------------------------------------------------
    // Change the phone number to non-empty value to be able to save
    //-----------------------------------------------------------------
    await myProfilePage.fillTextBox(
      myProfilePage.phoneNumberTextBox,
      '+358 321 654 987'
    );

    //-----------------------------------------------------------------
    // Save profile changes and test UpdateMyProfile request/response
    //-----------------------------------------------------------------
    const updateMyProfileRequestPromise =
      myProfilePage.waitForGraphQLRequest('UpdateMyProfile');

    const updateMyProfileResponsePromise =
      myProfilePage.waitForGraphQLResponse('UpdateMyProfile');

    // Save the profile changes
    await expect(myProfilePage.myProfileSaveSuccessHeading).toBeHidden();
    await myProfilePage.saveUpdatedInfoButton.click();
    await expect(myProfilePage.myProfileSaveSuccessHeading).toBeVisible();

    const updateMyProfileRequest = await updateMyProfileRequestPromise;

    // Test that the update my profile request was sent with correct data
    const updateMyProfileVariables =
      updateMyProfileRequest.postDataJSON().variables;

    const expectedPersonData = {
      name: 'Test-admin',
      phoneNumber: '+358 321 654 987',
      emailAddress: 'kultus-admin-ui-browser-test-admin-user@kultus.hel.fi',
      placeIds: [],
      language: Language.Fi,
    } as const;

    expect(updateMyProfileVariables).toEqual(
      expect.objectContaining({
        myProfile: {
          ...expectedPersonData,
        },
      })
    );

    // Test that the update my my profile response is correct
    // NOTE: This TESTS the REAL BACKEND connection, THIS IS NOT A MOCK RESPONSE!
    const updateMyProfileResponse = await updateMyProfileResponsePromise;

    const responseBodyJson = await updateMyProfileResponse.json();

    // Test that the real backend returned a valid response.
    //
    // NOTE: Intentionally allowing any strings for IDs and phone numbers,
    //       they're not that important for this test so opting for robustness.
    expect(responseBodyJson).toEqual(
      expect.objectContaining({
        data: {
          updateMyProfile: {
            myProfile: {
              id: expect.any(String),
              ...expectedPersonData,
              __typename: 'PersonNode',
              organisations: {
                edges: [
                  {
                    node: {
                      id: expect.any(String),
                      name: 'Kulttuurin ja vapaa-ajan toimiala',
                      persons: {
                        edges: [
                          {
                            node: {
                              id: expect.any(String),
                              ...expectedPersonData,
                              __typename: 'PersonNode',
                            },
                            __typename: 'PersonNodeEdge',
                          },
                        ],
                        __typename: 'PersonNodeConnection',
                      },
                      phoneNumber: expect.any(String),
                      publisherId: 'ahjo:u480400',
                      type: OrganisationsOrganisationTypeChoices.Provider,
                      __typename: 'OrganisationNode',
                    },
                    __typename: 'OrganisationNodeEdge',
                  },
                  {
                    node: {
                      id: expect.any(String),
                      name: 'Kulttuuripalvelukokonaisuus',
                      persons: {
                        edges: [
                          {
                            node: {
                              id: expect.any(String),
                              ...expectedPersonData,
                              __typename: 'PersonNode',
                            },
                            __typename: 'PersonNodeEdge',
                          },
                        ],
                        __typename: 'PersonNodeConnection',
                      },
                      phoneNumber: expect.any(String),
                      publisherId: 'ahjo:u48040010',
                      type: OrganisationsOrganisationTypeChoices.Provider,
                      __typename: 'OrganisationNode',
                    },
                    __typename: 'OrganisationNodeEdge',
                  },
                  {
                    node: {
                      id: expect.any(String),
                      name: 'Kultus',
                      persons: {
                        edges: [
                          {
                            node: {
                              id: expect.any(String),
                              ...expectedPersonData,
                              __typename: 'PersonNode',
                            },
                            __typename: 'PersonNodeEdge',
                          },
                        ],
                        __typename: 'PersonNodeConnection',
                      },
                      phoneNumber: expect.any(String),
                      publisherId: 'kultus:0',
                      type: OrganisationsOrganisationTypeChoices.User,
                      __typename: 'OrganisationNode',
                    },
                    __typename: 'OrganisationNodeEdge',
                  },
                ],
                __typename: 'OrganisationNodeConnection',
              },
              organisationproposalSet: {
                edges: [],
                __typename: 'OrganisationProposalNodeConnection',
              },
            },
            __typename: 'UpdateMyProfileMutationPayload',
          },
        },
      })
    );
  });
});
