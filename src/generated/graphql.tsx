import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  /**
   * The `Date` scalar type represents a Date
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  Date: any;
  /**
   * The `Time` scalar type represents a Time value as
   * specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  Time: any;
  /**
   * Allows use of a JSON String for input / output from the GraphQL schema.
   * 
   * Use of this type is *not recommended* as you lose the benefits of having a defined, static
   * schema (one of the key benefits of GraphQL).
   */
  JSONString: any;
  /**
   * Create scalar that ignores normal serialization/deserialization, since
   * that will be handled by the multipart request spec
   */
  Upload: any;
};

export type Query = {
   __typename?: 'Query';
  occurrences?: Maybe<OccurrenceNodeConnection>;
  /** The ID of the object */
  occurrence?: Maybe<OccurrenceNode>;
  studyGroups?: Maybe<StudyGroupNodeConnection>;
  /** The ID of the object */
  studyGroup?: Maybe<StudyGroupNode>;
  venues?: Maybe<VenueNodeConnection>;
  venue?: Maybe<VenueNode>;
  enrolments?: Maybe<EnrolmentNodeConnection>;
  /** The ID of the object */
  enrolment?: Maybe<EnrolmentNode>;
  /** Query personal data of logged user */
  myProfile?: Maybe<PersonNode>;
  /** The ID of the object */
  person?: Maybe<PersonNode>;
  persons?: Maybe<PersonNodeConnection>;
  /** The ID of the object */
  organisation?: Maybe<OrganisationNode>;
  organisations?: Maybe<OrganisationNodeConnection>;
  events?: Maybe<EventListResponse>;
  event?: Maybe<Event>;
  places?: Maybe<PlaceListResponse>;
  place?: Maybe<Place>;
  images?: Maybe<ImageListResponse>;
  image?: Maybe<Image>;
  keywords?: Maybe<KeywordListResponse>;
  keyword?: Maybe<Keyword>;
  eventsSearch?: Maybe<EventSearchListResponse>;
  placesSearch?: Maybe<PlaceSearchListResponse>;
  notificationTemplate?: Maybe<NotificationTemplateWithContext>;
};


export type QueryOccurrencesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  upcoming?: Maybe<Scalars['Boolean']>;
  date?: Maybe<Scalars['Date']>;
  time?: Maybe<Scalars['Time']>;
};


export type QueryOccurrenceArgs = {
  id: Scalars['ID'];
};


export type QueryStudyGroupsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryStudyGroupArgs = {
  id: Scalars['ID'];
};


export type QueryVenuesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryVenueArgs = {
  id: Scalars['ID'];
};


export type QueryEnrolmentsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryEnrolmentArgs = {
  id: Scalars['ID'];
};


export type QueryPersonArgs = {
  id: Scalars['ID'];
};


export type QueryPersonsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryOrganisationArgs = {
  id: Scalars['ID'];
};


export type QueryOrganisationsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryEventsArgs = {
  divisions?: Maybe<Array<Maybe<Scalars['String']>>>;
  end?: Maybe<Scalars['String']>;
  include?: Maybe<Array<Maybe<Scalars['String']>>>;
  inLanguage?: Maybe<Scalars['String']>;
  isFree?: Maybe<Scalars['Boolean']>;
  keywords?: Maybe<Array<Maybe<Scalars['String']>>>;
  keywordNot?: Maybe<Array<Maybe<Scalars['String']>>>;
  language?: Maybe<Scalars['String']>;
  locations?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  publisher?: Maybe<Scalars['ID']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['String']>;
  superEvent?: Maybe<Scalars['ID']>;
  superEventType?: Maybe<Array<Maybe<Scalars['String']>>>;
  text?: Maybe<Scalars['String']>;
  translation?: Maybe<Scalars['String']>;
  organisationId?: Maybe<Scalars['String']>;
  showAll?: Maybe<Scalars['Boolean']>;
  publicationStatus?: Maybe<Scalars['String']>;
};


export type QueryEventArgs = {
  id: Scalars['ID'];
  include?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryPlacesArgs = {
  dataSource?: Maybe<Scalars['String']>;
  divisions?: Maybe<Array<Maybe<Scalars['String']>>>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  showAllPlaces?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};


export type QueryPlaceArgs = {
  id: Scalars['ID'];
};


export type QueryImageArgs = {
  id: Scalars['ID'];
};


export type QueryKeywordsArgs = {
  dataSource?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  showAllKeywords?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};


export type QueryKeywordArgs = {
  id: Scalars['ID'];
};


export type QueryEventsSearchArgs = {
  input: Scalars['String'];
  include?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryPlacesSearchArgs = {
  input: Scalars['String'];
  include?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryNotificationTemplateArgs = {
  templateType?: Maybe<NotificationTemplateType>;
  context: Scalars['JSONString'];
  language: Language;
};

export type OccurrenceNodeConnection = {
   __typename?: 'OccurrenceNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<OccurrenceNodeEdge>>;
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
   __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
};

/** A Relay edge containing a `OccurrenceNode` and its cursor. */
export type OccurrenceNodeEdge = {
   __typename?: 'OccurrenceNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<OccurrenceNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type OccurrenceNode = Node & {
   __typename?: 'OccurrenceNode';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  /** The ID of the object. */
  id: Scalars['ID'];
  pEvent?: Maybe<PalvelutarjotinEventNode>;
  minGroupSize: Scalars['Int'];
  maxGroupSize: Scalars['Int'];
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  contactPersons: PersonNodeConnection;
  studyGroups: StudyGroupNodeConnection;
  placeId: Scalars['String'];
  autoAcceptance: Scalars['Boolean'];
  amountOfSeats: Scalars['Int'];
  languages: Array<LanguageType>;
  cancelled: Scalars['Boolean'];
  enrolments: EnrolmentNodeConnection;
  remainingSeats?: Maybe<Scalars['Int']>;
  seatsTaken?: Maybe<Scalars['Int']>;
  linkedEvent?: Maybe<Event>;
};


export type OccurrenceNodeContactPersonsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type OccurrenceNodeStudyGroupsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type OccurrenceNodeEnrolmentsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** An object with an ID */
export type Node = {
  /** The ID of the object. */
  id: Scalars['ID'];
};


export type PalvelutarjotinEventNode = Node & {
   __typename?: 'PalvelutarjotinEventNode';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  /** The ID of the object. */
  id: Scalars['ID'];
  linkedEventId: Scalars['String'];
  enrolmentStart?: Maybe<Scalars['DateTime']>;
  enrolmentEndDays?: Maybe<Scalars['Int']>;
  duration: Scalars['Int'];
  neededOccurrences: Scalars['Int'];
  organisation?: Maybe<OrganisationNode>;
  contactPerson?: Maybe<PersonNode>;
  contactPhoneNumber: Scalars['String'];
  contactEmail: Scalars['String'];
  occurrences: OccurrenceNodeConnection;
  nextOccurrenceDatetime?: Maybe<Scalars['DateTime']>;
  lastOccurrenceDatetime?: Maybe<Scalars['DateTime']>;
};


export type PalvelutarjotinEventNodeOccurrencesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  upcoming?: Maybe<Scalars['Boolean']>;
  date?: Maybe<Scalars['Date']>;
  time?: Maybe<Scalars['Time']>;
};

export type OrganisationNode = Node & {
   __typename?: 'OrganisationNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  phoneNumber: Scalars['String'];
  type: OrganisationType;
  persons: PersonNodeConnection;
  publisherId: Scalars['String'];
  pEvent: PalvelutarjotinEventNodeConnection;
};


export type OrganisationNodePersonsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type OrganisationNodePEventArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** An enumeration. */
export enum OrganisationType {
  /** Käyttäjä */
  User = 'USER',
  /** Provider */
  Provider = 'PROVIDER'
}

export type PersonNodeConnection = {
   __typename?: 'PersonNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<PersonNodeEdge>>;
};

/** A Relay edge containing a `PersonNode` and its cursor. */
export type PersonNodeEdge = {
   __typename?: 'PersonNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<PersonNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type PersonNode = Node & {
   __typename?: 'PersonNode';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  phoneNumber: Scalars['String'];
  emailAddress: Scalars['String'];
  language: Language;
  organisations: OrganisationNodeConnection;
  pEvent: PalvelutarjotinEventNodeConnection;
  occurrences: OccurrenceNodeConnection;
  studygroupSet: StudyGroupNodeConnection;
  enrolmentSet: EnrolmentNodeConnection;
};


export type PersonNodeOrganisationsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type PersonNodePEventArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type PersonNodeOccurrencesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  upcoming?: Maybe<Scalars['Boolean']>;
  date?: Maybe<Scalars['Date']>;
  time?: Maybe<Scalars['Time']>;
};


export type PersonNodeStudygroupSetArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type PersonNodeEnrolmentSetArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** An enumeration. */
export enum Language {
  Fi = 'FI',
  En = 'EN',
  Sv = 'SV'
}

export type OrganisationNodeConnection = {
   __typename?: 'OrganisationNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<OrganisationNodeEdge>>;
};

/** A Relay edge containing a `OrganisationNode` and its cursor. */
export type OrganisationNodeEdge = {
   __typename?: 'OrganisationNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<OrganisationNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type PalvelutarjotinEventNodeConnection = {
   __typename?: 'PalvelutarjotinEventNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<PalvelutarjotinEventNodeEdge>>;
};

/** A Relay edge containing a `PalvelutarjotinEventNode` and its cursor. */
export type PalvelutarjotinEventNodeEdge = {
   __typename?: 'PalvelutarjotinEventNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<PalvelutarjotinEventNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type StudyGroupNodeConnection = {
   __typename?: 'StudyGroupNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<StudyGroupNodeEdge>>;
};

/** A Relay edge containing a `StudyGroupNode` and its cursor. */
export type StudyGroupNodeEdge = {
   __typename?: 'StudyGroupNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<StudyGroupNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type StudyGroupNode = Node & {
   __typename?: 'StudyGroupNode';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  /** The ID of the object. */
  id: Scalars['ID'];
  person: PersonNode;
  name: Scalars['String'];
  groupSize: Scalars['Int'];
  amountOfAdult: Scalars['Int'];
  groupName: Scalars['String'];
  studyLevel?: Maybe<StudyLevel>;
  extraNeeds: Scalars['String'];
  occurrences: OccurrenceNodeConnection;
  enrolments: EnrolmentNodeConnection;
};


export type StudyGroupNodeOccurrencesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  upcoming?: Maybe<Scalars['Boolean']>;
  date?: Maybe<Scalars['Date']>;
  time?: Maybe<Scalars['Time']>;
};


export type StudyGroupNodeEnrolmentsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** An enumeration. */
export enum StudyLevel {
  Preschool = 'PRESCHOOL',
  Grade_1 = 'GRADE_1',
  Grade_2 = 'GRADE_2',
  Grade_3 = 'GRADE_3',
  Grade_4 = 'GRADE_4',
  Grade_5 = 'GRADE_5',
  Grade_6 = 'GRADE_6',
  Grade_7 = 'GRADE_7',
  Grade_8 = 'GRADE_8',
  Grade_9 = 'GRADE_9',
  Grade_10 = 'GRADE_10',
  Secondary = 'SECONDARY'
}

export type EnrolmentNodeConnection = {
   __typename?: 'EnrolmentNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<EnrolmentNodeEdge>>;
};

/** A Relay edge containing a `EnrolmentNode` and its cursor. */
export type EnrolmentNodeEdge = {
   __typename?: 'EnrolmentNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<EnrolmentNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type EnrolmentNode = Node & {
   __typename?: 'EnrolmentNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  studyGroup: StudyGroupNode;
  occurrence: OccurrenceNode;
  enrolmentTime: Scalars['DateTime'];
  person?: Maybe<PersonNode>;
  notificationType?: Maybe<NotificationType>;
  status: EnrolmentStatus;
};

/** An enumeration. */
export enum NotificationType {
  EmailSms = 'EMAIL_SMS',
  Email = 'EMAIL',
  Sms = 'SMS'
}

/** An enumeration. */
export enum EnrolmentStatus {
  /** approved */
  Approved = 'APPROVED',
  /** pending */
  Pending = 'PENDING',
  /** cancelled */
  Cancelled = 'CANCELLED',
  /** declined */
  Declined = 'DECLINED'
}

export type LanguageType = {
   __typename?: 'LanguageType';
  id: Scalars['String'];
  name: Scalars['String'];
  occurrences: OccurrenceNodeConnection;
};


export type LanguageTypeOccurrencesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  upcoming?: Maybe<Scalars['Boolean']>;
  date?: Maybe<Scalars['Date']>;
  time?: Maybe<Scalars['Time']>;
};

export type Event = {
   __typename?: 'Event';
  id: Scalars['String'];
  internalId: Scalars['ID'];
  internalContext?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
  createdTime?: Maybe<Scalars['String']>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  dataSource?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
  location: Place;
  keywords: Array<Keyword>;
  superEvent?: Maybe<IdObject>;
  eventStatus?: Maybe<Scalars['String']>;
  externalLinks: Array<ExternalLink>;
  offers: Array<Offer>;
  subEvents: Array<IdObject>;
  images: Array<Image>;
  inLanguage: Array<InLanguage>;
  audience: Array<Keyword>;
  datePublished?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['String']>;
  endTime?: Maybe<Scalars['String']>;
  customData?: Maybe<Scalars['String']>;
  audienceMinAge?: Maybe<Scalars['String']>;
  audienceMaxAge?: Maybe<Scalars['String']>;
  superEventType?: Maybe<Scalars['String']>;
  extensionCourse?: Maybe<ExtensionCourse>;
  name: LocalisedObject;
  localizationExtraInfo?: Maybe<LocalisedObject>;
  shortDescription: LocalisedObject;
  provider?: Maybe<LocalisedObject>;
  infoUrl?: Maybe<LocalisedObject>;
  providerContactInfo?: Maybe<Scalars['String']>;
  description: LocalisedObject;
  pEvent: PalvelutarjotinEventNode;
  venue?: Maybe<VenueNode>;
  publicationStatus?: Maybe<Scalars['String']>;
};

export type Place = {
   __typename?: 'Place';
  id?: Maybe<Scalars['String']>;
  internalId: Scalars['ID'];
  internalContext?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
  createdTime?: Maybe<Scalars['String']>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  dataSource?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
  divisions?: Maybe<Array<Maybe<Division>>>;
  customData?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  contactType?: Maybe<Scalars['String']>;
  addressRegion?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  postOfficeBoxNum?: Maybe<Scalars['String']>;
  addressCountry?: Maybe<Scalars['String']>;
  deleted?: Maybe<Scalars['Boolean']>;
  nEvents?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['Int']>;
  parent?: Maybe<Scalars['ID']>;
  replacedBy?: Maybe<Scalars['String']>;
  position?: Maybe<PlacePosition>;
  name?: Maybe<LocalisedObject>;
  description?: Maybe<Scalars['String']>;
  telephone?: Maybe<LocalisedObject>;
  addressLocality?: Maybe<LocalisedObject>;
  streetAddress?: Maybe<LocalisedObject>;
  infoUrl?: Maybe<LocalisedObject>;
};

export type Division = {
   __typename?: 'Division';
  type: Scalars['String'];
  /** Open Civic Data ID */
  ocdId?: Maybe<Scalars['String']>;
  municipality?: Maybe<Scalars['String']>;
  name?: Maybe<LocalisedObject>;
};

export type LocalisedObject = {
   __typename?: 'LocalisedObject';
  fi?: Maybe<Scalars['String']>;
  sv?: Maybe<Scalars['String']>;
  en?: Maybe<Scalars['String']>;
};

export type PlacePosition = {
   __typename?: 'PlacePosition';
  type: Scalars['String'];
  coordinates: Array<Scalars['Float']>;
};

export type Keyword = {
   __typename?: 'Keyword';
  id?: Maybe<Scalars['String']>;
  internalId: Scalars['ID'];
  internalContext?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
  createdTime?: Maybe<Scalars['String']>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  dataSource?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['ID']>;
  altLabels?: Maybe<Array<Maybe<Scalars['String']>>>;
  aggregate?: Maybe<Scalars['Boolean']>;
  deprecated?: Maybe<Scalars['Boolean']>;
  nEvents?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['Int']>;
  name?: Maybe<LocalisedObject>;
};

export type IdObject = {
   __typename?: 'IdObject';
  id?: Maybe<Scalars['String']>;
  internalId: Scalars['ID'];
  internalContext?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
  createdTime?: Maybe<Scalars['String']>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  dataSource?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
};

export type ExternalLink = {
   __typename?: 'ExternalLink';
  name?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
};

export type Offer = {
   __typename?: 'Offer';
  isFree?: Maybe<Scalars['Boolean']>;
  description?: Maybe<LocalisedObject>;
  price?: Maybe<LocalisedObject>;
  infoUrl?: Maybe<LocalisedObject>;
};

