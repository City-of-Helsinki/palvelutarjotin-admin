import { MockedResponse } from '@apollo/client/testing';
import parseDate from 'date-fns/parse';
import faker from 'faker';

import { AUTOSUGGEST_OPTIONS_AMOUNT } from '../common/components/autoSuggest/contants';
import { LINKEDEVENTS_CONTENT_TYPE } from '../constants';
import {
  AddOccurrenceDocument,
  DeleteOccurrenceDocument,
  EditEventDocument,
  EditVenueDocument,
  EventDocument,
  Language,
  MyProfileDocument,
  OccurrenceNodeConnection,
  OccurrenceSeatType,
  Place,
  PlaceDocument,
  PlacesDocument,
  VenueDocument,
} from '../generated/graphql';
import getLinkedEventsInternalId from '../utils/getLinkedEventsInternalId';
import {
  fakeEvent,
  fakeKeyword,
  fakeLanguages,
  fakeLocalizedObject,
  fakeOccurrence,
  fakeOccurrences,
  fakeOffer,
  fakeOrganisation,
  fakeOrganisations,
  fakePerson,
  fakePersons,
  fakePEvent,
  fakePlace,
  fakePlaces,
  fakeVenue,
} from '../utils/mockDataUtils';

type Languages = 'fi' | 'en' | 'sv';
type LanguagesObject = { [key in Languages]: string };

export const eventName = 'Testitapahtuma';
export const eventId = 'event-id';
export const eventStartTime = '2020-08-04T21:00:00.000Z';
export const pEventId = 'pEventId';
export const keywordId = 'yso:p4363';
export const placeName = 'Sellon kirjasto';
export const placeId = 'placeId1';
export const shortDescription = 'Testitapahtuman kuvaus';
export const description = 'Pidempi kuvaus';
export const photographerName = 'Valo Valokuvaaja';
export const photoAltText = 'Vaihtoehtoinen kuvateksti';
export const infoUrl = 'https://www.palvelutarjotin.fi';
export const contactEmail = 'testi@testi.fi';
export const contactPhoneNumber = '123123123';
export const contactPersonId = 'contactPersonId';
export const eventContactPersonId = 'contactPersonId';
export const organisationId = 'T3JnYW5pc2F0aW9uTm9kZToy';
export const personName = 'Testaaja2';
export const eventOrganizationPersonName = 'Event Testaaja';
export const defaultOrganizationName =
  'Kulttuuri- ja vapaa-aikalautakunnan kulttuurijaosto';
export const eventOrganizationName = 'Kulttuurin ja vapaa-ajan toimiala';
export const keyword = 'perheet';
export const venueDescription = 'Test venue description';

export const occurrenceFormData = {
  date: '13.08.2020',
  startsAt: '12:00',
  endsAt: '13:00',
  amountOfSeats: '30',
  minGroupSize: '10',
  maxGroupSize: '20',
};

export const audienceKeywords = [
  { id: 'targetGroupId1', name: 'Muu ryhmä' },
  { id: 'targetGroupId2', name: 'Esiopetus' },
];

export const criteriaKeywords = [
  { id: 'criteriaId1', name: 'Työpaja' },
  { id: 'criteriaId2', name: 'Luontokoulu' },
];

export const categoryKeywords = [
  { id: 'categoryId1', name: 'Liikunta' },
  { id: 'categoryId2', name: 'Musiikki' },
];

export const basicKeywords = [...criteriaKeywords, ...categoryKeywords];

export const getKeywordId = (keywordId: string) => {
  return getLinkedEventsInternalId(
    LINKEDEVENTS_CONTENT_TYPE.KEYWORD,
    keywordId
  );
};

const fakeLanguagesObject = (name: string, languages: Languages[]) => {
  const languagesArray: Languages[] = ['en', 'fi', 'sv'];
  return languagesArray.reduce<LanguagesObject>((prev, next) => {
    return {
      ...prev,
      [next]: languages.includes(next) ? name : '',
    };
  }, {} as LanguagesObject);
};

