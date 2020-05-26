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
  venues?: Maybe<VenueCustomDataNodeConnection>;
  /** The ID of the object */
  venue?: Maybe<VenueCustomDataNode>;
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
};


export type QueryOccurrencesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
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
  organisation: OrganisationNode;
  contactPersons: PersonNodeConnection;
  groups: StudyGroupNodeConnection;
  placeId: Scalars['String'];
};


export type OccurrenceNodeContactPersonsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type OccurrenceNodeGroupsArgs = {
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
  enrolmentEnd?: Maybe<Scalars['DateTime']>;
  duration: Scalars['Int'];
  neededOccurrences: Scalars['Int'];
  occurrences: OccurrenceNodeConnection;
};


export type PalvelutarjotinEventNodeOccurrencesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type OrganisationNode = Node & {
   __typename?: 'OrganisationNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  phoneNumber: Scalars['String'];
  type: OrganisationType;
  persons: PersonNodeConnection;
  occurrenceSet: OccurrenceNodeConnection;
};


export type OrganisationNodePersonsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type OrganisationNodeOccurrenceSetArgs = {
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
  organisations: OrganisationNodeConnection;
  occurrences: OccurrenceNodeConnection;
  studygroupSet: StudyGroupNodeConnection;
};


export type PersonNodeOrganisationsArgs = {
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
};


export type PersonNodeStudygroupSetArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

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
  occurrences: OccurrenceNodeConnection;
};


export type StudyGroupNodeOccurrencesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type VenueCustomDataNodeConnection = {
   __typename?: 'VenueCustomDataNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<VenueCustomDataNodeEdge>>;
};