export type Image = {
   __typename?: 'Image';
  id?: Maybe<Scalars['String']>;
  internalId: Scalars['ID'];
  internalContext?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
  createdTime?: Maybe<Scalars['String']>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  dataSource?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
  license?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  url: Scalars['String'];
  cropping?: Maybe<Scalars['String']>;
  photographerName?: Maybe<Scalars['String']>;
  altText?: Maybe<Scalars['String']>;
};

export type InLanguage = {
   __typename?: 'InLanguage';
  id?: Maybe<Scalars['String']>;
  internalId: Scalars['ID'];
  internalContext?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
  createdTime?: Maybe<Scalars['String']>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  dataSource?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
  translationAvailable?: Maybe<Scalars['Boolean']>;
  name?: Maybe<LocalisedObject>;
};

export type ExtensionCourse = {
   __typename?: 'ExtensionCourse';
  enrolmentStartTime?: Maybe<Scalars['String']>;
  enrolmentEndTime?: Maybe<Scalars['String']>;
  maximumAttendeeCapacity?: Maybe<Scalars['Int']>;
  minimumAttendeeCapacity?: Maybe<Scalars['Int']>;
  remainingAttendeeCapacity?: Maybe<Scalars['Int']>;
};

export type VenueNode = Node & {
   __typename?: 'VenueNode';
  hasClothingStorage: Scalars['Boolean'];
  hasSnackEatingPlace: Scalars['Boolean'];
  translations: Array<VenueTranslationType>;
  /** place_id from linkedEvent */
  id: Scalars['ID'];
  /** Translated field in the language defined in request ACCEPT-LANGUAGE header  */
  description?: Maybe<Scalars['String']>;
};

export type VenueTranslationType = {
   __typename?: 'VenueTranslationType';
  languageCode: Language;
  description: Scalars['String'];
};

export type VenueNodeConnection = {
   __typename?: 'VenueNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<VenueNodeEdge>>;
};

/** A Relay edge containing a `VenueNode` and its cursor. */
export type VenueNodeEdge = {
   __typename?: 'VenueNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<VenueNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type EventListResponse = {
   __typename?: 'EventListResponse';
  meta: Meta;
  data: Array<Event>;
};

export type Meta = {
   __typename?: 'Meta';
  count?: Maybe<Scalars['Int']>;
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
};

export type PlaceListResponse = {
   __typename?: 'PlaceListResponse';
  meta: Meta;
  data: Array<Place>;
};

export type ImageListResponse = {
   __typename?: 'ImageListResponse';
  meta: Meta;
  data: Array<Image>;
};

export type KeywordListResponse = {
   __typename?: 'KeywordListResponse';
  meta: Meta;
  data: Array<Keyword>;
};

export type EventSearchListResponse = {
   __typename?: 'EventSearchListResponse';
  meta: Meta;
  data: Array<Event>;
};

export type PlaceSearchListResponse = {
   __typename?: 'PlaceSearchListResponse';
  meta: Meta;
  data: Array<Place>;
};

export type NotificationTemplateWithContext = {
   __typename?: 'NotificationTemplateWithContext';
  template?: Maybe<NotificationTemplateNode>;
  customContextPreviewHtml?: Maybe<Scalars['String']>;
  customContextPreviewText?: Maybe<Scalars['String']>;
};

export type NotificationTemplateNode = Node & {
   __typename?: 'NotificationTemplateNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  type: Scalars['String'];
  translations: Array<Maybe<NotificationTranslationType>>;
  preview?: Maybe<Scalars['String']>;
};

