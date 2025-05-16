import type { CreateEventMutation } from '../../generated/graphql';

export const MOCK_CREATE_EVENT_MUTATION_RESPONSE_ON_PAGE_1_SAVE: CreateEventMutation =
  {
    addEventMutation: {
      response: {
        statusCode: 201,
        body: {
          id: 'kultus:agls75a3jm',
          internalId:
            'https://linkedevents.api.test.hel.ninja/v1/event/kultus:agls75a3jm/',
          name: {
            en: '',
            fi: 'Testitapahtuman nimi',
            sv: '',
            __typename: 'LocalisedObject',
          },
          shortDescription: {
            en: '',
            fi: 'Lyhyt kuvaus',
            sv: '',
            __typename: 'LocalisedObject',
          },
          description: {
            en: '',
            fi: '<p>Pitempi kuvaus</p>\n',
            sv: '',
            __typename: 'LocalisedObject',
          },
          images: [],
          offers: [
            {
              isFree: false,
              description: {
                en: '',
                fi: 'Vain korttimaksu',
                sv: '',
                __typename: 'LocalisedObject',
              },
              price: {
                en: '10',
                fi: '10',
                sv: '10',
                __typename: 'LocalisedObject',
              },
              infoUrl: null,
              __typename: 'Offer',
            },
          ],
          pEvent: {
            id: 'UGFsdmVsdXRhcmpvdGluRXZlbnROb2RlOjE1NjY=',
            neededOccurrences: 1,
            autoAcceptance: false,
            autoAcceptanceMessage: null,
            __typename: 'PalvelutarjotinEventNode',
          },
          infoUrl: {
            en: '',
            fi: 'https://example.org/testi/',
            sv: '',
            __typename: 'LocalisedObject',
          },
          __typename: 'Event',
        },
        __typename: 'EventMutationResponse',
      },
      __typename: 'AddEventMutation',
    },
  };
