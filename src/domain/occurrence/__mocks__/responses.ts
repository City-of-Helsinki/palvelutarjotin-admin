import {
  EventFieldsFragment,
  OccurrenceFieldsFragment,
  PlaceFieldsFragment,
  VenueFieldsFragment,
} from '../../../generated/graphql';

export const eventResult = {
  data: {
    event: {
      id: 'palvelutarjotin:afzunowba4',
      endTime: '',
      internalId:
        'https://api.hel.fi/linkedevents-test/v1/event/palvelutarjotin:afzunowba4/',
      name: {
        en: null,
        fi: 'Tapahtuma 13.7.2020',
        sv: null,
        __typename: 'LocalisedObject',
      },
      shortDescription: {
        en: null,
        fi: 'Tapahtuma 13.7.2020',
        sv: null,
        __typename: 'LocalisedObject',
      },
      description: {
        en: null,
        fi:
          'Tapahtuma 13.7.2020 Tapahtuma 13.7.2020 Tapahtuma 13.7.2020 Tapahtuma 13.7.2020 Tapahtuma 13.7.2020 Tapahtuma 13.7.2020 Tapahtuma 13.7.2020 Tapahtuma 13.7.2020 Tapahtuma 13.7.2020 Tapahtuma 13.7.2020 Tapahtuma 13.7.2020 Tapahtuma 13.7.2020 Tapahtuma 13.7.2020 Tapahtuma 13.7.2020 Tapahtuma 13.7.2020 Tapahtuma 13.7.2020',
        sv: null,
        __typename: 'LocalisedObject',
      },
      images: [
        {
          id: '48566',
          internalId: 'https://api.hel.fi/linkedevents-test/v1/image/48566/',
          license: 'cc_by',
          name: 'Screenshot 2020-07-07 at 10.48.19.png',
          url:
            'https://api.hel.fi/linkedevents-test/media/images/Screenshot_2020-07-07_at_10.48.19.png',
          cropping: '59,0,503,444',
          photographerName: 'asd',
          altText: 'asd',
          __typename: 'Image',
        },
      ],
      infoUrl: { en: null, fi: '', sv: null, __typename: 'LocalisedObject' },
      pEvent: {
        id: 'UGFsdmVsdXRhcmpvdGluRXZlbnROb2RlOjcw',
        contactPerson: {
          id:
            'UGVyc29uTm9kZTo0MGZmYTIwMS1mOWJhLTQyZTYtYjY3Ny01MWQyM2Q4OGQ4ZDk=',
          emailAddress: '',
          name: 'Santeri',
          phoneNumber: '',
          language: 'FI',
          __typename: 'PersonNode',
        },
        autoAcceptance: true,
        contactEmail: 'santtu_1993@hotmail.com',
        contactPhoneNumber: '0405542959',
        enrolmentEndDays: 3,
        enrolmentStart: '2020-07-13T06:00:00+00:00',
        neededOccurrences: 3,
        organisation: {
          id: 'T3JnYW5pc2F0aW9uTm9kZTox',
          name: 'Kulttuurin ja vapaa-ajan toimiala',
          persons: {
            edges: [
              {
                node: {
                  id:
                    'UGVyc29uTm9kZTpjZjNkN2NlYS0xNGQxLTQzNmQtOTNmZS0zOTI4Mzc2ZTQ2YTE=',
                  emailAddress: 'admin@example.com',
                  name: 'Admin',
                  phoneNumber: '',
                  language: 'FI',
                  __typename: 'PersonNode',
                },
                __typename: 'PersonNodeEdge',
              },
              {
                node: {
                  id:
                    'UGVyc29uTm9kZTpiNTk5MThiNi1iOGRlLTRmOGItYjM3Yy0xYWRhYThmOTRkNWM=',
                  emailAddress: 'jori.lindell@gmail.com',
                  name: 'Jori',
                  phoneNumber: '04412345',
                  language: 'FI',
                  __typename: 'PersonNode',
                },
                __typename: 'PersonNodeEdge',
              },
              {
                node: {
                  id:
                    'UGVyc29uTm9kZTowZWE4MzE4ZS1jNTgyLTQzY2EtYWE5YS1hZmY2YzFjZmVhOWY=',
                  emailAddress: 'kalle.jarvelainen@gmail.com',
                  name: 'Kalle Järveläinen',
                  phoneNumber: '+358505003598',
                  language: 'FI',
                  __typename: 'PersonNode',
                },
                __typename: 'PersonNodeEdge',
              },
              {
                node: {
                  id:
                    'UGVyc29uTm9kZTo2MmYyOTY1ZC05NWEyLTRmODYtODJlOS02OWFhODdhZGVjNDY=',
                  emailAddress: 'lucquocquyen@gmail.com',
                  name: 'Khin Loc',
                  phoneNumber: '0465934991',
                  language: 'FI',
                  __typename: 'PersonNode',
                },
                __typename: 'PersonNodeEdge',
              },
              {
                node: {
                  id:
                    'UGVyc29uTm9kZTowM2Y4YTRiNS1kOTIzLTQ3NWQtOTBmYS1kYzIxY2MwMGM2MDY=',
                  emailAddress: 'matti.saarto@gmail.com',
                  name: 'Matti Saarto',
                  phoneNumber: '0401985188',
                  language: 'FI',
                  __typename: 'PersonNode',
                },
                __typename: 'PersonNodeEdge',
              },
              {
                node: {
                  id:
                    'UGVyc29uTm9kZTo0NjYwOTU4Ny1mOTExLTQ1ZjEtYjEyYy1lNWMzZTJiNWJiMjc=',
                  emailAddress: 'pirjo.mattila@hel.fi',
                  name: 'Pipe',
                  phoneNumber: '041-5121767',
                  language: 'FI',
                  __typename: 'PersonNode',
                },
                __typename: 'PersonNodeEdge',
              },
              {
                node: {
                  id:
                    'UGVyc29uTm9kZTo0MGZmYTIwMS1mOWJhLTQyZTYtYjY3Ny01MWQyM2Q4OGQ4ZDk=',
                  emailAddress: '',
                  name: 'Santeri',
                  phoneNumber: '',
                  language: 'FI',
                  __typename: 'PersonNode',
                },
                __typename: 'PersonNodeEdge',
              },
              {
                node: {
                  id:
                    'UGVyc29uTm9kZTpmNDg5YWFiZC1kZTE4LTQ1M2YtODIxZC1hNjgzNGMxNzZhZTg=',
                  emailAddress: 'tomppa.makinen@gmail.com',
                  name: 'Tomi Mäkinen',
                  phoneNumber: '+358401231234',
                  language: 'FI',
                  __typename: 'PersonNode',
                },
                __typename: 'PersonNodeEdge',
              },
              {
                node: {
                  id:
                    'UGVyc29uTm9kZTowMDVjOGIyNS0zN2YwLTRjNmEtYjZjMi1kYTBkYzI2YTQzY2I=',
                  emailAddress: '',
                  name: 'Ville',
                  phoneNumber: '',
                  language: 'FI',
                  __typename: 'PersonNode',
                },
                __typename: 'PersonNodeEdge',
              },
            ],
            __typename: 'PersonNodeConnection',
          },
          phoneNumber: '123123',
          publisherId: 'ahjo:u480400',
          type: 'PROVIDER',
          __typename: 'OrganisationNode',
        },
        occurrences: {
          edges: [
            {
              node: {
                id: 'T2NjdXJyZW5jZU5vZGU6ODg=',
                pEvent: {
                  id: 'UGFsdmVsdXRhcmpvdGluRXZlbnROb2RlOjcw',
                  __typename: 'PalvelutarjotinEventNode',
                },
                amountOfSeats: 30,
                minGroupSize: 5,
                maxGroupSize: 10,

                languages: [
                  { id: 'en', name: 'English', __typename: 'LanguageType' },
                  { id: 'fi', name: 'Finnish', __typename: 'LanguageType' },
                ],
                startTime: '2020-08-03T09:00:00+00:00',
                endTime: '2020-08-03T09:30:00+00:00',
                placeId: '',
                seatsTaken: 0,
                cancelled: false,
                __typename: 'OccurrenceNode',
              },
              __typename: 'OccurrenceNodeEdge',
            },
            {
              node: {
                id: 'T2NjdXJyZW5jZU5vZGU6ODk=',
                pEvent: {
                  id: 'UGFsdmVsdXRhcmpvdGluRXZlbnROb2RlOjcw',
                  __typename: 'PalvelutarjotinEventNode',
                },
                amountOfSeats: 30,
                minGroupSize: 5,
                maxGroupSize: 10,

                languages: [
                  { id: 'fi', name: 'Finnish', __typename: 'LanguageType' },
                  { id: 'en', name: 'English', __typename: 'LanguageType' },
                ],
                startTime: '2020-08-04T09:00:00+00:00',
                endTime: '2020-08-04T09:30:00+00:00',
                placeId: '',
                seatsTaken: 0,
                cancelled: false,
                __typename: 'OccurrenceNode',
              },
              __typename: 'OccurrenceNodeEdge',
            },
            {
              node: {
                id: 'T2NjdXJyZW5jZU5vZGU6OTA=',
                pEvent: {
                  id: 'UGFsdmVsdXRhcmpvdGluRXZlbnROb2RlOjcw',
                  __typename: 'PalvelutarjotinEventNode',
                },
                amountOfSeats: 30,
                minGroupSize: 5,
                maxGroupSize: 10,

                languages: [
                  { id: 'fi', name: 'Finnish', __typename: 'LanguageType' },
                  { id: 'en', name: 'English', __typename: 'LanguageType' },
                ],
                startTime: '2020-08-05T09:00:00+00:00',
                endTime: '2020-08-05T09:30:00+00:00',
                placeId: '',
                seatsTaken: 0,
                cancelled: false,
                __typename: 'OccurrenceNode',
              },
              __typename: 'OccurrenceNodeEdge',
            },
            {
              node: {
                id: 'T2NjdXJyZW5jZU5vZGU6OTE=',
                pEvent: {
                  id: 'UGFsdmVsdXRhcmpvdGluRXZlbnROb2RlOjcw',
                  __typename: 'PalvelutarjotinEventNode',
                },
                amountOfSeats: 30,
                minGroupSize: 5,
                maxGroupSize: 10,

                languages: [
                  { id: 'fi', name: 'Finnish', __typename: 'LanguageType' },
                  { id: 'en', name: 'English', __typename: 'LanguageType' },
                ],
                startTime: '2020-08-06T09:00:00+00:00',
                endTime: '2020-08-06T09:30:00+00:00',
                placeId: '',
                seatsTaken: 0,
                cancelled: false,
                __typename: 'OccurrenceNode',
              },
              __typename: 'OccurrenceNodeEdge',
            },
            {
              node: {
                id: 'T2NjdXJyZW5jZU5vZGU6OTI=',
                pEvent: {
                  id: 'UGFsdmVsdXRhcmpvdGluRXZlbnROb2RlOjcw',
                  __typename: 'PalvelutarjotinEventNode',
                },
                amountOfSeats: 30,
                minGroupSize: 5,
                maxGroupSize: 10,

                languages: [
                  { id: 'fi', name: 'Finnish', __typename: 'LanguageType' },
                  { id: 'en', name: 'English', __typename: 'LanguageType' },
                ],
                startTime: '2020-08-07T09:30:00+00:00',
                endTime: '2020-08-07T10:30:00+00:00',
                placeId: '',
                seatsTaken: 0,
                cancelled: false,
                __typename: 'OccurrenceNode',
              },
              __typename: 'OccurrenceNodeEdge',
            },
            {
              node: {
                id: 'T2NjdXJyZW5jZU5vZGU6OTM=',
                pEvent: {
                  id: 'UGFsdmVsdXRhcmpvdGluRXZlbnROb2RlOjcw',
                  __typename: 'PalvelutarjotinEventNode',
                },
                amountOfSeats: 30,
                minGroupSize: 5,
                maxGroupSize: 10,

                languages: [
                  { id: 'fi', name: 'Finnish', __typename: 'LanguageType' },
                  { id: 'en', name: 'English', __typename: 'LanguageType' },
                ],
                startTime: '2020-08-10T09:30:00+00:00',
                endTime: '2020-08-10T10:00:00+00:00',
                placeId: '',
                seatsTaken: 0,
                cancelled: false,
                __typename: 'OccurrenceNode',
              },
              __typename: 'OccurrenceNodeEdge',
            },
            {
              node: {
                id: 'T2NjdXJyZW5jZU5vZGU6OTQ=',
                pEvent: {
                  id: 'UGFsdmVsdXRhcmpvdGluRXZlbnROb2RlOjcw',
                  __typename: 'PalvelutarjotinEventNode',
                },
                amountOfSeats: 30,
                minGroupSize: 5,
                maxGroupSize: 10,

                languages: [
                  { id: 'en', name: 'English', __typename: 'LanguageType' },
                  { id: 'fi', name: 'Finnish', __typename: 'LanguageType' },
                ],
                startTime: '2020-08-12T09:00:00+00:00',
                endTime: '2020-08-12T10:00:00+00:00',
                placeId: '',
                seatsTaken: 0,
                cancelled: false,
                __typename: 'OccurrenceNode',
              },
              __typename: 'OccurrenceNodeEdge',
            },
            {
              node: {
                id: 'T2NjdXJyZW5jZU5vZGU6MTA0',
                pEvent: {
                  id: 'UGFsdmVsdXRhcmpvdGluRXZlbnROb2RlOjcw',
                  __typename: 'PalvelutarjotinEventNode',
                },
                amountOfSeats: 10,
                minGroupSize: 5,
                maxGroupSize: 10,

                languages: [
                  { id: 'en', name: 'English', __typename: 'LanguageType' },
                  { id: 'fi', name: 'Finnish', __typename: 'LanguageType' },
                ],
                startTime: '2020-08-19T12:30:00+00:00',
                endTime: '2020-08-19T13:30:00+00:00',
                placeId: '',
                seatsTaken: 0,
                cancelled: false,
                __typename: 'OccurrenceNode',
              },
              __typename: 'OccurrenceNodeEdge',
            },
            {
              node: {
                id: 'T2NjdXJyZW5jZU5vZGU6MTEw',
                pEvent: {
                  id: 'UGFsdmVsdXRhcmpvdGluRXZlbnROb2RlOjcw',
                  __typename: 'PalvelutarjotinEventNode',
                },
                amountOfSeats: 10,
                minGroupSize: 3,
                maxGroupSize: 5,
                languages: [
                  { id: 'fi', name: 'Finnish', __typename: 'LanguageType' },
                  { id: 'en', name: 'English', __typename: 'LanguageType' },
                ],
                startTime: '2020-08-20T12:30:00+00:00',
                endTime: '2020-08-20T13:30:00+00:00',
                placeId: '',
                seatsTaken: 0,
                cancelled: false,
                __typename: 'OccurrenceNode',
              },
              __typename: 'OccurrenceNodeEdge',
            },
            {
              node: {
                id: 'T2NjdXJyZW5jZU5vZGU6MTE5',
                pEvent: {
                  id: 'UGFsdmVsdXRhcmpvdGluRXZlbnROb2RlOjcw',
                  __typename: 'PalvelutarjotinEventNode',
                },
                amountOfSeats: 30,
                minGroupSize: 10,
                maxGroupSize: 30,

                languages: [
                  { id: 'fi', name: 'Finnish', __typename: 'LanguageType' },
                  { id: 'en', name: 'English', __typename: 'LanguageType' },
                ],
                startTime: '2020-08-25T09:00:00+00:00',
                endTime: '2020-08-25T09:30:00+00:00',
                placeId: '',
                seatsTaken: 0,
                cancelled: false,
                __typename: 'OccurrenceNode',
              },
              __typename: 'OccurrenceNodeEdge',
            },
            {
              node: {
                id: 'T2NjdXJyZW5jZU5vZGU6MTE4',
                pEvent: {
                  id: 'UGFsdmVsdXRhcmpvdGluRXZlbnROb2RlOjcw',
                  __typename: 'PalvelutarjotinEventNode',
                },
                amountOfSeats: 30,
                minGroupSize: 10,
                maxGroupSize: 20,

                languages: [
                  { id: 'en', name: 'English', __typename: 'LanguageType' },
                  { id: 'fi', name: 'Finnish', __typename: 'LanguageType' },
                ],
                startTime: '2020-08-28T09:00:00+00:00',
                endTime: '2020-08-28T09:30:00+00:00',
                placeId: '',
                seatsTaken: 0,
                cancelled: false,
                __typename: 'OccurrenceNode',
              },
              __typename: 'OccurrenceNodeEdge',
            },
            {
              node: {
                id: 'T2NjdXJyZW5jZU5vZGU6MTIw',
                pEvent: {
                  id: 'UGFsdmVsdXRhcmpvdGluRXZlbnROb2RlOjcw',
                  __typename: 'PalvelutarjotinEventNode',
                },
                amountOfSeats: 30,
                minGroupSize: 10,
                maxGroupSize: 30,

                languages: [
                  { id: 'fi', name: 'Finnish', __typename: 'LanguageType' },
                  { id: 'en', name: 'English', __typename: 'LanguageType' },
                ],
                startTime: '2020-08-31T09:00:00+00:00',
                endTime: '2020-08-31T09:30:00+00:00',
                placeId: '',
                seatsTaken: 0,
                cancelled: false,
                __typename: 'OccurrenceNode',
              },
              __typename: 'OccurrenceNodeEdge',
            },
            {
              node: {
                id: 'T2NjdXJyZW5jZU5vZGU6MTIx',
                pEvent: {
                  id: 'UGFsdmVsdXRhcmpvdGluRXZlbnROb2RlOjcw',
                  __typename: 'PalvelutarjotinEventNode',
                },
                amountOfSeats: 30,
                minGroupSize: 10,
                maxGroupSize: 20,

                languages: [
                  { id: 'fi', name: 'Finnish', __typename: 'LanguageType' },
                  { id: 'en', name: 'English', __typename: 'LanguageType' },
                ],
                startTime: '2020-09-08T09:00:00+00:00',
                endTime: '2020-09-08T10:30:00+00:00',
                placeId: '',
                seatsTaken: 20,
                cancelled: false,
                __typename: 'OccurrenceNode',
              },
              __typename: 'OccurrenceNodeEdge',
            },
            {
              node: {
                id: 'T2NjdXJyZW5jZU5vZGU6MTIy',
                pEvent: {
                  id: 'UGFsdmVsdXRhcmpvdGluRXZlbnROb2RlOjcw',
                  __typename: 'PalvelutarjotinEventNode',
                },
                amountOfSeats: 30,
                minGroupSize: 10,
                maxGroupSize: 20,

                languages: [
                  { id: 'fi', name: 'Finnish', __typename: 'LanguageType' },
                  { id: 'en', name: 'English', __typename: 'LanguageType' },
                ],
                startTime: '2020-09-09T09:00:00+00:00',
                endTime: '2020-09-09T09:30:00+00:00',
                placeId: '',
                seatsTaken: 20,
                cancelled: false,
                __typename: 'OccurrenceNode',
              },
              __typename: 'OccurrenceNodeEdge',
            },
            {
              node: {
                id: 'T2NjdXJyZW5jZU5vZGU6MTIz',
                pEvent: {
                  id: 'UGFsdmVsdXRhcmpvdGluRXZlbnROb2RlOjcw',
                  __typename: 'PalvelutarjotinEventNode',
                },
                amountOfSeats: 30,
                minGroupSize: 10,
                maxGroupSize: 20,

                languages: [
                  { id: 'fi', name: 'Finnish', __typename: 'LanguageType' },
                  { id: 'en', name: 'English', __typename: 'LanguageType' },
                ],
                startTime: '2020-09-10T09:00:00+00:00',
                endTime: '2020-09-10T09:30:00+00:00',
                placeId: '',
                seatsTaken: 20,
                cancelled: false,
                __typename: 'OccurrenceNode',
              },
              __typename: 'OccurrenceNodeEdge',
            },
          ],
          __typename: 'OccurrenceNodeConnection',
        },
        __typename: 'PalvelutarjotinEventNode',
      },
      inLanguage: [
        {
          id: null,
          internalId: 'https://api.hel.fi/linkedevents-test/v1/language/fi/',
          name: null,
          __typename: 'InLanguage',
        },
        {
          id: null,
          internalId: 'https://api.hel.fi/linkedevents-test/v1/language/fi/',
          name: null,
          __typename: 'InLanguage',
        },
      ],
      audience: [],
      keywords: [
        {
          id: null,
          name: null,
          internalId:
            'https://api.hel.fi/linkedevents-test/v1/keyword/yso:p4363/',
          __typename: 'Keyword',
        },
        {
          id: null,
          name: null,
          internalId:
            'https://api.hel.fi/linkedevents-test/v1/keyword/yso:p4363/',
          __typename: 'Keyword',
        },
      ],
      location: {
        id: 'tprek:15376',
        internalId:
          'https://api.hel.fi/linkedevents-test/v1/place/tprek:15376/',
        name: {
          en: 'Soukka Library',
          fi: 'Soukan kirjasto',
          sv: 'Sökö bibliotek',
          __typename: 'LocalisedObject',
        },
        streetAddress: {
          en: 'Soukantie 4',
          fi: 'Soukantie 4',
          sv: 'Sökövägen 4',
          __typename: 'LocalisedObject',
        },
        addressLocality: {
          en: 'Espoo',
          fi: 'Espoo',
          sv: 'Esbo',
          __typename: 'LocalisedObject',
        },
        telephone: {
          en: null,
          fi: '+358 9 8165 7736',
          sv: null,
          __typename: 'LocalisedObject',
        },
        __typename: 'Place',
      },
      venue: {
        id: 'tprek:15376',
        hasClothingStorage: true,
        hasSnackEatingPlace: false,
        outdoorActivity: false,
        translations: [
          {
            languageCode: 'FI',
            description: 'Soukkas',
            __typename: 'VenueTranslationType',
          },
        ],
        __typename: 'VenueNode',
      },
      startTime: '2020-07-13T05:51:05.761000Z',
      publicationStatus: 'public',
      datePublished: null,
      __typename: 'Event',
    } as EventFieldsFragment,
  },
};