export type NotificationTranslationType = {
   __typename?: 'NotificationTranslationType';
  languageCode: NotificationTemplateLanguage;
  subject?: Maybe<Scalars['String']>;
  bodyHtml?: Maybe<Scalars['String']>;
  bodyText?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum NotificationTemplateLanguage {
  Fi = 'FI',
  En = 'EN',
  Sv = 'SV'
}

/** An enumeration. */
export enum NotificationTemplateType {
  OccurrenceEnrolment = 'OCCURRENCE_ENROLMENT',
  OccurrenceUnenrolment = 'OCCURRENCE_UNENROLMENT',
  EnrolmentApproved = 'ENROLMENT_APPROVED',
  EnrolmentDeclined = 'ENROLMENT_DECLINED',
  OccurrenceEnrolmentSms = 'OCCURRENCE_ENROLMENT_SMS',
  OccurrenceUnenrolmentSms = 'OCCURRENCE_UNENROLMENT_SMS',
  EnrolmentApprovedSms = 'ENROLMENT_APPROVED_SMS',
  EnrolmentDeclinedSms = 'ENROLMENT_DECLINED_SMS',
  OccurrenceCancelled = 'OCCURRENCE_CANCELLED',
  OccurrenceCancelledSms = 'OCCURRENCE_CANCELLED_SMS'
}


export type Mutation = {
   __typename?: 'Mutation';
  addOccurrence?: Maybe<AddOccurrenceMutationPayload>;
  updateOccurrence?: Maybe<UpdateOccurrenceMutationPayload>;
  deleteOccurrence?: Maybe<DeleteOccurrenceMutationPayload>;
  cancelOccurrence?: Maybe<CancelOccurrenceMutationPayload>;
  addVenue?: Maybe<AddVenueMutationPayload>;
  updateVenue?: Maybe<UpdateVenueMutationPayload>;
  deleteVenue?: Maybe<DeleteVenueMutationPayload>;
  addStudyGroup?: Maybe<AddStudyGroupMutationPayload>;
  /** Mutation for admin only */
  updateStudyGroup?: Maybe<UpdateStudyGroupMutationPayload>;
  /** Mutation for admin only */
  deleteStudyGroup?: Maybe<DeleteStudyGroupMutationPayload>;
  enrolOccurrence?: Maybe<EnrolOccurrenceMutationPayload>;
  /** Only staff can unenrol study group */
  unenrolOccurrence?: Maybe<UnenrolOccurrenceMutationPayload>;
  updateEnrolment?: Maybe<UpdateEnrolmentMutationPayload>;
  approveEnrolment?: Maybe<ApproveEnrolmentMutationPayload>;
  declineEnrolment?: Maybe<DeclineEnrolmentMutationPayload>;
  createMyProfile?: Maybe<CreateMyProfileMutationPayload>;
  updateMyProfile?: Maybe<UpdateMyProfileMutationPayload>;
  addOrganisation?: Maybe<AddOrganisationMutationPayload>;
  updateOrganisation?: Maybe<UpdateOrganisationMutationPayload>;
  updatePerson?: Maybe<UpdatePersonMutationPayload>;
  addEventMutation?: Maybe<AddEventMutation>;
  updateEventMutation?: Maybe<UpdateEventMutation>;
  /** Using this mutation will update event publication status and also set the `start_time`, `end_time` of linkedEvent */
  publishEventMutation?: Maybe<PublishEventMutation>;
  deleteEventMutation?: Maybe<DeleteEventMutation>;
  uploadImageMutation?: Maybe<UploadImageMutation>;
  updateImageMutation?: Maybe<UpdateImageMutation>;
  deleteImageMutation?: Maybe<DeleteImageMutation>;
};


export type MutationAddOccurrenceArgs = {
  input: AddOccurrenceMutationInput;
};


export type MutationUpdateOccurrenceArgs = {
  input: UpdateOccurrenceMutationInput;
};


export type MutationDeleteOccurrenceArgs = {
  input: DeleteOccurrenceMutationInput;
};


export type MutationCancelOccurrenceArgs = {
  input: CancelOccurrenceMutationInput;
};


export type MutationAddVenueArgs = {
  input: AddVenueMutationInput;
};


export type MutationUpdateVenueArgs = {
  input: UpdateVenueMutationInput;
};


export type MutationDeleteVenueArgs = {
  input: DeleteVenueMutationInput;
};


export type MutationAddStudyGroupArgs = {
  input: AddStudyGroupMutationInput;
};


export type MutationUpdateStudyGroupArgs = {
  input: UpdateStudyGroupMutationInput;
};


export type MutationDeleteStudyGroupArgs = {
  input: DeleteStudyGroupMutationInput;
};


export type MutationEnrolOccurrenceArgs = {
  input: EnrolOccurrenceMutationInput;
};


export type MutationUnenrolOccurrenceArgs = {
  input: UnenrolOccurrenceMutationInput;
};


export type MutationUpdateEnrolmentArgs = {
  input: UpdateEnrolmentMutationInput;
};


export type MutationApproveEnrolmentArgs = {
  input: ApproveEnrolmentMutationInput;
};


export type MutationDeclineEnrolmentArgs = {
  input: DeclineEnrolmentMutationInput;
};


export type MutationCreateMyProfileArgs = {
  input: CreateMyProfileMutationInput;
};


export type MutationUpdateMyProfileArgs = {
  input: UpdateMyProfileMutationInput;
};


export type MutationAddOrganisationArgs = {
  input: AddOrganisationMutationInput;
};


export type MutationUpdateOrganisationArgs = {
  input: UpdateOrganisationMutationInput;
};


export type MutationUpdatePersonArgs = {
  input: UpdatePersonMutationInput;
};


export type MutationAddEventMutationArgs = {
  event?: Maybe<AddEventMutationInput>;
};


export type MutationUpdateEventMutationArgs = {
  event?: Maybe<UpdateEventMutationInput>;
};


export type MutationPublishEventMutationArgs = {
  event?: Maybe<PublishEventMutationInput>;
};


export type MutationDeleteEventMutationArgs = {
  eventId: Scalars['String'];
};


export type MutationUploadImageMutationArgs = {
  image?: Maybe<UploadImageMutationInput>;
};


export type MutationUpdateImageMutationArgs = {
  image?: Maybe<UpdateImageMutationInput>;
};


export type MutationDeleteImageMutationArgs = {
  imageId: Scalars['String'];
};

export type AddOccurrenceMutationPayload = {
   __typename?: 'AddOccurrenceMutationPayload';
  occurrence?: Maybe<OccurrenceNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type AddOccurrenceMutationInput = {
  placeId?: Maybe<Scalars['String']>;
  minGroupSize: Scalars['Int'];
  maxGroupSize: Scalars['Int'];
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  contactPersons?: Maybe<Array<Maybe<PersonNodeInput>>>;
  pEventId: Scalars['ID'];
  autoAcceptance: Scalars['Boolean'];
  amountOfSeats: Scalars['Int'];
  languages: Array<Maybe<OccurrenceLanguageInput>>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type PersonNodeInput = {
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  emailAddress: Scalars['String'];
  /** Default `fi` */
  language?: Maybe<Language>;
};

export type OccurrenceLanguageInput = {
  id: Language;
};

export type UpdateOccurrenceMutationPayload = {
   __typename?: 'UpdateOccurrenceMutationPayload';
  occurrence?: Maybe<OccurrenceNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateOccurrenceMutationInput = {
  id: Scalars['ID'];
  placeId?: Maybe<Scalars['String']>;
  minGroupSize?: Maybe<Scalars['Int']>;
  maxGroupSize?: Maybe<Scalars['Int']>;
  startTime?: Maybe<Scalars['DateTime']>;
  endTime?: Maybe<Scalars['DateTime']>;
  /** Should include all contact persons of the occurrence, missing contact persons will be removed during mutation */
  contactPersons?: Maybe<Array<Maybe<PersonNodeInput>>>;
  pEventId?: Maybe<Scalars['ID']>;
  autoAcceptance?: Maybe<Scalars['Boolean']>;
  amountOfSeats?: Maybe<Scalars['Int']>;
  /** If present, should include all languages of the occurrence */
  languages: Array<Maybe<OccurrenceLanguageInput>>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteOccurrenceMutationPayload = {
   __typename?: 'DeleteOccurrenceMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteOccurrenceMutationInput = {
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CancelOccurrenceMutationPayload = {
   __typename?: 'CancelOccurrenceMutationPayload';
  occurrence?: Maybe<OccurrenceNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CancelOccurrenceMutationInput = {
  id: Scalars['ID'];
  reason?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type AddVenueMutationPayload = {
   __typename?: 'AddVenueMutationPayload';
  venue?: Maybe<VenueNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type AddVenueMutationInput = {
  /** Place id from linked event */
  id: Scalars['ID'];
  translations?: Maybe<Array<Maybe<VenueTranslationsInput>>>;
  hasClothingStorage: Scalars['Boolean'];
  hasSnackEatingPlace: Scalars['Boolean'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type VenueTranslationsInput = {
  description?: Maybe<Scalars['String']>;
  languageCode: Language;
};

export type UpdateVenueMutationPayload = {
   __typename?: 'UpdateVenueMutationPayload';
  venue?: Maybe<VenueNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateVenueMutationInput = {
  /** Place id from linked event */
  id: Scalars['ID'];
  translations?: Maybe<Array<Maybe<VenueTranslationsInput>>>;
  hasClothingStorage?: Maybe<Scalars['Boolean']>;
  hasSnackEatingPlace?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteVenueMutationPayload = {
   __typename?: 'DeleteVenueMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteVenueMutationInput = {
  /** Place id from linked event */
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type AddStudyGroupMutationPayload = {
   __typename?: 'AddStudyGroupMutationPayload';
  studyGroup?: Maybe<StudyGroupNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type AddStudyGroupMutationInput = {
  /** If person input doesn't include person id, a new person object will be created */
  person: PersonNodeInput;
  name?: Maybe<Scalars['String']>;
  groupSize: Scalars['Int'];
  groupName?: Maybe<Scalars['String']>;
  extraNeeds?: Maybe<Scalars['String']>;
  amountOfAdult?: Maybe<Scalars['Int']>;
  studyLevel?: Maybe<StudyLevel>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateStudyGroupMutationPayload = {
   __typename?: 'UpdateStudyGroupMutationPayload';
  studyGroup?: Maybe<StudyGroupNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateStudyGroupMutationInput = {
  id: Scalars['ID'];
  person?: Maybe<PersonNodeInput>;
  name?: Maybe<Scalars['String']>;
  groupSize?: Maybe<Scalars['Int']>;
  groupName?: Maybe<Scalars['String']>;
  extraNeeds?: Maybe<Scalars['String']>;
  amountOfAdult?: Maybe<Scalars['Int']>;
  studyLevel?: Maybe<StudyLevel>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteStudyGroupMutationPayload = {
   __typename?: 'DeleteStudyGroupMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteStudyGroupMutationInput = {
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type EnrolOccurrenceMutationPayload = {
   __typename?: 'EnrolOccurrenceMutationPayload';
  enrolments?: Maybe<Array<Maybe<EnrolmentNode>>>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type EnrolOccurrenceMutationInput = {
  /** Occurrence ids of event */
  occurrenceIds: Array<Maybe<Scalars['ID']>>;
  /** Study group data */
  studyGroup: StudyGroupInput;
  notificationType?: Maybe<NotificationType>;
  /** Leave blank if the contact person is the same with group contact person */
  person?: Maybe<PersonNodeInput>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type StudyGroupInput = {
  /** If person input doesn't include person id, a new person object will be created */
  person: PersonNodeInput;
  name?: Maybe<Scalars['String']>;
  groupSize: Scalars['Int'];
  groupName?: Maybe<Scalars['String']>;
  extraNeeds?: Maybe<Scalars['String']>;
  amountOfAdult?: Maybe<Scalars['Int']>;
  studyLevel?: Maybe<StudyLevel>;
};

export type UnenrolOccurrenceMutationPayload = {
   __typename?: 'UnenrolOccurrenceMutationPayload';
  occurrence?: Maybe<OccurrenceNode>;
  studyGroup?: Maybe<StudyGroupNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UnenrolOccurrenceMutationInput = {
  /** Occurrence id of event */
  occurrenceId: Scalars['ID'];
  /** Study group id */
  studyGroupId: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateEnrolmentMutationPayload = {
   __typename?: 'UpdateEnrolmentMutationPayload';
  enrolment?: Maybe<EnrolmentNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateEnrolmentMutationInput = {
  enrolmentId: Scalars['ID'];
  notificationType?: Maybe<NotificationType>;
  /** Study group input */
  studyGroup?: Maybe<StudyGroupInput>;
  /** Leave blank if the contact person is the same with group contact person */
  person?: Maybe<PersonNodeInput>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ApproveEnrolmentMutationPayload = {
   __typename?: 'ApproveEnrolmentMutationPayload';
  enrolment?: Maybe<EnrolmentNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ApproveEnrolmentMutationInput = {
  enrolmentId: Scalars['ID'];
  customMessage?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeclineEnrolmentMutationPayload = {
   __typename?: 'DeclineEnrolmentMutationPayload';
  enrolment?: Maybe<EnrolmentNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeclineEnrolmentMutationInput = {
  enrolmentId: Scalars['ID'];
  customMessage?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateMyProfileMutationPayload = {
   __typename?: 'CreateMyProfileMutationPayload';
  myProfile?: Maybe<PersonNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateMyProfileMutationInput = {
  name: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  emailAddress: Scalars['String'];
  organisations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Default `fi` */
  language?: Maybe<Language>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateMyProfileMutationPayload = {
   __typename?: 'UpdateMyProfileMutationPayload';
  myProfile?: Maybe<PersonNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateMyProfileMutationInput = {
  name?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['String']>;
  /** If present, should include all organisation ids of user */
  organisations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Default `fi` */
  language?: Maybe<Language>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type AddOrganisationMutationPayload = {
   __typename?: 'AddOrganisationMutationPayload';
  organisation?: Maybe<OrganisationNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type AddOrganisationMutationInput = {
  name: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  type: OrganisationTypeEnum;
  publisherId?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export enum OrganisationTypeEnum {
  User = 'USER',
  Provider = 'PROVIDER'
}

export type UpdateOrganisationMutationPayload = {
   __typename?: 'UpdateOrganisationMutationPayload';
  organisation?: Maybe<OrganisationNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateOrganisationMutationInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  type?: Maybe<OrganisationTypeEnum>;
  publisherId?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdatePersonMutationPayload = {
   __typename?: 'UpdatePersonMutationPayload';
  person?: Maybe<PersonNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdatePersonMutationInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['String']>;
  language?: Maybe<Language>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type AddEventMutation = {
   __typename?: 'AddEventMutation';
  response?: Maybe<EventMutationResponse>;
};

export type EventMutationResponse = {
   __typename?: 'EventMutationResponse';
  statusCode: Scalars['Int'];
  body?: Maybe<Event>;
  resultText?: Maybe<Scalars['String']>;
};

export type AddEventMutationInput = {
  location: IdObjectInput;
  keywords: Array<IdObjectInput>;
  superEvent?: Maybe<Scalars['String']>;
  eventStatus?: Maybe<Scalars['String']>;
  externalLinks?: Maybe<Array<Scalars['String']>>;
  offers: Array<OfferInput>;
  subEvents?: Maybe<Array<Scalars['String']>>;
  images?: Maybe<Array<IdObjectInput>>;
  inLanguage?: Maybe<Array<IdObjectInput>>;
  audience?: Maybe<Array<IdObjectInput>>;
  datePublished?: Maybe<Scalars['String']>;
  startTime: Scalars['String'];
  endTime?: Maybe<Scalars['String']>;
  customData?: Maybe<Scalars['String']>;
  audienceMinAge?: Maybe<Scalars['String']>;
  audienceMaxAge?: Maybe<Scalars['String']>;
  superEventType?: Maybe<Scalars['String']>;
  extensionCourse?: Maybe<IdObjectInput>;
  name: LocalisedObjectInput;
  localizationExtraInfo?: Maybe<LocalisedObjectInput>;
  shortDescription: LocalisedObjectInput;
  provider?: Maybe<LocalisedObjectInput>;
  infoUrl?: Maybe<LocalisedObjectInput>;
  providerContactInfo?: Maybe<Scalars['String']>;
  description: LocalisedObjectInput;
  /** Organisation global id which the created event belongs to */
  organisationId: Scalars['String'];
  /** Set to `true` to save event as draft version, when draft is true, event data validation will be skipped */
  draft?: Maybe<Scalars['Boolean']>;
  /** Palvelutarjotin event data */
  pEvent: PalvelutarjotinEventInput;
};

export type IdObjectInput = {
  internalId?: Maybe<Scalars['String']>;
};

export type OfferInput = {
  isFree?: Maybe<Scalars['Boolean']>;
  description?: Maybe<LocalisedObjectInput>;
  price?: Maybe<LocalisedObjectInput>;
  infoUrl?: Maybe<LocalisedObjectInput>;
};

export type LocalisedObjectInput = {
  fi?: Maybe<Scalars['String']>;
  sv?: Maybe<Scalars['String']>;
  en?: Maybe<Scalars['String']>;
};

export type PalvelutarjotinEventInput = {
  enrolmentStart?: Maybe<Scalars['DateTime']>;
  enrolmentEndDays?: Maybe<Scalars['Int']>;
  duration: Scalars['Int'];
  neededOccurrences: Scalars['Int'];
  contactPersonId?: Maybe<Scalars['ID']>;
  contactPhoneNumber?: Maybe<Scalars['String']>;
  contactEmail?: Maybe<Scalars['String']>;
};

export type UpdateEventMutation = {
   __typename?: 'UpdateEventMutation';
  response?: Maybe<EventMutationResponse>;
};

export type UpdateEventMutationInput = {
  location: IdObjectInput;
  keywords: Array<IdObjectInput>;
  superEvent?: Maybe<Scalars['String']>;
  eventStatus?: Maybe<Scalars['String']>;
  externalLinks?: Maybe<Array<Scalars['String']>>;
  offers: Array<OfferInput>;
  subEvents?: Maybe<Array<Scalars['String']>>;
  images?: Maybe<Array<IdObjectInput>>;
  inLanguage?: Maybe<Array<IdObjectInput>>;
  audience?: Maybe<Array<IdObjectInput>>;
  datePublished?: Maybe<Scalars['String']>;
  startTime: Scalars['String'];
  endTime?: Maybe<Scalars['String']>;
  customData?: Maybe<Scalars['String']>;
  audienceMinAge?: Maybe<Scalars['String']>;
  audienceMaxAge?: Maybe<Scalars['String']>;
  superEventType?: Maybe<Scalars['String']>;
  extensionCourse?: Maybe<IdObjectInput>;
  name: LocalisedObjectInput;
  localizationExtraInfo?: Maybe<LocalisedObjectInput>;
  shortDescription: LocalisedObjectInput;
  provider?: Maybe<LocalisedObjectInput>;
  infoUrl?: Maybe<LocalisedObjectInput>;
  providerContactInfo?: Maybe<Scalars['String']>;
  description: LocalisedObjectInput;
  /** Organisation global id which the created event belongs to */
  organisationId: Scalars['String'];
  id: Scalars['String'];
  /** Palvelutarjotin event data */
  pEvent?: Maybe<PalvelutarjotinEventInput>;
  /** Set to `true` to save event as draft version, when draft is true, event data validation will be skipped */
  draft?: Maybe<Scalars['Boolean']>;
};

export type PublishEventMutation = {
   __typename?: 'PublishEventMutation';
  response?: Maybe<EventMutationResponse>;
};

export type PublishEventMutationInput = {
  location: IdObjectInput;
  keywords: Array<IdObjectInput>;
  superEvent?: Maybe<Scalars['String']>;
  eventStatus?: Maybe<Scalars['String']>;
  externalLinks?: Maybe<Array<Scalars['String']>>;
  offers: Array<OfferInput>;
  subEvents?: Maybe<Array<Scalars['String']>>;
  images?: Maybe<Array<IdObjectInput>>;
  inLanguage?: Maybe<Array<IdObjectInput>>;
  audience?: Maybe<Array<IdObjectInput>>;
  datePublished?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['String']>;
  endTime?: Maybe<Scalars['String']>;
  customData?: Maybe<Scalars['String']>;
  audienceMinAge?: Maybe<Scalars['String']>;
  audienceMaxAge?: Maybe<Scalars['String']>;
  superEventType?: Maybe<Scalars['String']>;
  extensionCourse?: Maybe<IdObjectInput>;
  name: LocalisedObjectInput;
  localizationExtraInfo?: Maybe<LocalisedObjectInput>;
  shortDescription: LocalisedObjectInput;
  provider?: Maybe<LocalisedObjectInput>;
  infoUrl?: Maybe<LocalisedObjectInput>;
  providerContactInfo?: Maybe<Scalars['String']>;
  description: LocalisedObjectInput;
  /** Organisation global id which the created event belongs to */
  organisationId: Scalars['String'];
  id: Scalars['String'];
  /** Palvelutarjotin event data */
  pEvent?: Maybe<PalvelutarjotinEventInput>;
};

export type DeleteEventMutation = {
   __typename?: 'DeleteEventMutation';
  response?: Maybe<EventMutationResponse>;
};

export type UploadImageMutation = {
   __typename?: 'UploadImageMutation';
  response?: Maybe<ImageMutationResponse>;
};

export type ImageMutationResponse = {
   __typename?: 'ImageMutationResponse';
  statusCode: Scalars['Int'];
  body?: Maybe<Image>;
  resultText?: Maybe<Scalars['String']>;
};

export type UploadImageMutationInput = {
  license?: Maybe<Scalars['String']>;
  altText?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  cropping?: Maybe<Scalars['String']>;
  photographerName?: Maybe<Scalars['String']>;
  /** Following GraphQL file upload specs here: https://github.com/jaydenseric/graphql-multipart-request-spec */
  image?: Maybe<Scalars['Upload']>;
};


export type UpdateImageMutation = {
   __typename?: 'UpdateImageMutation';
  response?: Maybe<ImageMutationResponse>;
};

export type UpdateImageMutationInput = {
  license?: Maybe<Scalars['String']>;
  altText?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  cropping?: Maybe<Scalars['String']>;
  photographerName?: Maybe<Scalars['String']>;
  /** Following GraphQL file upload specs here: https://github.com/jaydenseric/graphql-multipart-request-spec */
  image?: Maybe<Scalars['Upload']>;
  id: Scalars['String'];
};

export type DeleteImageMutation = {
   __typename?: 'DeleteImageMutation';
  response?: Maybe<ImageMutationResponse>;
};

export type EnrolmentTemplateContextQueryVariables = {
  enrolmentId: Scalars['ID'];
};


export type EnrolmentTemplateContextQuery = (
  { __typename?: 'Query' }
  & { enrolment?: Maybe<(
    { __typename?: 'EnrolmentNode' }
    & Pick<EnrolmentNode, 'id'>
    & { studyGroup: (
      { __typename?: 'StudyGroupNode' }
      & Pick<StudyGroupNode, 'id' | 'name'>
      & { person: (
        { __typename?: 'PersonNode' }
        & Pick<PersonNode, 'id' | 'emailAddress'>
      ) }
    ), occurrence: (
      { __typename?: 'OccurrenceNode' }
      & Pick<OccurrenceNode, 'id' | 'startTime'>
      & { linkedEvent?: Maybe<(
        { __typename?: 'Event' }
        & Pick<Event, 'id'>
        & { name: (
          { __typename?: 'LocalisedObject' }
          & LocalisedFieldsFragment
        ) }
      )> }
    ) }
  )> }
);

export type EventNameQueryVariables = {
  id: Scalars['ID'];
};


export type EventNameQuery = (
  { __typename?: 'Query' }
  & { event?: Maybe<(
    { __typename?: 'Event' }
    & Pick<Event, 'id'>
    & { name: (
      { __typename?: 'LocalisedObject' }
      & LocalisedFieldsFragment
    ) }
  )> }
);

export type ApproveEnrolmentMutationVariables = {
  input: ApproveEnrolmentMutationInput;
};


export type ApproveEnrolmentMutation = (
  { __typename?: 'Mutation' }
  & { approveEnrolment?: Maybe<(
    { __typename?: 'ApproveEnrolmentMutationPayload' }
    & Pick<ApproveEnrolmentMutationPayload, 'clientMutationId'>
    & { enrolment?: Maybe<(
      { __typename?: 'EnrolmentNode' }
      & EnrolmentFieldsFragment
    )> }
  )> }
);

export type DeclineEnrolmentMutationVariables = {
  input: DeclineEnrolmentMutationInput;
};


export type DeclineEnrolmentMutation = (
  { __typename?: 'Mutation' }
  & { declineEnrolment?: Maybe<(
    { __typename?: 'DeclineEnrolmentMutationPayload' }
    & Pick<DeclineEnrolmentMutationPayload, 'clientMutationId'>
    & { enrolment?: Maybe<(
      { __typename?: 'EnrolmentNode' }
      & EnrolmentFieldsFragment
    )> }
  )> }
);

export type DeleteEnrolmentMutationVariables = {
  input: UnenrolOccurrenceMutationInput;
};


export type DeleteEnrolmentMutation = (
  { __typename?: 'Mutation' }
  & { unenrolOccurrence?: Maybe<(
    { __typename?: 'UnenrolOccurrenceMutationPayload' }
    & Pick<UnenrolOccurrenceMutationPayload, 'clientMutationId'>
    & { occurrence?: Maybe<(
      { __typename?: 'OccurrenceNode' }
      & Pick<OccurrenceNode, 'id'>
    )>, studyGroup?: Maybe<(
      { __typename?: 'StudyGroupNode' }
      & Pick<StudyGroupNode, 'id'>
    )> }
  )> }
);

export type UpdateEnrolmentMutationVariables = {
  input: UpdateEnrolmentMutationInput;
};


export type UpdateEnrolmentMutation = (
  { __typename?: 'Mutation' }
  & { updateEnrolment?: Maybe<(
    { __typename?: 'UpdateEnrolmentMutationPayload' }
    & Pick<UpdateEnrolmentMutationPayload, 'clientMutationId'>
    & { enrolment?: Maybe<(
      { __typename?: 'EnrolmentNode' }
      & EnrolmentFieldsFragment
    )> }
  )> }
);

export type StudyGroupFieldsFragment = (
  { __typename?: 'StudyGroupNode' }
  & Pick<StudyGroupNode, 'id' | 'groupSize' | 'amountOfAdult' | 'name' | 'groupName' | 'studyLevel' | 'extraNeeds'>
  & { person: (
    { __typename?: 'PersonNode' }
    & PersonFieldsFragment
  ) }
);

export type EnrolmentFieldsFragment = (
  { __typename?: 'EnrolmentNode' }
  & Pick<EnrolmentNode, 'id' | 'notificationType' | 'enrolmentTime' | 'status'>
  & { person?: Maybe<(
    { __typename?: 'PersonNode' }
    & PersonFieldsFragment
  )>, studyGroup: (
    { __typename?: 'StudyGroupNode' }
    & StudyGroupFieldsFragment
  ) }
);

export type EnrolmentQueryVariables = {
  id: Scalars['ID'];
};


export type EnrolmentQuery = (
  { __typename?: 'Query' }
  & { enrolment?: Maybe<(
    { __typename?: 'EnrolmentNode' }
    & { occurrence: (
      { __typename?: 'OccurrenceNode' }
      & Pick<OccurrenceNode, 'id' | 'maxGroupSize' | 'minGroupSize'>
      & { pEvent?: Maybe<(
        { __typename?: 'PalvelutarjotinEventNode' }
        & Pick<PalvelutarjotinEventNode, 'id'>
        & { organisation?: Maybe<(
          { __typename?: 'OrganisationNode' }
          & Pick<OrganisationNode, 'id'>
        )> }
      )> }
    ) }
    & EnrolmentFieldsFragment
  )> }
);

export type NotificationTemplateQueryVariables = {
  templateType?: Maybe<NotificationTemplateType>;
  context: Scalars['JSONString'];
  language: Language;
};


export type NotificationTemplateQuery = (
  { __typename?: 'Query' }
  & { notificationTemplate?: Maybe<(
    { __typename?: 'NotificationTemplateWithContext' }
    & Pick<NotificationTemplateWithContext, 'customContextPreviewHtml' | 'customContextPreviewText'>
    & { template?: Maybe<(
      { __typename?: 'NotificationTemplateNode' }
      & Pick<NotificationTemplateNode, 'id' | 'type' | 'preview'>
      & { translations: Array<Maybe<(
        { __typename?: 'NotificationTranslationType' }
        & Pick<NotificationTranslationType, 'languageCode' | 'subject' | 'bodyHtml' | 'bodyText' | 'preview'>
      )>> }
    )> }
  )> }
);

export type CreateEventMutationVariables = {
  event: AddEventMutationInput;
};


export type CreateEventMutation = (
  { __typename?: 'Mutation' }
  & { addEventMutation?: Maybe<(
    { __typename?: 'AddEventMutation' }
    & { response?: Maybe<(
      { __typename?: 'EventMutationResponse' }
      & Pick<EventMutationResponse, 'statusCode'>
      & { body?: Maybe<(
        { __typename?: 'Event' }
        & Pick<Event, 'id' | 'internalId'>
        & { name: (
          { __typename?: 'LocalisedObject' }
          & Pick<LocalisedObject, 'en' | 'fi' | 'sv'>
        ), shortDescription: (
          { __typename?: 'LocalisedObject' }
          & Pick<LocalisedObject, 'en' | 'fi' | 'sv'>
        ), description: (
          { __typename?: 'LocalisedObject' }
          & Pick<LocalisedObject, 'en' | 'fi' | 'sv'>
        ), images: Array<(
          { __typename?: 'Image' }
          & Pick<Image, 'id' | 'internalId' | 'license' | 'name' | 'url' | 'cropping' | 'photographerName' | 'altText'>
        )>, pEvent: (
          { __typename?: 'PalvelutarjotinEventNode' }
          & Pick<PalvelutarjotinEventNode, 'id' | 'duration' | 'neededOccurrences'>
        ), infoUrl?: Maybe<(
          { __typename?: 'LocalisedObject' }
          & Pick<LocalisedObject, 'en' | 'fi' | 'sv'>
        )> }
      )> }
    )> }
  )> }
);

export type DeleteSingleEventMutationVariables = {
  eventId: Scalars['String'];
};


export type DeleteSingleEventMutation = (
  { __typename?: 'Mutation' }
  & { deleteEventMutation?: Maybe<(
    { __typename?: 'DeleteEventMutation' }
    & { response?: Maybe<(
      { __typename?: 'EventMutationResponse' }
      & Pick<EventMutationResponse, 'statusCode'>
      & { body?: Maybe<(
        { __typename?: 'Event' }
        & Pick<Event, 'id' | 'internalId'>
      )> }
    )> }
  )> }
);

export type PublishSingleEventMutationVariables = {
  event: PublishEventMutationInput;
};


export type PublishSingleEventMutation = (
  { __typename?: 'Mutation' }
  & { publishEventMutation?: Maybe<(
    { __typename?: 'PublishEventMutation' }
    & { response?: Maybe<(
      { __typename?: 'EventMutationResponse' }
      & Pick<EventMutationResponse, 'statusCode'>
      & { body?: Maybe<(
        { __typename?: 'Event' }
        & Pick<Event, 'id' | 'internalId' | 'publicationStatus'>
      )> }
    )> }
  )> }
);

export type EditEventMutationVariables = {
  event: UpdateEventMutationInput;
};


export type EditEventMutation = (
  { __typename?: 'Mutation' }
  & { updateEventMutation?: Maybe<(
    { __typename?: 'UpdateEventMutation' }
    & { response?: Maybe<(
      { __typename?: 'EventMutationResponse' }
      & Pick<EventMutationResponse, 'statusCode'>
      & { body?: Maybe<(
        { __typename?: 'Event' }
        & Pick<Event, 'id' | 'internalId'>
        & { name: (
          { __typename?: 'LocalisedObject' }
          & Pick<LocalisedObject, 'en' | 'fi' | 'sv'>
        ), shortDescription: (
          { __typename?: 'LocalisedObject' }
          & Pick<LocalisedObject, 'en' | 'fi' | 'sv'>
        ), description: (
          { __typename?: 'LocalisedObject' }
          & Pick<LocalisedObject, 'en' | 'fi' | 'sv'>
        ), images: Array<(
          { __typename?: 'Image' }
          & Pick<Image, 'id' | 'internalId' | 'license' | 'name' | 'url' | 'cropping' | 'photographerName' | 'altText'>
        )>, pEvent: (
          { __typename?: 'PalvelutarjotinEventNode' }
          & Pick<PalvelutarjotinEventNode, 'id' | 'duration' | 'neededOccurrences'>
        ), infoUrl?: Maybe<(
          { __typename?: 'LocalisedObject' }
          & Pick<LocalisedObject, 'en' | 'fi' | 'sv'>
        )> }
      )> }
    )> }
  )> }
);

export type PEventFieldsFragment = (
  { __typename?: 'PalvelutarjotinEventNode' }
  & Pick<PalvelutarjotinEventNode, 'id' | 'contactEmail' | 'contactPhoneNumber' | 'duration' | 'enrolmentEndDays' | 'enrolmentStart' | 'neededOccurrences'>
  & { contactPerson?: Maybe<(
    { __typename?: 'PersonNode' }
    & PersonFieldsFragment
  )>, organisation?: Maybe<(
    { __typename?: 'OrganisationNode' }
    & OrganisationNodeFieldsFragment
  )>, occurrences: (
    { __typename?: 'OccurrenceNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'OccurrenceNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'OccurrenceNode' }
        & OccurrenceFieldsFragment
      )> }
    )>> }
  ) }
);

export type LocalisedFieldsFragment = (
  { __typename?: 'LocalisedObject' }
  & Pick<LocalisedObject, 'en' | 'fi' | 'sv'>
);

export type EventFieldsFragment = (
  { __typename?: 'Event' }
  & Pick<Event, 'id' | 'internalId' | 'startTime' | 'publicationStatus' | 'datePublished'>
  & { name: (
    { __typename?: 'LocalisedObject' }
    & LocalisedFieldsFragment
  ), shortDescription: (
    { __typename?: 'LocalisedObject' }
    & LocalisedFieldsFragment
  ), description: (
    { __typename?: 'LocalisedObject' }
    & LocalisedFieldsFragment
  ), images: Array<(
    { __typename?: 'Image' }
    & ImageFieldsFragment
  )>, infoUrl?: Maybe<(
    { __typename?: 'LocalisedObject' }
    & LocalisedFieldsFragment
  )>, pEvent: (
    { __typename?: 'PalvelutarjotinEventNode' }
    & PEventFieldsFragment
  ), inLanguage: Array<(
    { __typename?: 'InLanguage' }
    & Pick<InLanguage, 'id' | 'internalId'>
    & { name?: Maybe<(
      { __typename?: 'LocalisedObject' }
      & LocalisedFieldsFragment
    )> }
  )>, audience: Array<(
    { __typename?: 'Keyword' }
    & KeywordFieldsFragment
  )>, keywords: Array<(
    { __typename?: 'Keyword' }
    & KeywordFieldsFragment
  )>, location: (
    { __typename?: 'Place' }
    & PlaceFieldsFragment
  ), venue?: Maybe<(
    { __typename?: 'VenueNode' }
    & VenueFieldsFragment
  )> }
);

export type EventQueryVariables = {
  id: Scalars['ID'];
  include?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type EventQuery = (
  { __typename?: 'Query' }
  & { event?: Maybe<(
    { __typename?: 'Event' }
    & EventFieldsFragment
  )> }
);

export type MetaFieldsFragment = (
  { __typename?: 'Meta' }
  & Pick<Meta, 'count' | 'next' | 'previous'>
);

export type EventsQueryVariables = {
  divisions?: Maybe<Array<Maybe<Scalars['String']>>>;
  end?: Maybe<Scalars['String']>;
  include?: Maybe<Array<Maybe<Scalars['String']>>>;
  inLanguage?: Maybe<Scalars['String']>;
  isFree?: Maybe<Scalars['Boolean']>;
  keywords?: Maybe<Array<Maybe<Scalars['String']>>>;
  keywordNot?: Maybe<Array<Maybe<Scalars['String']>>>;
  language?: Maybe<Scalars['String']>;
  locations?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  publisher?: Maybe<Scalars['ID']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['String']>;
  superEvent?: Maybe<Scalars['ID']>;
  superEventType?: Maybe<Array<Maybe<Scalars['String']>>>;
  text?: Maybe<Scalars['String']>;
  translation?: Maybe<Scalars['String']>;
  showAll?: Maybe<Scalars['Boolean']>;
};


export type EventsQuery = (
  { __typename?: 'Query' }
  & { events?: Maybe<(
    { __typename?: 'EventListResponse' }
    & { meta: (
      { __typename?: 'Meta' }
      & MetaFieldsFragment
    ), data: Array<(
      { __typename?: 'Event' }
      & EventFieldsFragment
    )> }
  )> }
);

export type UploadSingleImageMutationVariables = {
  image: UploadImageMutationInput;
};


export type UploadSingleImageMutation = (
  { __typename?: 'Mutation' }
  & { uploadImageMutation?: Maybe<(
    { __typename?: 'UploadImageMutation' }
    & { response?: Maybe<(
      { __typename?: 'ImageMutationResponse' }
      & Pick<ImageMutationResponse, 'statusCode'>
      & { body?: Maybe<(
        { __typename?: 'Image' }
        & ImageFieldsFragment
      )> }
    )> }
  )> }
);

export type UpdateSingleImageMutationVariables = {
  image: UpdateImageMutationInput;
};


export type UpdateSingleImageMutation = (
  { __typename?: 'Mutation' }
  & { updateImageMutation?: Maybe<(
    { __typename?: 'UpdateImageMutation' }
    & { response?: Maybe<(
      { __typename?: 'ImageMutationResponse' }
      & Pick<ImageMutationResponse, 'statusCode'>
      & { body?: Maybe<(
        { __typename?: 'Image' }
        & ImageFieldsFragment
      )> }
    )> }
  )> }
);

export type ImageFieldsFragment = (
  { __typename?: 'Image' }
  & Pick<Image, 'id' | 'internalId' | 'license' | 'name' | 'url' | 'cropping' | 'photographerName' | 'altText'>
);

export type ImageQueryVariables = {
  id: Scalars['ID'];
};


export type ImageQuery = (
  { __typename?: 'Query' }
  & { image?: Maybe<(
    { __typename?: 'Image' }
    & ImageFieldsFragment
  )> }
);

export type KeywordFieldsFragment = (
  { __typename?: 'Keyword' }
  & Pick<Keyword, 'id' | 'internalId'>
  & { name?: Maybe<(
    { __typename?: 'LocalisedObject' }
    & LocalisedFieldsFragment
  )> }
);

export type KeywordQueryVariables = {
  id: Scalars['ID'];
};


export type KeywordQuery = (
  { __typename?: 'Query' }
  & { keyword?: Maybe<(
    { __typename?: 'Keyword' }
    & KeywordFieldsFragment
  )> }
);

export type KeywordsQueryVariables = {
  dataSource?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  showAllKeywords?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};


export type KeywordsQuery = (
  { __typename?: 'Query' }
  & { keywords?: Maybe<(
    { __typename?: 'KeywordListResponse' }
    & { meta: (
      { __typename?: 'Meta' }
      & Pick<Meta, 'count' | 'next' | 'previous'>
    ), data: Array<(
      { __typename?: 'Keyword' }
      & KeywordFieldsFragment
    )> }
  )> }
);

export type CreateMyProfileMutationVariables = {
  myProfile: CreateMyProfileMutationInput;
};


export type CreateMyProfileMutation = (
  { __typename?: 'Mutation' }
  & { createMyProfile?: Maybe<(
    { __typename?: 'CreateMyProfileMutationPayload' }
    & { myProfile?: Maybe<(
      { __typename?: 'PersonNode' }
      & PersonFieldsFragment
    )> }
  )> }
);

export type UpdateMyProfileMutationVariables = {
  myProfile: UpdateMyProfileMutationInput;
};


export type UpdateMyProfileMutation = (
  { __typename?: 'Mutation' }
  & { updateMyProfile?: Maybe<(
    { __typename?: 'UpdateMyProfileMutationPayload' }
    & { myProfile?: Maybe<(
      { __typename?: 'PersonNode' }
      & PersonFieldsFragment
    )> }
  )> }
);

export type MyProfileFieldsFragment = (
  { __typename?: 'PersonNode' }
  & { organisations: (
    { __typename?: 'OrganisationNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'OrganisationNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'OrganisationNode' }
        & OrganisationNodeFieldsFragment
      )> }
    )>> }
  ) }
  & PersonFieldsFragment
);

export type MyProfileQueryVariables = {};


export type MyProfileQuery = (
  { __typename?: 'Query' }
  & { myProfile?: Maybe<(
    { __typename?: 'PersonNode' }
    & MyProfileFieldsFragment
  )> }
);

export type AddOccurrenceMutationVariables = {
  input: AddOccurrenceMutationInput;
};


export type AddOccurrenceMutation = (
  { __typename?: 'Mutation' }
  & { addOccurrence?: Maybe<(
    { __typename?: 'AddOccurrenceMutationPayload' }
    & { occurrence?: Maybe<(
      { __typename?: 'OccurrenceNode' }
      & OccurrenceFieldsFragment
    )> }
  )> }
);

export type EditOccurrenceMutationVariables = {
  input: UpdateOccurrenceMutationInput;
};


export type EditOccurrenceMutation = (
  { __typename?: 'Mutation' }
  & { updateOccurrence?: Maybe<(
    { __typename?: 'UpdateOccurrenceMutationPayload' }
    & { occurrence?: Maybe<(
      { __typename?: 'OccurrenceNode' }
      & OccurrenceFieldsFragment
    )> }
  )> }
);

export type OccurrenceFieldsFragment = (
  { __typename?: 'OccurrenceNode' }
  & Pick<OccurrenceNode, 'id' | 'amountOfSeats' | 'minGroupSize' | 'maxGroupSize' | 'autoAcceptance' | 'startTime' | 'endTime' | 'placeId' | 'seatsTaken' | 'cancelled'>
  & { pEvent?: Maybe<(
    { __typename?: 'PalvelutarjotinEventNode' }
    & Pick<PalvelutarjotinEventNode, 'id'>
  )>, languages: Array<(
    { __typename?: 'LanguageType' }
    & Pick<LanguageType, 'id' | 'name'>
  )> }
);

export type OccurrenceQueryVariables = {
  id: Scalars['ID'];
};


export type OccurrenceQuery = (
  { __typename?: 'Query' }
  & { occurrence?: Maybe<(
    { __typename?: 'OccurrenceNode' }
    & { enrolments: (
      { __typename?: 'EnrolmentNodeConnection' }
      & { edges: Array<Maybe<(
        { __typename?: 'EnrolmentNodeEdge' }
        & { node?: Maybe<(
          { __typename?: 'EnrolmentNode' }
          & EnrolmentFieldsFragment
        )> }
      )>> }
    ) }
    & OccurrenceFieldsFragment
  )> }
);

export type DeleteOccurrenceMutationVariables = {
  input: DeleteOccurrenceMutationInput;
};


export type DeleteOccurrenceMutation = (
  { __typename?: 'Mutation' }
  & { deleteOccurrence?: Maybe<(
    { __typename?: 'DeleteOccurrenceMutationPayload' }
    & Pick<DeleteOccurrenceMutationPayload, 'clientMutationId'>
  )> }
);

export type CancelOccurrenceMutationVariables = {
  input: CancelOccurrenceMutationInput;
};


export type CancelOccurrenceMutation = (
  { __typename?: 'Mutation' }
  & { cancelOccurrence?: Maybe<(
    { __typename?: 'CancelOccurrenceMutationPayload' }
    & Pick<CancelOccurrenceMutationPayload, 'clientMutationId'>
  )> }
);

export type OccurrencesQueryVariables = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type OccurrencesQuery = (
  { __typename?: 'Query' }
  & { occurrences?: Maybe<(
    { __typename?: 'OccurrenceNodeConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'>
    ), edges: Array<Maybe<(
      { __typename?: 'OccurrenceNodeEdge' }
      & Pick<OccurrenceNodeEdge, 'cursor'>
      & { node?: Maybe<(
        { __typename?: 'OccurrenceNode' }
        & OccurrenceFieldsFragment
      )> }
    )>> }
  )> }
);

export type OrganisationNodeFieldsFragment = (
  { __typename?: 'OrganisationNode' }
  & Pick<OrganisationNode, 'id' | 'name' | 'phoneNumber' | 'publisherId' | 'type'>
  & { persons: (
    { __typename?: 'PersonNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'PersonNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'PersonNode' }
        & PersonFieldsFragment
      )> }
    )>> }
  ) }
);

export type OrganisationQueryVariables = {
  id: Scalars['ID'];
};


export type OrganisationQuery = (
  { __typename?: 'Query' }
  & { organisation?: Maybe<(
    { __typename?: 'OrganisationNode' }
    & OrganisationNodeFieldsFragment
  )> }
);

export type PageInfoFieldsFragment = (
  { __typename?: 'PageInfo' }
  & Pick<PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'>
);

export type OrganisationsQueryVariables = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type OrganisationsQuery = (
  { __typename?: 'Query' }
  & { organisations?: Maybe<(
    { __typename?: 'OrganisationNodeConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & PageInfoFieldsFragment
    ), edges: Array<Maybe<(
      { __typename?: 'OrganisationNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'OrganisationNode' }
        & OrganisationNodeFieldsFragment
      )> }
    )>> }
  )> }
);

export type PersonFieldsFragment = (
  { __typename?: 'PersonNode' }
  & Pick<PersonNode, 'id' | 'emailAddress' | 'name' | 'phoneNumber' | 'language'>
);

export type PersonQueryVariables = {
  id: Scalars['ID'];
};


export type PersonQuery = (
  { __typename?: 'Query' }
  & { person?: Maybe<(
    { __typename?: 'PersonNode' }
    & PersonFieldsFragment
  )> }
);

export type PlaceFieldsFragment = (
  { __typename?: 'Place' }
  & Pick<Place, 'id' | 'internalId'>
  & { name?: Maybe<(
    { __typename?: 'LocalisedObject' }
    & LocalisedFieldsFragment
  )>, streetAddress?: Maybe<(
    { __typename?: 'LocalisedObject' }
    & LocalisedFieldsFragment
  )>, addressLocality?: Maybe<(
    { __typename?: 'LocalisedObject' }
    & LocalisedFieldsFragment
  )>, telephone?: Maybe<(
    { __typename?: 'LocalisedObject' }
    & LocalisedFieldsFragment
  )> }
);

export type PlaceQueryVariables = {
  id: Scalars['ID'];
};


export type PlaceQuery = (
  { __typename?: 'Query' }
  & { place?: Maybe<(
    { __typename?: 'Place' }
    & PlaceFieldsFragment
  )> }
);

export type PlacesQueryVariables = {
  dataSource?: Maybe<Scalars['String']>;
  divisions?: Maybe<Array<Maybe<Scalars['String']>>>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  showAllPlaces?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};


export type PlacesQuery = (
  { __typename?: 'Query' }
  & { places?: Maybe<(
    { __typename?: 'PlaceListResponse' }
    & { meta: (
      { __typename?: 'Meta' }
      & Pick<Meta, 'count' | 'next' | 'previous'>
    ), data: Array<(
      { __typename?: 'Place' }
      & PlaceFieldsFragment
    )> }
  )> }
);

export type CreateVenueMutationVariables = {
  venue: AddVenueMutationInput;
};


export type CreateVenueMutation = (
  { __typename?: 'Mutation' }
  & { addVenue?: Maybe<(
    { __typename?: 'AddVenueMutationPayload' }
    & { venue?: Maybe<(
      { __typename?: 'VenueNode' }
      & VenueFieldsFragment
    )> }
  )> }
);

export type EditVenueMutationVariables = {
  venue: UpdateVenueMutationInput;
};


export type EditVenueMutation = (
  { __typename?: 'Mutation' }
  & { updateVenue?: Maybe<(
    { __typename?: 'UpdateVenueMutationPayload' }
    & { venue?: Maybe<(
      { __typename?: 'VenueNode' }
      & VenueFieldsFragment
    )> }
  )> }
);

export type VenueFieldsFragment = (
  { __typename?: 'VenueNode' }
  & Pick<VenueNode, 'id' | 'hasClothingStorage' | 'hasSnackEatingPlace'>
  & { translations: Array<(
    { __typename?: 'VenueTranslationType' }
    & Pick<VenueTranslationType, 'languageCode' | 'description'>
  )> }
);

export type VenueQueryVariables = {
  id: Scalars['ID'];
};


export type VenueQuery = (
  { __typename?: 'Query' }
  & { venue?: Maybe<(
    { __typename?: 'VenueNode' }
    & VenueFieldsFragment
  )> }
);

export const PersonFieldsFragmentDoc = gql`
    fragment personFields on PersonNode {
  id
  emailAddress
  name
  phoneNumber
  language
}
    `;
export const StudyGroupFieldsFragmentDoc = gql`
    fragment studyGroupFields on StudyGroupNode {
  id
  groupSize
  amountOfAdult
  name
  groupName
  studyLevel
  extraNeeds
  person {
    ...personFields
  }
}
    ${PersonFieldsFragmentDoc}`;
export const EnrolmentFieldsFragmentDoc = gql`
    fragment enrolmentFields on EnrolmentNode {
  id
  notificationType
  enrolmentTime
  person {
    ...personFields
  }
  status
  studyGroup {
    ...studyGroupFields
  }
}
    ${PersonFieldsFragmentDoc}
${StudyGroupFieldsFragmentDoc}`;
export const LocalisedFieldsFragmentDoc = gql`
    fragment localisedFields on LocalisedObject {
  en
  fi
  sv
}
    `;
export const ImageFieldsFragmentDoc = gql`
    fragment imageFields on Image {
  id
  internalId
  license
  name
  url
  cropping
  photographerName
  altText
}
    `;
export const OrganisationNodeFieldsFragmentDoc = gql`
    fragment organisationNodeFields on OrganisationNode {
  id
  name
  persons {
    edges {
      node {
        ...personFields
      }
    }
  }
  phoneNumber
  publisherId
  type
}
    ${PersonFieldsFragmentDoc}`;
export const OccurrenceFieldsFragmentDoc = gql`
    fragment occurrenceFields on OccurrenceNode {
  id
  pEvent {
    id
  }
  amountOfSeats
  minGroupSize
  maxGroupSize
  autoAcceptance
  languages {
    id
    name
  }
  startTime
  endTime
  placeId
  seatsTaken
  cancelled
}
    `;
export const PEventFieldsFragmentDoc = gql`
    fragment pEventFields on PalvelutarjotinEventNode {
  id
  contactPerson {
    ...personFields
  }
  contactEmail
  contactPhoneNumber
  duration
  enrolmentEndDays
  enrolmentStart
  neededOccurrences
  organisation {
    ...organisationNodeFields
  }
  occurrences {
    edges {
      node {
        ...occurrenceFields
      }
    }
  }
}
    ${PersonFieldsFragmentDoc}
${OrganisationNodeFieldsFragmentDoc}
${OccurrenceFieldsFragmentDoc}`;
export const KeywordFieldsFragmentDoc = gql`
    fragment keywordFields on Keyword {
  id
  name {
    ...localisedFields
  }
  internalId
}
    ${LocalisedFieldsFragmentDoc}`;
export const PlaceFieldsFragmentDoc = gql`
    fragment placeFields on Place {
  id
  internalId
  name {
    ...localisedFields
  }
  streetAddress {
    ...localisedFields
  }
  addressLocality {
    ...localisedFields
  }
  telephone {
    ...localisedFields
  }
}
    ${LocalisedFieldsFragmentDoc}`;
export const VenueFieldsFragmentDoc = gql`
    fragment venueFields on VenueNode {
  id
  hasClothingStorage
  hasSnackEatingPlace
  translations {
    languageCode
    description
  }
}
    `;
export const EventFieldsFragmentDoc = gql`
    fragment eventFields on Event {
  id
  internalId
  name {
    ...localisedFields
  }
  shortDescription {
    ...localisedFields
  }
  description {
    ...localisedFields
  }
  images {
    ...imageFields
  }
  infoUrl {
    ...localisedFields
  }
  pEvent {
    ...pEventFields
  }
  inLanguage {
    id
    internalId
    name {
      ...localisedFields
    }
  }
  audience {
    ...keywordFields
  }
  keywords {
    ...keywordFields
  }
  location {
    ...placeFields
  }
  venue {
    ...venueFields
  }
  startTime
  publicationStatus
  datePublished
}
    ${LocalisedFieldsFragmentDoc}
${ImageFieldsFragmentDoc}
${PEventFieldsFragmentDoc}
${KeywordFieldsFragmentDoc}
${PlaceFieldsFragmentDoc}
${VenueFieldsFragmentDoc}`;
export const MetaFieldsFragmentDoc = gql`
    fragment metaFields on Meta {
  count
  next
  previous
}
    `;
export const MyProfileFieldsFragmentDoc = gql`
    fragment myProfileFields on PersonNode {
  ...personFields
  organisations {
    edges {
      node {
        ...organisationNodeFields
      }
    }
  }
}
    ${PersonFieldsFragmentDoc}
${OrganisationNodeFieldsFragmentDoc}`;
export const PageInfoFieldsFragmentDoc = gql`
    fragment pageInfoFields on PageInfo {
  hasNextPage
  hasPreviousPage
  startCursor
  endCursor
}
    `;
export const EnrolmentTemplateContextDocument = gql`
    query enrolmentTemplateContext($enrolmentId: ID!) {
  enrolment(id: $enrolmentId) {
    id
    studyGroup {
      id
      name
      person {
        id
        emailAddress
      }
    }
    occurrence {
      id
      startTime
      linkedEvent {
        id
        name {
          ...localisedFields
        }
      }
    }
  }
}
    ${LocalisedFieldsFragmentDoc}`;
export type EnrolmentTemplateContextProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<EnrolmentTemplateContextQuery, EnrolmentTemplateContextQueryVariables>
    } & TChildProps;
export function withEnrolmentTemplateContext<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  EnrolmentTemplateContextQuery,
  EnrolmentTemplateContextQueryVariables,
  EnrolmentTemplateContextProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, EnrolmentTemplateContextQuery, EnrolmentTemplateContextQueryVariables, EnrolmentTemplateContextProps<TChildProps, TDataName>>(EnrolmentTemplateContextDocument, {
      alias: 'enrolmentTemplateContext',
      ...operationOptions
    });
};

/**
 * __useEnrolmentTemplateContextQuery__
 *
 * To run a query within a React component, call `useEnrolmentTemplateContextQuery` and pass it any options that fit your needs.
 * When your component renders, `useEnrolmentTemplateContextQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEnrolmentTemplateContextQuery({
 *   variables: {
 *      enrolmentId: // value for 'enrolmentId'
 *   },
 * });
 */
export function useEnrolmentTemplateContextQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EnrolmentTemplateContextQuery, EnrolmentTemplateContextQueryVariables>) {
        return ApolloReactHooks.useQuery<EnrolmentTemplateContextQuery, EnrolmentTemplateContextQueryVariables>(EnrolmentTemplateContextDocument, baseOptions);
      }
export function useEnrolmentTemplateContextLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EnrolmentTemplateContextQuery, EnrolmentTemplateContextQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EnrolmentTemplateContextQuery, EnrolmentTemplateContextQueryVariables>(EnrolmentTemplateContextDocument, baseOptions);
        }
export type EnrolmentTemplateContextQueryHookResult = ReturnType<typeof useEnrolmentTemplateContextQuery>;
export type EnrolmentTemplateContextLazyQueryHookResult = ReturnType<typeof useEnrolmentTemplateContextLazyQuery>;
export type EnrolmentTemplateContextQueryResult = ApolloReactCommon.QueryResult<EnrolmentTemplateContextQuery, EnrolmentTemplateContextQueryVariables>;
export const EventNameDocument = gql`
    query eventName($id: ID!) {
  event(id: $id) {
    id
    name {
      ...localisedFields
    }
  }
}
    ${LocalisedFieldsFragmentDoc}`;
export type EventNameProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<EventNameQuery, EventNameQueryVariables>
    } & TChildProps;
export function withEventName<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  EventNameQuery,
  EventNameQueryVariables,
  EventNameProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, EventNameQuery, EventNameQueryVariables, EventNameProps<TChildProps, TDataName>>(EventNameDocument, {
      alias: 'eventName',
      ...operationOptions
    });
};

/**
 * __useEventNameQuery__
 *
 * To run a query within a React component, call `useEventNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventNameQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEventNameQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EventNameQuery, EventNameQueryVariables>) {
        return ApolloReactHooks.useQuery<EventNameQuery, EventNameQueryVariables>(EventNameDocument, baseOptions);
      }
export function useEventNameLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EventNameQuery, EventNameQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EventNameQuery, EventNameQueryVariables>(EventNameDocument, baseOptions);
        }
export type EventNameQueryHookResult = ReturnType<typeof useEventNameQuery>;
export type EventNameLazyQueryHookResult = ReturnType<typeof useEventNameLazyQuery>;
export type EventNameQueryResult = ApolloReactCommon.QueryResult<EventNameQuery, EventNameQueryVariables>;
export const ApproveEnrolmentDocument = gql`
    mutation approveEnrolment($input: ApproveEnrolmentMutationInput!) {
  approveEnrolment(input: $input) {
    enrolment {
      ...enrolmentFields
    }
    clientMutationId
  }
}
    ${EnrolmentFieldsFragmentDoc}`;
export type ApproveEnrolmentMutationFn = ApolloReactCommon.MutationFunction<ApproveEnrolmentMutation, ApproveEnrolmentMutationVariables>;
export type ApproveEnrolmentProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<ApproveEnrolmentMutation, ApproveEnrolmentMutationVariables>
    } & TChildProps;
export function withApproveEnrolment<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ApproveEnrolmentMutation,
  ApproveEnrolmentMutationVariables,
  ApproveEnrolmentProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, ApproveEnrolmentMutation, ApproveEnrolmentMutationVariables, ApproveEnrolmentProps<TChildProps, TDataName>>(ApproveEnrolmentDocument, {
      alias: 'approveEnrolment',
      ...operationOptions
    });
};

/**
 * __useApproveEnrolmentMutation__
 *
 * To run a mutation, you first call `useApproveEnrolmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveEnrolmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveEnrolmentMutation, { data, loading, error }] = useApproveEnrolmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApproveEnrolmentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ApproveEnrolmentMutation, ApproveEnrolmentMutationVariables>) {
        return ApolloReactHooks.useMutation<ApproveEnrolmentMutation, ApproveEnrolmentMutationVariables>(ApproveEnrolmentDocument, baseOptions);
      }
export type ApproveEnrolmentMutationHookResult = ReturnType<typeof useApproveEnrolmentMutation>;
export type ApproveEnrolmentMutationResult = ApolloReactCommon.MutationResult<ApproveEnrolmentMutation>;
export type ApproveEnrolmentMutationOptions = ApolloReactCommon.BaseMutationOptions<ApproveEnrolmentMutation, ApproveEnrolmentMutationVariables>;
export const DeclineEnrolmentDocument = gql`
    mutation declineEnrolment($input: DeclineEnrolmentMutationInput!) {
  declineEnrolment(input: $input) {
    enrolment {
      ...enrolmentFields
    }
    clientMutationId
  }
}
    ${EnrolmentFieldsFragmentDoc}`;
export type DeclineEnrolmentMutationFn = ApolloReactCommon.MutationFunction<DeclineEnrolmentMutation, DeclineEnrolmentMutationVariables>;
export type DeclineEnrolmentProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<DeclineEnrolmentMutation, DeclineEnrolmentMutationVariables>
    } & TChildProps;
export function withDeclineEnrolment<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeclineEnrolmentMutation,
  DeclineEnrolmentMutationVariables,
  DeclineEnrolmentProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeclineEnrolmentMutation, DeclineEnrolmentMutationVariables, DeclineEnrolmentProps<TChildProps, TDataName>>(DeclineEnrolmentDocument, {
      alias: 'declineEnrolment',
      ...operationOptions
    });
};

/**
 * __useDeclineEnrolmentMutation__
 *
 * To run a mutation, you first call `useDeclineEnrolmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeclineEnrolmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [declineEnrolmentMutation, { data, loading, error }] = useDeclineEnrolmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeclineEnrolmentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeclineEnrolmentMutation, DeclineEnrolmentMutationVariables>) {
        return ApolloReactHooks.useMutation<DeclineEnrolmentMutation, DeclineEnrolmentMutationVariables>(DeclineEnrolmentDocument, baseOptions);
      }
export type DeclineEnrolmentMutationHookResult = ReturnType<typeof useDeclineEnrolmentMutation>;
export type DeclineEnrolmentMutationResult = ApolloReactCommon.MutationResult<DeclineEnrolmentMutation>;
export type DeclineEnrolmentMutationOptions = ApolloReactCommon.BaseMutationOptions<DeclineEnrolmentMutation, DeclineEnrolmentMutationVariables>;
export const DeleteEnrolmentDocument = gql`
    mutation deleteEnrolment($input: UnenrolOccurrenceMutationInput!) {
  unenrolOccurrence(input: $input) {
    occurrence {
      id
    }
    studyGroup {
      id
    }
    clientMutationId
  }
}
    `;
export type DeleteEnrolmentMutationFn = ApolloReactCommon.MutationFunction<DeleteEnrolmentMutation, DeleteEnrolmentMutationVariables>;
export type DeleteEnrolmentProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<DeleteEnrolmentMutation, DeleteEnrolmentMutationVariables>
    } & TChildProps;
export function withDeleteEnrolment<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteEnrolmentMutation,
  DeleteEnrolmentMutationVariables,
  DeleteEnrolmentProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteEnrolmentMutation, DeleteEnrolmentMutationVariables, DeleteEnrolmentProps<TChildProps, TDataName>>(DeleteEnrolmentDocument, {
      alias: 'deleteEnrolment',
      ...operationOptions
    });
};

/**
 * __useDeleteEnrolmentMutation__
 *
 * To run a mutation, you first call `useDeleteEnrolmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEnrolmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEnrolmentMutation, { data, loading, error }] = useDeleteEnrolmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteEnrolmentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteEnrolmentMutation, DeleteEnrolmentMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteEnrolmentMutation, DeleteEnrolmentMutationVariables>(DeleteEnrolmentDocument, baseOptions);
      }
export type DeleteEnrolmentMutationHookResult = ReturnType<typeof useDeleteEnrolmentMutation>;
export type DeleteEnrolmentMutationResult = ApolloReactCommon.MutationResult<DeleteEnrolmentMutation>;
export type DeleteEnrolmentMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteEnrolmentMutation, DeleteEnrolmentMutationVariables>;
export const UpdateEnrolmentDocument = gql`
    mutation updateEnrolment($input: UpdateEnrolmentMutationInput!) {
  updateEnrolment(input: $input) {
    enrolment {
      ...enrolmentFields
    }
    clientMutationId
  }
}
    ${EnrolmentFieldsFragmentDoc}`;
export type UpdateEnrolmentMutationFn = ApolloReactCommon.MutationFunction<UpdateEnrolmentMutation, UpdateEnrolmentMutationVariables>;
export type UpdateEnrolmentProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<UpdateEnrolmentMutation, UpdateEnrolmentMutationVariables>
    } & TChildProps;
export function withUpdateEnrolment<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateEnrolmentMutation,
  UpdateEnrolmentMutationVariables,
  UpdateEnrolmentProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateEnrolmentMutation, UpdateEnrolmentMutationVariables, UpdateEnrolmentProps<TChildProps, TDataName>>(UpdateEnrolmentDocument, {
      alias: 'updateEnrolment',
      ...operationOptions
    });
};

/**
 * __useUpdateEnrolmentMutation__
 *
 * To run a mutation, you first call `useUpdateEnrolmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEnrolmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEnrolmentMutation, { data, loading, error }] = useUpdateEnrolmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateEnrolmentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateEnrolmentMutation, UpdateEnrolmentMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateEnrolmentMutation, UpdateEnrolmentMutationVariables>(UpdateEnrolmentDocument, baseOptions);
      }
export type UpdateEnrolmentMutationHookResult = ReturnType<typeof useUpdateEnrolmentMutation>;
export type UpdateEnrolmentMutationResult = ApolloReactCommon.MutationResult<UpdateEnrolmentMutation>;
export type UpdateEnrolmentMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateEnrolmentMutation, UpdateEnrolmentMutationVariables>;
export const EnrolmentDocument = gql`
    query Enrolment($id: ID!) {
  enrolment(id: $id) {
    ...enrolmentFields
    occurrence {
      id
      maxGroupSize
      minGroupSize
      pEvent {
        id
        organisation {
          id
        }
      }
    }
  }
}
    ${EnrolmentFieldsFragmentDoc}`;
export type EnrolmentProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<EnrolmentQuery, EnrolmentQueryVariables>
    } & TChildProps;
export function withEnrolment<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  EnrolmentQuery,
  EnrolmentQueryVariables,
  EnrolmentProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, EnrolmentQuery, EnrolmentQueryVariables, EnrolmentProps<TChildProps, TDataName>>(EnrolmentDocument, {
      alias: 'enrolment',
      ...operationOptions
    });
};

/**
 * __useEnrolmentQuery__
 *
 * To run a query within a React component, call `useEnrolmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useEnrolmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEnrolmentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEnrolmentQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EnrolmentQuery, EnrolmentQueryVariables>) {
        return ApolloReactHooks.useQuery<EnrolmentQuery, EnrolmentQueryVariables>(EnrolmentDocument, baseOptions);
      }
export function useEnrolmentLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EnrolmentQuery, EnrolmentQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EnrolmentQuery, EnrolmentQueryVariables>(EnrolmentDocument, baseOptions);
        }
export type EnrolmentQueryHookResult = ReturnType<typeof useEnrolmentQuery>;
export type EnrolmentLazyQueryHookResult = ReturnType<typeof useEnrolmentLazyQuery>;
export type EnrolmentQueryResult = ApolloReactCommon.QueryResult<EnrolmentQuery, EnrolmentQueryVariables>;
export const NotificationTemplateDocument = gql`
    query notificationTemplate($templateType: NotificationTemplateType, $context: JSONString!, $language: Language!) {
  notificationTemplate(templateType: $templateType, context: $context, language: $language) {
    template {
      id
      type
      translations {
        languageCode
        subject
        bodyHtml
        bodyText
        preview
      }
      preview
    }
    customContextPreviewHtml
    customContextPreviewText
  }
}
    `;
export type NotificationTemplateProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<NotificationTemplateQuery, NotificationTemplateQueryVariables>
    } & TChildProps;
export function withNotificationTemplate<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  NotificationTemplateQuery,
  NotificationTemplateQueryVariables,
  NotificationTemplateProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, NotificationTemplateQuery, NotificationTemplateQueryVariables, NotificationTemplateProps<TChildProps, TDataName>>(NotificationTemplateDocument, {
      alias: 'notificationTemplate',
      ...operationOptions
    });
};

/**
 * __useNotificationTemplateQuery__
 *
 * To run a query within a React component, call `useNotificationTemplateQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationTemplateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationTemplateQuery({
 *   variables: {
 *      templateType: // value for 'templateType'
 *      context: // value for 'context'
 *      language: // value for 'language'
 *   },
 * });
 */
export function useNotificationTemplateQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<NotificationTemplateQuery, NotificationTemplateQueryVariables>) {
        return ApolloReactHooks.useQuery<NotificationTemplateQuery, NotificationTemplateQueryVariables>(NotificationTemplateDocument, baseOptions);
      }
export function useNotificationTemplateLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<NotificationTemplateQuery, NotificationTemplateQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<NotificationTemplateQuery, NotificationTemplateQueryVariables>(NotificationTemplateDocument, baseOptions);
        }
export type NotificationTemplateQueryHookResult = ReturnType<typeof useNotificationTemplateQuery>;
export type NotificationTemplateLazyQueryHookResult = ReturnType<typeof useNotificationTemplateLazyQuery>;
export type NotificationTemplateQueryResult = ApolloReactCommon.QueryResult<NotificationTemplateQuery, NotificationTemplateQueryVariables>;
export const CreateEventDocument = gql`
    mutation CreateEvent($event: AddEventMutationInput!) {
  addEventMutation(event: $event) {
    response {
      statusCode
      body {
        id
        internalId
        name {
          en
          fi
          sv
        }
        shortDescription {
          en
          fi
          sv
        }
        description {
          en
          fi
          sv
        }
        images {
          id
          internalId
          license
          name
          url
          cropping
          photographerName
          altText
        }
        pEvent {
          id
          duration
          neededOccurrences
        }
        infoUrl {
          en
          fi
          sv
        }
      }
    }
  }
}
    `;
export type CreateEventMutationFn = ApolloReactCommon.MutationFunction<CreateEventMutation, CreateEventMutationVariables>;
export type CreateEventProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<CreateEventMutation, CreateEventMutationVariables>
    } & TChildProps;
export function withCreateEvent<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateEventMutation,
  CreateEventMutationVariables,
  CreateEventProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateEventMutation, CreateEventMutationVariables, CreateEventProps<TChildProps, TDataName>>(CreateEventDocument, {
      alias: 'createEvent',
      ...operationOptions
    });
};

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      event: // value for 'event'
 *   },
 * });
 */
export function useCreateEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, baseOptions);
      }
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>;
export type CreateEventMutationResult = ApolloReactCommon.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateEventMutation, CreateEventMutationVariables>;
export const DeleteSingleEventDocument = gql`
    mutation DeleteSingleEvent($eventId: String!) {
  deleteEventMutation(eventId: $eventId) {
    response {
      statusCode
      body {
        id
        internalId
      }
    }
  }
}
    `;
export type DeleteSingleEventMutationFn = ApolloReactCommon.MutationFunction<DeleteSingleEventMutation, DeleteSingleEventMutationVariables>;
export type DeleteSingleEventProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<DeleteSingleEventMutation, DeleteSingleEventMutationVariables>
    } & TChildProps;
export function withDeleteSingleEvent<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteSingleEventMutation,
  DeleteSingleEventMutationVariables,
  DeleteSingleEventProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteSingleEventMutation, DeleteSingleEventMutationVariables, DeleteSingleEventProps<TChildProps, TDataName>>(DeleteSingleEventDocument, {
      alias: 'deleteSingleEvent',
      ...operationOptions
    });
};

/**
 * __useDeleteSingleEventMutation__
 *
 * To run a mutation, you first call `useDeleteSingleEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSingleEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSingleEventMutation, { data, loading, error }] = useDeleteSingleEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useDeleteSingleEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteSingleEventMutation, DeleteSingleEventMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteSingleEventMutation, DeleteSingleEventMutationVariables>(DeleteSingleEventDocument, baseOptions);
      }
export type DeleteSingleEventMutationHookResult = ReturnType<typeof useDeleteSingleEventMutation>;
export type DeleteSingleEventMutationResult = ApolloReactCommon.MutationResult<DeleteSingleEventMutation>;
export type DeleteSingleEventMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteSingleEventMutation, DeleteSingleEventMutationVariables>;
export const PublishSingleEventDocument = gql`
    mutation publishSingleEvent($event: PublishEventMutationInput!) {
  publishEventMutation(event: $event) {
    response {
      statusCode
      body {
        id
        internalId
        publicationStatus
      }
    }
  }
}
    `;
export type PublishSingleEventMutationFn = ApolloReactCommon.MutationFunction<PublishSingleEventMutation, PublishSingleEventMutationVariables>;
export type PublishSingleEventProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<PublishSingleEventMutation, PublishSingleEventMutationVariables>
    } & TChildProps;
export function withPublishSingleEvent<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  PublishSingleEventMutation,
  PublishSingleEventMutationVariables,
  PublishSingleEventProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, PublishSingleEventMutation, PublishSingleEventMutationVariables, PublishSingleEventProps<TChildProps, TDataName>>(PublishSingleEventDocument, {
      alias: 'publishSingleEvent',
      ...operationOptions
    });
};

/**
 * __usePublishSingleEventMutation__
 *
 * To run a mutation, you first call `usePublishSingleEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishSingleEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishSingleEventMutation, { data, loading, error }] = usePublishSingleEventMutation({
 *   variables: {
 *      event: // value for 'event'
 *   },
 * });
 */
export function usePublishSingleEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PublishSingleEventMutation, PublishSingleEventMutationVariables>) {
        return ApolloReactHooks.useMutation<PublishSingleEventMutation, PublishSingleEventMutationVariables>(PublishSingleEventDocument, baseOptions);
      }
export type PublishSingleEventMutationHookResult = ReturnType<typeof usePublishSingleEventMutation>;
export type PublishSingleEventMutationResult = ApolloReactCommon.MutationResult<PublishSingleEventMutation>;
export type PublishSingleEventMutationOptions = ApolloReactCommon.BaseMutationOptions<PublishSingleEventMutation, PublishSingleEventMutationVariables>;
export const EditEventDocument = gql`
    mutation EditEvent($event: UpdateEventMutationInput!) {
  updateEventMutation(event: $event) {
    response {
      statusCode
      body {
        id
        internalId
        name {
          en
          fi
          sv
        }
        shortDescription {
          en
          fi
          sv
        }
        description {
          en
          fi
          sv
        }
        images {
          id
          internalId
          license
          name
          url
          cropping
          photographerName
          altText
        }
        pEvent {
          id
          duration
          neededOccurrences
        }
        infoUrl {
          en
          fi
          sv
        }
      }
    }
  }
}
    `;
export type EditEventMutationFn = ApolloReactCommon.MutationFunction<EditEventMutation, EditEventMutationVariables>;
export type EditEventProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<EditEventMutation, EditEventMutationVariables>
    } & TChildProps;
export function withEditEvent<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  EditEventMutation,
  EditEventMutationVariables,
  EditEventProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, EditEventMutation, EditEventMutationVariables, EditEventProps<TChildProps, TDataName>>(EditEventDocument, {
      alias: 'editEvent',
      ...operationOptions
    });
};

/**
 * __useEditEventMutation__
 *
 * To run a mutation, you first call `useEditEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editEventMutation, { data, loading, error }] = useEditEventMutation({
 *   variables: {
 *      event: // value for 'event'
 *   },
 * });
 */
export function useEditEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditEventMutation, EditEventMutationVariables>) {
        return ApolloReactHooks.useMutation<EditEventMutation, EditEventMutationVariables>(EditEventDocument, baseOptions);
      }
export type EditEventMutationHookResult = ReturnType<typeof useEditEventMutation>;
export type EditEventMutationResult = ApolloReactCommon.MutationResult<EditEventMutation>;
export type EditEventMutationOptions = ApolloReactCommon.BaseMutationOptions<EditEventMutation, EditEventMutationVariables>;
export const EventDocument = gql`
    query Event($id: ID!, $include: [String]) {
  event(id: $id, include: $include) {
    ...eventFields
  }
}
    ${EventFieldsFragmentDoc}`;
export type EventProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<EventQuery, EventQueryVariables>
    } & TChildProps;
export function withEvent<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  EventQuery,
  EventQueryVariables,
  EventProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, EventQuery, EventQueryVariables, EventProps<TChildProps, TDataName>>(EventDocument, {
      alias: 'event',
      ...operationOptions
    });
};