/** A Relay edge containing a `VenueCustomDataNode` and its cursor. */
export type VenueCustomDataNodeEdge = {
   __typename?: 'VenueCustomDataNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<VenueCustomDataNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type VenueCustomDataNode = Node & {
   __typename?: 'VenueCustomDataNode';
  placeId: Scalars['String'];
  /** The ID of the object. */
  id: Scalars['ID'];
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

export type Event = {
   __typename?: 'Event';
  id?: Maybe<Scalars['String']>;
  internalId: Scalars['ID'];
  internalContext?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
  createdTime?: Maybe<Scalars['String']>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  dataSource?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
  location?: Maybe<Place>;
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
  shortDescription?: Maybe<LocalisedObject>;
  provider?: Maybe<LocalisedObject>;
  infoUrl?: Maybe<LocalisedObject>;
  providerContactInfo?: Maybe<Scalars['String']>;
  description?: Maybe<LocalisedObject>;
  pEvent?: Maybe<PalvelutarjotinEventNode>;
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

export type Mutation = {
   __typename?: 'Mutation';
  addOccurrence?: Maybe<AddOccurrenceMutationPayload>;
  updateOccurrence?: Maybe<UpdateOccurrenceMutationPayload>;
  deleteOccurrence?: Maybe<DeleteOccurrenceMutationPayload>;
  updateMyProfile?: Maybe<UpdateMyProfileMutationPayload>;
  addOrganisation?: Maybe<AddOrganisationMutationPayload>;
  updateOrganisation?: Maybe<UpdateOrganisationMutationPayload>;
  updatePerson?: Maybe<UpdatePersonMutationPayload>;
  addEventMutation?: Maybe<AddEventMutation>;
  updateEventMutation?: Maybe<UpdateEventMutation>;
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
  placeId: Scalars['String'];
  minGroupSize: Scalars['Int'];
  maxGroupSize: Scalars['Int'];
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  organisationId: Scalars['ID'];
  contactPersons?: Maybe<Array<Maybe<PersonNodeInput>>>;
  pEventId: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type PersonNodeInput = {
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  emailAddress: Scalars['String'];
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
  organisationId?: Maybe<Scalars['ID']>;
  /** Should include all contact persons of the occurrence, missing contact persons will be removed during mutation */
  contactPersons?: Maybe<Array<Maybe<PersonNodeInput>>>;
  pEventId?: Maybe<Scalars['ID']>;
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

export type UpdateMyProfileMutationPayload = {
   __typename?: 'UpdateMyProfileMutationPayload';
  myProfile?: Maybe<PersonNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateMyProfileMutationInput = {
  name?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['String']>;
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
  enrolmentEnd?: Maybe<Scalars['DateTime']>;
  duration: Scalars['Int'];
  neededOccurrences: Scalars['Int'];
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
  /** Palvelutarjotin event data */
  pEvent: PalvelutarjotinEventInput;
  id: Scalars['String'];
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
        ), shortDescription?: Maybe<(
          { __typename?: 'LocalisedObject' }
          & Pick<LocalisedObject, 'en' | 'fi' | 'sv'>
        )>, description?: Maybe<(
          { __typename?: 'LocalisedObject' }
          & Pick<LocalisedObject, 'en' | 'fi' | 'sv'>
        )>, images: Array<(
          { __typename?: 'Image' }
          & Pick<Image, 'id' | 'internalId' | 'license' | 'name' | 'url' | 'cropping' | 'photographerName' | 'altText'>
        )>, pEvent?: Maybe<(
          { __typename?: 'PalvelutarjotinEventNode' }
          & Pick<PalvelutarjotinEventNode, 'duration' | 'neededOccurrences'>
        )>, infoUrl?: Maybe<(
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
        ), shortDescription?: Maybe<(
          { __typename?: 'LocalisedObject' }
          & Pick<LocalisedObject, 'en' | 'fi' | 'sv'>
        )>, description?: Maybe<(
          { __typename?: 'LocalisedObject' }
          & Pick<LocalisedObject, 'en' | 'fi' | 'sv'>
        )>, images: Array<(
          { __typename?: 'Image' }
          & Pick<Image, 'id' | 'internalId' | 'license' | 'name' | 'url' | 'cropping' | 'photographerName' | 'altText'>
        )>, pEvent?: Maybe<(
          { __typename?: 'PalvelutarjotinEventNode' }
          & Pick<PalvelutarjotinEventNode, 'duration' | 'neededOccurrences'>
        )>, infoUrl?: Maybe<(
          { __typename?: 'LocalisedObject' }
          & Pick<LocalisedObject, 'en' | 'fi' | 'sv'>
        )> }
      )> }
    )> }
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
    & Pick<Event, 'id' | 'internalId' | 'startTime'>
    & { name: (
      { __typename?: 'LocalisedObject' }
      & Pick<LocalisedObject, 'en' | 'fi' | 'sv'>
    ), shortDescription?: Maybe<(
      { __typename?: 'LocalisedObject' }
      & Pick<LocalisedObject, 'en' | 'fi' | 'sv'>
    )>, description?: Maybe<(
      { __typename?: 'LocalisedObject' }
      & Pick<LocalisedObject, 'en' | 'fi' | 'sv'>
    )>, images: Array<(
      { __typename?: 'Image' }
      & Pick<Image, 'id' | 'internalId' | 'license' | 'name' | 'url' | 'cropping' | 'photographerName' | 'altText'>
    )>, infoUrl?: Maybe<(
      { __typename?: 'LocalisedObject' }
      & Pick<LocalisedObject, 'en' | 'fi' | 'sv'>
    )>, pEvent?: Maybe<(
      { __typename?: 'PalvelutarjotinEventNode' }
      & Pick<PalvelutarjotinEventNode, 'id' | 'duration' | 'neededOccurrences'>
      & { occurrences: (
        { __typename?: 'OccurrenceNodeConnection' }
        & { edges: Array<Maybe<(
          { __typename?: 'OccurrenceNodeEdge' }
          & { node?: Maybe<(
            { __typename?: 'OccurrenceNode' }
            & Pick<OccurrenceNode, 'id' | 'maxGroupSize' | 'minGroupSize' | 'startTime' | 'endTime' | 'placeId'>
          )> }
        )>> }
      ) }
    )>, inLanguage: Array<(
      { __typename?: 'InLanguage' }
      & Pick<InLanguage, 'id' | 'internalId'>
      & { name?: Maybe<(
        { __typename?: 'LocalisedObject' }
        & Pick<LocalisedObject, 'en' | 'fi' | 'sv'>
      )> }
    )>, audience: Array<(
      { __typename?: 'Keyword' }
      & Pick<Keyword, 'id' | 'internalId'>
      & { name?: Maybe<(
        { __typename?: 'LocalisedObject' }
        & Pick<LocalisedObject, 'en' | 'fi' | 'sv'>
      )> }
    )>, keywords: Array<(
      { __typename?: 'Keyword' }
      & Pick<Keyword, 'id' | 'internalId'>
      & { name?: Maybe<(
        { __typename?: 'LocalisedObject' }
        & Pick<LocalisedObject, 'en' | 'fi' | 'sv'>
      )> }
    )>, location?: Maybe<(
      { __typename?: 'Place' }
      & Pick<Place, 'id' | 'internalId'>
      & { name?: Maybe<(
        { __typename?: 'LocalisedObject' }
        & Pick<LocalisedObject, 'en' | 'fi' | 'sv'>
      )>, streetAddress?: Maybe<(
        { __typename?: 'LocalisedObject' }
        & Pick<LocalisedObject, 'en' | 'fi' | 'sv'>
      )> }
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
        & Pick<Image, 'id' | 'internalId' | 'license' | 'name' | 'url' | 'cropping' | 'photographerName' | 'altText'>
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
        & Pick<Image, 'id' | 'internalId' | 'license' | 'name' | 'url' | 'cropping' | 'photographerName' | 'altText'>
      )> }
    )> }
  )> }
);