export const occurrenceResult = {
  data: {
    occurrence: {
      id: 'T2NjdXJyZW5jZU5vZGU6MTIz',
      pEvent: {
        id: 'UGFsdmVsdXRhcmpvdGluRXZlbnROb2RlOjcw',
        __typename: 'PalvelutarjotinEventNode',
      },
      amountOfSeats: 30,
      minGroupSize: 10,
      maxGroupSize: 20,
      languages: [
        { id: 'fi', name: 'Finnish', __typename: 'LanguageType' },
        { id: 'en', name: 'English', __typename: 'LanguageType' },
      ],
      startTime: '2020-09-10T09:00:00+00:00',
      endTime: '2020-09-10T09:30:00+00:00',
      placeId: '',
      seatsTaken: 20,
      cancelled: false,
      __typename: 'OccurrenceNode',
      enrolments: {
        edges: [
          {
            node: {
              id: 'RW5yb2xtZW50Tm9kZTo4NQ==',
              notificationType: 'EMAIL_SMS',
              enrolmentTime: '2020-08-18T06:34:40.419570+00:00',
              person: {
                id:
                  'UGVyc29uTm9kZTo5ZWYxN2YyZi0zNjVlLTQxMDItOGM5Yi03MmMxM2Y3NjMyNjM=',
                emailAddress: 'ilmo@ilmoittautuja.com',
                name: 'Testi Testaaja',
                phoneNumber: '123321123',
                language: 'FI',
                __typename: 'PersonNode',
              },
              status: 'APPROVED',
              studyGroup: {
                id: 'U3R1ZHlHcm91cE5vZGU6NzE=',
                groupSize: 10,
                amountOfAdult: 1,
                name: 'Yläaste',
                groupName: 'Ryhmän nimi',
                studyLevel: 'GRADE_3',
                extraNeeds: 'Lisäinfo',
                person: {
                  id:
                    'UGVyc29uTm9kZTo5ZWYxN2YyZi0zNjVlLTQxMDItOGM5Yi03MmMxM2Y3NjMyNjM=',
                  emailAddress: 'ilmo@ilmoittautuja.com',
                  name: 'Testi Testaaja',
                  phoneNumber: '123321123',
                  language: 'FI',
                  __typename: 'PersonNode',
                },
                __typename: 'StudyGroupNode',
              },
              __typename: 'EnrolmentNode',
            },
            __typename: 'EnrolmentNodeEdge',
          },
          {
            node: {
              id: 'RW5yb2xtZW50Tm9kZTo4OA==',
              notificationType: 'EMAIL_SMS',
              enrolmentTime: '2020-08-18T06:37:40.755109+00:00',
              person: {
                id:
                  'UGVyc29uTm9kZTo0ZTZiYmQ5MC05YjYwLTRkNGEtYTkzMy05NTBkZTM3ZjczM2Y=',
                emailAddress: 'ilmo@ilmoittautuja.com',
                name: 'Ilmoittautuja',
                phoneNumber: '123321123',
                language: 'FI',
                __typename: 'PersonNode',
              },
              status: 'APPROVED',
              studyGroup: {
                id: 'U3R1ZHlHcm91cE5vZGU6NzI=',
                groupSize: 10,
                amountOfAdult: 1,
                name: 'Yläaste',
                groupName: 'Ryhmän nimi',
                studyLevel: 'GRADE_4',
                extraNeeds: 'Infoa',
                person: {
                  id:
                    'UGVyc29uTm9kZTo0ZTZiYmQ5MC05YjYwLTRkNGEtYTkzMy05NTBkZTM3ZjczM2Y=',
                  emailAddress: 'ilmo@ilmoittautuja.com',
                  name: 'Ilmoittautuja',
                  phoneNumber: '123321123',
                  language: 'FI',
                  __typename: 'PersonNode',
                },
                __typename: 'StudyGroupNode',
              },
              __typename: 'EnrolmentNode',
            },
            __typename: 'EnrolmentNodeEdge',
          },
        ],
        __typename: 'EnrolmentNodeConnection',
      },
    } as OccurrenceFieldsFragment,
  },
};

