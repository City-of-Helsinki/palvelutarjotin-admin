import type { Language } from '../../types';
import { LANGUAGES } from '../constants';
import { MOCK_EVENT_QUERY_RESPONSE_AFTER_PUBLISHING } from '../mocks/eventQuery.mock';
import { expect, test } from '../testWithFixtures';

const getTestPage3Url = (lang: Language) =>
  `/${lang}/events/kultus:agls75a3jm/summary` as const;

LANGUAGES.forEach((lang) => {
  test(`a new event (page 3/3) can be published using language ${lang}`, async ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    searchPage, // TODO: Used here only for authorization, refactoring needed
    eventSummaryPage,
    mockEventQueryAfterPage2Save,
    mockKeywordQueries,
    mockAnnantaloPlacesQuery,
    mockAnnantaloVenueQuery,
    mockPublishSingleEventMutation,
  }) => {
    // Page 3 of the event creation process
    const p3 = eventSummaryPage;

    // Create event's publish page is ready and using the correct language
    await p3.gotoEventSummaryPage(getTestPage3Url(lang));
    await p3.isReady();
    await p3.hasTitle('Testitapahtuman nimi');
    await p3.isInLanguage(lang);
    p3.setTestTranslationLanguage(lang);

    await expect(p3.publishEventButton).toBeVisible();
    await expect(p3.publishEventButton).toBeEnabled();

    // Publish confirmation modal dialog should not be visible yet
    await expect(p3.modalDialog).toBeHidden();
    await expect(p3.cancelPublicationButton).toBeHidden();
    await expect(p3.confirmPublicationButton).toBeHidden();

    //-----------------------------------------------------------------
    // Publish the event
    //-----------------------------------------------------------------
    await p3.publishEventButton.click();

    // Publish confirmation modal dialog should now be open
    await expect(p3.modalDialog).toBeVisible();

    await expect(p3.cancelPublicationButton).toBeVisible();
    await expect(p3.cancelPublicationButton).toBeEnabled();

    await expect(p3.confirmPublicationButton).toBeVisible();
    await expect(p3.confirmPublicationButton).toBeEnabled();

    //-----------------------------------------------------------------
    // Confirm the publication
    //-----------------------------------------------------------------
    const publishSingleEventRequestPromise =
      p3.waitForGraphQLRequest('publishSingleEvent');

    // Override the already mocked event query response to return the data after publishing
    // i.e. with the event's publication status set to public
    await p3.mockGraphQL({
      operationName: 'Event',
      responseData: MOCK_EVENT_QUERY_RESPONSE_AFTER_PUBLISHING,
    });

    await p3.confirmPublicationButton.click();

    // The publish confirmation modal dialog should close
    await expect(p3.modalDialog).toBeHidden();

    //-----------------------------------------------------------------
    // Test that publishSingleEvent request is sent using correct data
    //-----------------------------------------------------------------
    const publishSingleEventRequest = await publishSingleEventRequestPromise;
    const publishSingleEventVariables =
      publishSingleEventRequest.postDataJSON().variables;

    expect(publishSingleEventVariables).toEqual(
      expect.objectContaining({
        event: {
          id: 'kultus:agls75a3jm',
          location: {
            internalId:
              'https://linkedevents.api.test.hel.ninja/v1/place/tprek:7254/',
          },
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
          name: {
            en: '',
            fi: 'Testitapahtuman nimi',
            sv: '',
          },
          description: {
            en: '',
            fi: '<p>Pitempi kuvaus</p>\n',
            sv: '',
          },
          pEvent: {
            neededOccurrences: 1,
            mandatoryAdditionalInformation: false,
          },
          shortDescription: {
            en: '',
            fi: 'Lyhyt kuvaus',
            sv: '',
          },
          organisationId: 'T3JnYW5pc2F0aW9uTm9kZTox',
        },
      })
    );

    // The publish event button should not be available after publishing
    await expect(p3.publishEventButton).toBeHidden();

    // The event should be shown as published
    await expect(p3.eventPublishedText).toBeVisible();
  });
});