export type ImageQueryVariables = {
  id: Scalars['ID'];
};


export type ImageQuery = (
  { __typename?: 'Query' }
  & { image?: Maybe<(
    { __typename?: 'Image' }
    & Pick<Image, 'id' | 'internalId' | 'license' | 'name' | 'url' | 'cropping' | 'photographerName' | 'altText'>
  )> }
);

export type KeywordQueryVariables = {
  id: Scalars['ID'];
};


export type KeywordQuery = (
  { __typename?: 'Query' }
  & { keyword?: Maybe<(
    { __typename?: 'Keyword' }
    & Pick<Keyword, 'id' | 'internalId'>
    & { name?: Maybe<(
      { __typename?: 'LocalisedObject' }
      & Pick<LocalisedObject, 'fi' | 'sv' | 'en'>
    )> }
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
      & Pick<Keyword, 'id' | 'internalId'>
      & { name?: Maybe<(
        { __typename?: 'LocalisedObject' }
        & Pick<LocalisedObject, 'fi' | 'sv' | 'en'>
      )> }
    )> }
  )> }
);

export type MyProfileQueryVariables = {};


export type MyProfileQuery = (
  { __typename?: 'Query' }
  & { myProfile?: Maybe<(
    { __typename?: 'PersonNode' }
    & Pick<PersonNode, 'id' | 'name' | 'phoneNumber'>
    & { organisations: (
      { __typename?: 'OrganisationNodeConnection' }
      & { edges: Array<Maybe<(
        { __typename?: 'OrganisationNodeEdge' }
        & { node?: Maybe<(
          { __typename?: 'OrganisationNode' }
          & Pick<OrganisationNode, 'id' | 'name' | 'phoneNumber' | 'type'>
        )> }
      )>> }
    ) }
  )> }
);

export type AddOccurrenceMutationVariables = {
  input: AddOccurrenceMutationInput;
};


export type AddOccurrenceMutation = (
  { __typename?: 'Mutation' }
  & { addOccurrence?: Maybe<(
    { __typename?: 'AddOccurrenceMutationPayload' }
    & Pick<AddOccurrenceMutationPayload, 'clientMutationId'>
    & { occurrence?: Maybe<(
      { __typename?: 'OccurrenceNode' }
      & Pick<OccurrenceNode, 'id' | 'minGroupSize' | 'maxGroupSize' | 'startTime' | 'endTime' | 'placeId'>
      & { pEvent?: Maybe<(
        { __typename?: 'PalvelutarjotinEventNode' }
        & Pick<PalvelutarjotinEventNode, 'id'>
      )>, organisation: (
        { __typename?: 'OrganisationNode' }
        & Pick<OrganisationNode, 'id'>
      ) }
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
    & Pick<UpdateOccurrenceMutationPayload, 'clientMutationId'>
    & { occurrence?: Maybe<(
      { __typename?: 'OccurrenceNode' }
      & Pick<OccurrenceNode, 'id' | 'minGroupSize' | 'maxGroupSize' | 'startTime' | 'endTime' | 'placeId'>
      & { pEvent?: Maybe<(
        { __typename?: 'PalvelutarjotinEventNode' }
        & Pick<PalvelutarjotinEventNode, 'id'>
      )>, organisation: (
        { __typename?: 'OrganisationNode' }
        & Pick<OrganisationNode, 'id'>
      ) }
    )> }
  )> }
);

export type OccurrenceQueryVariables = {
  id: Scalars['ID'];
};


export type OccurrenceQuery = (
  { __typename?: 'Query' }
  & { occurrence?: Maybe<(
    { __typename?: 'OccurrenceNode' }
    & Pick<OccurrenceNode, 'id' | 'minGroupSize' | 'maxGroupSize' | 'startTime' | 'endTime' | 'placeId'>
    & { pEvent?: Maybe<(
      { __typename?: 'PalvelutarjotinEventNode' }
      & Pick<PalvelutarjotinEventNode, 'id'>
    )>, organisation: (
      { __typename?: 'OrganisationNode' }
      & Pick<OrganisationNode, 'id'>
    ) }
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
        & Pick<OccurrenceNode, 'id' | 'minGroupSize' | 'maxGroupSize' | 'startTime' | 'endTime'>
        & { pEvent?: Maybe<(
          { __typename?: 'PalvelutarjotinEventNode' }
          & Pick<PalvelutarjotinEventNode, 'id'>
        )> }
      )> }
    )>> }
  )> }
);

export type PlaceQueryVariables = {
  id: Scalars['ID'];
};


