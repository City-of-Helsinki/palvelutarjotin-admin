/* eslint-disable @typescript-eslint/no-explicit-any */
import faker from 'faker';

import { LINKEDEVENTS_CONTENT_TYPE } from '../constants';
import {
  EnrolmentNode,
  EnrolmentNodeConnection,
  EnrolmentNodeEdge,
  EnrolmentStatus,
  Event,
  EventListResponse,
  Image,
  InLanguage,
  Keyword,
  KeywordSet,
  Language,
  LanguageNode,
  LanguageNodeConnection,
  LanguageNodeEdge,
  LocalisedObject,
  NotificationType,
  OccurrenceNode,
  OccurrenceNodeConnection,
  OccurrenceNodeEdge,
  OccurrenceSeatType,
  Offer,
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
  StudyGroupNode,
  StudyLevelNode,
  StudyLevelNodeConnection,
  StudyLevelNodeEdge,
  VenueNode,
} from '../generated/graphql';
import getLinkedEventsInternalId from './getLinkedEventsInternalId';

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

export const fakeOffer = (overrides?: Partial<Offer>): Offer => ({
  isFree: true,
  description: {
    en: '',
    fi: 'description',
    sv: '',
    __typename: 'LocalisedObject',
  },
  price: {
    en: '',
    fi: '99,9',
    sv: '',
    __typename: 'LocalisedObject',
  },
  infoUrl: null,
  __typename: 'Offer',
  ...overrides,
});

export const fakeEvent = (overrides?: Partial<Event>): Event => {
  return {
    id: `palvelutarjotin:${faker.datatype.uuid()}`,
    internalId: faker.datatype.uuid(),
    name: fakeLocalizedObject(faker.name.title()),
    shortDescription: fakeLocalizedObject(),
    description: fakeLocalizedObject(),
    images: [fakeImage()],
    infoUrl: fakeLocalizedObject(),
    inLanguage: [fakeInLanguage()],
    audience: [],
    keywords: [fakeKeyword()],
    location: fakePlace(),
    venue: fakeVenue(),
    pEvent: fakePEvent(),
    startTime: '2020-07-13T05:51:05.761000Z',
    publicationStatus: 'draft',
    datePublished: null,
    externalLinks: [] as any,
    offers: [fakeOffer()],
    subEvents: [] as any,
    endTime: '2020-07-13T05:51:05.761000Z',
    additionalCriteria: [],
    activities: [],
    categories: [],
    __typename: 'Event',
    ...overrides,
  };
};

export const fakeEnrolments = (
  count = 1,
  enrolments?: Partial<EnrolmentNode>[]
): EnrolmentNodeConnection => ({
  edges: generateNodeArray(
    (i) => fakeEnrolmentNodeEdge(enrolments?.[i]),
    count
  ),
  pageInfo: PageInfoMock,
  __typename: 'EnrolmentNodeConnection',
  count,
});

export const fakeEnrolment = (
  overrides?: Partial<EnrolmentNode>
): EnrolmentNode => ({
  enrolmentTime: '2020-08-18T06:37:40.755109+00:00',
  id: faker.datatype.uuid(),
  occurrence: fakeOccurrence(),
  studyGroup: fakeStudyGroup(),
  notificationType: NotificationType.EmailSms,
  __typename: 'EnrolmentNode',
  person: fakePerson(),
  status: EnrolmentStatus.Approved,
  ...overrides,
});

export const fakeStudyGroup = (
  overrides?: Partial<StudyGroupNode>
): StudyGroupNode => ({
  amountOfAdult: 1,
  createdAt: '',
  enrolments: [] as any,
  extraNeeds: '',
  groupName: '',
  groupSize: 19,
  id: faker.datatype.uuid(),
  name: '',
  occurrences: fakeOccurrences(),
  person: fakePerson(),
  updatedAt: '',
  __typename: 'StudyGroupNode',
  studyLevels: fakeStudyLevels(),
  ...overrides,
});