const fakeLocalizedObjectWithMultipleLanguages = (
  name: string,
  languages: Languages[]
) => {
  return fakeLocalizedObject(name, fakeLanguagesObject(name, languages));
};

export const placeMock = fakePlace({
  streetAddress: fakeLocalizedObject('Testikatu'),
});

export const selloVenueMockResponse: MockedResponse = {
  request: {
    query: VenueDocument,
    variables: {
      id: placeId,
    },
  },
  result: {
    data: {
      venue: fakeVenue({
        id: placeId,
        outdoorActivity: true,
        hasClothingStorage: true,
        hasSnackEatingPlace: true,
        hasToiletNearby: false,
        hasAreaForGroupWork: true,
        hasIndoorPlayingArea: true,
        hasOutdoorPlayingArea: false,
        translations: [
          {
            languageCode: Language.Fi,
            description: venueDescription,
            __typename: 'VenueTranslationType',
          },
          {
            languageCode: Language.En,
            description: venueDescription,
            __typename: 'VenueTranslationType',
          },
          {
            languageCode: Language.Sv,
            description: venueDescription,
            __typename: 'VenueTranslationType',
          },
        ],
      }),
    },
  },
};

export const placeMockResponse: MockedResponse = {
  request: {
    query: PlaceDocument,
    variables: {
      id: placeId,
    },
  },
  result: {
    data: {
      place: fakePlace({ name: fakeLocalizedObject(placeName), id: placeId }),
    },
  },
};

export const placesMockResponse = {
  request: {
    query: PlacesDocument,
    skip: false,
    variables: {
      dataSource: 'tprek',
      showAllPlaces: true,
      pageSize: AUTOSUGGEST_OPTIONS_AMOUNT,
      text: 'Sellon',
    },
  },
  result: {
    data: {
      places: fakePlaces(1, [
        { name: fakeLocalizedObject(placeName), id: placeId },
      ]),
    },
  },
};

export const myProfileMockResponse: MockedResponse = {
  request: {
    query: MyProfileDocument,
    variables: {},
  },
  result: {
    data: { myProfile: fakePerson({ organisations: fakeOrganisations() }) },
  },
};

export const editVenueMockResponse: MockedResponse = {
  request: {
    query: EditVenueDocument,
    variables: {
      venue: {
        id: placeId,
        hasClothingStorage: true,
        hasSnackEatingPlace: true,
        outdoorActivity: true,
        hasToiletNearby: true,
        hasAreaForGroupWork: true,
        hasIndoorPlayingArea: true,
        hasOutdoorPlayingArea: true,
        translations: [
          {
            languageCode: 'FI',
            description: venueDescription,
          },
          {
            languageCode: 'EN',
            description: 'Changed venue description',
          },
          {
            languageCode: 'SV',
            description: venueDescription,
          },
        ],
      },
    },
  },
  result: {
    data: {
      updateVenue: {
        venue: {
          id: placeId,
          hasClothingStorage: true,
          hasSnackEatingPlace: true,
          outdoorActivity: true,
          hasToiletNearby: true,
          hasAreaForGroupWork: true,
          hasIndoorPlayingArea: true,
          hasOutdoorPlayingArea: true,
          translations: [
            {
              languageCode: 'FI',
              description: venueDescription,
              __typename: 'VenueTranslationType',
            },
            {
              languageCode: 'SV',
              description: venueDescription,
              __typename: 'VenueTranslationType',
            },
            {
              languageCode: 'EN',
              description: 'Changed venue description',
              __typename: 'VenueTranslationType',
            },
          ],
          __typename: 'VenueNode',
        },
        __typename: 'UpdateVenueMutationPayload',
      },
    },
  },
};

export const getDeleteOccurrenceMockResponse = (
  id: string
): MockedResponse => ({
  request: {
    query: DeleteOccurrenceDocument,
    variables: {
      input: {
        id,
      },
    },
  },
  result: {
    data: {
      deleteOccurrence: {
        clientMutationId: null,
        __typename: 'DeleteOccurrenceMutationPayload',
      },
    },
  },
});