/**
 * __useEventQuery__
 *
 * To run a query within a React component, call `useEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventQuery({
 *   variables: {
 *      id: // value for 'id'
 *      include: // value for 'include'
 *   },
 * });
 */
export function useEventQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EventQuery, EventQueryVariables>) {
        return ApolloReactHooks.useQuery<EventQuery, EventQueryVariables>(EventDocument, baseOptions);
      }
export function useEventLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EventQuery, EventQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EventQuery, EventQueryVariables>(EventDocument, baseOptions);
        }
export type EventQueryHookResult = ReturnType<typeof useEventQuery>;
export type EventLazyQueryHookResult = ReturnType<typeof useEventLazyQuery>;
export type EventQueryResult = ApolloReactCommon.QueryResult<EventQuery, EventQueryVariables>;
export const EventsDocument = gql`
    query Events($divisions: [String], $end: String, $include: [String], $inLanguage: String, $isFree: Boolean, $keywords: [String], $keywordNot: [String], $language: String, $locations: String, $page: Int, $pageSize: Int, $publisher: ID, $sort: String, $start: String, $superEvent: ID, $superEventType: [String], $text: String, $translation: String, $showAll: Boolean) {
  events(divisions: $divisions, end: $end, include: $include, inLanguage: $inLanguage, isFree: $isFree, keywords: $keywords, keywordNot: $keywordNot, language: $language, locations: $locations, page: $page, pageSize: $pageSize, publisher: $publisher, sort: $sort, start: $start, superEvent: $superEvent, superEventType: $superEventType, text: $text, translation: $translation, showAll: $showAll) {
    meta {
      ...metaFields
    }
    data {
      ...eventFields
    }
  }
}
    ${MetaFieldsFragmentDoc}
${EventFieldsFragmentDoc}`;
export type EventsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<EventsQuery, EventsQueryVariables>
    } & TChildProps;