export const placeResult = {
  data: {
    place: {
      id: 'tprek:15376',
      internalId: 'https://api.hel.fi/linkedevents-test/v1/place/tprek:15376/',
      name: {
        en: 'Soukka Library',
        fi: 'Soukan kirjasto',
        sv: 'Sökö bibliotek',
        __typename: 'LocalisedObject',
      },
      streetAddress: {
        en: 'Soukantie 4',
        fi: 'Soukantie 4',
        sv: 'Sökövägen 4',
        __typename: 'LocalisedObject',
      },
      addressLocality: {
        en: 'Espoo',
        fi: 'Espoo',
        sv: 'Esbo',
        __typename: 'LocalisedObject',
      },
      telephone: {
        en: null,
        fi: '+358 9 8165 7736',
        sv: null,
        __typename: 'LocalisedObject',
      },
      __typename: 'Place',
    } as PlaceFieldsFragment,
  },
};

export const venueResult = {
  data: {
    venue: {
      id: 'tprek:15376',
      hasClothingStorage: true,
      hasSnackEatingPlace: false,
      outdoorActivity: false,
      translations: [
        {
          languageCode: 'FI',
          description: 'Soukkas',
          __typename: 'VenueTranslationType',
        },
      ],
      __typename: 'VenueNode',
    } as VenueFieldsFragment,
  },
};
