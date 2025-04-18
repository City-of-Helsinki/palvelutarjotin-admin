/* eslint-disable @typescript-eslint/no-explicit-any */
import { faker } from '@faker-js/faker';
import { add as addTime } from 'date-fns';

import { LINKEDEVENTS_CONTENT_TYPE } from '../constants';
import getLinkedEventsInternalId from './getLinkedEventsInternalId';
import {
  EnrolmentNode,
  EnrolmentNodeConnection,
  EnrolmentNodeEdge,
  EnrolmentStatus,
  Event,
  EventListResponse,
  EventQueueEnrolmentNode,
  EventQueueEnrolmentNodeConnection,
  EventQueueEnrolmentStatus,
  ExternalPlace,
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
  OccurrencesOccurrenceSeatTypeChoices,
  Offer,
  OrganisationNode,
  OrganisationNodeConnection,
  OrganisationNodeEdge,
  OrganisationProposalNode,
  OrganisationProposalNodeConnection,
  OrganisationProposalNodeEdge,
  OrganisationsOrganisationTypeChoices,
  PageInfo,
  PalvelutarjotinEventNode,
  PersonNode,
  PersonNodeConnection,
  PersonNodeEdge,
  Place,
  StudyGroupNode,
  StudyGroupNodeConnection,
  StudyLevelNode,
  StudyLevelNodeConnection,
  StudyLevelNodeEdge,
  UnitNode,
  VenueNode,
} from '../generated/graphql';

const organizationNames = [
  'Kulttuuri- ja vapaa-aikalautakunnan kulttuurijaosto',
  'Kulttuurin ja vapaa-ajan toimiala',
];

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

const emptyNodeConnectionBase = {
  count: 0,
  edges: [],
  pageInfo: {
    __typename: 'PageInfo' as const,
    hasNextPage: false,
    hasPreviousPage: false,
  },
};

export const emptyEnrolmentNodeConnection: EnrolmentNodeConnection = {
  ...emptyNodeConnectionBase,
  __typename: 'EnrolmentNodeConnection',
};

export const emptyEventQueueEnrolmentNodeConnection: EventQueueEnrolmentNodeConnection =
  {
    ...emptyNodeConnectionBase,
    __typename: 'EventQueueEnrolmentNodeConnection',
  };

export const emptyOccurrenceNodeConnection: OccurrenceNodeConnection = {
  ...emptyNodeConnectionBase,
  __typename: 'OccurrenceNodeConnection',
};

export const emptyOrganisationNodeConnection: OrganisationNodeConnection = {
  ...emptyNodeConnectionBase,
  __typename: 'OrganisationNodeConnection',
};

export const emptyStudyGroupNodeConnection: StudyGroupNodeConnection = {
  ...emptyNodeConnectionBase,
  __typename: 'StudyGroupNodeConnection',
};

export const generateNodeArray = <T extends (...args: any) => any>(
  fakeFunc: T,
  length: number
): ReturnType<T>[] => {
  return Array.from({ length }).map((_, i) => fakeFunc(i));
};

export const pageInfoMock: PageInfo = {
  hasNextPage: false,
  hasPreviousPage: false,
  __typename: 'PageInfo',
  startCursor: '',
  endCursor: '',
};

export const fakeLocalizedObject = (
  text?: string,
  localizedObject: { fi?: string; en?: string; sv?: string } = {}
): LocalisedObject => ({
  __typename: 'LocalisedObject',
  en: localizedObject.en ?? '',
  sv: localizedObject.sv ?? '',
  fi: localizedObject.fi || text || faker.word.words(),
});

export const fakeLanguage = (
  overrides?: Partial<LanguageNode>
): LanguageNode => ({
  id: 'fi',
  name: 'Finnish',
  __typename: 'LanguageNode',
  ...overrides,
});

export const fakeLanguageNodeEdge = (
  overrides?: Partial<LanguageNode>
): LanguageNodeEdge => ({
  cursor: '',
  node: fakeLanguage(overrides),
  __typename: 'LanguageNodeEdge',
});

