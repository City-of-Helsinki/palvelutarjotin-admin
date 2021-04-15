import { LINKEDEVENTS_CONTENT_TYPE } from '../constants';
import {
  EditEventDocument,
  EventDocument,
  KeywordDocument,
  KeywordSetType,
  Language,
  MyProfileDocument,
  PlaceDocument,
} from '../generated/graphql';
import getLinkedEventsInternalId from '../utils/getLinkedEventsInternalId';
import {
  fakeEvent,
  fakeImage,
  fakeInLanguage,
  fakeKeyword,
  fakeLocalizedObject,
  fakeOffer,
  fakeOrganisation,
  fakeOrganisations,
  fakePerson,
  fakePersons,
  fakePEvent,
  fakePlace,
  fakeVenue,
} from '../utils/mockDataUtils';
import { getKeywordSetsMockResponses } from './apollo-mocks/keywordSetMocks';
export const keywordId = 'yso:p4363';
export const placeId = 'tprek:15417';
export const eventId = 'palvelutarjotin:afz56bfiaq';
export const shortDescription = 'Testitapahtuman kuvaus';
export const description = 'Pidempi kuvaus';
export const eventName = 'Testitapahtuma';
export const photographerName = 'Valo Valokuvaaja';
export const photoAltText = 'Vaihtoehtoinen kuvateksti';
export const placeName = 'Sellon kirjasto';
export const infoUrl = 'https://www.palvelutarjotin.fi';
export const contactEmail = 'testi@testi.fi';
export const contactPhoneNumber = '123123123';
export const contactPersonId =
  'UGVyc29uTm9kZTo0MGZmYTIwMS1mOWJhLTQyZTYtYjY3Ny01MWQyM2Q4OGQ4ZDk=';
export const personId = 'T3JnYW5pc2F0aW9uTm9kZTox';
export const venueDescription = 'Venue description';
export const personName = 'Testaaja2';
export const organizationName = 'Kulttuurin ja vapaa-ajan toimiala';

export const keywordMockResponse = {
  keyword: fakeKeyword({
    id: 'yso:p4363',
    name: fakeLocalizedObject('perheet'),
  }),
};

export const venueQueryResponse = {
  data: {
    venue: fakeVenue({
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
          languageCode: 'FI' as Language,
          description: venueDescription,
          __typename: 'VenueTranslationType',
        },
      ],
    }),
  },
};

export const audienceKeywords = [
  { id: 'targetGroupId1', name: 'Muu ryhmä' },
  { id: 'targetGroupId2', name: 'Esiopetus' },
];

export const getKeywordId = (keywordId: string) => {
  return getLinkedEventsInternalId(
    LINKEDEVENTS_CONTENT_TYPE.KEYWORD,
    keywordId
  );
};

export const criteriaKeywords = [
  { id: 'criteriaId1', name: 'Työpaja' },
  { id: 'criteriaId2', name: 'Luontokoulu' },
];

export const categoryKeywords = [
  { id: 'categoryId1', name: 'Liikunta' },
  { id: 'categoryId2', name: 'Musiikki' },
];

export const basicKeywords = [...criteriaKeywords, ...categoryKeywords];

const editEventVariables = {
  event: {
    id: eventId,
    name: { fi: 'TestitapahtumaTestinimi' },
    startTime: '2020-08-04T21:00:00.000Z',
    endTime: '',
    offers: [
      {
        description: {
          fi: 'description',
        },
        price: {
          fi: '99,9',
        },
        isFree: true,
      },
    ],
    shortDescription: { fi: shortDescription },
    description: { fi: description },
    images: [{ internalId: '/image/48598/' }],
    infoUrl: { fi: infoUrl },
    audience: audienceKeywords.map((k) => ({
      internalId: getKeywordId(k.id),
    })),
    inLanguage: [
      { internalId: '/language/fi/' },
      { internalId: '/language/en/' },
    ],
    keywords: [
      {
        internalId: getKeywordId(keywordId),
      },
      ...basicKeywords.map((k) => ({ internalId: getKeywordId(k.id) })),
    ],
    location: { internalId: `/place/${placeId}/` },
    pEvent: {
      contactEmail: contactEmail,
      contactPersonId: contactPersonId,
      contactPhoneNumber: contactPhoneNumber,
      enrolmentEndDays: 3,
      enrolmentStart: '2020-08-13T00:45:00.000Z',
      neededOccurrences: 3,
      autoAcceptance: true,
      mandatoryAdditionalInformation: false,
    },
    organisationId: personId,
    draft: true,
  },
};

