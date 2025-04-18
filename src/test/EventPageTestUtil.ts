import { ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import { LINKEDEVENTS_CONTENT_TYPE } from '../constants';
import {
  EditEventDocument,
  EventDocument,
  ImageDocument,
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
export const imageId = '48598';
export const eventId = 'palvelutarjotin:afz56bfiaq';
export const shortDescription = 'Testitapahtuman kuvaus';
export const description = 'Pidempi kuvaus';
export const descriptionEditorHTML = draftToHtml(
  convertToRaw(ContentState.createFromText(description))
);
export const eventName = 'Testitapahtuma';
export const photographerName = 'Valo Valokuvaaja';
export const photoAltText = 'Vaihtoehtoinen kuvateksti';
export const placeName = 'Sellon kirjasto';
export const infoUrl = 'https://www.palvelutarjotin.fi';
export const contactEmail = 'testi@testi.fi';
export const contactPhoneNumber = '123123123';
export const contactPersonId =
  'UGVyc29uTm9kZTo0MGZmYTIwMS1mOWJhLTQyZTYtYjY3Ny01MWQyM2Q4OGQ4ZDk=';
export const eventContactPersonId =
  'UGVyc29uTm9kZTo0MGZmYTIwMS1mOWJhLTQyZTYtYjY3Ny01MWQyM2Q4OGQ4ZDk=';
export const organisationId = 'T3JnYW5pc2F0aW9uTm9kZToy';
export const venueDescription = 'Venue description';
export const personName = 'Testaaja2';
export const eventOrganizationPersonName = 'Event Testaaja';
export const defaultOrganizationName =
  'Kulttuuri- ja vapaa-aikalautakunnan kulttuurijaosto';
export const eventOrganizationName = 'Kulttuurin ja vapaa-ajan toimiala';
export const keyword = 'perheet';
export const mandatoryAdditionalInformation = true;
export const createFinnishLocalisedObject = (
  fiText: string,
  emptyString?: boolean
) => ({
  fi: fiText,
  sv: emptyString ? '' : null,
  en: emptyString ? '' : null,
});

export const keywordMockResponse = {
  keyword: fakeKeyword({
    id: keywordId,
    name: fakeLocalizedObject(keyword),
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

export const getKeywordId = (keywordId: string) => {
  return getLinkedEventsInternalId(
    LINKEDEVENTS_CONTENT_TYPE.KEYWORD,
    keywordId
  );
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

const editEventVariables = {
  event: {
    id: eventId,
    name: createFinnishLocalisedObject('Testitapahtuma', true),
    startTime: '2020-08-04T21:00:00.000Z',
    endTime: '',
    offers: [
      {
        description: createFinnishLocalisedObject('description', true),
        price: { fi: '99,9', sv: '99,9', en: '99,9' },
        isFree: true,
      },
    ],
    shortDescription: createFinnishLocalisedObject(shortDescription, true),
    description: createFinnishLocalisedObject(descriptionEditorHTML, true),
    images: [
      {
        internalId: getLinkedEventsInternalId(
          LINKEDEVENTS_CONTENT_TYPE.IMAGE,
          imageId
        ),
      },
    ],
    infoUrl: createFinnishLocalisedObject(infoUrl, true),
    audience: audienceKeywords.map((k) => ({
      internalId: getKeywordId(k.id),
    })),
    inLanguage: [
      {
        internalId: getLinkedEventsInternalId(
          LINKEDEVENTS_CONTENT_TYPE.LANGUAGE,
          'fi'
        ),
      },
      {
        internalId: getLinkedEventsInternalId(
          LINKEDEVENTS_CONTENT_TYPE.LANGUAGE,
          'en'
        ),
      },
    ],
    keywords: [
      {
        internalId: getKeywordId(keywordId),
      },
      ...basicKeywords.map((k) => ({ internalId: getKeywordId(k.id) })),
    ],
    location: {
      internalId: getLinkedEventsInternalId(
        LINKEDEVENTS_CONTENT_TYPE.PLACE,
        'tprek:15376'
      ),
    },
    pEvent: {
      autoAcceptance: true,
      contactEmail: contactEmail,
      contactPersonId: contactPersonId,
      contactPhoneNumber: contactPhoneNumber,
      enrolmentEndDays: 3,
      enrolmentStart: '2020-08-13T00:45:00.000Z',
      externalEnrolmentUrl: null,
      neededOccurrences: 3,
      mandatoryAdditionalInformation: mandatoryAdditionalInformation,
      isQueueingAllowed: true,
      translations: [],
    },
    organisationId,
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
      description: fakeLocalizedObject(descriptionEditorHTML),
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
          id: imageId,
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
        fakeKeyword({ id: keywordId, name: fakeLocalizedObject(keyword) }),
        ...basicKeywords.map((k) => fakeKeyword({ id: k.id })),
      ],
      pEvent: fakePEvent({
        organisation: fakeOrganisation({
          id: organisationId,
          name: defaultOrganizationName,
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
        enrolmentEndDays: 3,
        enrolmentStart: '2020-08-13T00:45:00.000Z',
        neededOccurrences: 3,
        mandatoryAdditionalInformation: mandatoryAdditionalInformation,
        autoAcceptance: true,
        autoAcceptanceMessage: null,
        contactPerson: fakePerson({
          id: contactPersonId,
        }),
      }),
    }),
  },
};

export const profileResponse = {
  data: {
    myProfile: fakePerson({
      organisations: fakeOrganisations(1, [
        {
          id: organisationId,
          persons: fakePersons(1, [
            {
              organisations: [] as never,
              name: personName,
              emailAddress: contactEmail,
              id: contactPersonId,
              phoneNumber: contactPhoneNumber,
            },
          ]),
          name: defaultOrganizationName,
        },
      ]),
    }),
    organisationproposalSet: {
      edges: [],
      __typename: 'OrganisationProposalNodeConnection',
    },
  },
};

const keywordResponse = {
  data: {
    keyword: fakeKeyword({
      id: keywordId,
      name: fakeLocalizedObject(keyword),
    }),
  },
};

const placeResponse = {
  data: {
    place: fakePlace({ name: fakeLocalizedObject(placeName) }),
  },
};

const imageResponse = {
  data: {
    image: fakeImage({
      id: imageId,
      altText: photoAltText,
      photographerName: photographerName,
    }),
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
          name: createFinnishLocalisedObject('Testitapahtuma'),
          location: {
            internalId: getLinkedEventsInternalId(
              LINKEDEVENTS_CONTENT_TYPE.PLACE,
              'helsinki:internet'
            ),
          },
        },
      },
    },
    result: updateEventResponse,
  },
  {
    request: {
      query: EditEventDocument,
      variables: {
        event: {
          ...editEventVariables.event,
          name: createFinnishLocalisedObject('Testinimi', true),
        },
      },
    },
    result: updateEventResponse,
  },
  {
    request: {
      query: EventDocument,
      variables: {
        id: eventId,
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
        id: getKeywordId(keywordId),
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
  {
    request: {
      query: ImageDocument,
      variables: { id: imageId },
    },
    result: imageResponse,
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