export function withEvents<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  EventsQuery,
  EventsQueryVariables,
  EventsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, EventsQuery, EventsQueryVariables, EventsProps<TChildProps, TDataName>>(EventsDocument, {
      alias: 'events',
      ...operationOptions
    });
};

/**
 * __useEventsQuery__
 *
 * To run a query within a React component, call `useEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsQuery({
 *   variables: {
 *      divisions: // value for 'divisions'
 *      end: // value for 'end'
 *      include: // value for 'include'
 *      inLanguage: // value for 'inLanguage'
 *      isFree: // value for 'isFree'
 *      keywords: // value for 'keywords'
 *      keywordNot: // value for 'keywordNot'
 *      language: // value for 'language'
 *      locations: // value for 'locations'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      publisher: // value for 'publisher'
 *      sort: // value for 'sort'
 *      start: // value for 'start'
 *      superEvent: // value for 'superEvent'
 *      superEventType: // value for 'superEventType'
 *      text: // value for 'text'
 *      translation: // value for 'translation'
 *      showAll: // value for 'showAll'
 *   },
 * });
 */
export function useEventsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EventsQuery, EventsQueryVariables>) {
        return ApolloReactHooks.useQuery<EventsQuery, EventsQueryVariables>(EventsDocument, baseOptions);
      }