export const fakeInLanguage = (
  overrides?: Partial<InLanguage>
): InLanguage => ({
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

export const fakePlace = (overrides?: Partial<Place>): Place => ({
  id: faker.datatype.uuid(),
  internalId: 'https://api.hel.fi/linkedevents-test/v1/place/tprek:15376/',
  name: fakeLocalizedObject(),
  streetAddress: fakeLocalizedObject(),
  addressLocality: fakeLocalizedObject(),
  telephone: fakeLocalizedObject(),
  __typename: 'Place',
  ...overrides,
});

export const fakePlaces = (count = 1, places?: Partial<Place>[]) => ({
  meta: {
    __typename: 'Meta',
    count: count,
    next: '',
    previous: '',
  },
  data: generateNodeArray((i) => fakePlace(places?.[i]), count),
  __typename: 'PlaceListResponse',
});

export const fakeKeywords = (count = 1, keywords?: Partial<Keyword>[]) => ({
  meta: {
    __typename: 'Meta',
    count: count,
    next: '',
    previous: '',
  },
  data: generateNodeArray((i) => fakeKeyword(keywords?.[i]), count),
  __typename: 'KeywordsListResponse',
});

export const fakeKeyword = (overrides?: Partial<Keyword>): Keyword => {
  const id = overrides?.id || faker.datatype.uuid();
  return {
    id: faker.datatype.uuid(),
    name: fakeLocalizedObject(),
    internalId: getLinkedEventsInternalId(
      LINKEDEVENTS_CONTENT_TYPE.KEYWORD,
      id
    ),
    __typename: 'Keyword',
    ...overrides,
  };
};

export const fakeVenue = (overrides?: Partial<VenueNode>): VenueNode => ({
  id: faker.datatype.uuid(),
  hasClothingStorage: faker.datatype.boolean(),
  hasSnackEatingPlace: faker.datatype.boolean(),
  outdoorActivity: faker.datatype.boolean(),
  hasToiletNearby: faker.datatype.boolean(),
  hasAreaForGroupWork: faker.datatype.boolean(),
  hasIndoorPlayingArea: faker.datatype.boolean(),
  hasOutdoorPlayingArea: faker.datatype.boolean(),
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
  id: faker.datatype.uuid(),
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
  enrolmentEndDays: 3,
  enrolmentStart: '2020-07-13T06:00:00+00:00',
  neededOccurrences: 3,
  organisation: fakeOrganisation(),
  occurrences: fakeOccurrences(),
  createdAt: '' as any,
  linkedEventId: '' as any,
  updatedAt: '' as any,
  autoAcceptance: false,
  nextOccurrenceDatetime: '',
  lastOccurrenceDatetime: '',
  mandatoryAdditionalInformation: false,
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

export const fakeEnrolmentNodeEdge = (
  overrides?: Partial<EnrolmentNode>
): EnrolmentNodeEdge => ({
  cursor: '',
  node: fakeEnrolment(overrides),
  __typename: 'EnrolmentNodeEdge',
});

export const fakeOccurrenceNodeEdge = (
  overrides?: Partial<OccurrenceNode>
): OccurrenceNodeEdge => ({
  cursor: '',
  node: fakeOccurrence(overrides),
  __typename: 'OccurrenceNodeEdge',
});

export const fakeLanguages = (
  languages?: Partial<LanguageNode>[]
): LanguageNodeConnection => ({
  edges: languages?.map((language) => fakeLanguageNodeEdge(language)) || [],
  pageInfo: PageInfoMock,
  __typename: 'LanguageNodeConnection',
});

export const fakeLanguageNodeEdge = (
  overrides?: Partial<LanguageNode>
): LanguageNodeEdge => ({
  cursor: '',
  node: fakeLanguage(overrides),
  __typename: 'LanguageNodeEdge',
});

export const fakeLanguage = (
  overrides?: Partial<LanguageNode>
): LanguageNode => ({
  id: 'fi',
  name: 'Finnish',
  __typename: 'LanguageNode',
  ...overrides,
});

export const fakeOccurrence = (
  overrides?: Partial<OccurrenceNode>
): OccurrenceNode => ({
  id: faker.datatype.uuid(),
  pEvent: {
    id: 'UGFsdmVsdXRhcmpvdGluRXZlbnROb2RlOjcw',
    __typename: 'PalvelutarjotinEventNode',
  } as PalvelutarjotinEventNode,
  amountOfSeats: 30,
  minGroupSize: 10,
  maxGroupSize: 20,
  languages: fakeLanguages([
    { id: 'en', name: 'English' },
    { id: 'fi', name: 'Finnish' },
  ]),
  startTime: '2020-08-03T09:00:00+00:00',
  endTime: '2020-08-03T09:30:00+00:00',
  placeId: faker.datatype.uuid(),
  seatsTaken: 0,
  seatsApproved: 0,
  contactPersons: [] as any,
  createdAt: '' as any,
  enrolments: [] as any,
  studyGroups: [] as any,
  updatedAt: '' as any,
  remainingSeats: null as any,
  cancelled: false,
  seatType: OccurrenceSeatType.ChildrenCount,
  __typename: 'OccurrenceNode',
  ...overrides,
});

export const fakeKeywordSet = (
  overrides?: Partial<KeywordSet>
): KeywordSet => ({
  internalId: faker.datatype.uuid(),
  id: faker.datatype.uuid(),
  name: fakeLocalizedObject(),
  keywords: [fakeKeyword()],
  createdTime: '',
  dataSource: '',
  internalContext: '',
  internalType: '',
  lastModifiedTime: '',
  publisher: '',
  usage: '',
  __typename: 'KeywordSet',
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
  overrides: Partial<OrganisationNode> = {}
): OrganisationNode => ({
  id: faker.datatype.uuid(),
  name: faker.random.arrayElement(organizationNames) as string,
  // avoid infinite recursion
  persons: overrides.persons || fakePersons(5),
  phoneNumber: faker.phone.phoneNumber(),
  publisherId: faker.datatype.uuid(),
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
  id: faker.datatype.uuid(),
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
  isStaff: true,
  ...overrides,
});

export const fakeLocalizedObject = (
  text?: string,
  localizedObject: { fi?: string; en?: string; sv?: string } = {}
): LocalisedObject => ({
  __typename: 'LocalisedObject',
  en: localizedObject.en ?? '',
  sv: localizedObject.sv ?? '',
  fi: localizedObject.fi || text || faker.random.words(),
});

const generateNodeArray = <T extends (...args: any) => any>(
  fakeFunc: T,
  length: number
): ReturnType<T>[] => {
  return Array.from({ length }).map((_, i) => fakeFunc(i));
};

export enum StudyLevel {
  Preschool = 'PRESCHOOL',
  Grade1 = 'GRADE_1',
  Grade2 = 'GRADE_2',
  Grade3 = 'GRADE_3',
  Grade4 = 'GRADE_4',
  Grade5 = 'GRADE_5',
  Grade6 = 'GRADE_6',
  Grade7 = 'GRADE_7',
  Grade8 = 'GRADE_8',
  Grade9 = 'GRADE_9',
  Grade10 = 'GRADE_10',
  Secondary = 'SECONDARY',
}

export const initialStudyLevels = Object.keys(StudyLevel).map(
  (lvl: string) => StudyLevel[lvl as keyof typeof StudyLevel] as StudyLevel
);

export const fakeStudyLevels = (count?: number): StudyLevelNodeConnection => ({
  edges: initialStudyLevels
    .slice(0, count)
    .map((label: StudyLevel, level: number) =>
      fakeStudyLevelNodeEdge({ id: label, label, level })
    ),
  pageInfo: PageInfoMock,
  __typename: 'StudyLevelNodeConnection',
});

export const fakeStudyLevel = (
  overrides?: Partial<StudyLevelNode>
): StudyLevelNode => ({
  __typename: 'StudyLevelNode',
  id: faker.random.word(),
  label: faker.random.words(),
  level: faker.datatype.number(),
  translations: [
    {
      languageCode: 'FI' as Language,
      label: faker.random.word(),
      __typename: 'StudyLevelTranslationType',
    },
  ],
  ...overrides,
});

export const fakeStudyLevelNodeEdge = (
  overrides?: Partial<StudyLevelNode>
): StudyLevelNodeEdge => ({
  cursor: '',
  node: fakeStudyLevel(overrides),
  __typename: 'StudyLevelNodeEdge',
});