export type PlaceQuery = (
  { __typename?: 'Query' }
  & { place?: Maybe<(
    { __typename?: 'Place' }
    & Pick<Place, 'id' | 'internalId'>
    & { name?: Maybe<(
      { __typename?: 'LocalisedObject' }
      & Pick<LocalisedObject, 'fi' | 'sv' | 'en'>
    )>, streetAddress?: Maybe<(
      { __typename?: 'LocalisedObject' }
      & Pick<LocalisedObject, 'fi' | 'sv' | 'en'>
    )>, addressLocality?: Maybe<(
      { __typename?: 'LocalisedObject' }
      & Pick<LocalisedObject, 'fi' | 'sv' | 'en'>
    )>, telephone?: Maybe<(
      { __typename?: 'LocalisedObject' }
      & Pick<LocalisedObject, 'fi' | 'sv' | 'en'>
    )> }
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
      & Pick<Place, 'id' | 'internalId'>
      & { name?: Maybe<(
        { __typename?: 'LocalisedObject' }
        & Pick<LocalisedObject, 'fi' | 'sv' | 'en'>
      )>, streetAddress?: Maybe<(
        { __typename?: 'LocalisedObject' }
        & Pick<LocalisedObject, 'fi' | 'sv' | 'en'>
      )>, addressLocality?: Maybe<(
        { __typename?: 'LocalisedObject' }
        & Pick<LocalisedObject, 'fi' | 'sv' | 'en'>
      )>, telephone?: Maybe<(
        { __typename?: 'LocalisedObject' }
        & Pick<LocalisedObject, 'fi' | 'sv' | 'en'>
      )> }
    )> }
  )> }
);


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
    infoUrl {
      en
      fi
      sv
    }
    pEvent {
      id
      duration
      neededOccurrences
      occurrences {
        edges {
          node {
            id
            maxGroupSize
            minGroupSize
            startTime
            endTime
            placeId
          }
        }
      }
    }
    inLanguage {
      id
      internalId
      name {
        en
        fi
        sv
      }
    }
    audience {
      id
      internalId
      name {
        en
        fi
        sv
      }
    }
    keywords {
      id
      internalId
      name {
        en
        fi
        sv
      }
    }
    location {
      id
      internalId
      name {
        en
        fi
        sv
      }
      streetAddress {
        en
        fi
        sv
      }
    }
    startTime
  }
}
    `;
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
export const UploadSingleImageDocument = gql`
    mutation UploadSingleImage($image: UploadImageMutationInput!) {
  uploadImageMutation(image: $image) {
    response {
      statusCode
      body {
        id
        internalId
        license
        name
        url
        cropping
        photographerName
        altText
      }
    }
  }
}
    `;
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
        id
        internalId
        license
        name
        url
        cropping
        photographerName
        altText
      }
    }
  }
}
    `;
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
    id
    internalId
    license
    name
    url
    cropping
    photographerName
    altText
  }
}
    `;
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
    id
    name {
      fi
      sv
      en
    }
    internalId
  }
}
    `;
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
      id
      name {
        fi
        sv
        en
      }
      internalId
    }
  }
}
    `;
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
export const MyProfileDocument = gql`
    query MyProfile {
  myProfile {
    id
    name
    phoneNumber
    organisations {
      edges {
        node {
          id
          name
          phoneNumber
          type
        }
      }
    }
  }
}
    `;
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
      id
      pEvent {
        id
      }
      minGroupSize
      maxGroupSize
      startTime
      endTime
      organisation {
        id
      }
      placeId
    }
    clientMutationId
  }
}
    `;
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
      id
      pEvent {
        id
      }
      minGroupSize
      maxGroupSize
      startTime
      endTime
      organisation {
        id
      }
      placeId
    }
    clientMutationId
  }
}
    `;
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
    id
    pEvent {
      id
    }
    minGroupSize
    maxGroupSize
    startTime
    endTime
    organisation {
      id
    }
    placeId
  }
}
    `;
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
        id
        pEvent {
          id
        }
        minGroupSize
        maxGroupSize
        startTime
        endTime
      }
      cursor
    }
  }
}
    `;
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
export const PlaceDocument = gql`
    query Place($id: ID!) {
  place(id: $id) {
    id
    internalId
    name {
      fi
      sv
      en
    }
    streetAddress {
      fi
      sv
      en
    }
    addressLocality {
      fi
      sv
      en
    }
    telephone {
      fi
      sv
      en
    }
  }
}
    `;
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
      id
      internalId
      name {
        fi
        sv
        en
      }
      streetAddress {
        fi
        sv
        en
      }
      addressLocality {
        fi
        sv
        en
      }
      telephone {
        fi
        sv
        en
      }
    }
  }
}
    `;
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