export function useEventsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EventsQuery, EventsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EventsQuery, EventsQueryVariables>(EventsDocument, baseOptions);
        }
export type EventsQueryHookResult = ReturnType<typeof useEventsQuery>;
export type EventsLazyQueryHookResult = ReturnType<typeof useEventsLazyQuery>;
export type EventsQueryResult = ApolloReactCommon.QueryResult<EventsQuery, EventsQueryVariables>;
export const UploadSingleImageDocument = gql`
    mutation UploadSingleImage($image: UploadImageMutationInput!) {
  uploadImageMutation(image: $image) {
    response {
      statusCode
      body {
        ...imageFields
      }
    }
  }
}
    ${ImageFieldsFragmentDoc}`;
export type UploadSingleImageMutationFn = ApolloReactCommon.MutationFunction<UploadSingleImageMutation, UploadSingleImageMutationVariables>;
export type UploadSingleImageProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<UploadSingleImageMutation, UploadSingleImageMutationVariables>
    } & TChildProps;
export function withUploadSingleImage<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UploadSingleImageMutation,
  UploadSingleImageMutationVariables,
  UploadSingleImageProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UploadSingleImageMutation, UploadSingleImageMutationVariables, UploadSingleImageProps<TChildProps, TDataName>>(UploadSingleImageDocument, {
      alias: 'uploadSingleImage',
      ...operationOptions
    });
};

/**
 * __useUploadSingleImageMutation__
 *
 * To run a mutation, you first call `useUploadSingleImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadSingleImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadSingleImageMutation, { data, loading, error }] = useUploadSingleImageMutation({
 *   variables: {
 *      image: // value for 'image'
 *   },
 * });
 */
export function useUploadSingleImageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UploadSingleImageMutation, UploadSingleImageMutationVariables>) {
        return ApolloReactHooks.useMutation<UploadSingleImageMutation, UploadSingleImageMutationVariables>(UploadSingleImageDocument, baseOptions);
      }
export type UploadSingleImageMutationHookResult = ReturnType<typeof useUploadSingleImageMutation>;
export type UploadSingleImageMutationResult = ApolloReactCommon.MutationResult<UploadSingleImageMutation>;
export type UploadSingleImageMutationOptions = ApolloReactCommon.BaseMutationOptions<UploadSingleImageMutation, UploadSingleImageMutationVariables>;
export const UpdateSingleImageDocument = gql`
    mutation UpdateSingleImage($image: UpdateImageMutationInput!) {
  updateImageMutation(image: $image) {
    response {
      statusCode
      body {
        ...imageFields
      }
    }
  }
}
    ${ImageFieldsFragmentDoc}`;
