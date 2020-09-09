/* eslint-disable @typescript-eslint/no-explicit-any */
import faker from 'faker';

import {
  Event,
  EventListResponse,
  Image,
  InLanguage,
  Keyword,
  Language,
  LanguageType,
  LocalisedObject,
  OccurrenceNode,
  OccurrenceNodeConnection,
  OccurrenceNodeEdge,
  OrganisationNode,
  OrganisationNodeConnection,
  OrganisationNodeEdge,
  OrganisationType,
  PageInfo,
  PalvelutarjotinEventNode,
  PersonNode,
  PersonNodeConnection,
  PersonNodeEdge,
  Place,
  VenueNode,
} from '../generated/graphql';

const organizationNames = [
  'Kulttuuri- ja vapaa-aikalautakunnan kulttuurijaosto',
  'Kulttuurin ja vapaa-ajan toimiala',
];

const PageInfoMock: PageInfo = {
  hasNextPage: false,
  hasPreviousPage: false,
  __typename: 'PageInfo',
  startCursor: '',
  endCursor: '',
};

export const fakeEvents = (
  count = 1,
  events?: Partial<Event>[]
): EventListResponse => ({
  data: generateNodeArray((i) => fakeEvent(events?.[i]), count),
  meta: {
    __typename: 'Meta',
    count: count,
    next: '',
    previous: '',
  },
  __typename: 'EventListResponse',
});

export const fakeEvent = (overrides?: Partial<Event>): Event => {
  return {
    id: `palvelutarjotin:${faker.random.uuid()}`,
    internalId: faker.random.uuid(),
    name: fakeLocalizedObject(faker.name.title()),
    shortDescription: fakeLocalizedObject(),
    description: fakeLocalizedObject(),
    images: [fakeImage()],
    infoUrl: fakeLocalizedObject(),
    inLanguage: [fakeInLanguage()],
    audience: [],
    keywords: [fakeKeyword()],
    location: fakeLocation(),
    venue: fakeVenue(),
    pEvent: fakePEvent(),
    startTime: '2020-07-13T05:51:05.761000Z',
    publicationStatus: 'public',
    datePublished: null,
    externalLinks: [] as any,
    offers: [] as any,
    subEvents: [] as any,
    endTime: '2020-07-13T05:51:05.761000Z',
    __typename: 'Event',
    ...overrides,
  };
};

export const fakeInLanguage = (overrides?: InLanguage): InLanguage => ({
  id: 'fi',
  internalId: 'https://api.hel.fi/linkedevents-test/v1/language/fi/',
  name: {
    en: null,
    fi: 'suomi',
    sv: null,
    __typename: 'LocalisedObject',
  },
  __typename: 'InLanguage',
  ...overrides,
});

export const fakeLocation = (overrides?: Partial<Place>): Place => ({
  id: faker.random.uuid(),
  internalId: 'https://api.hel.fi/linkedevents-test/v1/place/tprek:15376/',
  name: fakeLocalizedObject(),
  streetAddress: fakeLocalizedObject(),
  addressLocality: fakeLocalizedObject(),
  telephone: fakeLocalizedObject(),
  __typename: 'Place',
  ...overrides,
});

export const fakeKeyword = (overrides?: Partial<Keyword>): Keyword => ({
  id: faker.random.uuid(),
  name: {
    en: 'families',
    fi: 'perheet',
    sv: 'familjer',
    __typename: 'LocalisedObject',
  },
  internalId: 'https://api.hel.fi/linkedevents-test/v1/keyword/yso:p4363/',
  __typename: 'Keyword',
  ...overrides,
});

export const fakeVenue = (overrides?: Partial<VenueNode>): VenueNode => ({
  id: faker.random.uuid(),
  hasClothingStorage: faker.random.boolean(),
  hasSnackEatingPlace: faker.random.boolean(),
  translations: [
    {
      languageCode: 'FI' as Language,
      description: 'TestiVenue',
      __typename: 'VenueTranslationType',
    },
  ],
  __typename: 'VenueNode',
  ...overrides,
});

export const fakeImage = (overrides?: Partial<Image>): Image => ({
  id: faker.random.uuid(),
  internalId: 'https://api.hel.fi/linkedevents-test/v1/image/48566/',
  license: 'cc_by',
  name: faker.random.words(),
  url: 'https://api.hel.fi/linkedevents-test/media/images/test.png',
  cropping: '59,0,503,444',
  photographerName: faker.name.firstName(),
  altText: faker.random.words(),
  __typename: 'Image',
  ...overrides,
});