export const fakeLanguages = (
  languages?: Partial<LanguageNode>[]
): LanguageNodeConnection => ({
  edges: languages?.map((language) => fakeLanguageNodeEdge(language)) || [],
  pageInfo: pageInfoMock,
  __typename: 'LanguageNodeConnection',
});

export const fakeOccurrence = (
  overrides?: Partial<OccurrenceNode>
): OccurrenceNode => ({
  id: faker.string.uuid(),
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
  endTime: overrides?.startTime
    ? addTime(new Date(overrides?.startTime), { hours: 1 })
    : '2020-08-03T09:30:00+00:00',
  placeId: faker.string.uuid(),
  seatsTaken: 0,
  seatsApproved: 0,
  contactPersons: [] as any,
  createdAt: '' as any,
  enrolments: [] as any,
  studyGroups: [] as any,
  updatedAt: '' as any,
  remainingSeats: null as any,
  cancelled: false,
  seatType: OccurrencesOccurrenceSeatTypeChoices.ChildrenCount,
  __typename: 'OccurrenceNode',
  ...overrides,
});

export const fakeOrganisationProposal = (
  overrides?: Partial<OrganisationProposalNode>
): OrganisationProposalNode => ({
  __typename: 'OrganisationProposalNode',
  id: faker.string.uuid(),
  name: '3rd party org',
  description: 'Organisation description',
  phoneNumber: '',

  applicant: fakePerson(),
  ...overrides,
});

export const fakeOrganisationProposalEdge = (
  overrides?: Partial<OrganisationProposalNode>
): OrganisationProposalNodeEdge => ({
  cursor: '',
  __typename: 'OrganisationProposalNodeEdge',
  node: fakeOrganisationProposal(overrides),
});

export const fakeOrganisationProposals = (
  count = 0,
  organisationProposals?: Partial<OrganisationProposalNode>[]
): OrganisationProposalNodeConnection => ({
  edges: generateNodeArray(
    (i) => fakeOrganisationProposalEdge(organisationProposals?.[i]),
    count
  ),
  pageInfo: pageInfoMock,
  __typename: 'OrganisationProposalNodeConnection',
});

export const fakePerson = (overrides?: Partial<PersonNode>): PersonNode => ({
  __typename: 'PersonNode',
  id: faker.string.uuid(),
  emailAddress: faker.internet.email(),
  language: 'FI' as Language,
  name: faker.person.firstName(),
  phoneNumber: faker.phone.number(),
  createdAt: '',
  enrolmentSet: emptyEnrolmentNodeConnection,
  eventqueueenrolmentSet: emptyEventQueueEnrolmentNodeConnection,
  occurrences: emptyOccurrenceNodeConnection,
  organisations: emptyOrganisationNodeConnection,
  studygroupSet: emptyStudyGroupNodeConnection,
  updatedAt: '',
  isStaff: true,
  organisationproposalSet: fakeOrganisationProposals(),
  placeIds: [],
  ...overrides,
});

export const fakePersonNodeEdge = (
  overrides?: Partial<PersonNode>
): PersonNodeEdge => ({
  cursor: '',
  __typename: 'PersonNodeEdge',
  node: fakePerson(overrides),
});