export type UpdateSingleImageMutationFn = ApolloReactCommon.MutationFunction<UpdateSingleImageMutation, UpdateSingleImageMutationVariables>;
export type UpdateSingleImageProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<UpdateSingleImageMutation, UpdateSingleImageMutationVariables>
    } & TChildProps;
export function withUpdateSingleImage<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateSingleImageMutation,
  UpdateSingleImageMutationVariables,
  UpdateSingleImageProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateSingleImageMutation, UpdateSingleImageMutationVariables, UpdateSingleImageProps<TChildProps, TDataName>>(UpdateSingleImageDocument, {
      alias: 'updateSingleImage',
      ...operationOptions
    });
};

/**
 * __useUpdateSingleImageMutation__
 *
 * To run a mutation, you first call `useUpdateSingleImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSingleImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSingleImageMutation, { data, loading, error }] = useUpdateSingleImageMutation({
 *   variables: {
 *      image: // value for 'image'
 *   },
 * });
 */
export function useUpdateSingleImageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateSingleImageMutation, UpdateSingleImageMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateSingleImageMutation, UpdateSingleImageMutationVariables>(UpdateSingleImageDocument, baseOptions);
      }
export type UpdateSingleImageMutationHookResult = ReturnType<typeof useUpdateSingleImageMutation>;
export type UpdateSingleImageMutationResult = ApolloReactCommon.MutationResult<UpdateSingleImageMutation>;
export type UpdateSingleImageMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateSingleImageMutation, UpdateSingleImageMutationVariables>;
export const ImageDocument = gql`
    query Image($id: ID!) {
  image(id: $id) {
    ...imageFields
  }
}
    ${ImageFieldsFragmentDoc}`;
export type ImageProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<ImageQuery, ImageQueryVariables>
    } & TChildProps;
export function withImage<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ImageQuery,
  ImageQueryVariables,
  ImageProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, ImageQuery, ImageQueryVariables, ImageProps<TChildProps, TDataName>>(ImageDocument, {
      alias: 'image',
      ...operationOptions
    });
};

/**
 * __useImageQuery__
 *
 * To run a query within a React component, call `useImageQuery` and pass it any options that fit your needs.
 * When your component renders, `useImageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useImageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useImageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ImageQuery, ImageQueryVariables>) {
        return ApolloReactHooks.useQuery<ImageQuery, ImageQueryVariables>(ImageDocument, baseOptions);
      }
export function useImageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ImageQuery, ImageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ImageQuery, ImageQueryVariables>(ImageDocument, baseOptions);
        }
export type ImageQueryHookResult = ReturnType<typeof useImageQuery>;
export type ImageLazyQueryHookResult = ReturnType<typeof useImageLazyQuery>;
export type ImageQueryResult = ApolloReactCommon.QueryResult<ImageQuery, ImageQueryVariables>;
export const KeywordDocument = gql`
    query Keyword($id: ID!) {
  keyword(id: $id) {
    ...keywordFields
  }
}
    ${KeywordFieldsFragmentDoc}`;
export type KeywordProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<KeywordQuery, KeywordQueryVariables>
    } & TChildProps;
export function withKeyword<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  KeywordQuery,
  KeywordQueryVariables,
  KeywordProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, KeywordQuery, KeywordQueryVariables, KeywordProps<TChildProps, TDataName>>(KeywordDocument, {
      alias: 'keyword',
      ...operationOptions
    });
};

/**
 * __useKeywordQuery__
 *
 * To run a query within a React component, call `useKeywordQuery` and pass it any options that fit your needs.
 * When your component renders, `useKeywordQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useKeywordQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useKeywordQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<KeywordQuery, KeywordQueryVariables>) {
        return ApolloReactHooks.useQuery<KeywordQuery, KeywordQueryVariables>(KeywordDocument, baseOptions);
      }
export function useKeywordLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<KeywordQuery, KeywordQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<KeywordQuery, KeywordQueryVariables>(KeywordDocument, baseOptions);
        }
export type KeywordQueryHookResult = ReturnType<typeof useKeywordQuery>;
export type KeywordLazyQueryHookResult = ReturnType<typeof useKeywordLazyQuery>;
export type KeywordQueryResult = ApolloReactCommon.QueryResult<KeywordQuery, KeywordQueryVariables>;
export const KeywordsDocument = gql`
    query Keywords($dataSource: String, $page: Int, $pageSize: Int, $showAllKeywords: Boolean, $sort: String, $text: String) {
  keywords(dataSource: $dataSource, page: $page, pageSize: $pageSize, showAllKeywords: $showAllKeywords, sort: $sort, text: $text) {
    meta {
      count
      next
      previous
    }
    data {
      ...keywordFields
    }
  }
}
    ${KeywordFieldsFragmentDoc}`;
export type KeywordsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<KeywordsQuery, KeywordsQueryVariables>
    } & TChildProps;
export function withKeywords<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  KeywordsQuery,
  KeywordsQueryVariables,
  KeywordsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, KeywordsQuery, KeywordsQueryVariables, KeywordsProps<TChildProps, TDataName>>(KeywordsDocument, {
      alias: 'keywords',
      ...operationOptions
    });
};

/**
 * __useKeywordsQuery__
 *
 * To run a query within a React component, call `useKeywordsQuery` and pass it any options that fit your needs.
 * When your component renders, `useKeywordsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useKeywordsQuery({
 *   variables: {
 *      dataSource: // value for 'dataSource'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      showAllKeywords: // value for 'showAllKeywords'
 *      sort: // value for 'sort'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useKeywordsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<KeywordsQuery, KeywordsQueryVariables>) {
        return ApolloReactHooks.useQuery<KeywordsQuery, KeywordsQueryVariables>(KeywordsDocument, baseOptions);
      }
export function useKeywordsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<KeywordsQuery, KeywordsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<KeywordsQuery, KeywordsQueryVariables>(KeywordsDocument, baseOptions);
        }
export type KeywordsQueryHookResult = ReturnType<typeof useKeywordsQuery>;
export type KeywordsLazyQueryHookResult = ReturnType<typeof useKeywordsLazyQuery>;
export type KeywordsQueryResult = ApolloReactCommon.QueryResult<KeywordsQuery, KeywordsQueryVariables>;
export const CreateMyProfileDocument = gql`
    mutation CreateMyProfile($myProfile: CreateMyProfileMutationInput!) {
  createMyProfile(input: $myProfile) {
    myProfile {
      ...personFields
    }
  }
}
    ${PersonFieldsFragmentDoc}`;
export type CreateMyProfileMutationFn = ApolloReactCommon.MutationFunction<CreateMyProfileMutation, CreateMyProfileMutationVariables>;
export type CreateMyProfileProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<CreateMyProfileMutation, CreateMyProfileMutationVariables>
    } & TChildProps;
export function withCreateMyProfile<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateMyProfileMutation,
  CreateMyProfileMutationVariables,
  CreateMyProfileProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateMyProfileMutation, CreateMyProfileMutationVariables, CreateMyProfileProps<TChildProps, TDataName>>(CreateMyProfileDocument, {
      alias: 'createMyProfile',
      ...operationOptions
    });
};

/**
 * __useCreateMyProfileMutation__
 *
 * To run a mutation, you first call `useCreateMyProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMyProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMyProfileMutation, { data, loading, error }] = useCreateMyProfileMutation({
 *   variables: {
 *      myProfile: // value for 'myProfile'
 *   },
 * });
 */
export function useCreateMyProfileMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateMyProfileMutation, CreateMyProfileMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateMyProfileMutation, CreateMyProfileMutationVariables>(CreateMyProfileDocument, baseOptions);
      }
export type CreateMyProfileMutationHookResult = ReturnType<typeof useCreateMyProfileMutation>;
export type CreateMyProfileMutationResult = ApolloReactCommon.MutationResult<CreateMyProfileMutation>;
export type CreateMyProfileMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateMyProfileMutation, CreateMyProfileMutationVariables>;
export const UpdateMyProfileDocument = gql`
    mutation UpdateMyProfile($myProfile: UpdateMyProfileMutationInput!) {
  updateMyProfile(input: $myProfile) {
    myProfile {
      ...personFields
    }
  }
}
    ${PersonFieldsFragmentDoc}`;
export type UpdateMyProfileMutationFn = ApolloReactCommon.MutationFunction<UpdateMyProfileMutation, UpdateMyProfileMutationVariables>;
export type UpdateMyProfileProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<UpdateMyProfileMutation, UpdateMyProfileMutationVariables>
    } & TChildProps;
export function withUpdateMyProfile<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateMyProfileMutation,
  UpdateMyProfileMutationVariables,
  UpdateMyProfileProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateMyProfileMutation, UpdateMyProfileMutationVariables, UpdateMyProfileProps<TChildProps, TDataName>>(UpdateMyProfileDocument, {
      alias: 'updateMyProfile',
      ...operationOptions
    });
};

/**
 * __useUpdateMyProfileMutation__
 *
 * To run a mutation, you first call `useUpdateMyProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMyProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMyProfileMutation, { data, loading, error }] = useUpdateMyProfileMutation({
 *   variables: {
 *      myProfile: // value for 'myProfile'
 *   },
 * });
 */
export function useUpdateMyProfileMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateMyProfileMutation, UpdateMyProfileMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateMyProfileMutation, UpdateMyProfileMutationVariables>(UpdateMyProfileDocument, baseOptions);
      }
export type UpdateMyProfileMutationHookResult = ReturnType<typeof useUpdateMyProfileMutation>;
export type UpdateMyProfileMutationResult = ApolloReactCommon.MutationResult<UpdateMyProfileMutation>;
export type UpdateMyProfileMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateMyProfileMutation, UpdateMyProfileMutationVariables>;
export const MyProfileDocument = gql`
    query MyProfile {
  myProfile {
    ...myProfileFields
  }
}
    ${MyProfileFieldsFragmentDoc}`;
export type MyProfileProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<MyProfileQuery, MyProfileQueryVariables>
    } & TChildProps;
export function withMyProfile<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  MyProfileQuery,
  MyProfileQueryVariables,
  MyProfileProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, MyProfileQuery, MyProfileQueryVariables, MyProfileProps<TChildProps, TDataName>>(MyProfileDocument, {
      alias: 'myProfile',
      ...operationOptions
    });
};

/**
 * __useMyProfileQuery__
 *
 * To run a query within a React component, call `useMyProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyProfileQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyProfileQuery, MyProfileQueryVariables>) {
        return ApolloReactHooks.useQuery<MyProfileQuery, MyProfileQueryVariables>(MyProfileDocument, baseOptions);
      }
export function useMyProfileLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyProfileQuery, MyProfileQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MyProfileQuery, MyProfileQueryVariables>(MyProfileDocument, baseOptions);
        }
export type MyProfileQueryHookResult = ReturnType<typeof useMyProfileQuery>;
export type MyProfileLazyQueryHookResult = ReturnType<typeof useMyProfileLazyQuery>;
export type MyProfileQueryResult = ApolloReactCommon.QueryResult<MyProfileQuery, MyProfileQueryVariables>;
export const AddOccurrenceDocument = gql`
    mutation AddOccurrence($input: AddOccurrenceMutationInput!) {
  addOccurrence(input: $input) {
    occurrence {
      ...occurrenceFields
    }
  }
}
    ${OccurrenceFieldsFragmentDoc}`;
export type AddOccurrenceMutationFn = ApolloReactCommon.MutationFunction<AddOccurrenceMutation, AddOccurrenceMutationVariables>;
export type AddOccurrenceProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<AddOccurrenceMutation, AddOccurrenceMutationVariables>
    } & TChildProps;
export function withAddOccurrence<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddOccurrenceMutation,
  AddOccurrenceMutationVariables,
  AddOccurrenceProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, AddOccurrenceMutation, AddOccurrenceMutationVariables, AddOccurrenceProps<TChildProps, TDataName>>(AddOccurrenceDocument, {
      alias: 'addOccurrence',
      ...operationOptions
    });
};

/**
 * __useAddOccurrenceMutation__
 *
 * To run a mutation, you first call `useAddOccurrenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOccurrenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOccurrenceMutation, { data, loading, error }] = useAddOccurrenceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddOccurrenceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddOccurrenceMutation, AddOccurrenceMutationVariables>) {
        return ApolloReactHooks.useMutation<AddOccurrenceMutation, AddOccurrenceMutationVariables>(AddOccurrenceDocument, baseOptions);
      }
export type AddOccurrenceMutationHookResult = ReturnType<typeof useAddOccurrenceMutation>;
export type AddOccurrenceMutationResult = ApolloReactCommon.MutationResult<AddOccurrenceMutation>;
export type AddOccurrenceMutationOptions = ApolloReactCommon.BaseMutationOptions<AddOccurrenceMutation, AddOccurrenceMutationVariables>;
export const EditOccurrenceDocument = gql`
    mutation EditOccurrence($input: UpdateOccurrenceMutationInput!) {
  updateOccurrence(input: $input) {
    occurrence {
      ...occurrenceFields
    }
  }
}
    ${OccurrenceFieldsFragmentDoc}`;
export type EditOccurrenceMutationFn = ApolloReactCommon.MutationFunction<EditOccurrenceMutation, EditOccurrenceMutationVariables>;
export type EditOccurrenceProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<EditOccurrenceMutation, EditOccurrenceMutationVariables>
    } & TChildProps;
export function withEditOccurrence<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  EditOccurrenceMutation,
  EditOccurrenceMutationVariables,
  EditOccurrenceProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, EditOccurrenceMutation, EditOccurrenceMutationVariables, EditOccurrenceProps<TChildProps, TDataName>>(EditOccurrenceDocument, {
      alias: 'editOccurrence',
      ...operationOptions
    });
};

/**
 * __useEditOccurrenceMutation__
 *
 * To run a mutation, you first call `useEditOccurrenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditOccurrenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editOccurrenceMutation, { data, loading, error }] = useEditOccurrenceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditOccurrenceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditOccurrenceMutation, EditOccurrenceMutationVariables>) {
        return ApolloReactHooks.useMutation<EditOccurrenceMutation, EditOccurrenceMutationVariables>(EditOccurrenceDocument, baseOptions);
      }
export type EditOccurrenceMutationHookResult = ReturnType<typeof useEditOccurrenceMutation>;
export type EditOccurrenceMutationResult = ApolloReactCommon.MutationResult<EditOccurrenceMutation>;
export type EditOccurrenceMutationOptions = ApolloReactCommon.BaseMutationOptions<EditOccurrenceMutation, EditOccurrenceMutationVariables>;
export const OccurrenceDocument = gql`
    query Occurrence($id: ID!) {
  occurrence(id: $id) {
    ...occurrenceFields
    enrolments {
      edges {
        node {
          ...enrolmentFields
        }
      }
    }
  }
}
    ${OccurrenceFieldsFragmentDoc}
${EnrolmentFieldsFragmentDoc}`;
export type OccurrenceProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<OccurrenceQuery, OccurrenceQueryVariables>
    } & TChildProps;
export function withOccurrence<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  OccurrenceQuery,
  OccurrenceQueryVariables,
  OccurrenceProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, OccurrenceQuery, OccurrenceQueryVariables, OccurrenceProps<TChildProps, TDataName>>(OccurrenceDocument, {
      alias: 'occurrence',
      ...operationOptions
    });
};

/**
 * __useOccurrenceQuery__
 *
 * To run a query within a React component, call `useOccurrenceQuery` and pass it any options that fit your needs.
 * When your component renders, `useOccurrenceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOccurrenceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOccurrenceQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<OccurrenceQuery, OccurrenceQueryVariables>) {
        return ApolloReactHooks.useQuery<OccurrenceQuery, OccurrenceQueryVariables>(OccurrenceDocument, baseOptions);
      }
export function useOccurrenceLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<OccurrenceQuery, OccurrenceQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<OccurrenceQuery, OccurrenceQueryVariables>(OccurrenceDocument, baseOptions);
        }
export type OccurrenceQueryHookResult = ReturnType<typeof useOccurrenceQuery>;
export type OccurrenceLazyQueryHookResult = ReturnType<typeof useOccurrenceLazyQuery>;
export type OccurrenceQueryResult = ApolloReactCommon.QueryResult<OccurrenceQuery, OccurrenceQueryVariables>;
export const DeleteOccurrenceDocument = gql`
    mutation DeleteOccurrence($input: DeleteOccurrenceMutationInput!) {
  deleteOccurrence(input: $input) {
    clientMutationId
  }
}
    `;
export type DeleteOccurrenceMutationFn = ApolloReactCommon.MutationFunction<DeleteOccurrenceMutation, DeleteOccurrenceMutationVariables>;
export type DeleteOccurrenceProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<DeleteOccurrenceMutation, DeleteOccurrenceMutationVariables>
    } & TChildProps;
export function withDeleteOccurrence<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteOccurrenceMutation,
  DeleteOccurrenceMutationVariables,
  DeleteOccurrenceProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteOccurrenceMutation, DeleteOccurrenceMutationVariables, DeleteOccurrenceProps<TChildProps, TDataName>>(DeleteOccurrenceDocument, {
      alias: 'deleteOccurrence',
      ...operationOptions
    });
};

/**
 * __useDeleteOccurrenceMutation__
 *
 * To run a mutation, you first call `useDeleteOccurrenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOccurrenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOccurrenceMutation, { data, loading, error }] = useDeleteOccurrenceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteOccurrenceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteOccurrenceMutation, DeleteOccurrenceMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteOccurrenceMutation, DeleteOccurrenceMutationVariables>(DeleteOccurrenceDocument, baseOptions);
      }
export type DeleteOccurrenceMutationHookResult = ReturnType<typeof useDeleteOccurrenceMutation>;
export type DeleteOccurrenceMutationResult = ApolloReactCommon.MutationResult<DeleteOccurrenceMutation>;
export type DeleteOccurrenceMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteOccurrenceMutation, DeleteOccurrenceMutationVariables>;
export const CancelOccurrenceDocument = gql`
    mutation CancelOccurrence($input: CancelOccurrenceMutationInput!) {
  cancelOccurrence(input: $input) {
    clientMutationId
  }
}
    `;
export type CancelOccurrenceMutationFn = ApolloReactCommon.MutationFunction<CancelOccurrenceMutation, CancelOccurrenceMutationVariables>;
export type CancelOccurrenceProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<CancelOccurrenceMutation, CancelOccurrenceMutationVariables>
    } & TChildProps;
export function withCancelOccurrence<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CancelOccurrenceMutation,
  CancelOccurrenceMutationVariables,
  CancelOccurrenceProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CancelOccurrenceMutation, CancelOccurrenceMutationVariables, CancelOccurrenceProps<TChildProps, TDataName>>(CancelOccurrenceDocument, {
      alias: 'cancelOccurrence',
      ...operationOptions
    });
};

/**
 * __useCancelOccurrenceMutation__
 *
 * To run a mutation, you first call `useCancelOccurrenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelOccurrenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelOccurrenceMutation, { data, loading, error }] = useCancelOccurrenceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCancelOccurrenceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CancelOccurrenceMutation, CancelOccurrenceMutationVariables>) {
        return ApolloReactHooks.useMutation<CancelOccurrenceMutation, CancelOccurrenceMutationVariables>(CancelOccurrenceDocument, baseOptions);
      }
export type CancelOccurrenceMutationHookResult = ReturnType<typeof useCancelOccurrenceMutation>;
export type CancelOccurrenceMutationResult = ApolloReactCommon.MutationResult<CancelOccurrenceMutation>;
export type CancelOccurrenceMutationOptions = ApolloReactCommon.BaseMutationOptions<CancelOccurrenceMutation, CancelOccurrenceMutationVariables>;
export const OccurrencesDocument = gql`
    query Occurrences($after: String, $before: String, $first: Int, $last: Int) {
  occurrences(after: $after, before: $before, first: $first, last: $last) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        ...occurrenceFields
      }
      cursor
    }
  }
}
    ${OccurrenceFieldsFragmentDoc}`;
export type OccurrencesProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<OccurrencesQuery, OccurrencesQueryVariables>
    } & TChildProps;
export function withOccurrences<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  OccurrencesQuery,
  OccurrencesQueryVariables,
  OccurrencesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, OccurrencesQuery, OccurrencesQueryVariables, OccurrencesProps<TChildProps, TDataName>>(OccurrencesDocument, {
      alias: 'occurrences',
      ...operationOptions
    });
};

/**
 * __useOccurrencesQuery__
 *
 * To run a query within a React component, call `useOccurrencesQuery` and pass it any options that fit your needs.
 * When your component renders, `useOccurrencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOccurrencesQuery({
 *   variables: {
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *   },
 * });
 */