export const fakePEvent = (
  overrides?: Partial<PalvelutarjotinEventNode>
): PalvelutarjotinEventNode => ({
  id: 'UGFsdmVsdXRhcmpvdGluRXZlbnROb2RlOjcw',
  contactPerson: fakePerson(),
  contactEmail: 'test@email.com',
  contactPhoneNumber: '1233211234',
  duration: 11,
  enrolmentEndDays: 3,
  enrolmentStart: '2020-07-13T06:00:00+00:00',
  neededOccurrences: 3,
  organisation: fakeOrganisation(),
  occurrences: fakeOccurrences(),
  createdAt: '' as any,
  linkedEventId: '' as any,
  updatedAt: '' as any,
  __typename: 'PalvelutarjotinEventNode',
  ...overrides,
});

export const fakeOccurrences = (
  count = 1,
  occurrences?: Partial<OccurrenceNode>[]
): OccurrenceNodeConnection => ({
  edges: generateNodeArray(
    (i) => fakeOccurrenceNodeEdge(occurrences?.[i]),
    count
  ),
  pageInfo: PageInfoMock,
  __typename: 'OccurrenceNodeConnection',
});

export const fakeOccurrenceNodeEdge = (
  overrides?: Partial<OccurrenceNode>
): OccurrenceNodeEdge => ({
  cursor: '',
  node: fakeOccurrence(overrides),
  __typename: 'OccurrenceNodeEdge',
});

export const fakeOccurrence = (
  overrides?: Partial<OccurrenceNode>
): OccurrenceNode => ({
  id: faker.random.uuid(),
  pEvent: {
    id: 'UGFsdmVsdXRhcmpvdGluRXZlbnROb2RlOjcw',
    __typename: 'PalvelutarjotinEventNode',
  } as PalvelutarjotinEventNode,
  amountOfSeats: 30,
  minGroupSize: 10,
  maxGroupSize: 20,
  autoAcceptance: true,
  languages: [
    { id: 'en', name: 'English', __typename: 'LanguageType' },
    { id: 'fi', name: 'Finnish', __typename: 'LanguageType' },
  ] as LanguageType[],
  startTime: '2020-08-03T09:00:00+00:00',
  endTime: '2020-08-03T09:30:00+00:00',
  placeId: '',
  seatsTaken: 0,
  contactPersons: [] as any,
  createdAt: '' as any,
  enrolments: [] as any,
  studyGroups: [] as any,
  updatedAt: '' as any,
  remainingSeats: null as any,
  cancelled: false,
  __typename: 'OccurrenceNode',
  ...overrides,
});

export const fakeOrganisations = (
  count = 1,
  organisations?: Partial<OrganisationNode>[]
): OrganisationNodeConnection => ({
  edges: generateNodeArray(
    (i) => fakeOrganisationNodeEdge(organisations?.[i]),
    count
  ),
  pageInfo: PageInfoMock,
  __typename: 'OrganisationNodeConnection',
});

export const fakeOrganisationNodeEdge = (
  overrides?: Partial<OrganisationNode>
): OrganisationNodeEdge => ({
  cursor: '',
  __typename: 'OrganisationNodeEdge',
  node: fakeOrganisation(overrides),
});

export const fakeOrganisation = (
  overrides?: Partial<OrganisationNode>
): OrganisationNode => ({
  id: faker.random.uuid(),
  name: faker.random.arrayElement(organizationNames) as string,
  persons: fakePersons(5),
  phoneNumber: faker.phone.phoneNumber(),
  publisherId: faker.random.uuid(),
  type: 'USER' as OrganisationType,
  pEvent: null as any,
  __typename: 'OrganisationNode',
  ...overrides,
});

export const fakePersons = (
  count = 1,
  persons?: Partial<PersonNode>[]
): PersonNodeConnection => ({
  edges: generateNodeArray((i) => fakePersonNodeEdge(persons?.[i]), count),
  pageInfo: PageInfoMock,
  __typename: 'PersonNodeConnection',
});

export const fakePersonNodeEdge = (
  overrides?: Partial<PersonNode>
): PersonNodeEdge => ({
  cursor: '',
  __typename: 'PersonNodeEdge',
  node: fakePerson(overrides),
});

export const fakePerson = (overrides?: Partial<PersonNode>): PersonNode => ({
  __typename: 'PersonNode',
  id: faker.random.uuid(),
  emailAddress: faker.internet.email(),
  language: 'FI' as Language,
  name: faker.name.firstName(),
  phoneNumber: faker.phone.phoneNumber(),
  createdAt: '' as any,
  enrolmentSet: '' as any,
  occurrences: [] as any,
  organisations: [] as any,
  pEvent: '' as any,
  studygroupSet: '' as any,
  updatedAt: '' as any,
  ...overrides,
});

export const fakeLocalizedObject = (text?: string): LocalisedObject => ({
  __typename: 'LocalisedObject',
  en: null,
  sv: null,
  fi: text || faker.random.words(),
});

const generateNodeArray = <T extends (...args: any) => any>(
  fakeFunc: T,
  length: number
): ReturnType<T>[] => {
  return Array.from({ length }).map((_, i) => fakeFunc(i));
};