export const updateEventResponse = {
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
};

const eventResponse = {
  data: {
    event: fakeEvent({
      id: eventId,
      shortDescription: fakeLocalizedObject(shortDescription),
      description: fakeLocalizedObject(description),
      name: fakeLocalizedObject(eventName),
      startTime: '2020-08-04T21:00:00.000Z',
      endTime: '',
      additionalCriteria: criteriaKeywords.map((k) =>
        fakeKeyword({ id: k.id })
      ),
      categories: categoryKeywords.map((k) => fakeKeyword({ id: k.id })),
      offers: [fakeOffer()],
      images: [
        fakeImage({
          id: '48598',
          altText: photoAltText,
          photographerName: photographerName,
        }),
      ],
      location: fakePlace({
        name: fakeLocalizedObject(placeName),
        id: placeId,
      }),
      infoUrl: fakeLocalizedObject(infoUrl),
      inLanguage: [
        fakeInLanguage({ id: 'fi', name: fakeLocalizedObject('suomi') }),
        fakeInLanguage({ id: 'en', name: fakeLocalizedObject('englanti') }),
      ],
      audience: audienceKeywords.map((k) => fakeKeyword({ id: k.id })),
      keywords: [
        fakeKeyword({ id: keywordId }),
        ...basicKeywords.map((k) => fakeKeyword({ id: k.id })),
      ],
      pEvent: fakePEvent({
        organisation: fakeOrganisation({ id: personId }),
        contactEmail: contactEmail,
        contactPhoneNumber: contactPhoneNumber,
        enrolmentEndDays: 3,
        enrolmentStart: '2020-08-13T00:45:00.000Z',
        neededOccurrences: 3,
        mandatoryAdditionalInformation: false,
        autoAcceptance: true,
        contactPerson: fakePerson({
          id: contactPersonId,
        }),
      }),
    }),
  },
};

const profileResponse = {
  data: {
    myProfile: fakePerson({
      organisations: fakeOrganisations(1, [
        {
          id: personId,
          persons: fakePersons(1, [
            {
              organisations: [] as never,
              name: personName,
              id: contactPersonId,
            },
          ]),
          name: organizationName,
        },
      ]),
    }),
  },
};

const keywordResponse = {
  data: {
    keyword: fakeKeyword({
      id: 'yso:p4363',
      name: fakeLocalizedObject('perheet'),
    }),
  },
};

const placeResponse = {
  data: {
    place: fakePlace({ name: fakeLocalizedObject(placeName) }),
  },
};

export const editMocks = [
  {
    request: {
      query: EditEventDocument,
      variables: editEventVariables,
    },
    result: updateEventResponse,
  },
  {
    request: {
      query: EditEventDocument,
      variables: {
        event: {
          ...editEventVariables.event,
          name: { fi: 'Testitapahtuma' },
          location: {
            internalId: '/place/helsinki:internet/',
          },
        },
      },
    },
    result: updateEventResponse,
  },
  {
    request: {
      query: EventDocument,
      variables: {
        id: '123',
        include: ['audience', 'in_language', 'keywords', 'location'],
      },
    },
    result: eventResponse,
  },
  {
    request: {
      query: MyProfileDocument,
    },
    result: profileResponse,
  },
  {
    request: {
      query: KeywordDocument,
      variables: {
        id: 'yso:p4363',
      },
    },
    result: keywordResponse,
  },
  {
    request: {
      query: PlaceDocument,
      skip: false,
      variables: {
        id: placeId,
      },
    },
    result: placeResponse,
  },
  ...getKeywordSetsMockResponses([
    {
      setType: KeywordSetType.TargetGroup,
      keywords: audienceKeywords,
    },
    {
      setType: KeywordSetType.Category,
      keywords: categoryKeywords,
    },
    {
      setType: KeywordSetType.AdditionalCriteria,
      keywords: criteriaKeywords,
    },
  ]),
];