export function useOccurrencesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<OccurrencesQuery, OccurrencesQueryVariables>) {
        return ApolloReactHooks.useQuery<OccurrencesQuery, OccurrencesQueryVariables>(OccurrencesDocument, baseOptions);
      }
export function useOccurrencesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<OccurrencesQuery, OccurrencesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<OccurrencesQuery, OccurrencesQueryVariables>(OccurrencesDocument, baseOptions);
        }
export type OccurrencesQueryHookResult = ReturnType<typeof useOccurrencesQuery>;
export type OccurrencesLazyQueryHookResult = ReturnType<typeof useOccurrencesLazyQuery>;
export type OccurrencesQueryResult = ApolloReactCommon.QueryResult<OccurrencesQuery, OccurrencesQueryVariables>;
export const OrganisationDocument = gql`
    query Organisation($id: ID!) {
  organisation(id: $id) {
    ...organisationNodeFields
  }
}
    ${OrganisationNodeFieldsFragmentDoc}`;
export type OrganisationProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<OrganisationQuery, OrganisationQueryVariables>
    } & TChildProps;
export function withOrganisation<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  OrganisationQuery,
  OrganisationQueryVariables,
  OrganisationProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, OrganisationQuery, OrganisationQueryVariables, OrganisationProps<TChildProps, TDataName>>(OrganisationDocument, {
      alias: 'organisation',
      ...operationOptions
    });
};

/**
 * __useOrganisationQuery__
 *
 * To run a query within a React component, call `useOrganisationQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganisationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganisationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOrganisationQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<OrganisationQuery, OrganisationQueryVariables>) {
        return ApolloReactHooks.useQuery<OrganisationQuery, OrganisationQueryVariables>(OrganisationDocument, baseOptions);
      }
export function useOrganisationLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<OrganisationQuery, OrganisationQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<OrganisationQuery, OrganisationQueryVariables>(OrganisationDocument, baseOptions);
        }
export type OrganisationQueryHookResult = ReturnType<typeof useOrganisationQuery>;
export type OrganisationLazyQueryHookResult = ReturnType<typeof useOrganisationLazyQuery>;
export type OrganisationQueryResult = ApolloReactCommon.QueryResult<OrganisationQuery, OrganisationQueryVariables>;
export const OrganisationsDocument = gql`
    query Organisations($after: String, $before: String, $first: Int, $last: Int) {
  organisations(after: $after, before: $before, first: $first, last: $last) {
    pageInfo {
      ...pageInfoFields
    }
    edges {
      node {
        ...organisationNodeFields
      }
    }
  }
}
    ${PageInfoFieldsFragmentDoc}
${OrganisationNodeFieldsFragmentDoc}`;
export type OrganisationsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<OrganisationsQuery, OrganisationsQueryVariables>
    } & TChildProps;
export function withOrganisations<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  OrganisationsQuery,
  OrganisationsQueryVariables,
  OrganisationsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, OrganisationsQuery, OrganisationsQueryVariables, OrganisationsProps<TChildProps, TDataName>>(OrganisationsDocument, {
      alias: 'organisations',
      ...operationOptions
    });
};

/**
 * __useOrganisationsQuery__
 *
 * To run a query within a React component, call `useOrganisationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganisationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganisationsQuery({
 *   variables: {
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *   },
 * });
 */
export function useOrganisationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<OrganisationsQuery, OrganisationsQueryVariables>) {
        return ApolloReactHooks.useQuery<OrganisationsQuery, OrganisationsQueryVariables>(OrganisationsDocument, baseOptions);
      }
export function useOrganisationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<OrganisationsQuery, OrganisationsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<OrganisationsQuery, OrganisationsQueryVariables>(OrganisationsDocument, baseOptions);
        }
export type OrganisationsQueryHookResult = ReturnType<typeof useOrganisationsQuery>;
export type OrganisationsLazyQueryHookResult = ReturnType<typeof useOrganisationsLazyQuery>;
export type OrganisationsQueryResult = ApolloReactCommon.QueryResult<OrganisationsQuery, OrganisationsQueryVariables>;
export const PersonDocument = gql`
    query Person($id: ID!) {
  person(id: $id) {
    ...personFields
  }
}
    ${PersonFieldsFragmentDoc}`;
export type PersonProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<PersonQuery, PersonQueryVariables>
    } & TChildProps;
export function withPerson<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  PersonQuery,
  PersonQueryVariables,
  PersonProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, PersonQuery, PersonQueryVariables, PersonProps<TChildProps, TDataName>>(PersonDocument, {
      alias: 'person',
      ...operationOptions
    });
};

/**
 * __usePersonQuery__
 *
 * To run a query within a React component, call `usePersonQuery` and pass it any options that fit your needs.
 * When your component renders, `usePersonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePersonQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePersonQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PersonQuery, PersonQueryVariables>) {
        return ApolloReactHooks.useQuery<PersonQuery, PersonQueryVariables>(PersonDocument, baseOptions);
      }
export function usePersonLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PersonQuery, PersonQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PersonQuery, PersonQueryVariables>(PersonDocument, baseOptions);
        }
export type PersonQueryHookResult = ReturnType<typeof usePersonQuery>;
export type PersonLazyQueryHookResult = ReturnType<typeof usePersonLazyQuery>;
export type PersonQueryResult = ApolloReactCommon.QueryResult<PersonQuery, PersonQueryVariables>;
export const PlaceDocument = gql`
    query Place($id: ID!) {
  place(id: $id) {
    ...placeFields
  }
}
    ${PlaceFieldsFragmentDoc}`;
export type PlaceProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<PlaceQuery, PlaceQueryVariables>
    } & TChildProps;
export function withPlace<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  PlaceQuery,
  PlaceQueryVariables,
  PlaceProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, PlaceQuery, PlaceQueryVariables, PlaceProps<TChildProps, TDataName>>(PlaceDocument, {
      alias: 'place',
      ...operationOptions
    });
};

/**
 * __usePlaceQuery__
 *
 * To run a query within a React component, call `usePlaceQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlaceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlaceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePlaceQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PlaceQuery, PlaceQueryVariables>) {
        return ApolloReactHooks.useQuery<PlaceQuery, PlaceQueryVariables>(PlaceDocument, baseOptions);
      }
export function usePlaceLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PlaceQuery, PlaceQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PlaceQuery, PlaceQueryVariables>(PlaceDocument, baseOptions);
        }
export type PlaceQueryHookResult = ReturnType<typeof usePlaceQuery>;
export type PlaceLazyQueryHookResult = ReturnType<typeof usePlaceLazyQuery>;
export type PlaceQueryResult = ApolloReactCommon.QueryResult<PlaceQuery, PlaceQueryVariables>;
export const PlacesDocument = gql`
    query Places($dataSource: String, $divisions: [String], $page: Int, $pageSize: Int, $showAllPlaces: Boolean, $sort: String, $text: String) {
  places(dataSource: $dataSource, divisions: $divisions, page: $page, pageSize: $pageSize, showAllPlaces: $showAllPlaces, sort: $sort, text: $text) {
    meta {
      count
      next
      previous
    }
    data {
      ...placeFields
    }
  }
}
    ${PlaceFieldsFragmentDoc}`;
export type PlacesProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<PlacesQuery, PlacesQueryVariables>
    } & TChildProps;
export function withPlaces<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  PlacesQuery,
  PlacesQueryVariables,
  PlacesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, PlacesQuery, PlacesQueryVariables, PlacesProps<TChildProps, TDataName>>(PlacesDocument, {
      alias: 'places',
      ...operationOptions
    });
};

/**
 * __usePlacesQuery__
 *
 * To run a query within a React component, call `usePlacesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlacesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlacesQuery({
 *   variables: {
 *      dataSource: // value for 'dataSource'
 *      divisions: // value for 'divisions'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      showAllPlaces: // value for 'showAllPlaces'
 *      sort: // value for 'sort'
 *      text: // value for 'text'
 *   },
 * });
 */
export function usePlacesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PlacesQuery, PlacesQueryVariables>) {
        return ApolloReactHooks.useQuery<PlacesQuery, PlacesQueryVariables>(PlacesDocument, baseOptions);
      }
export function usePlacesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PlacesQuery, PlacesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PlacesQuery, PlacesQueryVariables>(PlacesDocument, baseOptions);
        }
export type PlacesQueryHookResult = ReturnType<typeof usePlacesQuery>;
export type PlacesLazyQueryHookResult = ReturnType<typeof usePlacesLazyQuery>;
export type PlacesQueryResult = ApolloReactCommon.QueryResult<PlacesQuery, PlacesQueryVariables>;
export const CreateVenueDocument = gql`
    mutation CreateVenue($venue: AddVenueMutationInput!) {
  addVenue(input: $venue) {
    venue {
      ...venueFields
    }
  }
}
    ${VenueFieldsFragmentDoc}`;
export type CreateVenueMutationFn = ApolloReactCommon.MutationFunction<CreateVenueMutation, CreateVenueMutationVariables>;
export type CreateVenueProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<CreateVenueMutation, CreateVenueMutationVariables>
    } & TChildProps;
export function withCreateVenue<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateVenueMutation,
  CreateVenueMutationVariables,
  CreateVenueProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateVenueMutation, CreateVenueMutationVariables, CreateVenueProps<TChildProps, TDataName>>(CreateVenueDocument, {
      alias: 'createVenue',
      ...operationOptions
    });
};

/**
 * __useCreateVenueMutation__
 *
 * To run a mutation, you first call `useCreateVenueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVenueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVenueMutation, { data, loading, error }] = useCreateVenueMutation({
 *   variables: {
 *      venue: // value for 'venue'
 *   },
 * });
 */
export function useCreateVenueMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateVenueMutation, CreateVenueMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateVenueMutation, CreateVenueMutationVariables>(CreateVenueDocument, baseOptions);
      }
export type CreateVenueMutationHookResult = ReturnType<typeof useCreateVenueMutation>;
export type CreateVenueMutationResult = ApolloReactCommon.MutationResult<CreateVenueMutation>;
export type CreateVenueMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateVenueMutation, CreateVenueMutationVariables>;
export const EditVenueDocument = gql`
    mutation EditVenue($venue: UpdateVenueMutationInput!) {
  updateVenue(input: $venue) {
    venue {
      ...venueFields
    }
  }
}
    ${VenueFieldsFragmentDoc}`;
export type EditVenueMutationFn = ApolloReactCommon.MutationFunction<EditVenueMutation, EditVenueMutationVariables>;
export type EditVenueProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<EditVenueMutation, EditVenueMutationVariables>
    } & TChildProps;
export function withEditVenue<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  EditVenueMutation,
  EditVenueMutationVariables,
  EditVenueProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, EditVenueMutation, EditVenueMutationVariables, EditVenueProps<TChildProps, TDataName>>(EditVenueDocument, {
      alias: 'editVenue',
      ...operationOptions
    });
};

/**
 * __useEditVenueMutation__
 *
 * To run a mutation, you first call `useEditVenueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditVenueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editVenueMutation, { data, loading, error }] = useEditVenueMutation({
 *   variables: {
 *      venue: // value for 'venue'
 *   },
 * });
 */
export function useEditVenueMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditVenueMutation, EditVenueMutationVariables>) {
        return ApolloReactHooks.useMutation<EditVenueMutation, EditVenueMutationVariables>(EditVenueDocument, baseOptions);
      }
export type EditVenueMutationHookResult = ReturnType<typeof useEditVenueMutation>;
export type EditVenueMutationResult = ApolloReactCommon.MutationResult<EditVenueMutation>;
export type EditVenueMutationOptions = ApolloReactCommon.BaseMutationOptions<EditVenueMutation, EditVenueMutationVariables>;
export const VenueDocument = gql`
    query Venue($id: ID!) {
  venue(id: $id) {
    ...venueFields
  }
}
    ${VenueFieldsFragmentDoc}`;
export type VenueProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<VenueQuery, VenueQueryVariables>
    } & TChildProps;
export function withVenue<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  VenueQuery,
  VenueQueryVariables,
  VenueProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, VenueQuery, VenueQueryVariables, VenueProps<TChildProps, TDataName>>(VenueDocument, {
      alias: 'venue',
      ...operationOptions
    });
};

/**
 * __useVenueQuery__
 *
 * To run a query within a React component, call `useVenueQuery` and pass it any options that fit your needs.
 * When your component renders, `useVenueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVenueQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useVenueQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<VenueQuery, VenueQueryVariables>) {
        return ApolloReactHooks.useQuery<VenueQuery, VenueQueryVariables>(VenueDocument, baseOptions);
      }
export function useVenueLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<VenueQuery, VenueQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<VenueQuery, VenueQueryVariables>(VenueDocument, baseOptions);
        }
export type VenueQueryHookResult = ReturnType<typeof useVenueQuery>;
export type VenueLazyQueryHookResult = ReturnType<typeof useVenueLazyQuery>;
export type VenueQueryResult = ApolloReactCommon.QueryResult<VenueQuery, VenueQueryVariables>;