export const fakePersons = (
  count = 1,
  persons?: Partial<PersonNode>[]
): PersonNodeConnection => ({
  edges: generateNodeArray((i) => fakePersonNodeEdge(persons?.[i]), count),
  pageInfo: pageInfoMock,
  __typename: 'PersonNodeConnection',
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

export const fakeImage = (overrides?: Partial<Image>): Image => ({
  id: faker.string.uuid(),
  internalId: getLinkedEventsInternalId(
    LINKEDEVENTS_CONTENT_TYPE.IMAGE,
    '48566'
  ),
  license: 'cc_by',
  name: faker.word.words(),
  url: 'https://linkedevents.api.test.hel.ninja/media/images/test.png',
  cropping: '59,0,503,444',
  photographerName: faker.person.firstName(),
  altText: faker.word.words(),
  __typename: 'Image',
  ...overrides,
});

export const fakeInLanguage = (
  overrides?: Partial<InLanguage>
): InLanguage => ({
  id: 'fi',
  internalId: getLinkedEventsInternalId(
    LINKEDEVENTS_CONTENT_TYPE.LANGUAGE,
    'fi'
  ),
  name: {
    en: null,
    fi: 'suomi',
    sv: null,
    __typename: 'LocalisedObject',
  },
  __typename: 'InLanguage',
  ...overrides,
});

export const fakeKeyword = (overrides?: Partial<Keyword>): Keyword => {
  const id = overrides?.id || faker.string.uuid();
  return {
    id: faker.string.uuid(),
    name: fakeLocalizedObject(),
    internalId: getLinkedEventsInternalId(
      LINKEDEVENTS_CONTENT_TYPE.KEYWORD,
      id
    ),
    __typename: 'Keyword',
    ...overrides,
  };
};

export const fakePlace = (overrides?: Partial<Place>): Place => ({
  id: faker.string.uuid(),
  internalId: getLinkedEventsInternalId(
    LINKEDEVENTS_CONTENT_TYPE.PLACE,
    'tprek:15376'
  ),
  name: fakeLocalizedObject(),
  streetAddress: fakeLocalizedObject(),
  addressLocality: fakeLocalizedObject(),
  telephone: fakeLocalizedObject(),
  __typename: 'Place',
  ...overrides,
});

export const fakeVenue = (overrides?: Partial<VenueNode>): VenueNode => ({
  id: faker.string.uuid(),
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

export const fakeOrganisation = (
  overrides: Partial<OrganisationNode> = {}
): OrganisationNode => ({
  id: faker.string.uuid(),
  name: faker.helpers.arrayElement(organizationNames) as string,
  // avoid infinite recursion
  persons: overrides.persons || fakePersons(5),
  phoneNumber: faker.phone.number(),
  publisherId: faker.string.uuid(),
  type: OrganisationsOrganisationTypeChoices.Provider,
  __typename: 'OrganisationNode',
  ...overrides,
});

export const fakeOccurrenceNodeEdge = (
  overrides?: Partial<OccurrenceNode>
): OccurrenceNodeEdge => ({
  cursor: '',
  node: fakeOccurrence(overrides),
  __typename: 'OccurrenceNodeEdge',
});

export const fakeOccurrences = (
  count = 1,
  occurrences?: Partial<OccurrenceNode>[]
): OccurrenceNodeConnection => ({
  edges: generateNodeArray(
    (i) => fakeOccurrenceNodeEdge(occurrences?.[i]),
    count
  ),
  pageInfo: pageInfoMock,
  __typename: 'OccurrenceNodeConnection',
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
  externalEnrolmentUrl: null,
  isQueueingAllowed: true,
  neededOccurrences: 3,
  organisation: fakeOrganisation(),
  occurrences: fakeOccurrences(),
  queuedEnrolments: [] as any,
  createdAt: '' as any,
  linkedEventId: '' as any,
  updatedAt: '' as any,
  autoAcceptance: false,
  autoAcceptanceMessage: null,
  translations: [],
  nextOccurrenceDatetime: '',
  lastOccurrenceDatetime: '',
  mandatoryAdditionalInformation: false,
  __typename: 'PalvelutarjotinEventNode',
  ...overrides,
});

export const fakeEvent = (overrides?: Partial<Event>): Event => {
  return {
    id: `palvelutarjotin:${faker.string.uuid()}`,
    internalId: faker.string.uuid(),
    name: fakeLocalizedObject(faker.word.words()),
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

export const fakeStudyLevel = (
  overrides?: Partial<StudyLevelNode>
): StudyLevelNode => ({
  __typename: 'StudyLevelNode',
  id: faker.word.words(),
  label: faker.word.words(),
  level: faker.number.int(),
  translations: [
    {
      languageCode: 'FI' as Language,
      label: faker.word.words(),
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

export const fakeStudyLevels = (count?: number): StudyLevelNodeConnection => ({
  edges: initialStudyLevels
    .slice(0, count)
    .map((label: StudyLevel, level: number) =>
      fakeStudyLevelNodeEdge({ id: label, label, level })
    ),
  pageInfo: pageInfoMock,
  __typename: 'StudyLevelNodeConnection',
});

export const fakeUnit = (
  overrides?: Partial<UnitNode>,
  unitType: 'ExternalPlace' | 'Place' = 'ExternalPlace'
): UnitNode => {
  if (unitType === 'Place') {
    return fakePlace();
  }
  return {
    name: {
      fi: 'toimipisteen nimi',
      sv: 'kontor namn',
      en: 'unit name',
    },
  } as ExternalPlace;
};

export const fakeStudyGroup = (
  overrides?: Partial<StudyGroupNode>
): StudyGroupNode => ({
  amountOfAdult: 1,
  createdAt: '',
  enrolments: [] as any,
  queuedEnrolments: [] as any,
  extraNeeds: '',
  groupName: '',
  groupSize: 19,
  preferredTimes: '',
  id: faker.string.uuid(),
  unitName: '',
  unitId: '',
  unit: fakeUnit(undefined, overrides?.unitId ? 'Place' : 'ExternalPlace'),
  occurrences: fakeOccurrences(),
  person: fakePerson(),
  updatedAt: '',
  __typename: 'StudyGroupNode',
  studyLevels: fakeStudyLevels(),
  ...overrides,
});

export const fakeEnrolment = (
  overrides?: Partial<EnrolmentNode>
): EnrolmentNode => ({
  enrolmentTime: '2020-08-18T06:37:40.755109+00:00',
  id: faker.string.uuid(),
  occurrence: fakeOccurrence(),
  studyGroup: fakeStudyGroup(),
  notificationType: NotificationType.EmailSms,
  __typename: 'EnrolmentNode',
  person: fakePerson(),
  status: EnrolmentStatus.Approved,
  updatedAt: '',
  ...overrides,
});

export const fakeEnrolmentNodeEdge = (
  overrides?: Partial<EnrolmentNode>
): EnrolmentNodeEdge => ({
  cursor: '',
  node: fakeEnrolment(overrides),
  __typename: 'EnrolmentNodeEdge',
});

export const fakeEnrolments = (
  count = 1,
  enrolments?: Partial<EnrolmentNode>[]
): EnrolmentNodeConnection => ({
  edges: generateNodeArray(
    (i) => fakeEnrolmentNodeEdge(enrolments?.[i]),
    count
  ),
  pageInfo: pageInfoMock,
  __typename: 'EnrolmentNodeConnection',
  count,
});

export const fakeEventQueueEnrolment = (
  overrides?: Partial<EventQueueEnrolmentNode>
): EventQueueEnrolmentNode => ({
  enrolmentTime: '2020-08-19T06:37:40.755109+00:00',
  id: faker.string.uuid(),
  pEvent: fakePEvent(),
  studyGroup: fakeStudyGroup(),
  notificationType: NotificationType.EmailSms,
  __typename: 'EventQueueEnrolmentNode',
  person: fakePerson(),
  status: EventQueueEnrolmentStatus.HasNoEnrolments,
  updatedAt: '',
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

export const fakeKeywordSet = (
  overrides?: Partial<KeywordSet>
): KeywordSet => ({
  internalId: faker.string.uuid(),
  id: faker.string.uuid(),
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

export const fakeOrganisationNodeEdge = (
  overrides?: Partial<OrganisationNode>
): OrganisationNodeEdge => ({
  cursor: '',
  __typename: 'OrganisationNodeEdge',
  node: fakeOrganisation(overrides),
});

export const fakeOrganisations = (
  count = 1,
  organisations?: Partial<OrganisationNode>[]
): OrganisationNodeConnection => ({
  edges: generateNodeArray(
    (i) => fakeOrganisationNodeEdge(organisations?.[i]),
    count
  ),
  pageInfo: pageInfoMock,
  __typename: 'OrganisationNodeConnection',
});