export const getAddOccurrenceMockResponse = ({
  id = faker.datatype.uuid(),
  amountOfSeats,
  endTime,
  languages,
  maxGroupSize,
  minGroupSize,
  seatType = OccurrenceSeatType.ChildrenCount,
  startTime,
}: {
  startTime: string;
  endTime: string;
  languages: string[];
  amountOfSeats: number;
  minGroupSize: number;
  maxGroupSize: number;
  seatType: OccurrenceSeatType;
  placeId?: string;
  id?: string;
}): MockedResponse => ({
  request: {
    query: AddOccurrenceDocument,
    variables: {
      input: {
        startTime: parseDate(startTime, 'dd.MM.yyyy HH:mm', new Date()),
        endTime: parseDate(endTime, 'dd.MM.yyyy HH:mm', new Date()),
        languages: languages.map((lang) => ({ id: lang })),
        pEventId,
        placeId,
        amountOfSeats,
        minGroupSize,
        maxGroupSize,
        seatType,
      },
    },
  },
  result: {
    data: {
      addOccurrence: {
        occurrence: fakeOccurrence({
          id,
          pEvent: {
            id: pEventId,
            __typename: 'PalvelutarjotinEventNode',
          } as any,
          amountOfSeats,
          minGroupSize,
          maxGroupSize,
          seatsTaken: 0,
          seatsApproved: 0,
          seatType,
          remainingSeats: amountOfSeats,
          languages: fakeLanguages(
            languages.map((lang) => ({ id: lang, name: 'lang' }))
          ),
          startTime,
          endTime,
          placeId,
          cancelled: false,
        }),
        __typename: 'AddOccurrenceMutationPayload',
      },
    },
  },
});

export const getUpdateEventMockResponse = ({
  autoAcceptance,
  enrolmentEndDays,
  enrolmentStart,
  neededOccurrences,
  languages = ['fi'],
}: {
  autoAcceptance: boolean;
  enrolmentEndDays: number;
  enrolmentStart: string;
  neededOccurrences: number;
  languages?: Languages[];
}): MockedResponse => ({
  request: {
    query: EditEventDocument,
    variables: getEditEventVariables({
      languages,
      placeId,
      autoAcceptance,
      neededOccurrences,
      enrolmentEndDays,
      enrolmentStart, // '2021-05-03T21:00:00.000Z',
    }),
  },
  result: {
    data: {
      updateEventMutation: {
        response: {
          statusCode: 200,
          body: fakeEvent({
            id: 'palvelutarjotin:afz52lpyta',
          }),
          __typename: 'EventMutationResponse',
        },
        __typename: 'UpdateEventMutation',
      },
    },
  },
});

export const getEventMockedResponse = ({
  location = false,
  autoAcceptance = true,
  enrolmentEndDays = null,
  enrolmentStart = null,
  neededOccurrences = 1,
  languages = ['fi'],
  occurrences,
}: {
  location?: boolean;
  autoAcceptance?: boolean;
  enrolmentEndDays?: number;
  enrolmentStart?: string;
  neededOccurrences?: number;
  languages?: Languages[];
  occurrences?: OccurrenceNodeConnection;
}): MockedResponse => ({
  request: {
    query: EventDocument,
    variables: {
      id: eventId,
      include: ['location', 'keywords', 'audience'],
    },
  },
  result: getEventResponse({
    languages,
    autoAcceptance,
    enrolmentEndDays,
    enrolmentStart,
    location: location
      ? fakePlace({
          id: placeId,
          name: fakeLocalizedObject(placeName),
        })
      : null,
    neededOccurrences,
    occurrences,
  }),
});

