import type { PublishSingleEventMutation } from '../../generated/graphql';

export const MOCK_PUBLISH_SINGLE_EVENT_MUTATION_RESPONSE: PublishSingleEventMutation =
  {
    publishEventMutation: {
      response: {
        statusCode: 200,
        body: {
          id: 'kultus:agls75a3jm',
          internalId:
            'https://linkedevents.api.test.hel.ninja/v1/event/kultus:agls75a3jm/',
          publicationStatus: 'public',
          __typename: 'Event',
        },
        // `resultText` is a JSON string, so JSON.parse(resultText) would return the object
        resultText: JSON.stringify({
          id: 'kultus:agls75a3jm',
          has_user_editable_resources: false,
          location: {
            '@id':
              'https://linkedevents.api.test.hel.ninja/v1/place/tprek:7254/',
          },
          keywords: [
            {
              '@id':
                'https://linkedevents.api.test.hel.ninja/v1/keyword/kultus:17/',
            },
            {
              '@id':
                'https://linkedevents.api.test.hel.ninja/v1/keyword/kultus:5/',
            },
            {
              '@id':
                'https://linkedevents.api.test.hel.ninja/v1/keyword/yso:p18434/',
            },
          ],
          registration: null,
          super_event: null,
          event_status: 'EventScheduled',
          type_id: 'General',
          publication_status: 'public',
          external_links: [],
          offers: [
            {
              is_free: false,
              offer_price_groups: [],
              price: {
                fi: '10',
                sv: '10',
                en: '10',
              },
              info_url: null,
              description: {
                fi: 'Vain korttimaksu',
                sv: '',
                en: '',
              },
            },
          ],
          data_source: 'kultus',
          publisher: 'ahjo:u480400',
          sub_events: [],
          images: [],
          videos: [],
          in_language: [],
          audience: [
            {
              '@id':
                'https://linkedevents.api.test.hel.ninja/v1/keyword/kultus:40/',
            },
            {
              '@id':
                'https://linkedevents.api.test.hel.ninja/v1/keyword/kultus:58/',
            },
          ],
          created_time: '2025-06-02T09:23:35.687000Z',
          last_modified_time: '2025-06-02T09:23:35.687000Z',
          date_published: null,
          start_time: '2200-06-21T05:00:00Z',
          end_time: '2200-06-21T06:00:00Z',
          created_by: ' - ',
          last_modified_by: 'API key from data source kultus',
          custom_data: null,
          user_name: null,
          user_email: null,
          user_phone_number: null,
          user_organization: null,
          user_consent: false,
          environmental_certificate: null,
          environment: null,
          audience_min_age: null,
          audience_max_age: null,
          super_event_type: null,
          deleted: false,
          maximum_attendee_capacity: null,
          minimum_attendee_capacity: null,
          enrolment_start_time: '2199-12-31T16:30:00+02:00',
          enrolment_end_time: '2200-06-19T08:00:00+03:00',
          local: false,
          replaced_by: null,
          location_extra_info: null,
          provider: null,
          name: {
            fi: 'Testitapahtuman nimi',
            sv: '',
            en: '',
          },
          description: {
            fi: '<p>Pitempi kuvaus</p>\n',
            sv: '',
            en: '',
          },
          info_url: {
            fi: 'https://example.org/testi/',
            sv: '',
            en: '',
          },
          provider_contact_info: null,
          short_description: {
            fi: 'Lyhyt kuvaus',
            sv: '',
            en: '',
          },
          '@id':
            'https://linkedevents.api.test.hel.ninja/v1/event/kultus:agls75a3jm/',
          '@context': 'http://schema.org',
          '@type': 'Event/LinkedEvent',
        }),
        __typename: 'EventMutationResponse',
      },
      __typename: 'PublishEventMutation',
    },
  };