const getEventResponse = ({
  location,
  autoAcceptance,
  enrolmentEndDays,
  enrolmentStart,
  neededOccurrences,
  languages = ['fi'],
  occurrences,
}: {
  location: Place;
  autoAcceptance: boolean;
  enrolmentEndDays: number;
  enrolmentStart: string;
  neededOccurrences: number;
  languages?: Languages[];
  occurrences?: OccurrenceNodeConnection;
}) => ({
  data: {
    event: fakeEvent({
      id: eventId,
      shortDescription: fakeLocalizedObjectWithMultipleLanguages(
        shortDescription,
        languages
      ),
      description: fakeLocalizedObjectWithMultipleLanguages(
        description,
        languages
      ),
      name: fakeLocalizedObjectWithMultipleLanguages(eventName, languages),
      startTime: eventStartTime,
      endTime: '',
      additionalCriteria: criteriaKeywords.map((k) =>
        fakeKeyword({ id: k.id })
      ),
      categories: categoryKeywords.map((k) => fakeKeyword({ id: k.id })),
      offers: [
        fakeOffer({
          description: fakeLocalizedObjectWithMultipleLanguages(
            'description',
            languages
          ),
          price: fakeLocalizedObjectWithMultipleLanguages('99,9', languages),
          isFree: true,
          infoUrl: null,
        }),
      ],
      images: [],
      infoUrl: fakeLocalizedObjectWithMultipleLanguages(infoUrl, languages),
      inLanguage: [],
      audience: audienceKeywords.map((k) => fakeKeyword({ id: k.id })),
      keywords: [
        fakeKeyword({ id: keywordId }),
        ...basicKeywords.map((k) => fakeKeyword({ id: k.id })),
      ],
      location,
      pEvent: fakePEvent({
        id: pEventId,
        organisation: fakeOrganisation({
          id: organisationId,
          name: eventOrganizationName,
          persons: fakePersons(1, [
            {
              organisations: [] as never,
              name: eventOrganizationPersonName,
              id: contactPersonId,
            },
          ]),
        }),
        contactEmail: contactEmail,
        contactPhoneNumber: contactPhoneNumber,
        autoAcceptance,
        enrolmentEndDays,
        enrolmentStart,
        neededOccurrences,
        mandatoryAdditionalInformation: false,
        occurrences: occurrences ?? fakeOccurrences(),
        contactPerson: fakePerson({
          id: contactPersonId,
        }),
      }),
    }),
  },
});

const getEditEventVariables = ({
  placeId,
  autoAcceptance,
  enrolmentEndDays,
  enrolmentStart,
  neededOccurrences,
  languages = ['fi'],
}: {
  placeId: string;
  autoAcceptance: boolean;
  enrolmentEndDays: number;
  enrolmentStart: string;
  neededOccurrences: number;
  languages?: Languages[];
}) => ({
  event: {
    id: eventId,
    name: fakeLanguagesObject(eventName, languages),
    startTime: eventStartTime,
    endTime: '',
    offers: [
      {
        description: fakeLanguagesObject('description', languages),
        infoUrl: null,
        isFree: true,
        price: fakeLanguagesObject('99,9', languages),
      },
    ],
    shortDescription: fakeLanguagesObject(shortDescription, languages),
    description: fakeLanguagesObject(description, languages),
    images: [],
    infoUrl: fakeLanguagesObject(infoUrl, languages),
    audience: audienceKeywords.map((k) => ({
      internalId: getKeywordId(k.id),
    })),
    inLanguage: [],
    keywords: [
      {
        internalId: getKeywordId(keywordId),
      },
      ...basicKeywords.map((k) => ({ internalId: getKeywordId(k.id) })),
    ],
    location: {
      internalId: getLinkedEventsInternalId(
        LINKEDEVENTS_CONTENT_TYPE.PLACE,
        placeId
      ),
    },
    draft: true,
    organisationId: organisationId,
    pEvent: {
      contactEmail: contactEmail,
      contactPersonId: contactPersonId,
      contactPhoneNumber: contactPhoneNumber,
      enrolmentEndDays,
      enrolmentStart: new Date(enrolmentStart),
      neededOccurrences,
      autoAcceptance,
      mandatoryAdditionalInformation: false,
    },
  },
});
