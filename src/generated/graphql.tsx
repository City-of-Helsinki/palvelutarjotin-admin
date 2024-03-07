import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  JSONString: { input: any; output: any; }
  Time: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type AddEventMutation = {
  __typename?: 'AddEventMutation';
  response?: Maybe<EventMutationResponse>;
};

export type AddEventMutationInput = {
  audience?: InputMaybe<Array<IdObjectInput>>;
  audienceMaxAge?: InputMaybe<Scalars['String']['input']>;
  audienceMinAge?: InputMaybe<Scalars['String']['input']>;
  customData?: InputMaybe<Scalars['String']['input']>;
  datePublished?: InputMaybe<Scalars['String']['input']>;
  description: LocalisedObjectInput;
  /** Set to `true` to save event as draft version, when draft is true, event data validation will be skipped */
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  endTime?: InputMaybe<Scalars['String']['input']>;
  enrolmentEndTime?: InputMaybe<Scalars['String']['input']>;
  enrolmentStartTime?: InputMaybe<Scalars['String']['input']>;
  eventStatus?: InputMaybe<Scalars['String']['input']>;
  externalLinks?: InputMaybe<Array<Scalars['String']['input']>>;
  images?: InputMaybe<Array<IdObjectInput>>;
  inLanguage?: InputMaybe<Array<IdObjectInput>>;
  infoUrl?: InputMaybe<LocalisedObjectInput>;
  keywords: Array<IdObjectInput>;
  localizationExtraInfo?: InputMaybe<LocalisedObjectInput>;
  location?: InputMaybe<IdObjectInput>;
  maximumAttendeeCapacity?: InputMaybe<Scalars['Int']['input']>;
  minimumAttendeeCapacity?: InputMaybe<Scalars['Int']['input']>;
  name: LocalisedObjectInput;
  offers: Array<OfferInput>;
  /** Organisation global id which the created event belongs to */
  organisationId: Scalars['String']['input'];
  /** Palvelutarjotin event data */
  pEvent: PalvelutarjotinEventInput;
  provider?: InputMaybe<LocalisedObjectInput>;
  providerContactInfo?: InputMaybe<Scalars['String']['input']>;
  remainingAttendeeCapacity?: InputMaybe<Scalars['Int']['input']>;
  shortDescription: LocalisedObjectInput;
  startTime: Scalars['String']['input'];
  subEvents?: InputMaybe<Array<Scalars['String']['input']>>;
  superEvent?: InputMaybe<Scalars['String']['input']>;
  superEventType?: InputMaybe<Scalars['String']['input']>;
};

export type AddOccurrenceMutationInput = {
  amountOfSeats: Scalars['Int']['input'];
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  contactPersons?: InputMaybe<Array<InputMaybe<PersonNodeInput>>>;
  endTime: Scalars['DateTime']['input'];
  languages: Array<InputMaybe<LanguageInput>>;
  maxGroupSize?: InputMaybe<Scalars['Int']['input']>;
  minGroupSize?: InputMaybe<Scalars['Int']['input']>;
  pEventId: Scalars['ID']['input'];
  placeId?: InputMaybe<Scalars['String']['input']>;
  seatType?: InputMaybe<SeatType>;
  startTime: Scalars['DateTime']['input'];
};

export type AddOccurrenceMutationPayload = {
  __typename?: 'AddOccurrenceMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  occurrence?: Maybe<OccurrenceNode>;
};

export type AddOrganisationMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  publisherId: Scalars['String']['input'];
  type: OrganisationTypeEnum;
};

export type AddOrganisationMutationPayload = {
  __typename?: 'AddOrganisationMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  organisation?: Maybe<OrganisationNode>;
};

export type AddStudyGroupMutationInput = {
  amountOfAdult?: InputMaybe<Scalars['Int']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  extraNeeds?: InputMaybe<Scalars['String']['input']>;
  groupName?: InputMaybe<Scalars['String']['input']>;
  groupSize: Scalars['Int']['input'];
  /** If person input doesn't include person id, a new person object will be created */
  person: PersonNodeInput;
  studyLevels?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  unitId?: InputMaybe<Scalars['String']['input']>;
  unitName?: InputMaybe<Scalars['String']['input']>;
};

export type AddStudyGroupMutationPayload = {
  __typename?: 'AddStudyGroupMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  studyGroup?: Maybe<StudyGroupNode>;
};

export type AddVenueMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  hasAreaForGroupWork: Scalars['Boolean']['input'];
  hasClothingStorage: Scalars['Boolean']['input'];
  hasIndoorPlayingArea: Scalars['Boolean']['input'];
  hasOutdoorPlayingArea: Scalars['Boolean']['input'];
  hasSnackEatingPlace: Scalars['Boolean']['input'];
  hasToiletNearby: Scalars['Boolean']['input'];
  /** Place id from linked event */
  id: Scalars['ID']['input'];
  outdoorActivity: Scalars['Boolean']['input'];
  translations?: InputMaybe<Array<InputMaybe<VenueTranslationsInput>>>;
};

export type AddVenueMutationPayload = {
  __typename?: 'AddVenueMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  venue?: Maybe<VenueNode>;
};

export type ApproveEnrolmentMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  customMessage?: InputMaybe<Scalars['String']['input']>;
  enrolmentId: Scalars['ID']['input'];
};

export type ApproveEnrolmentMutationPayload = {
  __typename?: 'ApproveEnrolmentMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  enrolment?: Maybe<EnrolmentNode>;
};

export type CancelEnrolmentMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Need to be included to actually cancel the enrolment,without this token, BE only initiate thecancellation process by sending a confirmation email to teacher */
  token?: InputMaybe<Scalars['String']['input']>;
  uniqueId: Scalars['ID']['input'];
};

export type CancelEnrolmentMutationPayload = {
  __typename?: 'CancelEnrolmentMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  enrolment?: Maybe<EnrolmentNode>;
};

export type CancelOccurrenceMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
};

export type CancelOccurrenceMutationPayload = {
  __typename?: 'CancelOccurrenceMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  occurrence?: Maybe<OccurrenceNode>;
};

export type CreateMyProfileMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  emailAddress: Scalars['String']['input'];
  /** Default `fi` */
  language?: InputMaybe<Language>;
  name: Scalars['String']['input'];
  /** Propose a new organisation being added. Used with 3rd party organisations */
  organisationProposals?: InputMaybe<Array<InputMaybe<OrganisationProposalNodeInput>>>;
  organisations?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  placeIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CreateMyProfileMutationPayload = {
  __typename?: 'CreateMyProfileMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  myProfile?: Maybe<PersonNode>;
};

export type DeclineEnrolmentMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  customMessage?: InputMaybe<Scalars['String']['input']>;
  enrolmentId: Scalars['ID']['input'];
};

export type DeclineEnrolmentMutationPayload = {
  __typename?: 'DeclineEnrolmentMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  enrolment?: Maybe<EnrolmentNode>;
};

export type DeleteEventMutation = {
  __typename?: 'DeleteEventMutation';
  response?: Maybe<EventMutationResponse>;
};

export type DeleteImageMutation = {
  __typename?: 'DeleteImageMutation';
  response?: Maybe<ImageMutationResponse>;
};

export type DeleteOccurrenceMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DeleteOccurrenceMutationPayload = {
  __typename?: 'DeleteOccurrenceMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
};

export type DeleteStudyGroupMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DeleteStudyGroupMutationPayload = {
  __typename?: 'DeleteStudyGroupMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
};

export type DeleteVenueMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Place id from linked event */
  id: Scalars['ID']['input'];
};

export type DeleteVenueMutationPayload = {
  __typename?: 'DeleteVenueMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
};

export type Division = {
  __typename?: 'Division';
  municipality?: Maybe<Scalars['String']['output']>;
  name?: Maybe<LocalisedObject>;
  /** Open Civic Data ID */
  ocdId?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
};

export type EnrolEventQueueMutationInput = {
  /** The user response token provided by the reCAPTCHA client-side integration */
  captchaKey?: InputMaybe<Scalars['String']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  notificationType?: InputMaybe<NotificationType>;
  /** The event that a group would like to queue to */
  pEventId: Scalars['ID']['input'];
  /** Leave blank if the contact person is the same with group contact person */
  person?: InputMaybe<PersonNodeInput>;
  /** Study group data */
  studyGroup: StudyGroupInput;
};

export type EnrolEventQueueMutationPayload = {
  __typename?: 'EnrolEventQueueMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  eventQueueEnrolment?: Maybe<EventQueueEnrolmentNode>;
};

export type EnrolOccurrenceMutationInput = {
  /** The user response token provided by the reCAPTCHA client-side integration */
  captchaKey?: InputMaybe<Scalars['String']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  notificationType?: InputMaybe<NotificationType>;
  /** Occurrence ids of event */
  occurrenceIds: Array<InputMaybe<Scalars['ID']['input']>>;
  /** Leave blank if the contact person is the same with group contact person */
  person?: InputMaybe<PersonNodeInput>;
  /** Should the related notifications be sent during the mutation. Default is True. */
  sendNotifications?: InputMaybe<Scalars['Boolean']['input']>;
  /** Study group data */
  studyGroup: StudyGroupInput;
};

export type EnrolOccurrenceMutationPayload = {
  __typename?: 'EnrolOccurrenceMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  enrolments?: Maybe<Array<Maybe<EnrolmentNode>>>;
};

export type EnrolmentNode = Node & {
  __typename?: 'EnrolmentNode';
  enrolmentTime: Scalars['DateTime']['output'];
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  notificationType?: Maybe<NotificationType>;
  occurrence: OccurrenceNode;
  person?: Maybe<PersonNode>;
  personDeletedAt?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<EnrolmentStatus>;
  studyGroup: StudyGroupNode;
  updatedAt: Scalars['DateTime']['output'];
};

export type EnrolmentNodeConnection = {
  __typename?: 'EnrolmentNodeConnection';
  count?: Maybe<Scalars['Int']['output']>;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<EnrolmentNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `EnrolmentNode` and its cursor. */
export type EnrolmentNodeEdge = {
  __typename?: 'EnrolmentNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<EnrolmentNode>;
};

/** An enumeration. */
export enum EnrolmentStatus {
  Approved = 'APPROVED',
  Cancelled = 'CANCELLED',
  Declined = 'DECLINED',
  Pending = 'PENDING'
}

export type Event = {
  __typename?: 'Event';
  /** Only use this field in single event query for best performance. This field only work if `keywords` is included in the query argument */
  activities: Array<Keyword>;
  /** Only use this field in single event query for best performance. This field only work if `keywords` is included in the query argument */
  additionalCriteria: Array<Keyword>;
  audience: Array<Keyword>;
  audienceMaxAge?: Maybe<Scalars['String']['output']>;
  audienceMinAge?: Maybe<Scalars['String']['output']>;
  /** Only use this field in single event query for best performance. This field only work if `keywords` is included in the query argument */
  categories: Array<Keyword>;
  createdTime?: Maybe<Scalars['String']['output']>;
  customData?: Maybe<Scalars['String']['output']>;
  dataSource?: Maybe<Scalars['String']['output']>;
  datePublished?: Maybe<Scalars['String']['output']>;
  description: LocalisedObject;
  endTime?: Maybe<Scalars['String']['output']>;
  enrolmentEndTime?: Maybe<Scalars['String']['output']>;
  enrolmentStartTime?: Maybe<Scalars['String']['output']>;
  eventStatus?: Maybe<Scalars['String']['output']>;
  externalLinks: Array<ExternalLink>;
  id: Scalars['String']['output'];
  images: Array<Image>;
  inLanguage: Array<InLanguage>;
  infoUrl?: Maybe<LocalisedObject>;
  internalContext?: Maybe<Scalars['String']['output']>;
  internalId: Scalars['ID']['output'];
  internalType?: Maybe<Scalars['String']['output']>;
  keywords: Array<Keyword>;
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  localizationExtraInfo?: Maybe<LocalisedObject>;
  location?: Maybe<Place>;
  maximumAttendeeCapacity?: Maybe<Scalars['Int']['output']>;
  minimumAttendeeCapacity?: Maybe<Scalars['Int']['output']>;
  name: LocalisedObject;
  offers: Array<Offer>;
  pEvent: PalvelutarjotinEventNode;
  provider?: Maybe<LocalisedObject>;
  providerContactInfo?: Maybe<Scalars['String']['output']>;
  publicationStatus?: Maybe<Scalars['String']['output']>;
  publisher?: Maybe<Scalars['String']['output']>;
  remainingAttendeeCapacity?: Maybe<Scalars['Int']['output']>;
  shortDescription: LocalisedObject;
  startTime?: Maybe<Scalars['String']['output']>;
  subEvents: Array<IdObject>;
  superEvent?: Maybe<IdObject>;
  superEventType?: Maybe<Scalars['String']['output']>;
  venue?: Maybe<VenueNode>;
};

export type EventListPaginatedTypeResponse = {
  __typename?: 'EventListPaginatedTypeResponse';
  data: Array<Event>;
  pageInfo: PaginatedType;
};

export type EventListResponse = {
  __typename?: 'EventListResponse';
  data: Array<Event>;
  meta: Meta;
};

export type EventMutationResponse = {
  __typename?: 'EventMutationResponse';
  body?: Maybe<Event>;
  resultText?: Maybe<Scalars['String']['output']>;
  statusCode: Scalars['Int']['output'];
};

export type EventQueueEnrolmentNode = Node & {
  __typename?: 'EventQueueEnrolmentNode';
  enrolmentTime: Scalars['DateTime']['output'];
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  notificationType?: Maybe<NotificationType>;
  pEvent: PalvelutarjotinEventNode;
  person?: Maybe<PersonNode>;
  personDeletedAt?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<EventQueueEnrolmentStatus>;
  studyGroup: StudyGroupNode;
  updatedAt: Scalars['DateTime']['output'];
};

export type EventQueueEnrolmentNodeConnection = {
  __typename?: 'EventQueueEnrolmentNodeConnection';
  count?: Maybe<Scalars['Int']['output']>;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<EventQueueEnrolmentNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `EventQueueEnrolmentNode` and its cursor. */
export type EventQueueEnrolmentNodeEdge = {
  __typename?: 'EventQueueEnrolmentNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<EventQueueEnrolmentNode>;
};

/** An enumeration. */
export enum EventQueueEnrolmentStatus {
  HasEnrolments = 'HAS_ENROLMENTS',
  HasNoEnrolments = 'HAS_NO_ENROLMENTS'
}

export type EventSearchListResponse = {
  __typename?: 'EventSearchListResponse';
  data: Array<Event>;
  meta: Meta;
};

export type ExternalLink = {
  __typename?: 'ExternalLink';
  language?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type ExternalPlace = {
  __typename?: 'ExternalPlace';
  name?: Maybe<LocalisedObject>;
};

export type IdObject = {
  __typename?: 'IdObject';
  createdTime?: Maybe<Scalars['String']['output']>;
  dataSource?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  internalContext?: Maybe<Scalars['String']['output']>;
  internalId: Scalars['ID']['output'];
  internalType?: Maybe<Scalars['String']['output']>;
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  publisher?: Maybe<Scalars['String']['output']>;
};

export type IdObjectInput = {
  internalId?: InputMaybe<Scalars['String']['input']>;
};

export type Image = {
  __typename?: 'Image';
  altText?: Maybe<Scalars['String']['output']>;
  createdTime?: Maybe<Scalars['String']['output']>;
  cropping?: Maybe<Scalars['String']['output']>;
  dataSource?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  internalContext?: Maybe<Scalars['String']['output']>;
  internalId: Scalars['ID']['output'];
  internalType?: Maybe<Scalars['String']['output']>;
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  license?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  photographerName?: Maybe<Scalars['String']['output']>;
  publisher?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
};

export type ImageListResponse = {
  __typename?: 'ImageListResponse';
  data: Array<Image>;
  meta: Meta;
};

export type ImageMutationResponse = {
  __typename?: 'ImageMutationResponse';
  body?: Maybe<Image>;
  resultText?: Maybe<Scalars['String']['output']>;
  statusCode: Scalars['Int']['output'];
};

export type InLanguage = {
  __typename?: 'InLanguage';
  createdTime?: Maybe<Scalars['String']['output']>;
  dataSource?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  internalContext?: Maybe<Scalars['String']['output']>;
  internalId: Scalars['ID']['output'];
  internalType?: Maybe<Scalars['String']['output']>;
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  name?: Maybe<LocalisedObject>;
  publisher?: Maybe<Scalars['String']['output']>;
  translationAvailable?: Maybe<Scalars['Boolean']['output']>;
};

export type Keyword = {
  __typename?: 'Keyword';
  aggregate?: Maybe<Scalars['Boolean']['output']>;
  altLabels?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  createdTime?: Maybe<Scalars['String']['output']>;
  dataSource?: Maybe<Scalars['String']['output']>;
  deprecated?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['Int']['output']>;
  internalContext?: Maybe<Scalars['String']['output']>;
  internalId: Scalars['ID']['output'];
  internalType?: Maybe<Scalars['String']['output']>;
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  nEvents?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<LocalisedObject>;
  publisher?: Maybe<Scalars['ID']['output']>;
};

export type KeywordListResponse = {
  __typename?: 'KeywordListResponse';
  data: Array<Keyword>;
  meta: Meta;
};

export type KeywordSet = {
  __typename?: 'KeywordSet';
  createdTime?: Maybe<Scalars['String']['output']>;
  dataSource?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  internalContext?: Maybe<Scalars['String']['output']>;
  internalId: Scalars['ID']['output'];
  internalType?: Maybe<Scalars['String']['output']>;
  keywords: Array<Keyword>;
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  name?: Maybe<LocalisedObject>;
  publisher?: Maybe<Scalars['String']['output']>;
  usage?: Maybe<Scalars['String']['output']>;
};

/** An enumeration. */
export enum KeywordSetType {
  Activities = 'ACTIVITIES',
  AdditionalCriteria = 'ADDITIONAL_CRITERIA',
  Category = 'CATEGORY',
  TargetGroup = 'TARGET_GROUP'
}

/** An enumeration. */
export enum Language {
  En = 'EN',
  Fi = 'FI',
  Sv = 'SV'
}

export type LanguageInput = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type LanguageNode = Node & {
  __typename?: 'LanguageNode';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type LanguageNodeConnection = {
  __typename?: 'LanguageNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<LanguageNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `LanguageNode` and its cursor. */
export type LanguageNodeEdge = {
  __typename?: 'LanguageNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<LanguageNode>;
};

export type LocalisedObject = {
  __typename?: 'LocalisedObject';
  en?: Maybe<Scalars['String']['output']>;
  fi?: Maybe<Scalars['String']['output']>;
  sv?: Maybe<Scalars['String']['output']>;
};

export type LocalisedObjectInput = {
  en?: InputMaybe<Scalars['String']['input']>;
  fi?: InputMaybe<Scalars['String']['input']>;
  sv?: InputMaybe<Scalars['String']['input']>;
};

export type MassApproveEnrolmentsMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  customMessage?: InputMaybe<Scalars['String']['input']>;
  enrolmentIds: Array<InputMaybe<Scalars['ID']['input']>>;
};

export type MassApproveEnrolmentsMutationPayload = {
  __typename?: 'MassApproveEnrolmentsMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  enrolments: Array<Maybe<EnrolmentNode>>;
};

export type Meta = {
  __typename?: 'Meta';
  count?: Maybe<Scalars['Int']['output']>;
  next?: Maybe<Scalars['String']['output']>;
  previous?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addEventMutation?: Maybe<AddEventMutation>;
  addOccurrence?: Maybe<AddOccurrenceMutationPayload>;
  addOrganisation?: Maybe<AddOrganisationMutationPayload>;
  addStudyGroup?: Maybe<AddStudyGroupMutationPayload>;
  addVenue?: Maybe<AddVenueMutationPayload>;
  approveEnrolment?: Maybe<ApproveEnrolmentMutationPayload>;
  cancelEnrolment?: Maybe<CancelEnrolmentMutationPayload>;
  cancelOccurrence?: Maybe<CancelOccurrenceMutationPayload>;
  createMyProfile?: Maybe<CreateMyProfileMutationPayload>;
  declineEnrolment?: Maybe<DeclineEnrolmentMutationPayload>;
  deleteEventMutation?: Maybe<DeleteEventMutation>;
  deleteImageMutation?: Maybe<DeleteImageMutation>;
  deleteOccurrence?: Maybe<DeleteOccurrenceMutationPayload>;
  /** Mutation for admin only */
  deleteStudyGroup?: Maybe<DeleteStudyGroupMutationPayload>;
  deleteVenue?: Maybe<DeleteVenueMutationPayload>;
  enrolEventQueue?: Maybe<EnrolEventQueueMutationPayload>;
  enrolOccurrence?: Maybe<EnrolOccurrenceMutationPayload>;
  massApproveEnrolments?: Maybe<MassApproveEnrolmentsMutationPayload>;
  pickEnrolmentFromQueue?: Maybe<PickEnrolmentFromQueueMutationPayload>;
  /** Using this mutation will update event publication status and also set the `start_time`, `end_time` of linkedEvent */
  publishEventMutation?: Maybe<PublishEventMutation>;
  unenrolEventQueue?: Maybe<UnenrolEventQueueMutationPayload>;
  /** Only staff can unenrol study group */
  unenrolOccurrence?: Maybe<UnenrolOccurrenceMutationPayload>;
  unpublishEventMutation?: Maybe<UnpublishEventMutation>;
  updateEnrolment?: Maybe<UpdateEnrolmentMutationPayload>;
  updateEventMutation?: Maybe<UpdateEventMutation>;
  updateImageMutation?: Maybe<UpdateImageMutation>;
  updateMyProfile?: Maybe<UpdateMyProfileMutationPayload>;
  updateOccurrence?: Maybe<UpdateOccurrenceMutationPayload>;
  updateOrganisation?: Maybe<UpdateOrganisationMutationPayload>;
  updatePerson?: Maybe<UpdatePersonMutationPayload>;
  /** Mutation for admin only */
  updateStudyGroup?: Maybe<UpdateStudyGroupMutationPayload>;
  updateVenue?: Maybe<UpdateVenueMutationPayload>;
  uploadImageMutation?: Maybe<UploadImageMutation>;
};


export type MutationAddEventMutationArgs = {
  event?: InputMaybe<AddEventMutationInput>;
};


export type MutationAddOccurrenceArgs = {
  input: AddOccurrenceMutationInput;
};


export type MutationAddOrganisationArgs = {
  input: AddOrganisationMutationInput;
};


export type MutationAddStudyGroupArgs = {
  input: AddStudyGroupMutationInput;
};


export type MutationAddVenueArgs = {
  input: AddVenueMutationInput;
};


export type MutationApproveEnrolmentArgs = {
  input: ApproveEnrolmentMutationInput;
};


export type MutationCancelEnrolmentArgs = {
  input: CancelEnrolmentMutationInput;
};


export type MutationCancelOccurrenceArgs = {
  input: CancelOccurrenceMutationInput;
};


export type MutationCreateMyProfileArgs = {
  input: CreateMyProfileMutationInput;
};


export type MutationDeclineEnrolmentArgs = {
  input: DeclineEnrolmentMutationInput;
};


export type MutationDeleteEventMutationArgs = {
  eventId: Scalars['String']['input'];
};


export type MutationDeleteImageMutationArgs = {
  imageId: Scalars['String']['input'];
};


export type MutationDeleteOccurrenceArgs = {
  input: DeleteOccurrenceMutationInput;
};


export type MutationDeleteStudyGroupArgs = {
  input: DeleteStudyGroupMutationInput;
};


export type MutationDeleteVenueArgs = {
  input: DeleteVenueMutationInput;
};


export type MutationEnrolEventQueueArgs = {
  input: EnrolEventQueueMutationInput;
};


export type MutationEnrolOccurrenceArgs = {
  input: EnrolOccurrenceMutationInput;
};


export type MutationMassApproveEnrolmentsArgs = {
  input: MassApproveEnrolmentsMutationInput;
};


export type MutationPickEnrolmentFromQueueArgs = {
  input: PickEnrolmentFromQueueMutationInput;
};


export type MutationPublishEventMutationArgs = {
  event?: InputMaybe<PublishEventMutationInput>;
};


export type MutationUnenrolEventQueueArgs = {
  input: UnenrolEventQueueMutationInput;
};


export type MutationUnenrolOccurrenceArgs = {
  input: UnenrolOccurrenceMutationInput;
};


export type MutationUnpublishEventMutationArgs = {
  event?: InputMaybe<PublishEventMutationInput>;
};


export type MutationUpdateEnrolmentArgs = {
  input: UpdateEnrolmentMutationInput;
};


export type MutationUpdateEventMutationArgs = {
  event?: InputMaybe<UpdateEventMutationInput>;
};


export type MutationUpdateImageMutationArgs = {
  image?: InputMaybe<UpdateImageMutationInput>;
};


export type MutationUpdateMyProfileArgs = {
  input: UpdateMyProfileMutationInput;
};


export type MutationUpdateOccurrenceArgs = {
  input: UpdateOccurrenceMutationInput;
};


export type MutationUpdateOrganisationArgs = {
  input: UpdateOrganisationMutationInput;
};


export type MutationUpdatePersonArgs = {
  input: UpdatePersonMutationInput;
};


export type MutationUpdateStudyGroupArgs = {
  input: UpdateStudyGroupMutationInput;
};


export type MutationUpdateVenueArgs = {
  input: UpdateVenueMutationInput;
};


export type MutationUploadImageMutationArgs = {
  image?: InputMaybe<UploadImageMutationInput>;
};

/** An object with an ID */
export type Node = {
  /** The ID of the object. */
  id: Scalars['ID']['output'];
};

/** An enumeration. */
export enum NotificationTemplateLanguage {
  En = 'EN',
  Fi = 'FI',
  Sv = 'SV'
}

export type NotificationTemplateNode = Node & {
  __typename?: 'NotificationTemplateNode';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  preview?: Maybe<Scalars['String']['output']>;
  translations: Array<Maybe<NotificationTranslationType>>;
  type: Scalars['String']['output'];
};

/** An enumeration. */
export enum NotificationTemplateType {
  EnrolmentApproved = 'ENROLMENT_APPROVED',
  EnrolmentApprovedSms = 'ENROLMENT_APPROVED_SMS',
  EnrolmentCancellation = 'ENROLMENT_CANCELLATION',
  EnrolmentCancellationSms = 'ENROLMENT_CANCELLATION_SMS',
  EnrolmentCancelled = 'ENROLMENT_CANCELLED',
  EnrolmentCancelledSms = 'ENROLMENT_CANCELLED_SMS',
  EnrolmentDeclined = 'ENROLMENT_DECLINED',
  EnrolmentDeclinedSms = 'ENROLMENT_DECLINED_SMS',
  EnrolmentSummaryReport = 'ENROLMENT_SUMMARY_REPORT',
  OccurrenceCancelled = 'OCCURRENCE_CANCELLED',
  OccurrenceCancelledSms = 'OCCURRENCE_CANCELLED_SMS',
  OccurrenceEnrolment = 'OCCURRENCE_ENROLMENT',
  OccurrenceEnrolmentSms = 'OCCURRENCE_ENROLMENT_SMS',
  OccurrenceUnenrolment = 'OCCURRENCE_UNENROLMENT',
  OccurrenceUnenrolmentSms = 'OCCURRENCE_UNENROLMENT_SMS',
  OccurrenceUpcomingSms = 'OCCURRENCE_UPCOMING_SMS',
  PersonMyprofileAccepted = 'PERSON_MYPROFILE_ACCEPTED',
  PersonMyprofileCreation = 'PERSON_MYPROFILE_CREATION'
}

export type NotificationTemplateWithContext = {
  __typename?: 'NotificationTemplateWithContext';
  customContextPreviewHtml?: Maybe<Scalars['String']['output']>;
  customContextPreviewText?: Maybe<Scalars['String']['output']>;
  template?: Maybe<NotificationTemplateNode>;
};

export type NotificationTranslationType = {
  __typename?: 'NotificationTranslationType';
  bodyHtml?: Maybe<Scalars['String']['output']>;
  bodyText?: Maybe<Scalars['String']['output']>;
  languageCode: NotificationTemplateLanguage;
  preview?: Maybe<Scalars['String']['output']>;
  subject?: Maybe<Scalars['String']['output']>;
};

/** An enumeration. */
export enum NotificationType {
  Email = 'EMAIL',
  EmailSms = 'EMAIL_SMS',
  Sms = 'SMS'
}

export type OccurrenceNode = Node & {
  __typename?: 'OccurrenceNode';
  amountOfSeats: Scalars['Int']['output'];
  cancelled: Scalars['Boolean']['output'];
  contactPersons: PersonNodeConnection;
  createdAt: Scalars['DateTime']['output'];
  endTime: Scalars['DateTime']['output'];
  enrolments: EnrolmentNodeConnection;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  languages: LanguageNodeConnection;
  /** Only use this field in single event query for best performance. */
  linkedEvent?: Maybe<Event>;
  maxGroupSize?: Maybe<Scalars['Int']['output']>;
  minGroupSize?: Maybe<Scalars['Int']['output']>;
  pEvent?: Maybe<PalvelutarjotinEventNode>;
  placeId: Scalars['String']['output'];
  remainingSeats: Scalars['Int']['output'];
  seatType: OccurrenceSeatType;
  seatsApproved: Scalars['Int']['output'];
  seatsTaken: Scalars['Int']['output'];
  startTime: Scalars['DateTime']['output'];
  studyGroups: StudyGroupNodeConnection;
  updatedAt: Scalars['DateTime']['output'];
};


export type OccurrenceNodeContactPersonsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type OccurrenceNodeEnrolmentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  occurrenceId?: InputMaybe<Scalars['ID']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type OccurrenceNodeLanguagesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type OccurrenceNodeStudyGroupsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type OccurrenceNodeConnection = {
  __typename?: 'OccurrenceNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<OccurrenceNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `OccurrenceNode` and its cursor. */
export type OccurrenceNodeEdge = {
  __typename?: 'OccurrenceNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<OccurrenceNode>;
};

/** An enumeration. */
export enum OccurrenceSeatType {
  /** children count */
  ChildrenCount = 'CHILDREN_COUNT',
  /** enrolment count */
  EnrolmentCount = 'ENROLMENT_COUNT'
}

export type Offer = {
  __typename?: 'Offer';
  description?: Maybe<LocalisedObject>;
  infoUrl?: Maybe<LocalisedObject>;
  isFree?: Maybe<Scalars['Boolean']['output']>;
  price?: Maybe<LocalisedObject>;
};

export type OfferInput = {
  description?: InputMaybe<LocalisedObjectInput>;
  infoUrl?: InputMaybe<LocalisedObjectInput>;
  isFree?: InputMaybe<Scalars['Boolean']['input']>;
  price?: InputMaybe<LocalisedObjectInput>;
};

export type OrganisationNode = Node & {
  __typename?: 'OrganisationNode';
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  persons?: Maybe<PersonNodeConnection>;
  phoneNumber: Scalars['String']['output'];
  publisherId: Scalars['String']['output'];
  type: OrganisationType;
};


export type OrganisationNodePersonsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type OrganisationNodeConnection = {
  __typename?: 'OrganisationNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<OrganisationNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `OrganisationNode` and its cursor. */
export type OrganisationNodeEdge = {
  __typename?: 'OrganisationNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<OrganisationNode>;
};

export type OrganisationProposalNode = Node & {
  __typename?: 'OrganisationProposalNode';
  applicant: PersonNode;
  description: Scalars['String']['output'];
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
};

export type OrganisationProposalNodeConnection = {
  __typename?: 'OrganisationProposalNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<OrganisationProposalNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `OrganisationProposalNode` and its cursor. */
export type OrganisationProposalNodeEdge = {
  __typename?: 'OrganisationProposalNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<OrganisationProposalNode>;
};

export type OrganisationProposalNodeInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

/** An enumeration. */
export enum OrganisationType {
  /** Provider */
  Provider = 'PROVIDER',
  /** Käyttäjä */
  User = 'USER'
}

export enum OrganisationTypeEnum {
  Provider = 'PROVIDER',
  User = 'USER'
}

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type PaginatedType = {
  __typename?: 'PaginatedType';
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>;
  page?: Maybe<Scalars['Int']['output']>;
  pageSize?: Maybe<Scalars['Int']['output']>;
  pages?: Maybe<Scalars['Int']['output']>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type PalvelutarjotinEventInput = {
  autoAcceptance?: InputMaybe<Scalars['Boolean']['input']>;
  contactEmail?: InputMaybe<Scalars['String']['input']>;
  contactPersonId?: InputMaybe<Scalars['ID']['input']>;
  contactPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  enrolmentEndDays?: InputMaybe<Scalars['Int']['input']>;
  enrolmentStart?: InputMaybe<Scalars['DateTime']['input']>;
  externalEnrolmentUrl?: InputMaybe<Scalars['String']['input']>;
  mandatoryAdditionalInformation?: InputMaybe<Scalars['Boolean']['input']>;
  neededOccurrences: Scalars['Int']['input'];
  translations?: InputMaybe<Array<InputMaybe<PalvelutarjotinEventTranslationsInput>>>;
};

export type PalvelutarjotinEventNode = Node & {
  __typename?: 'PalvelutarjotinEventNode';
  autoAcceptance: Scalars['Boolean']['output'];
  /** Translated field in the language defined in request ACCEPT-LANGUAGE header  */
  autoAcceptanceMessage?: Maybe<Scalars['String']['output']>;
  contactEmail: Scalars['String']['output'];
  contactInfoDeletedAt?: Maybe<Scalars['DateTime']['output']>;
  contactPerson?: Maybe<PersonNode>;
  contactPhoneNumber: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  enrolmentEndDays?: Maybe<Scalars['Int']['output']>;
  enrolmentStart?: Maybe<Scalars['DateTime']['output']>;
  externalEnrolmentUrl?: Maybe<Scalars['String']['output']>;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  lastOccurrenceDatetime?: Maybe<Scalars['DateTime']['output']>;
  linkedEventId: Scalars['String']['output'];
  mandatoryAdditionalInformation: Scalars['Boolean']['output'];
  neededOccurrences: Scalars['Int']['output'];
  nextOccurrenceDatetime?: Maybe<Scalars['DateTime']['output']>;
  occurrences?: Maybe<OccurrenceNodeConnection>;
  organisation?: Maybe<OrganisationNode>;
  queuedEnrolments: EventQueueEnrolmentNodeConnection;
  translations?: Maybe<Array<Maybe<PalvelutarjotinEventTranslationType>>>;
  updatedAt: Scalars['DateTime']['output'];
};


export type PalvelutarjotinEventNodeOccurrencesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  cancelled?: InputMaybe<Scalars['Boolean']['input']>;
  date?: InputMaybe<Scalars['Date']['input']>;
  enrollable?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pEvent?: InputMaybe<Scalars['ID']['input']>;
  time?: InputMaybe<Scalars['Time']['input']>;
  upcoming?: InputMaybe<Scalars['Boolean']['input']>;
};


export type PalvelutarjotinEventNodeQueuedEnrolmentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  pEventId?: InputMaybe<Scalars['ID']['input']>;
};

export type PalvelutarjotinEventTranslationType = {
  __typename?: 'PalvelutarjotinEventTranslationType';
  autoAcceptanceMessage: Scalars['String']['output'];
  languageCode: Language;
};

export type PalvelutarjotinEventTranslationsInput = {
  /** A custom message included in notification template when auto acceptance is set on. */
  autoAcceptanceMessage?: InputMaybe<Scalars['String']['input']>;
  languageCode: Language;
};

export type PersonNode = Node & {
  __typename?: 'PersonNode';
  createdAt: Scalars['DateTime']['output'];
  emailAddress: Scalars['String']['output'];
  enrolmentSet: EnrolmentNodeConnection;
  eventqueueenrolmentSet: EventQueueEnrolmentNodeConnection;
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  isStaff: Scalars['Boolean']['output'];
  language: Language;
  name: Scalars['String']['output'];
  occurrences: OccurrenceNodeConnection;
  organisationproposalSet: OrganisationProposalNodeConnection;
  organisations: OrganisationNodeConnection;
  phoneNumber: Scalars['String']['output'];
  placeIds: Array<Scalars['String']['output']>;
  studygroupSet: StudyGroupNodeConnection;
  updatedAt: Scalars['DateTime']['output'];
};


export type PersonNodeEnrolmentSetArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  occurrenceId?: InputMaybe<Scalars['ID']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type PersonNodeEventqueueenrolmentSetArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  pEventId?: InputMaybe<Scalars['ID']['input']>;
};


export type PersonNodeOccurrencesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  cancelled?: InputMaybe<Scalars['Boolean']['input']>;
  date?: InputMaybe<Scalars['Date']['input']>;
  enrollable?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  pEvent?: InputMaybe<Scalars['ID']['input']>;
  time?: InputMaybe<Scalars['Time']['input']>;
  upcoming?: InputMaybe<Scalars['Boolean']['input']>;
};


export type PersonNodeOrganisationproposalSetArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type PersonNodeOrganisationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type PersonNodeStudygroupSetArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type PersonNodeConnection = {
  __typename?: 'PersonNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<PersonNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `PersonNode` and its cursor. */
export type PersonNodeEdge = {
  __typename?: 'PersonNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<PersonNode>;
};

export type PersonNodeInput = {
  emailAddress: Scalars['String']['input'];
  id?: InputMaybe<Scalars['ID']['input']>;
  /** Default `fi` */
  language?: InputMaybe<Language>;
  name: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  placeIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PickEnrolmentFromQueueMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  eventQueueEnrolmentId: Scalars['ID']['input'];
  occurrenceId: Scalars['ID']['input'];
};

export type PickEnrolmentFromQueueMutationPayload = {
  __typename?: 'PickEnrolmentFromQueueMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  enrolment?: Maybe<EnrolmentNode>;
};

export type Place = {
  __typename?: 'Place';
  addressCountry?: Maybe<Scalars['String']['output']>;
  addressLocality?: Maybe<LocalisedObject>;
  addressRegion?: Maybe<Scalars['String']['output']>;
  contactType?: Maybe<Scalars['String']['output']>;
  createdTime?: Maybe<Scalars['String']['output']>;
  customData?: Maybe<Scalars['String']['output']>;
  dataSource?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  divisions?: Maybe<Array<Maybe<Division>>>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['Int']['output']>;
  infoUrl?: Maybe<LocalisedObject>;
  internalContext?: Maybe<Scalars['String']['output']>;
  internalId: Scalars['ID']['output'];
  internalType?: Maybe<Scalars['String']['output']>;
  lastModifiedTime?: Maybe<Scalars['String']['output']>;
  nEvents?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<LocalisedObject>;
  parent?: Maybe<Scalars['ID']['output']>;
  position?: Maybe<PlacePosition>;
  postOfficeBoxNum?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  publisher?: Maybe<Scalars['String']['output']>;
  replacedBy?: Maybe<Scalars['String']['output']>;
  streetAddress?: Maybe<LocalisedObject>;
  telephone?: Maybe<LocalisedObject>;
};

export type PlaceListResponse = {
  __typename?: 'PlaceListResponse';
  data: Array<Place>;
  meta: Meta;
};

export type PlacePosition = {
  __typename?: 'PlacePosition';
  coordinates: Array<Scalars['Float']['output']>;
  type: Scalars['String']['output'];
};

export type PlaceSearchListResponse = {
  __typename?: 'PlaceSearchListResponse';
  data: Array<Place>;
  meta: Meta;
};

export type PublishEventMutation = {
  __typename?: 'PublishEventMutation';
  response?: Maybe<EventMutationResponse>;
};

export type PublishEventMutationInput = {
  audience?: InputMaybe<Array<IdObjectInput>>;
  audienceMaxAge?: InputMaybe<Scalars['String']['input']>;
  audienceMinAge?: InputMaybe<Scalars['String']['input']>;
  customData?: InputMaybe<Scalars['String']['input']>;
  datePublished?: InputMaybe<Scalars['String']['input']>;
  description: LocalisedObjectInput;
  endTime?: InputMaybe<Scalars['String']['input']>;
  enrolmentEndTime?: InputMaybe<Scalars['String']['input']>;
  enrolmentStartTime?: InputMaybe<Scalars['String']['input']>;
  eventStatus?: InputMaybe<Scalars['String']['input']>;
  externalLinks?: InputMaybe<Array<Scalars['String']['input']>>;
  id: Scalars['String']['input'];
  images?: InputMaybe<Array<IdObjectInput>>;
  inLanguage?: InputMaybe<Array<IdObjectInput>>;
  infoUrl?: InputMaybe<LocalisedObjectInput>;
  keywords: Array<IdObjectInput>;
  localizationExtraInfo?: InputMaybe<LocalisedObjectInput>;
  location?: InputMaybe<IdObjectInput>;
  maximumAttendeeCapacity?: InputMaybe<Scalars['Int']['input']>;
  minimumAttendeeCapacity?: InputMaybe<Scalars['Int']['input']>;
  name: LocalisedObjectInput;
  offers: Array<OfferInput>;
  /** Organisation global id which the created event belongs to */
  organisationId: Scalars['String']['input'];
  /** Palvelutarjotin event data */
  pEvent?: InputMaybe<PalvelutarjotinEventInput>;
  provider?: InputMaybe<LocalisedObjectInput>;
  providerContactInfo?: InputMaybe<Scalars['String']['input']>;
  remainingAttendeeCapacity?: InputMaybe<Scalars['Int']['input']>;
  shortDescription: LocalisedObjectInput;
  startTime?: InputMaybe<Scalars['String']['input']>;
  subEvents?: InputMaybe<Array<Scalars['String']['input']>>;
  superEvent?: InputMaybe<Scalars['String']['input']>;
  superEventType?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  cancellingEnrolment?: Maybe<EnrolmentNode>;
  /** Query for admin only */
  enrolment?: Maybe<EnrolmentNode>;
  enrolmentSummary?: Maybe<EnrolmentNodeConnection>;
  event?: Maybe<Event>;
  /** Query for admin only */
  eventQueueEnrolment?: Maybe<EventQueueEnrolmentNode>;
  /** Query for admin only */
  eventQueueEnrolments?: Maybe<EventQueueEnrolmentNodeConnection>;
  events?: Maybe<EventListResponse>;
  eventsSearch?: Maybe<EventSearchListResponse>;
  image?: Maybe<Image>;
  images?: Maybe<ImageListResponse>;
  keyword?: Maybe<Keyword>;
  keywordSet?: Maybe<KeywordSet>;
  keywords?: Maybe<KeywordListResponse>;
  language?: Maybe<LanguageNode>;
  languages?: Maybe<LanguageNodeConnection>;
  /** Query personal data of logged user */
  myProfile?: Maybe<PersonNode>;
  notificationTemplate?: Maybe<NotificationTemplateWithContext>;
  occurrence?: Maybe<OccurrenceNode>;
  occurrences?: Maybe<OccurrenceNodeConnection>;
  organisation?: Maybe<OrganisationNode>;
  organisations?: Maybe<OrganisationNodeConnection>;
  person?: Maybe<PersonNode>;
  persons?: Maybe<PersonNodeConnection>;
  place?: Maybe<Place>;
  places?: Maybe<PlaceListResponse>;
  placesSearch?: Maybe<PlaceSearchListResponse>;
  /** Keywords related to Kultus ordered by the number of events */
  popularKultusKeywords?: Maybe<KeywordListResponse>;
  schoolsAndKindergartensList?: Maybe<ServiceUnitNameListResponse>;
  studyLevel?: Maybe<StudyLevelNode>;
  studyLevels?: Maybe<StudyLevelNodeConnection>;
  /** Get upcoming events sorted by the next occurrence. */
  upcomingEvents?: Maybe<EventListPaginatedTypeResponse>;
  venue?: Maybe<VenueNode>;
  venues?: Maybe<VenueNodeConnection>;
};


export type QueryCancellingEnrolmentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEnrolmentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEnrolmentSummaryArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  organisationId: Scalars['ID']['input'];
  status?: InputMaybe<EnrolmentStatus>;
};


export type QueryEventArgs = {
  id: Scalars['ID']['input'];
  include?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryEventQueueEnrolmentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEventQueueEnrolmentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pEventId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryEventsArgs = {
  allOngoingAnd?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  allOngoingOr?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  division?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  end?: InputMaybe<Scalars['String']['input']>;
  inLanguage?: InputMaybe<Scalars['String']['input']>;
  include?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  isFree?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  keywordAnd?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  keywordNot?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  keywordOrSet1?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  keywordOrSet2?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  keywordOrSet3?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  language?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  nearbyDistance?: InputMaybe<Scalars['Float']['input']>;
  nearbyPlaceId?: InputMaybe<Scalars['ID']['input']>;
  organisationId?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  publicationStatus?: InputMaybe<Scalars['String']['input']>;
  publisher?: InputMaybe<Scalars['ID']['input']>;
  showAll?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
  superEvent?: InputMaybe<Scalars['ID']['input']>;
  superEventType?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  text?: InputMaybe<Scalars['String']['input']>;
  translation?: InputMaybe<Scalars['String']['input']>;
};


export type QueryEventsSearchArgs = {
  include?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  input: Scalars['String']['input'];
};


export type QueryImageArgs = {
  id: Scalars['ID']['input'];
};


export type QueryKeywordArgs = {
  id: Scalars['ID']['input'];
};


export type QueryKeywordSetArgs = {
  setType: KeywordSetType;
};


export type QueryKeywordsArgs = {
  dataSource?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  showAllKeywords?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};


export type QueryLanguageArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLanguagesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryNotificationTemplateArgs = {
  context: Scalars['JSONString']['input'];
  language: Language;
  templateType?: InputMaybe<NotificationTemplateType>;
};


export type QueryOccurrenceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOccurrencesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  cancelled?: InputMaybe<Scalars['Boolean']['input']>;
  date?: InputMaybe<Scalars['Date']['input']>;
  enrollable?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pEvent?: InputMaybe<Scalars['ID']['input']>;
  time?: InputMaybe<Scalars['Time']['input']>;
  upcoming?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryOrganisationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOrganisationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPersonArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPersonsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPlaceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPlacesArgs = {
  dataSource?: InputMaybe<Scalars['String']['input']>;
  divisions?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  showAllPlaces?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPlacesSearchArgs = {
  include?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  input: Scalars['String']['input'];
};


export type QueryPopularKultusKeywordsArgs = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  showAllKeywords?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryStudyLevelArgs = {
  id: Scalars['ID']['input'];
};


export type QueryStudyLevelsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUpcomingEventsArgs = {
  include?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryVenueArgs = {
  id: Scalars['ID']['input'];
};


export type QueryVenuesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/** An enumeration. */
export enum SeatType {
  ChildrenCount = 'CHILDREN_COUNT',
  EnrolmentCount = 'ENROLMENT_COUNT'
}

export type ServiceUnitNameListResponse = {
  __typename?: 'ServiceUnitNameListResponse';
  data: Array<ServiceUnitNode>;
  meta: Meta;
};

export type ServiceUnitNode = {
  __typename?: 'ServiceUnitNode';
  id: Scalars['ID']['output'];
  name?: Maybe<LocalisedObject>;
};

export type StudyGroupInput = {
  amountOfAdult?: InputMaybe<Scalars['Int']['input']>;
  extraNeeds?: InputMaybe<Scalars['String']['input']>;
  groupName?: InputMaybe<Scalars['String']['input']>;
  groupSize: Scalars['Int']['input'];
  /** If person input doesn't include person id, a new person object will be created */
  person: PersonNodeInput;
  studyLevels?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  unitId?: InputMaybe<Scalars['String']['input']>;
  unitName?: InputMaybe<Scalars['String']['input']>;
};

export type StudyGroupNode = Node & {
  __typename?: 'StudyGroupNode';
  amountOfAdult: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  enrolments: EnrolmentNodeConnection;
  extraNeeds: Scalars['String']['output'];
  groupName: Scalars['String']['output'];
  groupSize: Scalars['Int']['output'];
  /** The ID of the object. */
  id: Scalars['ID']['output'];
  occurrences: OccurrenceNodeConnection;
  person?: Maybe<PersonNode>;
  personDeletedAt?: Maybe<Scalars['DateTime']['output']>;
  queuedEnrolments: EventQueueEnrolmentNodeConnection;
  studyLevels: StudyLevelNodeConnection;
  unit?: Maybe<UnitNode>;
  unitId?: Maybe<Scalars['String']['output']>;
  unitName: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};


export type StudyGroupNodeEnrolmentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  occurrenceId?: InputMaybe<Scalars['ID']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type StudyGroupNodeOccurrencesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  cancelled?: InputMaybe<Scalars['Boolean']['input']>;
  date?: InputMaybe<Scalars['Date']['input']>;
  enrollable?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  pEvent?: InputMaybe<Scalars['ID']['input']>;
  time?: InputMaybe<Scalars['Time']['input']>;
  upcoming?: InputMaybe<Scalars['Boolean']['input']>;
};


export type StudyGroupNodeQueuedEnrolmentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  pEventId?: InputMaybe<Scalars['ID']['input']>;
};


export type StudyGroupNodeStudyLevelsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type StudyGroupNodeConnection = {
  __typename?: 'StudyGroupNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<StudyGroupNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `StudyGroupNode` and its cursor. */
export type StudyGroupNodeEdge = {
  __typename?: 'StudyGroupNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<StudyGroupNode>;
};

export type StudyLevelNode = Node & {
  __typename?: 'StudyLevelNode';
  id: Scalars['ID']['output'];
  /** Translated field in the language defined in request ACCEPT-LANGUAGE header  */
  label?: Maybe<Scalars['String']['output']>;
  /** Used to make a hierarchy between study levels. */
  level: Scalars['Int']['output'];
  translations: Array<StudyLevelTranslationType>;
};

export type StudyLevelNodeConnection = {
  __typename?: 'StudyLevelNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<StudyLevelNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `StudyLevelNode` and its cursor. */
export type StudyLevelNodeEdge = {
  __typename?: 'StudyLevelNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<StudyLevelNode>;
};

export type StudyLevelTranslationType = {
  __typename?: 'StudyLevelTranslationType';
  label: Scalars['String']['output'];
  languageCode: Language;
};

export type UnenrolEventQueueMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  pEventId: Scalars['ID']['input'];
  /** Study group id */
  studyGroupId: Scalars['ID']['input'];
};

export type UnenrolEventQueueMutationPayload = {
  __typename?: 'UnenrolEventQueueMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  pEvent?: Maybe<PalvelutarjotinEventNode>;
  studyGroup?: Maybe<StudyGroupNode>;
};

export type UnenrolOccurrenceMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Occurrence id of event */
  occurrenceId: Scalars['ID']['input'];
  /** Study group id */
  studyGroupId: Scalars['ID']['input'];
};

export type UnenrolOccurrenceMutationPayload = {
  __typename?: 'UnenrolOccurrenceMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  occurrence?: Maybe<OccurrenceNode>;
  studyGroup?: Maybe<StudyGroupNode>;
};

export type UnitNode = ExternalPlace | Place;

export type UnpublishEventMutation = {
  __typename?: 'UnpublishEventMutation';
  response?: Maybe<EventMutationResponse>;
};

export type UpdateEnrolmentMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  enrolmentId: Scalars['ID']['input'];
  notificationType?: InputMaybe<NotificationType>;
  /** Leave blank if the contact person is the same with group contact person */
  person?: InputMaybe<PersonNodeInput>;
  /** Study group input */
  studyGroup?: InputMaybe<StudyGroupInput>;
};

export type UpdateEnrolmentMutationPayload = {
  __typename?: 'UpdateEnrolmentMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  enrolment?: Maybe<EnrolmentNode>;
};

export type UpdateEventMutation = {
  __typename?: 'UpdateEventMutation';
  response?: Maybe<EventMutationResponse>;
};

export type UpdateEventMutationInput = {
  audience?: InputMaybe<Array<IdObjectInput>>;
  audienceMaxAge?: InputMaybe<Scalars['String']['input']>;
  audienceMinAge?: InputMaybe<Scalars['String']['input']>;
  customData?: InputMaybe<Scalars['String']['input']>;
  datePublished?: InputMaybe<Scalars['String']['input']>;
  description: LocalisedObjectInput;
  /** Set to `true` to save event as draft version, when draft is true, event data validation will be skipped */
  draft?: InputMaybe<Scalars['Boolean']['input']>;
  endTime?: InputMaybe<Scalars['String']['input']>;
  enrolmentEndTime?: InputMaybe<Scalars['String']['input']>;
  enrolmentStartTime?: InputMaybe<Scalars['String']['input']>;
  eventStatus?: InputMaybe<Scalars['String']['input']>;
  externalLinks?: InputMaybe<Array<Scalars['String']['input']>>;
  id: Scalars['String']['input'];
  images?: InputMaybe<Array<IdObjectInput>>;
  inLanguage?: InputMaybe<Array<IdObjectInput>>;
  infoUrl?: InputMaybe<LocalisedObjectInput>;
  keywords: Array<IdObjectInput>;
  localizationExtraInfo?: InputMaybe<LocalisedObjectInput>;
  location?: InputMaybe<IdObjectInput>;
  maximumAttendeeCapacity?: InputMaybe<Scalars['Int']['input']>;
  minimumAttendeeCapacity?: InputMaybe<Scalars['Int']['input']>;
  name: LocalisedObjectInput;
  offers: Array<OfferInput>;
  /** Organisation global id which the created event belongs to */
  organisationId: Scalars['String']['input'];
  /** Palvelutarjotin event data */
  pEvent?: InputMaybe<PalvelutarjotinEventInput>;
  provider?: InputMaybe<LocalisedObjectInput>;
  providerContactInfo?: InputMaybe<Scalars['String']['input']>;
  remainingAttendeeCapacity?: InputMaybe<Scalars['Int']['input']>;
  shortDescription: LocalisedObjectInput;
  startTime: Scalars['String']['input'];
  subEvents?: InputMaybe<Array<Scalars['String']['input']>>;
  superEvent?: InputMaybe<Scalars['String']['input']>;
  superEventType?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateImageMutation = {
  __typename?: 'UpdateImageMutation';
  response?: Maybe<ImageMutationResponse>;
};

export type UpdateImageMutationInput = {
  altText?: InputMaybe<Scalars['String']['input']>;
  cropping?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  /** Following GraphQL file upload specs here: https://github.com/jaydenseric/graphql-multipart-request-spec */
  image?: InputMaybe<Scalars['Upload']['input']>;
  license?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  photographerName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMyProfileMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  emailAddress?: InputMaybe<Scalars['String']['input']>;
  /** Default `fi` */
  language?: InputMaybe<Language>;
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  placeIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type UpdateMyProfileMutationPayload = {
  __typename?: 'UpdateMyProfileMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  myProfile?: Maybe<PersonNode>;
};

export type UpdateOccurrenceMutationInput = {
  amountOfSeats?: InputMaybe<Scalars['Int']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Should include all contact persons of the occurrence, missing contact persons will be removed during mutation */
  contactPersons?: InputMaybe<Array<InputMaybe<PersonNodeInput>>>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['ID']['input'];
  /** If present, should include all languages of the occurrence */
  languages: Array<InputMaybe<LanguageInput>>;
  maxGroupSize?: InputMaybe<Scalars['Int']['input']>;
  minGroupSize?: InputMaybe<Scalars['Int']['input']>;
  pEventId?: InputMaybe<Scalars['ID']['input']>;
  placeId?: InputMaybe<Scalars['String']['input']>;
  seatType?: InputMaybe<SeatType>;
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateOccurrenceMutationPayload = {
  __typename?: 'UpdateOccurrenceMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  occurrence?: Maybe<OccurrenceNode>;
};

export type UpdateOrganisationMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  publisherId?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<OrganisationTypeEnum>;
};

export type UpdateOrganisationMutationPayload = {
  __typename?: 'UpdateOrganisationMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  organisation?: Maybe<OrganisationNode>;
};

export type UpdatePersonMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  emailAddress?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  language?: InputMaybe<Language>;
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePersonMutationPayload = {
  __typename?: 'UpdatePersonMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  person?: Maybe<PersonNode>;
};

export type UpdateStudyGroupMutationInput = {
  amountOfAdult?: InputMaybe<Scalars['Int']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  extraNeeds?: InputMaybe<Scalars['String']['input']>;
  groupName?: InputMaybe<Scalars['String']['input']>;
  groupSize?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  person?: InputMaybe<PersonNodeInput>;
  studyLevels?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  unitId?: InputMaybe<Scalars['String']['input']>;
  unitName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateStudyGroupMutationPayload = {
  __typename?: 'UpdateStudyGroupMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  studyGroup?: Maybe<StudyGroupNode>;
};

export type UpdateVenueMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  hasAreaForGroupWork?: InputMaybe<Scalars['Boolean']['input']>;
  hasClothingStorage?: InputMaybe<Scalars['Boolean']['input']>;
  hasIndoorPlayingArea?: InputMaybe<Scalars['Boolean']['input']>;
  hasOutdoorPlayingArea?: InputMaybe<Scalars['Boolean']['input']>;
  hasSnackEatingPlace?: InputMaybe<Scalars['Boolean']['input']>;
  hasToiletNearby?: InputMaybe<Scalars['Boolean']['input']>;
  /** Place id from linked event */
  id: Scalars['ID']['input'];
  outdoorActivity?: InputMaybe<Scalars['Boolean']['input']>;
  translations?: InputMaybe<Array<InputMaybe<VenueTranslationsInput>>>;
};

export type UpdateVenueMutationPayload = {
  __typename?: 'UpdateVenueMutationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  venue?: Maybe<VenueNode>;
};

export type UploadImageMutation = {
  __typename?: 'UploadImageMutation';
  response?: Maybe<ImageMutationResponse>;
};

export type UploadImageMutationInput = {
  altText?: InputMaybe<Scalars['String']['input']>;
  cropping?: InputMaybe<Scalars['String']['input']>;
  /** Following GraphQL file upload specs here: https://github.com/jaydenseric/graphql-multipart-request-spec */
  image?: InputMaybe<Scalars['Upload']['input']>;
  license?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  photographerName?: InputMaybe<Scalars['String']['input']>;
};

export type VenueNode = Node & {
  __typename?: 'VenueNode';
  /** Translated field in the language defined in request ACCEPT-LANGUAGE header  */
  description?: Maybe<Scalars['String']['output']>;
  hasAreaForGroupWork: Scalars['Boolean']['output'];
  hasClothingStorage: Scalars['Boolean']['output'];
  hasIndoorPlayingArea: Scalars['Boolean']['output'];
  hasOutdoorPlayingArea: Scalars['Boolean']['output'];
  hasSnackEatingPlace: Scalars['Boolean']['output'];
  hasToiletNearby: Scalars['Boolean']['output'];
  /** place_id from linkedEvent */
  id: Scalars['ID']['output'];
  outdoorActivity: Scalars['Boolean']['output'];
  translations: Array<VenueTranslationType>;
};

export type VenueNodeConnection = {
  __typename?: 'VenueNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<VenueNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `VenueNode` and its cursor. */
export type VenueNodeEdge = {
  __typename?: 'VenueNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node?: Maybe<VenueNode>;
};

export type VenueTranslationType = {
  __typename?: 'VenueTranslationType';
  description: Scalars['String']['output'];
  languageCode: Language;
};

export type VenueTranslationsInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  languageCode: Language;
};

export type ApproveEnrolmentMutationVariables = Exact<{
  input: ApproveEnrolmentMutationInput;
}>;


export type ApproveEnrolmentMutation = { __typename?: 'Mutation', approveEnrolment?: { __typename?: 'ApproveEnrolmentMutationPayload', clientMutationId?: string | null, enrolment?: { __typename?: 'EnrolmentNode', id: string, notificationType?: NotificationType | null, enrolmentTime: any, status?: EnrolmentStatus | null, person?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> } | null, studyGroup: { __typename?: 'StudyGroupNode', id: string, groupSize: number, amountOfAdult: number, unitId?: string | null, unitName: string, groupName: string, extraNeeds: string, unit?: { __typename?: 'ExternalPlace', name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null } | { __typename?: 'Place', internalId: string, id?: string | null, name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null } | null, studyLevels: { __typename?: 'StudyLevelNodeConnection', edges: Array<{ __typename?: 'StudyLevelNodeEdge', node?: { __typename?: 'StudyLevelNode', id: string, label?: string | null, level: number, translations: Array<{ __typename?: 'StudyLevelTranslationType', languageCode: Language, label: string }> } | null } | null> }, person?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> } | null } } | null } | null };

export type DeclineEnrolmentMutationVariables = Exact<{
  input: DeclineEnrolmentMutationInput;
}>;


export type DeclineEnrolmentMutation = { __typename?: 'Mutation', declineEnrolment?: { __typename?: 'DeclineEnrolmentMutationPayload', clientMutationId?: string | null, enrolment?: { __typename?: 'EnrolmentNode', id: string, notificationType?: NotificationType | null, enrolmentTime: any, status?: EnrolmentStatus | null, person?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> } | null, studyGroup: { __typename?: 'StudyGroupNode', id: string, groupSize: number, amountOfAdult: number, unitId?: string | null, unitName: string, groupName: string, extraNeeds: string, unit?: { __typename?: 'ExternalPlace', name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null } | { __typename?: 'Place', internalId: string, id?: string | null, name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null } | null, studyLevels: { __typename?: 'StudyLevelNodeConnection', edges: Array<{ __typename?: 'StudyLevelNodeEdge', node?: { __typename?: 'StudyLevelNode', id: string, label?: string | null, level: number, translations: Array<{ __typename?: 'StudyLevelTranslationType', languageCode: Language, label: string }> } | null } | null> }, person?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> } | null } } | null } | null };

export type DeleteEnrolmentMutationVariables = Exact<{
  input: UnenrolOccurrenceMutationInput;
}>;


export type DeleteEnrolmentMutation = { __typename?: 'Mutation', unenrolOccurrence?: { __typename?: 'UnenrolOccurrenceMutationPayload', clientMutationId?: string | null, occurrence?: { __typename?: 'OccurrenceNode', id: string } | null, studyGroup?: { __typename?: 'StudyGroupNode', id: string } | null } | null };

export type UpdateEnrolmentMutationVariables = Exact<{
  input: UpdateEnrolmentMutationInput;
}>;


export type UpdateEnrolmentMutation = { __typename?: 'Mutation', updateEnrolment?: { __typename?: 'UpdateEnrolmentMutationPayload', clientMutationId?: string | null, enrolment?: { __typename?: 'EnrolmentNode', id: string, notificationType?: NotificationType | null, enrolmentTime: any, status?: EnrolmentStatus | null, person?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> } | null, studyGroup: { __typename?: 'StudyGroupNode', id: string, groupSize: number, amountOfAdult: number, unitId?: string | null, unitName: string, groupName: string, extraNeeds: string, unit?: { __typename?: 'ExternalPlace', name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null } | { __typename?: 'Place', internalId: string, id?: string | null, name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null } | null, studyLevels: { __typename?: 'StudyLevelNodeConnection', edges: Array<{ __typename?: 'StudyLevelNodeEdge', node?: { __typename?: 'StudyLevelNode', id: string, label?: string | null, level: number, translations: Array<{ __typename?: 'StudyLevelTranslationType', languageCode: Language, label: string }> } | null } | null> }, person?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> } | null } } | null } | null };

export type StudyGroupFieldsFragment = { __typename?: 'StudyGroupNode', id: string, groupSize: number, amountOfAdult: number, unitId?: string | null, unitName: string, groupName: string, extraNeeds: string, unit?: { __typename?: 'ExternalPlace', name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null } | { __typename?: 'Place', internalId: string, id?: string | null, name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null } | null, studyLevels: { __typename?: 'StudyLevelNodeConnection', edges: Array<{ __typename?: 'StudyLevelNodeEdge', node?: { __typename?: 'StudyLevelNode', id: string, label?: string | null, level: number, translations: Array<{ __typename?: 'StudyLevelTranslationType', languageCode: Language, label: string }> } | null } | null> }, person?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> } | null };

export type EnrolmentFieldsFragment = { __typename?: 'EnrolmentNode', id: string, notificationType?: NotificationType | null, enrolmentTime: any, status?: EnrolmentStatus | null, person?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> } | null, studyGroup: { __typename?: 'StudyGroupNode', id: string, groupSize: number, amountOfAdult: number, unitId?: string | null, unitName: string, groupName: string, extraNeeds: string, unit?: { __typename?: 'ExternalPlace', name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null } | { __typename?: 'Place', internalId: string, id?: string | null, name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null } | null, studyLevels: { __typename?: 'StudyLevelNodeConnection', edges: Array<{ __typename?: 'StudyLevelNodeEdge', node?: { __typename?: 'StudyLevelNode', id: string, label?: string | null, level: number, translations: Array<{ __typename?: 'StudyLevelTranslationType', languageCode: Language, label: string }> } | null } | null> }, person?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> } | null } };

export type EnrolmentQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type EnrolmentQuery = { __typename?: 'Query', enrolment?: { __typename?: 'EnrolmentNode', id: string, notificationType?: NotificationType | null, enrolmentTime: any, status?: EnrolmentStatus | null, occurrence: { __typename?: 'OccurrenceNode', id: string, maxGroupSize?: number | null, minGroupSize?: number | null, remainingSeats: number, amountOfSeats: number, seatType: OccurrenceSeatType, pEvent?: { __typename?: 'PalvelutarjotinEventNode', id: string, organisation?: { __typename?: 'OrganisationNode', id: string } | null } | null }, person?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> } | null, studyGroup: { __typename?: 'StudyGroupNode', id: string, groupSize: number, amountOfAdult: number, unitId?: string | null, unitName: string, groupName: string, extraNeeds: string, unit?: { __typename?: 'ExternalPlace', name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null } | { __typename?: 'Place', internalId: string, id?: string | null, name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null } | null, studyLevels: { __typename?: 'StudyLevelNodeConnection', edges: Array<{ __typename?: 'StudyLevelNodeEdge', node?: { __typename?: 'StudyLevelNode', id: string, label?: string | null, level: number, translations: Array<{ __typename?: 'StudyLevelTranslationType', languageCode: Language, label: string }> } | null } | null> }, person?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> } | null } } | null };

export type NotificationTemplateQueryVariables = Exact<{
  templateType?: InputMaybe<NotificationTemplateType>;
  context: Scalars['JSONString']['input'];
  language: Language;
}>;


export type NotificationTemplateQuery = { __typename?: 'Query', notificationTemplate?: { __typename?: 'NotificationTemplateWithContext', customContextPreviewHtml?: string | null, customContextPreviewText?: string | null, template?: { __typename?: 'NotificationTemplateNode', id: string, type: string, preview?: string | null, translations: Array<{ __typename?: 'NotificationTranslationType', languageCode: NotificationTemplateLanguage, subject?: string | null, bodyHtml?: string | null, bodyText?: string | null, preview?: string | null } | null> } | null } | null };

export type CreateEventMutationVariables = Exact<{
  event: AddEventMutationInput;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', addEventMutation?: { __typename?: 'AddEventMutation', response?: { __typename?: 'EventMutationResponse', statusCode: number, body?: { __typename?: 'Event', id: string, internalId: string, name: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null }, shortDescription: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null }, description: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null }, images: Array<{ __typename?: 'Image', id?: string | null, internalId: string, license?: string | null, name: string, url: string, cropping?: string | null, photographerName?: string | null, altText?: string | null }>, offers: Array<{ __typename?: 'Offer', isFree?: boolean | null, description?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, price?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, infoUrl?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null }>, pEvent: { __typename?: 'PalvelutarjotinEventNode', id: string, neededOccurrences: number, autoAcceptance: boolean, autoAcceptanceMessage?: string | null }, infoUrl?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null } | null } | null } | null };

export type DeleteSingleEventMutationVariables = Exact<{
  eventId: Scalars['String']['input'];
}>;


export type DeleteSingleEventMutation = { __typename?: 'Mutation', deleteEventMutation?: { __typename?: 'DeleteEventMutation', response?: { __typename?: 'EventMutationResponse', statusCode: number, body?: { __typename?: 'Event', id: string, internalId: string } | null } | null } | null };

export type PublishSingleEventMutationVariables = Exact<{
  event: PublishEventMutationInput;
}>;


export type PublishSingleEventMutation = { __typename?: 'Mutation', publishEventMutation?: { __typename?: 'PublishEventMutation', response?: { __typename?: 'EventMutationResponse', statusCode: number, resultText?: string | null, body?: { __typename?: 'Event', id: string, internalId: string, publicationStatus?: string | null } | null } | null } | null };

export type EditEventMutationVariables = Exact<{
  event: UpdateEventMutationInput;
}>;


export type EditEventMutation = { __typename?: 'Mutation', updateEventMutation?: { __typename?: 'UpdateEventMutation', response?: { __typename?: 'EventMutationResponse', statusCode: number, body?: { __typename?: 'Event', id: string, internalId: string, startTime?: string | null, publicationStatus?: string | null, datePublished?: string | null, endTime?: string | null, name: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null }, shortDescription: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null }, description: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null }, images: Array<{ __typename?: 'Image', id?: string | null, internalId: string, license?: string | null, name: string, url: string, cropping?: string | null, photographerName?: string | null, altText?: string | null }>, infoUrl?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, pEvent: { __typename?: 'PalvelutarjotinEventNode', id: string, nextOccurrenceDatetime?: any | null, autoAcceptance: boolean, autoAcceptanceMessage?: string | null, contactEmail: string, contactPhoneNumber: string, enrolmentEndDays?: number | null, enrolmentStart?: any | null, externalEnrolmentUrl?: string | null, neededOccurrences: number, mandatoryAdditionalInformation: boolean, contactPerson?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> } | null, organisation?: { __typename?: 'OrganisationNode', id: string, name: string, phoneNumber: string, publisherId: string, type: OrganisationType, persons?: { __typename?: 'PersonNodeConnection', edges: Array<{ __typename?: 'PersonNodeEdge', node?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> } | null } | null> } | null } | null, occurrences?: { __typename?: 'OccurrenceNodeConnection', edges: Array<{ __typename?: 'OccurrenceNodeEdge', node?: { __typename?: 'OccurrenceNode', id: string, amountOfSeats: number, minGroupSize?: number | null, maxGroupSize?: number | null, seatsTaken: number, seatsApproved: number, seatType: OccurrenceSeatType, remainingSeats: number, startTime: any, endTime: any, placeId: string, cancelled: boolean, pEvent?: { __typename?: 'PalvelutarjotinEventNode', id: string } | null, languages: { __typename?: 'LanguageNodeConnection', edges: Array<{ __typename?: 'LanguageNodeEdge', node?: { __typename?: 'LanguageNode', id: string, name: string } | null } | null> } } | null } | null> } | null, translations?: Array<{ __typename?: 'PalvelutarjotinEventTranslationType', autoAcceptanceMessage: string, languageCode: Language } | null> | null }, inLanguage: Array<{ __typename?: 'InLanguage', id?: string | null, internalId: string, name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null }>, audience: Array<{ __typename?: 'Keyword', id?: string | null, internalId: string, name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null }>, keywords: Array<{ __typename?: 'Keyword', id?: string | null, internalId: string, name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null }>, offers: Array<{ __typename?: 'Offer', isFree?: boolean | null, description?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, price?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, infoUrl?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null }> } | null } | null } | null };

export type PEventFieldsFragment = { __typename?: 'PalvelutarjotinEventNode', id: string, nextOccurrenceDatetime?: any | null, autoAcceptance: boolean, autoAcceptanceMessage?: string | null, contactEmail: string, contactPhoneNumber: string, enrolmentEndDays?: number | null, enrolmentStart?: any | null, externalEnrolmentUrl?: string | null, neededOccurrences: number, mandatoryAdditionalInformation: boolean, contactPerson?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> } | null, organisation?: { __typename?: 'OrganisationNode', id: string, name: string, phoneNumber: string, publisherId: string, type: OrganisationType, persons?: { __typename?: 'PersonNodeConnection', edges: Array<{ __typename?: 'PersonNodeEdge', node?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> } | null } | null> } | null } | null, occurrences?: { __typename?: 'OccurrenceNodeConnection', edges: Array<{ __typename?: 'OccurrenceNodeEdge', node?: { __typename?: 'OccurrenceNode', id: string, amountOfSeats: number, minGroupSize?: number | null, maxGroupSize?: number | null, seatsTaken: number, seatsApproved: number, seatType: OccurrenceSeatType, remainingSeats: number, startTime: any, endTime: any, placeId: string, cancelled: boolean, pEvent?: { __typename?: 'PalvelutarjotinEventNode', id: string } | null, languages: { __typename?: 'LanguageNodeConnection', edges: Array<{ __typename?: 'LanguageNodeEdge', node?: { __typename?: 'LanguageNode', id: string, name: string } | null } | null> } } | null } | null> } | null, translations?: Array<{ __typename?: 'PalvelutarjotinEventTranslationType', autoAcceptanceMessage: string, languageCode: Language } | null> | null };

export type LocalisedFieldsFragment = { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null };

export type OfferFieldsFragment = { __typename?: 'Offer', isFree?: boolean | null, description?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, price?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, infoUrl?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null };

export type EventFieldsFragment = { __typename?: 'Event', id: string, internalId: string, startTime?: string | null, publicationStatus?: string | null, datePublished?: string | null, endTime?: string | null, name: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null }, shortDescription: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null }, description: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null }, images: Array<{ __typename?: 'Image', id?: string | null, internalId: string, license?: string | null, name: string, url: string, cropping?: string | null, photographerName?: string | null, altText?: string | null }>, infoUrl?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, pEvent: { __typename?: 'PalvelutarjotinEventNode', id: string, nextOccurrenceDatetime?: any | null, autoAcceptance: boolean, autoAcceptanceMessage?: string | null, contactEmail: string, contactPhoneNumber: string, enrolmentEndDays?: number | null, enrolmentStart?: any | null, externalEnrolmentUrl?: string | null, neededOccurrences: number, mandatoryAdditionalInformation: boolean, contactPerson?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> } | null, organisation?: { __typename?: 'OrganisationNode', id: string, name: string, phoneNumber: string, publisherId: string, type: OrganisationType, persons?: { __typename?: 'PersonNodeConnection', edges: Array<{ __typename?: 'PersonNodeEdge', node?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> } | null } | null> } | null } | null, occurrences?: { __typename?: 'OccurrenceNodeConnection', edges: Array<{ __typename?: 'OccurrenceNodeEdge', node?: { __typename?: 'OccurrenceNode', id: string, amountOfSeats: number, minGroupSize?: number | null, maxGroupSize?: number | null, seatsTaken: number, seatsApproved: number, seatType: OccurrenceSeatType, remainingSeats: number, startTime: any, endTime: any, placeId: string, cancelled: boolean, pEvent?: { __typename?: 'PalvelutarjotinEventNode', id: string } | null, languages: { __typename?: 'LanguageNodeConnection', edges: Array<{ __typename?: 'LanguageNodeEdge', node?: { __typename?: 'LanguageNode', id: string, name: string } | null } | null> } } | null } | null> } | null, translations?: Array<{ __typename?: 'PalvelutarjotinEventTranslationType', autoAcceptanceMessage: string, languageCode: Language } | null> | null }, inLanguage: Array<{ __typename?: 'InLanguage', id?: string | null, internalId: string, name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null }>, audience: Array<{ __typename?: 'Keyword', id?: string | null, internalId: string, name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null }>, keywords: Array<{ __typename?: 'Keyword', id?: string | null, internalId: string, name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null }>, location?: { __typename?: 'Place', id?: string | null, internalId: string, name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, streetAddress?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, addressLocality?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, telephone?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null } | null, venue?: { __typename?: 'VenueNode', id: string, hasClothingStorage: boolean, hasSnackEatingPlace: boolean, outdoorActivity: boolean, hasToiletNearby: boolean, hasAreaForGroupWork: boolean, hasIndoorPlayingArea: boolean, hasOutdoorPlayingArea: boolean, translations: Array<{ __typename?: 'VenueTranslationType', languageCode: Language, description: string }> } | null, offers: Array<{ __typename?: 'Offer', isFree?: boolean | null, description?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, price?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, infoUrl?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null }> };

export type EventQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  include?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
}>;


export type EventQuery = { __typename?: 'Query', event?: { __typename?: 'Event', id: string, internalId: string, startTime?: string | null, publicationStatus?: string | null, datePublished?: string | null, endTime?: string | null, additionalCriteria: Array<{ __typename?: 'Keyword', id?: string | null, internalId: string, name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null }>, categories: Array<{ __typename?: 'Keyword', id?: string | null, internalId: string, name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null }>, name: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null }, shortDescription: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null }, description: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null }, images: Array<{ __typename?: 'Image', id?: string | null, internalId: string, license?: string | null, name: string, url: string, cropping?: string | null, photographerName?: string | null, altText?: string | null }>, infoUrl?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, pEvent: { __typename?: 'PalvelutarjotinEventNode', id: string, nextOccurrenceDatetime?: any | null, autoAcceptance: boolean, autoAcceptanceMessage?: string | null, contactEmail: string, contactPhoneNumber: string, enrolmentEndDays?: number | null, enrolmentStart?: any | null, externalEnrolmentUrl?: string | null, neededOccurrences: number, mandatoryAdditionalInformation: boolean, contactPerson?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> } | null, organisation?: { __typename?: 'OrganisationNode', id: string, name: string, phoneNumber: string, publisherId: string, type: OrganisationType, persons?: { __typename?: 'PersonNodeConnection', edges: Array<{ __typename?: 'PersonNodeEdge', node?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> } | null } | null> } | null } | null, occurrences?: { __typename?: 'OccurrenceNodeConnection', edges: Array<{ __typename?: 'OccurrenceNodeEdge', node?: { __typename?: 'OccurrenceNode', id: string, amountOfSeats: number, minGroupSize?: number | null, maxGroupSize?: number | null, seatsTaken: number, seatsApproved: number, seatType: OccurrenceSeatType, remainingSeats: number, startTime: any, endTime: any, placeId: string, cancelled: boolean, pEvent?: { __typename?: 'PalvelutarjotinEventNode', id: string } | null, languages: { __typename?: 'LanguageNodeConnection', edges: Array<{ __typename?: 'LanguageNodeEdge', node?: { __typename?: 'LanguageNode', id: string, name: string } | null } | null> } } | null } | null> } | null, translations?: Array<{ __typename?: 'PalvelutarjotinEventTranslationType', autoAcceptanceMessage: string, languageCode: Language } | null> | null }, inLanguage: Array<{ __typename?: 'InLanguage', id?: string | null, internalId: string, name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null }>, audience: Array<{ __typename?: 'Keyword', id?: string | null, internalId: string, name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null }>, keywords: Array<{ __typename?: 'Keyword', id?: string | null, internalId: string, name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null }>, location?: { __typename?: 'Place', id?: string | null, internalId: string, name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, streetAddress?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, addressLocality?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, telephone?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null } | null, venue?: { __typename?: 'VenueNode', id: string, hasClothingStorage: boolean, hasSnackEatingPlace: boolean, outdoorActivity: boolean, hasToiletNearby: boolean, hasAreaForGroupWork: boolean, hasIndoorPlayingArea: boolean, hasOutdoorPlayingArea: boolean, translations: Array<{ __typename?: 'VenueTranslationType', languageCode: Language, description: string }> } | null, offers: Array<{ __typename?: 'Offer', isFree?: boolean | null, description?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, price?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, infoUrl?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null }> } | null };

export type EnrolEventQueueMutationVariables = Exact<{
  input: EnrolEventQueueMutationInput;
}>;


export type EnrolEventQueueMutation = { __typename?: 'Mutation', enrolEventQueue?: { __typename?: 'EnrolEventQueueMutationPayload', eventQueueEnrolment?: { __typename?: 'EventQueueEnrolmentNode', id: string, notificationType?: NotificationType | null, enrolmentTime: any, status?: EventQueueEnrolmentStatus | null, pEvent: { __typename?: 'PalvelutarjotinEventNode', id: string }, person?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> } | null, studyGroup: { __typename?: 'StudyGroupNode', id: string, groupSize: number, amountOfAdult: number, unitId?: string | null, unitName: string, groupName: string, extraNeeds: string, unit?: { __typename?: 'ExternalPlace', name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null } | { __typename?: 'Place', internalId: string, id?: string | null, name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null } | null, studyLevels: { __typename?: 'StudyLevelNodeConnection', edges: Array<{ __typename?: 'StudyLevelNodeEdge', node?: { __typename?: 'StudyLevelNode', id: string, label?: string | null, level: number, translations: Array<{ __typename?: 'StudyLevelTranslationType', languageCode: Language, label: string }> } | null } | null> }, person?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> } | null } } | null } | null };

export type UnenrolEventQueueMutationVariables = Exact<{
  input: UnenrolEventQueueMutationInput;
}>;


export type UnenrolEventQueueMutation = { __typename?: 'Mutation', unenrolEventQueue?: { __typename?: 'UnenrolEventQueueMutationPayload', pEvent?: { __typename?: 'PalvelutarjotinEventNode', linkedEventId: string } | null, studyGroup?: { __typename?: 'StudyGroupNode', unitName: string } | null } | null };

export type PickEnrolmentFromQueueMutationVariables = Exact<{
  input: PickEnrolmentFromQueueMutationInput;
}>;


export type PickEnrolmentFromQueueMutation = { __typename?: 'Mutation', pickEnrolmentFromQueue?: { __typename?: 'PickEnrolmentFromQueueMutationPayload', enrolment?: { __typename?: 'EnrolmentNode', id: string, studyGroup: { __typename?: 'StudyGroupNode', unitName: string }, occurrence: { __typename?: 'OccurrenceNode', pEvent?: { __typename?: 'PalvelutarjotinEventNode', linkedEventId: string } | null } } | null } | null };

export type EventQueueEnrolmentFieldsFragment = { __typename?: 'EventQueueEnrolmentNode', id: string, notificationType?: NotificationType | null, enrolmentTime: any, status?: EventQueueEnrolmentStatus | null, pEvent: { __typename?: 'PalvelutarjotinEventNode', id: string }, person?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> } | null, studyGroup: { __typename?: 'StudyGroupNode', id: string, groupSize: number, amountOfAdult: number, unitId?: string | null, unitName: string, groupName: string, extraNeeds: string, unit?: { __typename?: 'ExternalPlace', name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null } | { __typename?: 'Place', internalId: string, id?: string | null, name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null } | null, studyLevels: { __typename?: 'StudyLevelNodeConnection', edges: Array<{ __typename?: 'StudyLevelNodeEdge', node?: { __typename?: 'StudyLevelNode', id: string, label?: string | null, level: number, translations: Array<{ __typename?: 'StudyLevelTranslationType', languageCode: Language, label: string }> } | null } | null> }, person?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> } | null } };

export type EventQueueEnrolmentsQueryVariables = Exact<{
  pEventId?: InputMaybe<Scalars['ID']['input']>;
  orderBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type EventQueueEnrolmentsQuery = { __typename?: 'Query', eventQueueEnrolments?: { __typename?: 'EventQueueEnrolmentNodeConnection', count?: number | null, edges: Array<{ __typename?: 'EventQueueEnrolmentNodeEdge', cursor: string, node?: { __typename?: 'EventQueueEnrolmentNode', id: string, notificationType?: NotificationType | null, enrolmentTime: any, status?: EventQueueEnrolmentStatus | null, pEvent: { __typename?: 'PalvelutarjotinEventNode', id: string }, person?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> } | null, studyGroup: { __typename?: 'StudyGroupNode', id: string, groupSize: number, amountOfAdult: number, unitId?: string | null, unitName: string, groupName: string, extraNeeds: string, unit?: { __typename?: 'ExternalPlace', name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null } | { __typename?: 'Place', internalId: string, id?: string | null, name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null } | null, studyLevels: { __typename?: 'StudyLevelNodeConnection', edges: Array<{ __typename?: 'StudyLevelNodeEdge', node?: { __typename?: 'StudyLevelNode', id: string, label?: string | null, level: number, translations: Array<{ __typename?: 'StudyLevelTranslationType', languageCode: Language, label: string }> } | null } | null> }, person?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> } | null } } | null } | null> } | null };

export type MetaFieldsFragment = { __typename?: 'Meta', count?: number | null, next?: string | null, previous?: string | null };

export type EventsQueryVariables = Exact<{
  division?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  end?: InputMaybe<Scalars['String']['input']>;
  include?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  inLanguage?: InputMaybe<Scalars['String']['input']>;
  isFree?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  keywordAnd?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  keywordNot?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  language?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  publisher?: InputMaybe<Scalars['ID']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
  superEvent?: InputMaybe<Scalars['ID']['input']>;
  superEventType?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  text?: InputMaybe<Scalars['String']['input']>;
  translation?: InputMaybe<Scalars['String']['input']>;
  showAll?: InputMaybe<Scalars['Boolean']['input']>;
  publicationStatus?: InputMaybe<Scalars['String']['input']>;
}>;


export type EventsQuery = { __typename?: 'Query', events?: { __typename?: 'EventListResponse', meta: { __typename?: 'Meta', count?: number | null, next?: string | null, previous?: string | null }, data: Array<{ __typename?: 'Event', id: string, internalId: string, startTime?: string | null, publicationStatus?: string | null, datePublished?: string | null, endTime?: string | null, name: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null }, shortDescription: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null }, description: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null }, images: Array<{ __typename?: 'Image', id?: string | null, internalId: string, license?: string | null, name: string, url: string, cropping?: string | null, photographerName?: string | null, altText?: string | null }>, infoUrl?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, pEvent: { __typename?: 'PalvelutarjotinEventNode', id: string, nextOccurrenceDatetime?: any | null, autoAcceptance: boolean, autoAcceptanceMessage?: string | null, contactEmail: string, contactPhoneNumber: string, enrolmentEndDays?: number | null, enrolmentStart?: any | null, externalEnrolmentUrl?: string | null, neededOccurrences: number, mandatoryAdditionalInformation: boolean, contactPerson?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> } | null, organisation?: { __typename?: 'OrganisationNode', id: string, name: string, phoneNumber: string, publisherId: string, type: OrganisationType, persons?: { __typename?: 'PersonNodeConnection', edges: Array<{ __typename?: 'PersonNodeEdge', node?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> } | null } | null> } | null } | null, occurrences?: { __typename?: 'OccurrenceNodeConnection', edges: Array<{ __typename?: 'OccurrenceNodeEdge', node?: { __typename?: 'OccurrenceNode', id: string, amountOfSeats: number, minGroupSize?: number | null, maxGroupSize?: number | null, seatsTaken: number, seatsApproved: number, seatType: OccurrenceSeatType, remainingSeats: number, startTime: any, endTime: any, placeId: string, cancelled: boolean, pEvent?: { __typename?: 'PalvelutarjotinEventNode', id: string } | null, languages: { __typename?: 'LanguageNodeConnection', edges: Array<{ __typename?: 'LanguageNodeEdge', node?: { __typename?: 'LanguageNode', id: string, name: string } | null } | null> } } | null } | null> } | null, translations?: Array<{ __typename?: 'PalvelutarjotinEventTranslationType', autoAcceptanceMessage: string, languageCode: Language } | null> | null }, inLanguage: Array<{ __typename?: 'InLanguage', id?: string | null, internalId: string, name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null }>, audience: Array<{ __typename?: 'Keyword', id?: string | null, internalId: string, name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null }>, keywords: Array<{ __typename?: 'Keyword', id?: string | null, internalId: string, name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null }>, location?: { __typename?: 'Place', id?: string | null, internalId: string, name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, streetAddress?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, addressLocality?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, telephone?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null } | null, venue?: { __typename?: 'VenueNode', id: string, hasClothingStorage: boolean, hasSnackEatingPlace: boolean, outdoorActivity: boolean, hasToiletNearby: boolean, hasAreaForGroupWork: boolean, hasIndoorPlayingArea: boolean, hasOutdoorPlayingArea: boolean, translations: Array<{ __typename?: 'VenueTranslationType', languageCode: Language, description: string }> } | null, offers: Array<{ __typename?: 'Offer', isFree?: boolean | null, description?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, price?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, infoUrl?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null }> }> } | null };

export type UploadSingleImageMutationVariables = Exact<{
  image: UploadImageMutationInput;
}>;


export type UploadSingleImageMutation = { __typename?: 'Mutation', uploadImageMutation?: { __typename?: 'UploadImageMutation', response?: { __typename?: 'ImageMutationResponse', statusCode: number, body?: { __typename?: 'Image', id?: string | null, internalId: string, license?: string | null, name: string, url: string, cropping?: string | null, photographerName?: string | null, altText?: string | null } | null } | null } | null };

export type UpdateSingleImageMutationVariables = Exact<{
  image: UpdateImageMutationInput;
}>;


export type UpdateSingleImageMutation = { __typename?: 'Mutation', updateImageMutation?: { __typename?: 'UpdateImageMutation', response?: { __typename?: 'ImageMutationResponse', statusCode: number, body?: { __typename?: 'Image', id?: string | null, internalId: string, license?: string | null, name: string, url: string, cropping?: string | null, photographerName?: string | null, altText?: string | null } | null } | null } | null };

export type ImageFieldsFragment = { __typename?: 'Image', id?: string | null, internalId: string, license?: string | null, name: string, url: string, cropping?: string | null, photographerName?: string | null, altText?: string | null };

export type ImageQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ImageQuery = { __typename?: 'Query', image?: { __typename?: 'Image', id?: string | null, internalId: string, license?: string | null, name: string, url: string, cropping?: string | null, photographerName?: string | null, altText?: string | null } | null };

export type KeywordFieldsFragment = { __typename?: 'Keyword', id?: string | null, internalId: string, name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null };

export type KeywordQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type KeywordQuery = { __typename?: 'Query', keyword?: { __typename?: 'Keyword', id?: string | null, internalId: string, name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null } | null };

export type KeywordsQueryVariables = Exact<{
  dataSource?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  showAllKeywords?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
}>;


export type KeywordsQuery = { __typename?: 'Query', keywords?: { __typename?: 'KeywordListResponse', meta: { __typename?: 'Meta', count?: number | null, next?: string | null, previous?: string | null }, data: Array<{ __typename?: 'Keyword', id?: string | null, internalId: string, name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null }> } | null };

export type KeywordSetQueryVariables = Exact<{
  setType: KeywordSetType;
}>;


export type KeywordSetQuery = { __typename?: 'Query', keywordSet?: { __typename?: 'KeywordSet', internalId: string, keywords: Array<{ __typename?: 'Keyword', id?: string | null, internalId: string, name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null }>, name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null } | null };

export type CreateMyProfileMutationVariables = Exact<{
  myProfile: CreateMyProfileMutationInput;
}>;


export type CreateMyProfileMutation = { __typename?: 'Mutation', createMyProfile?: { __typename?: 'CreateMyProfileMutationPayload', myProfile?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string>, organisationproposalSet: { __typename?: 'OrganisationProposalNodeConnection', edges: Array<{ __typename?: 'OrganisationProposalNodeEdge', node?: { __typename?: 'OrganisationProposalNode', name: string } | null } | null> } } | null } | null };

export type UpdateMyProfileMutationVariables = Exact<{
  myProfile: UpdateMyProfileMutationInput;
}>;


export type UpdateMyProfileMutation = { __typename?: 'Mutation', updateMyProfile?: { __typename?: 'UpdateMyProfileMutationPayload', myProfile?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string>, organisations: { __typename?: 'OrganisationNodeConnection', edges: Array<{ __typename?: 'OrganisationNodeEdge', node?: { __typename?: 'OrganisationNode', id: string, name: string, phoneNumber: string, publisherId: string, type: OrganisationType, persons?: { __typename?: 'PersonNodeConnection', edges: Array<{ __typename?: 'PersonNodeEdge', node?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> } | null } | null> } | null } | null } | null> }, organisationproposalSet: { __typename?: 'OrganisationProposalNodeConnection', edges: Array<{ __typename?: 'OrganisationProposalNodeEdge', node?: { __typename?: 'OrganisationProposalNode', name: string } | null } | null> } } | null } | null };

export type MyProfileFieldsFragment = { __typename?: 'PersonNode', isStaff: boolean, language: Language, id: string, emailAddress: string, name: string, phoneNumber: string, placeIds: Array<string>, organisations: { __typename?: 'OrganisationNodeConnection', edges: Array<{ __typename?: 'OrganisationNodeEdge', node?: { __typename?: 'OrganisationNode', id: string, name: string, phoneNumber: string, publisherId: string, type: OrganisationType, persons?: { __typename?: 'PersonNodeConnection', edges: Array<{ __typename?: 'PersonNodeEdge', node?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> } | null } | null> } | null } | null } | null> }, organisationproposalSet: { __typename?: 'OrganisationProposalNodeConnection', edges: Array<{ __typename?: 'OrganisationProposalNodeEdge', node?: { __typename?: 'OrganisationProposalNode', name: string } | null } | null> } };

export type MyProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type MyProfileQuery = { __typename?: 'Query', myProfile?: { __typename?: 'PersonNode', isStaff: boolean, language: Language, id: string, emailAddress: string, name: string, phoneNumber: string, placeIds: Array<string>, organisations: { __typename?: 'OrganisationNodeConnection', edges: Array<{ __typename?: 'OrganisationNodeEdge', node?: { __typename?: 'OrganisationNode', id: string, name: string, phoneNumber: string, publisherId: string, type: OrganisationType, persons?: { __typename?: 'PersonNodeConnection', edges: Array<{ __typename?: 'PersonNodeEdge', node?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> } | null } | null> } | null } | null } | null> }, organisationproposalSet: { __typename?: 'OrganisationProposalNodeConnection', edges: Array<{ __typename?: 'OrganisationProposalNodeEdge', node?: { __typename?: 'OrganisationProposalNode', name: string } | null } | null> } } | null };

export type AddOccurrenceMutationVariables = Exact<{
  input: AddOccurrenceMutationInput;
}>;


export type AddOccurrenceMutation = { __typename?: 'Mutation', addOccurrence?: { __typename?: 'AddOccurrenceMutationPayload', occurrence?: { __typename?: 'OccurrenceNode', id: string, amountOfSeats: number, minGroupSize?: number | null, maxGroupSize?: number | null, seatsTaken: number, seatsApproved: number, seatType: OccurrenceSeatType, remainingSeats: number, startTime: any, endTime: any, placeId: string, cancelled: boolean, pEvent?: { __typename?: 'PalvelutarjotinEventNode', id: string } | null, languages: { __typename?: 'LanguageNodeConnection', edges: Array<{ __typename?: 'LanguageNodeEdge', node?: { __typename?: 'LanguageNode', id: string, name: string } | null } | null> } } | null } | null };

export type EditOccurrenceMutationVariables = Exact<{
  input: UpdateOccurrenceMutationInput;
}>;


export type EditOccurrenceMutation = { __typename?: 'Mutation', updateOccurrence?: { __typename?: 'UpdateOccurrenceMutationPayload', occurrence?: { __typename?: 'OccurrenceNode', id: string, amountOfSeats: number, minGroupSize?: number | null, maxGroupSize?: number | null, seatsTaken: number, seatsApproved: number, seatType: OccurrenceSeatType, remainingSeats: number, startTime: any, endTime: any, placeId: string, cancelled: boolean, pEvent?: { __typename?: 'PalvelutarjotinEventNode', id: string } | null, languages: { __typename?: 'LanguageNodeConnection', edges: Array<{ __typename?: 'LanguageNodeEdge', node?: { __typename?: 'LanguageNode', id: string, name: string } | null } | null> } } | null } | null };

export type LanguageFieldsFragment = { __typename?: 'LanguageNode', id: string, name: string };

export type OccurrenceFieldsFragment = { __typename?: 'OccurrenceNode', id: string, amountOfSeats: number, minGroupSize?: number | null, maxGroupSize?: number | null, seatsTaken: number, seatsApproved: number, seatType: OccurrenceSeatType, remainingSeats: number, startTime: any, endTime: any, placeId: string, cancelled: boolean, pEvent?: { __typename?: 'PalvelutarjotinEventNode', id: string } | null, languages: { __typename?: 'LanguageNodeConnection', edges: Array<{ __typename?: 'LanguageNodeEdge', node?: { __typename?: 'LanguageNode', id: string, name: string } | null } | null> } };

export type OccurrenceQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OccurrenceQuery = { __typename?: 'Query', occurrence?: { __typename?: 'OccurrenceNode', id: string, amountOfSeats: number, minGroupSize?: number | null, maxGroupSize?: number | null, seatsTaken: number, seatsApproved: number, seatType: OccurrenceSeatType, remainingSeats: number, startTime: any, endTime: any, placeId: string, cancelled: boolean, enrolments: { __typename?: 'EnrolmentNodeConnection', edges: Array<{ __typename?: 'EnrolmentNodeEdge', node?: { __typename?: 'EnrolmentNode', id: string, notificationType?: NotificationType | null, enrolmentTime: any, status?: EnrolmentStatus | null, person?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> } | null, studyGroup: { __typename?: 'StudyGroupNode', id: string, groupSize: number, amountOfAdult: number, unitId?: string | null, unitName: string, groupName: string, extraNeeds: string, unit?: { __typename?: 'ExternalPlace', name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null } | { __typename?: 'Place', internalId: string, id?: string | null, name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null } | null, studyLevels: { __typename?: 'StudyLevelNodeConnection', edges: Array<{ __typename?: 'StudyLevelNodeEdge', node?: { __typename?: 'StudyLevelNode', id: string, label?: string | null, level: number, translations: Array<{ __typename?: 'StudyLevelTranslationType', languageCode: Language, label: string }> } | null } | null> }, person?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> } | null } } | null } | null> }, pEvent?: { __typename?: 'PalvelutarjotinEventNode', id: string } | null, languages: { __typename?: 'LanguageNodeConnection', edges: Array<{ __typename?: 'LanguageNodeEdge', node?: { __typename?: 'LanguageNode', id: string, name: string } | null } | null> } } | null };

export type DeleteOccurrenceMutationVariables = Exact<{
  input: DeleteOccurrenceMutationInput;
}>;


export type DeleteOccurrenceMutation = { __typename?: 'Mutation', deleteOccurrence?: { __typename?: 'DeleteOccurrenceMutationPayload', clientMutationId?: string | null } | null };

export type CancelOccurrenceMutationVariables = Exact<{
  input: CancelOccurrenceMutationInput;
}>;


export type CancelOccurrenceMutation = { __typename?: 'Mutation', cancelOccurrence?: { __typename?: 'CancelOccurrenceMutationPayload', clientMutationId?: string | null } | null };

export type OccurrencesQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  cancelled?: InputMaybe<Scalars['Boolean']['input']>;
  pEvent?: InputMaybe<Scalars['ID']['input']>;
  orderBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
}>;


export type OccurrencesQuery = { __typename?: 'Query', occurrences?: { __typename?: 'OccurrenceNodeConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'OccurrenceNodeEdge', cursor: string, node?: { __typename?: 'OccurrenceNode', id: string, amountOfSeats: number, minGroupSize?: number | null, maxGroupSize?: number | null, seatsTaken: number, seatsApproved: number, seatType: OccurrenceSeatType, remainingSeats: number, startTime: any, endTime: any, placeId: string, cancelled: boolean, pEvent?: { __typename?: 'PalvelutarjotinEventNode', id: string } | null, languages: { __typename?: 'LanguageNodeConnection', edges: Array<{ __typename?: 'LanguageNodeEdge', node?: { __typename?: 'LanguageNode', id: string, name: string } | null } | null> } } | null } | null> } | null };

export type OrganisationNodeFieldsFragment = { __typename?: 'OrganisationNode', id: string, name: string, phoneNumber: string, publisherId: string, type: OrganisationType, persons?: { __typename?: 'PersonNodeConnection', edges: Array<{ __typename?: 'PersonNodeEdge', node?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> } | null } | null> } | null };

export type OrganisationQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OrganisationQuery = { __typename?: 'Query', organisation?: { __typename?: 'OrganisationNode', id: string, name: string, phoneNumber: string, publisherId: string, type: OrganisationType, persons?: { __typename?: 'PersonNodeConnection', edges: Array<{ __typename?: 'PersonNodeEdge', node?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> } | null } | null> } | null } | null };

export type PageInfoFieldsFragment = { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null };

export type OrganisationsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
}>;


export type OrganisationsQuery = { __typename?: 'Query', organisations?: { __typename?: 'OrganisationNodeConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename?: 'OrganisationNodeEdge', node?: { __typename?: 'OrganisationNode', id: string, name: string, phoneNumber: string, publisherId: string, type: OrganisationType, persons?: { __typename?: 'PersonNodeConnection', edges: Array<{ __typename?: 'PersonNodeEdge', node?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> } | null } | null> } | null } | null } | null> } | null };

export type PersonFieldsFragment = { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> };

export type PersonQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type PersonQuery = { __typename?: 'Query', person?: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, placeIds: Array<string> } | null };

export type PlaceFieldsFragment = { __typename?: 'Place', id?: string | null, internalId: string, name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, streetAddress?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, addressLocality?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, telephone?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null };

export type PlaceQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type PlaceQuery = { __typename?: 'Query', place?: { __typename?: 'Place', id?: string | null, internalId: string, name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, streetAddress?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, addressLocality?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, telephone?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null } | null };

export type PlacesQueryVariables = Exact<{
  dataSource?: InputMaybe<Scalars['String']['input']>;
  divisions?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  showAllPlaces?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
}>;


export type PlacesQuery = { __typename?: 'Query', places?: { __typename?: 'PlaceListResponse', meta: { __typename?: 'Meta', count?: number | null, next?: string | null, previous?: string | null }, data: Array<{ __typename?: 'Place', id?: string | null, internalId: string, name?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, streetAddress?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, addressLocality?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null, telephone?: { __typename?: 'LocalisedObject', en?: string | null, fi?: string | null, sv?: string | null } | null }> } | null };

export type SchoolsAndKindergartensListQueryVariables = Exact<{ [key: string]: never; }>;


export type SchoolsAndKindergartensListQuery = { __typename?: 'Query', schoolsAndKindergartensList?: { __typename?: 'ServiceUnitNameListResponse', meta: { __typename?: 'Meta', count?: number | null }, data: Array<{ __typename?: 'ServiceUnitNode', id: string, name?: { __typename?: 'LocalisedObject', fi?: string | null, sv?: string | null, en?: string | null } | null }> } | null };

export type StudyLevelFieldsFragment = { __typename?: 'StudyLevelNode', id: string, label?: string | null, level: number, translations: Array<{ __typename?: 'StudyLevelTranslationType', languageCode: Language, label: string }> };

export type StudyLevelsQueryVariables = Exact<{ [key: string]: never; }>;


export type StudyLevelsQuery = { __typename?: 'Query', studyLevels?: { __typename?: 'StudyLevelNodeConnection', edges: Array<{ __typename?: 'StudyLevelNodeEdge', node?: { __typename?: 'StudyLevelNode', id: string, label?: string | null, level: number, translations: Array<{ __typename?: 'StudyLevelTranslationType', languageCode: Language, label: string }> } | null } | null> } | null };

export type StudyLevelQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type StudyLevelQuery = { __typename?: 'Query', studyLevel?: { __typename?: 'StudyLevelNode', id: string, label?: string | null, level: number, translations: Array<{ __typename?: 'StudyLevelTranslationType', languageCode: Language, label: string }> } | null };

export type CreateVenueMutationVariables = Exact<{
  venue: AddVenueMutationInput;
}>;


export type CreateVenueMutation = { __typename?: 'Mutation', addVenue?: { __typename?: 'AddVenueMutationPayload', venue?: { __typename?: 'VenueNode', id: string, hasClothingStorage: boolean, hasSnackEatingPlace: boolean, outdoorActivity: boolean, hasToiletNearby: boolean, hasAreaForGroupWork: boolean, hasIndoorPlayingArea: boolean, hasOutdoorPlayingArea: boolean, translations: Array<{ __typename?: 'VenueTranslationType', languageCode: Language, description: string }> } | null } | null };

export type EditVenueMutationVariables = Exact<{
  venue: UpdateVenueMutationInput;
}>;


export type EditVenueMutation = { __typename?: 'Mutation', updateVenue?: { __typename?: 'UpdateVenueMutationPayload', venue?: { __typename?: 'VenueNode', id: string, hasClothingStorage: boolean, hasSnackEatingPlace: boolean, outdoorActivity: boolean, hasToiletNearby: boolean, hasAreaForGroupWork: boolean, hasIndoorPlayingArea: boolean, hasOutdoorPlayingArea: boolean, translations: Array<{ __typename?: 'VenueTranslationType', languageCode: Language, description: string }> } | null } | null };

export type VenueFieldsFragment = { __typename?: 'VenueNode', id: string, hasClothingStorage: boolean, hasSnackEatingPlace: boolean, outdoorActivity: boolean, hasToiletNearby: boolean, hasAreaForGroupWork: boolean, hasIndoorPlayingArea: boolean, hasOutdoorPlayingArea: boolean, translations: Array<{ __typename?: 'VenueTranslationType', languageCode: Language, description: string }> };

export type VenueQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type VenueQuery = { __typename?: 'Query', venue?: { __typename?: 'VenueNode', id: string, hasClothingStorage: boolean, hasSnackEatingPlace: boolean, outdoorActivity: boolean, hasToiletNearby: boolean, hasAreaForGroupWork: boolean, hasIndoorPlayingArea: boolean, hasOutdoorPlayingArea: boolean, translations: Array<{ __typename?: 'VenueTranslationType', languageCode: Language, description: string }> } | null };

export const PersonFieldsFragmentDoc = gql`
    fragment personFields on PersonNode {
  id
  emailAddress
  name
  phoneNumber
  language
  placeIds
}
    `;
export const LocalisedFieldsFragmentDoc = gql`
    fragment localisedFields on LocalisedObject {
  en
  fi
  sv
}
    `;
export const StudyLevelFieldsFragmentDoc = gql`
    fragment studyLevelFields on StudyLevelNode {
  id
  label
  level
  translations {
    languageCode
    label
  }
}
    `;
export const StudyGroupFieldsFragmentDoc = gql`
    fragment studyGroupFields on StudyGroupNode {
  id
  groupSize
  amountOfAdult
  unitId
  unitName
  unit {
    ... on ExternalPlace {
      name {
        ...localisedFields
      }
    }
    ... on Place {
      internalId
      id
      name {
        ...localisedFields
      }
    }
  }
  groupName
  studyLevels {
    edges {
      node {
        ...studyLevelFields
      }
    }
  }
  extraNeeds
  person {
    ...personFields
  }
}
    ${LocalisedFieldsFragmentDoc}
${StudyLevelFieldsFragmentDoc}
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
export const LanguageFieldsFragmentDoc = gql`
    fragment languageFields on LanguageNode {
  id
  name
}
    `;
export const OccurrenceFieldsFragmentDoc = gql`
    fragment occurrenceFields on OccurrenceNode {
  id
  pEvent {
    id
  }
  amountOfSeats
  minGroupSize
  maxGroupSize
  seatsTaken
  seatsApproved
  seatType
  remainingSeats
  languages {
    edges {
      node {
        ...languageFields
      }
    }
  }
  startTime
  endTime
  placeId
  cancelled
}
    ${LanguageFieldsFragmentDoc}`;
export const PEventFieldsFragmentDoc = gql`
    fragment pEventFields on PalvelutarjotinEventNode {
  id
  nextOccurrenceDatetime
  autoAcceptance
  autoAcceptanceMessage
  contactPerson {
    ...personFields
  }
  contactEmail
  contactPhoneNumber
  enrolmentEndDays
  enrolmentStart
  externalEnrolmentUrl
  neededOccurrences
  mandatoryAdditionalInformation
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
  translations {
    autoAcceptanceMessage
    languageCode
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
  outdoorActivity
  hasToiletNearby
  hasAreaForGroupWork
  hasIndoorPlayingArea
  hasOutdoorPlayingArea
  translations {
    languageCode
    description
  }
}
    `;
export const OfferFieldsFragmentDoc = gql`
    fragment offerFields on Offer {
  isFree
  description {
    ...localisedFields
  }
  price {
    ...localisedFields
  }
  infoUrl {
    ...localisedFields
  }
}
    ${LocalisedFieldsFragmentDoc}`;
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
  endTime
  offers {
    ...offerFields
  }
}
    ${LocalisedFieldsFragmentDoc}
${ImageFieldsFragmentDoc}
${PEventFieldsFragmentDoc}
${KeywordFieldsFragmentDoc}
${PlaceFieldsFragmentDoc}
${VenueFieldsFragmentDoc}
${OfferFieldsFragmentDoc}`;
export const EventQueueEnrolmentFieldsFragmentDoc = gql`
    fragment eventQueueEnrolmentFields on EventQueueEnrolmentNode {
  id
  notificationType
  enrolmentTime
  status
  pEvent {
    id
  }
  person {
    ...personFields
  }
  studyGroup {
    ...studyGroupFields
  }
}
    ${PersonFieldsFragmentDoc}
${StudyGroupFieldsFragmentDoc}`;
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
  isStaff
  organisations {
    edges {
      node {
        ...organisationNodeFields
      }
    }
  }
  organisationproposalSet {
    edges {
      node {
        name
      }
    }
  }
  language
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
export type ApproveEnrolmentMutationFn = Apollo.MutationFunction<ApproveEnrolmentMutation, ApproveEnrolmentMutationVariables>;

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
export function useApproveEnrolmentMutation(baseOptions?: Apollo.MutationHookOptions<ApproveEnrolmentMutation, ApproveEnrolmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveEnrolmentMutation, ApproveEnrolmentMutationVariables>(ApproveEnrolmentDocument, options);
      }
export type ApproveEnrolmentMutationHookResult = ReturnType<typeof useApproveEnrolmentMutation>;
export type ApproveEnrolmentMutationResult = Apollo.MutationResult<ApproveEnrolmentMutation>;
export type ApproveEnrolmentMutationOptions = Apollo.BaseMutationOptions<ApproveEnrolmentMutation, ApproveEnrolmentMutationVariables>;
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
export type DeclineEnrolmentMutationFn = Apollo.MutationFunction<DeclineEnrolmentMutation, DeclineEnrolmentMutationVariables>;

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
export function useDeclineEnrolmentMutation(baseOptions?: Apollo.MutationHookOptions<DeclineEnrolmentMutation, DeclineEnrolmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeclineEnrolmentMutation, DeclineEnrolmentMutationVariables>(DeclineEnrolmentDocument, options);
      }
export type DeclineEnrolmentMutationHookResult = ReturnType<typeof useDeclineEnrolmentMutation>;
export type DeclineEnrolmentMutationResult = Apollo.MutationResult<DeclineEnrolmentMutation>;
export type DeclineEnrolmentMutationOptions = Apollo.BaseMutationOptions<DeclineEnrolmentMutation, DeclineEnrolmentMutationVariables>;
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
export type DeleteEnrolmentMutationFn = Apollo.MutationFunction<DeleteEnrolmentMutation, DeleteEnrolmentMutationVariables>;

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
export function useDeleteEnrolmentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEnrolmentMutation, DeleteEnrolmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEnrolmentMutation, DeleteEnrolmentMutationVariables>(DeleteEnrolmentDocument, options);
      }
export type DeleteEnrolmentMutationHookResult = ReturnType<typeof useDeleteEnrolmentMutation>;
export type DeleteEnrolmentMutationResult = Apollo.MutationResult<DeleteEnrolmentMutation>;
export type DeleteEnrolmentMutationOptions = Apollo.BaseMutationOptions<DeleteEnrolmentMutation, DeleteEnrolmentMutationVariables>;
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
export type UpdateEnrolmentMutationFn = Apollo.MutationFunction<UpdateEnrolmentMutation, UpdateEnrolmentMutationVariables>;

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
export function useUpdateEnrolmentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEnrolmentMutation, UpdateEnrolmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEnrolmentMutation, UpdateEnrolmentMutationVariables>(UpdateEnrolmentDocument, options);
      }
export type UpdateEnrolmentMutationHookResult = ReturnType<typeof useUpdateEnrolmentMutation>;
export type UpdateEnrolmentMutationResult = Apollo.MutationResult<UpdateEnrolmentMutation>;
export type UpdateEnrolmentMutationOptions = Apollo.BaseMutationOptions<UpdateEnrolmentMutation, UpdateEnrolmentMutationVariables>;
export const EnrolmentDocument = gql`
    query Enrolment($id: ID!) {
  enrolment(id: $id) {
    ...enrolmentFields
    occurrence {
      id
      maxGroupSize
      minGroupSize
      remainingSeats
      amountOfSeats
      seatType
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
export function useEnrolmentQuery(baseOptions: Apollo.QueryHookOptions<EnrolmentQuery, EnrolmentQueryVariables> & ({ variables: EnrolmentQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EnrolmentQuery, EnrolmentQueryVariables>(EnrolmentDocument, options);
      }
export function useEnrolmentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EnrolmentQuery, EnrolmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EnrolmentQuery, EnrolmentQueryVariables>(EnrolmentDocument, options);
        }
export function useEnrolmentSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EnrolmentQuery, EnrolmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EnrolmentQuery, EnrolmentQueryVariables>(EnrolmentDocument, options);
        }
export type EnrolmentQueryHookResult = ReturnType<typeof useEnrolmentQuery>;
export type EnrolmentLazyQueryHookResult = ReturnType<typeof useEnrolmentLazyQuery>;
export type EnrolmentSuspenseQueryHookResult = ReturnType<typeof useEnrolmentSuspenseQuery>;
export type EnrolmentQueryResult = Apollo.QueryResult<EnrolmentQuery, EnrolmentQueryVariables>;
export const NotificationTemplateDocument = gql`
    query notificationTemplate($templateType: NotificationTemplateType, $context: JSONString!, $language: Language!) {
  notificationTemplate(
    templateType: $templateType
    context: $context
    language: $language
  ) {
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
export function useNotificationTemplateQuery(baseOptions: Apollo.QueryHookOptions<NotificationTemplateQuery, NotificationTemplateQueryVariables> & ({ variables: NotificationTemplateQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotificationTemplateQuery, NotificationTemplateQueryVariables>(NotificationTemplateDocument, options);
      }
export function useNotificationTemplateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationTemplateQuery, NotificationTemplateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotificationTemplateQuery, NotificationTemplateQueryVariables>(NotificationTemplateDocument, options);
        }
export function useNotificationTemplateSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<NotificationTemplateQuery, NotificationTemplateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<NotificationTemplateQuery, NotificationTemplateQueryVariables>(NotificationTemplateDocument, options);
        }
export type NotificationTemplateQueryHookResult = ReturnType<typeof useNotificationTemplateQuery>;
export type NotificationTemplateLazyQueryHookResult = ReturnType<typeof useNotificationTemplateLazyQuery>;
export type NotificationTemplateSuspenseQueryHookResult = ReturnType<typeof useNotificationTemplateSuspenseQuery>;
export type NotificationTemplateQueryResult = Apollo.QueryResult<NotificationTemplateQuery, NotificationTemplateQueryVariables>;
export const CreateEventDocument = gql`
    mutation CreateEvent($event: AddEventMutationInput!) {
  addEventMutation(event: $event) {
    response {
      statusCode
      body {
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
        offers {
          ...offerFields
        }
        pEvent {
          id
          neededOccurrences
          autoAcceptance
          autoAcceptanceMessage
        }
        infoUrl {
          ...localisedFields
        }
      }
    }
  }
}
    ${LocalisedFieldsFragmentDoc}
${ImageFieldsFragmentDoc}
${OfferFieldsFragmentDoc}`;
export type CreateEventMutationFn = Apollo.MutationFunction<CreateEventMutation, CreateEventMutationVariables>;

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
export function useCreateEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, options);
      }
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>;
export type CreateEventMutationResult = Apollo.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<CreateEventMutation, CreateEventMutationVariables>;
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
export type DeleteSingleEventMutationFn = Apollo.MutationFunction<DeleteSingleEventMutation, DeleteSingleEventMutationVariables>;

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
export function useDeleteSingleEventMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSingleEventMutation, DeleteSingleEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSingleEventMutation, DeleteSingleEventMutationVariables>(DeleteSingleEventDocument, options);
      }
export type DeleteSingleEventMutationHookResult = ReturnType<typeof useDeleteSingleEventMutation>;
export type DeleteSingleEventMutationResult = Apollo.MutationResult<DeleteSingleEventMutation>;
export type DeleteSingleEventMutationOptions = Apollo.BaseMutationOptions<DeleteSingleEventMutation, DeleteSingleEventMutationVariables>;
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
      resultText
    }
  }
}
    `;
export type PublishSingleEventMutationFn = Apollo.MutationFunction<PublishSingleEventMutation, PublishSingleEventMutationVariables>;

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
export function usePublishSingleEventMutation(baseOptions?: Apollo.MutationHookOptions<PublishSingleEventMutation, PublishSingleEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PublishSingleEventMutation, PublishSingleEventMutationVariables>(PublishSingleEventDocument, options);
      }
export type PublishSingleEventMutationHookResult = ReturnType<typeof usePublishSingleEventMutation>;
export type PublishSingleEventMutationResult = Apollo.MutationResult<PublishSingleEventMutation>;
export type PublishSingleEventMutationOptions = Apollo.BaseMutationOptions<PublishSingleEventMutation, PublishSingleEventMutationVariables>;
export const EditEventDocument = gql`
    mutation EditEvent($event: UpdateEventMutationInput!) {
  updateEventMutation(event: $event) {
    response {
      statusCode
      body {
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
        startTime
        publicationStatus
        datePublished
        endTime
        offers {
          ...offerFields
        }
      }
    }
  }
}
    ${LocalisedFieldsFragmentDoc}
${ImageFieldsFragmentDoc}
${PEventFieldsFragmentDoc}
${KeywordFieldsFragmentDoc}
${OfferFieldsFragmentDoc}`;
export type EditEventMutationFn = Apollo.MutationFunction<EditEventMutation, EditEventMutationVariables>;

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
export function useEditEventMutation(baseOptions?: Apollo.MutationHookOptions<EditEventMutation, EditEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditEventMutation, EditEventMutationVariables>(EditEventDocument, options);
      }
export type EditEventMutationHookResult = ReturnType<typeof useEditEventMutation>;
export type EditEventMutationResult = Apollo.MutationResult<EditEventMutation>;
export type EditEventMutationOptions = Apollo.BaseMutationOptions<EditEventMutation, EditEventMutationVariables>;
export const EventDocument = gql`
    query Event($id: ID!, $include: [String]) {
  event(id: $id, include: $include) {
    ...eventFields
    additionalCriteria {
      ...keywordFields
    }
    categories {
      ...keywordFields
    }
  }
}
    ${EventFieldsFragmentDoc}
${KeywordFieldsFragmentDoc}`;

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
export function useEventQuery(baseOptions: Apollo.QueryHookOptions<EventQuery, EventQueryVariables> & ({ variables: EventQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventQuery, EventQueryVariables>(EventDocument, options);
      }
export function useEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventQuery, EventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventQuery, EventQueryVariables>(EventDocument, options);
        }
export function useEventSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EventQuery, EventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EventQuery, EventQueryVariables>(EventDocument, options);
        }
export type EventQueryHookResult = ReturnType<typeof useEventQuery>;
export type EventLazyQueryHookResult = ReturnType<typeof useEventLazyQuery>;
export type EventSuspenseQueryHookResult = ReturnType<typeof useEventSuspenseQuery>;
export type EventQueryResult = Apollo.QueryResult<EventQuery, EventQueryVariables>;
export const EnrolEventQueueDocument = gql`
    mutation EnrolEventQueue($input: EnrolEventQueueMutationInput!) {
  enrolEventQueue(input: $input) {
    eventQueueEnrolment {
      ...eventQueueEnrolmentFields
    }
  }
}
    ${EventQueueEnrolmentFieldsFragmentDoc}`;
export type EnrolEventQueueMutationFn = Apollo.MutationFunction<EnrolEventQueueMutation, EnrolEventQueueMutationVariables>;

/**
 * __useEnrolEventQueueMutation__
 *
 * To run a mutation, you first call `useEnrolEventQueueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnrolEventQueueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enrolEventQueueMutation, { data, loading, error }] = useEnrolEventQueueMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEnrolEventQueueMutation(baseOptions?: Apollo.MutationHookOptions<EnrolEventQueueMutation, EnrolEventQueueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EnrolEventQueueMutation, EnrolEventQueueMutationVariables>(EnrolEventQueueDocument, options);
      }
export type EnrolEventQueueMutationHookResult = ReturnType<typeof useEnrolEventQueueMutation>;
export type EnrolEventQueueMutationResult = Apollo.MutationResult<EnrolEventQueueMutation>;
export type EnrolEventQueueMutationOptions = Apollo.BaseMutationOptions<EnrolEventQueueMutation, EnrolEventQueueMutationVariables>;
export const UnenrolEventQueueDocument = gql`
    mutation UnenrolEventQueue($input: UnenrolEventQueueMutationInput!) {
  unenrolEventQueue(input: $input) {
    pEvent {
      linkedEventId
    }
    studyGroup {
      unitName
    }
  }
}
    `;
export type UnenrolEventQueueMutationFn = Apollo.MutationFunction<UnenrolEventQueueMutation, UnenrolEventQueueMutationVariables>;

/**
 * __useUnenrolEventQueueMutation__
 *
 * To run a mutation, you first call `useUnenrolEventQueueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnenrolEventQueueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unenrolEventQueueMutation, { data, loading, error }] = useUnenrolEventQueueMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUnenrolEventQueueMutation(baseOptions?: Apollo.MutationHookOptions<UnenrolEventQueueMutation, UnenrolEventQueueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnenrolEventQueueMutation, UnenrolEventQueueMutationVariables>(UnenrolEventQueueDocument, options);
      }
export type UnenrolEventQueueMutationHookResult = ReturnType<typeof useUnenrolEventQueueMutation>;
export type UnenrolEventQueueMutationResult = Apollo.MutationResult<UnenrolEventQueueMutation>;
export type UnenrolEventQueueMutationOptions = Apollo.BaseMutationOptions<UnenrolEventQueueMutation, UnenrolEventQueueMutationVariables>;
export const PickEnrolmentFromQueueDocument = gql`
    mutation PickEnrolmentFromQueue($input: PickEnrolmentFromQueueMutationInput!) {
  pickEnrolmentFromQueue(input: $input) {
    enrolment {
      id
      studyGroup {
        unitName
      }
      occurrence {
        pEvent {
          linkedEventId
        }
      }
    }
  }
}
    `;
export type PickEnrolmentFromQueueMutationFn = Apollo.MutationFunction<PickEnrolmentFromQueueMutation, PickEnrolmentFromQueueMutationVariables>;

/**
 * __usePickEnrolmentFromQueueMutation__
 *
 * To run a mutation, you first call `usePickEnrolmentFromQueueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePickEnrolmentFromQueueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pickEnrolmentFromQueueMutation, { data, loading, error }] = usePickEnrolmentFromQueueMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePickEnrolmentFromQueueMutation(baseOptions?: Apollo.MutationHookOptions<PickEnrolmentFromQueueMutation, PickEnrolmentFromQueueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PickEnrolmentFromQueueMutation, PickEnrolmentFromQueueMutationVariables>(PickEnrolmentFromQueueDocument, options);
      }
export type PickEnrolmentFromQueueMutationHookResult = ReturnType<typeof usePickEnrolmentFromQueueMutation>;
export type PickEnrolmentFromQueueMutationResult = Apollo.MutationResult<PickEnrolmentFromQueueMutation>;
export type PickEnrolmentFromQueueMutationOptions = Apollo.BaseMutationOptions<PickEnrolmentFromQueueMutation, PickEnrolmentFromQueueMutationVariables>;
export const EventQueueEnrolmentsDocument = gql`
    query eventQueueEnrolments($pEventId: ID, $orderBy: [String], $first: Int, $after: String) {
  eventQueueEnrolments(
    pEventId: $pEventId
    orderBy: $orderBy
    first: $first
    after: $after
  ) {
    count
    edges {
      cursor
      node {
        ...eventQueueEnrolmentFields
      }
    }
  }
}
    ${EventQueueEnrolmentFieldsFragmentDoc}`;

/**
 * __useEventQueueEnrolmentsQuery__
 *
 * To run a query within a React component, call `useEventQueueEnrolmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventQueueEnrolmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventQueueEnrolmentsQuery({
 *   variables: {
 *      pEventId: // value for 'pEventId'
 *      orderBy: // value for 'orderBy'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useEventQueueEnrolmentsQuery(baseOptions?: Apollo.QueryHookOptions<EventQueueEnrolmentsQuery, EventQueueEnrolmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventQueueEnrolmentsQuery, EventQueueEnrolmentsQueryVariables>(EventQueueEnrolmentsDocument, options);
      }
export function useEventQueueEnrolmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventQueueEnrolmentsQuery, EventQueueEnrolmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventQueueEnrolmentsQuery, EventQueueEnrolmentsQueryVariables>(EventQueueEnrolmentsDocument, options);
        }
export function useEventQueueEnrolmentsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EventQueueEnrolmentsQuery, EventQueueEnrolmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EventQueueEnrolmentsQuery, EventQueueEnrolmentsQueryVariables>(EventQueueEnrolmentsDocument, options);
        }
export type EventQueueEnrolmentsQueryHookResult = ReturnType<typeof useEventQueueEnrolmentsQuery>;
export type EventQueueEnrolmentsLazyQueryHookResult = ReturnType<typeof useEventQueueEnrolmentsLazyQuery>;
export type EventQueueEnrolmentsSuspenseQueryHookResult = ReturnType<typeof useEventQueueEnrolmentsSuspenseQuery>;
export type EventQueueEnrolmentsQueryResult = Apollo.QueryResult<EventQueueEnrolmentsQuery, EventQueueEnrolmentsQueryVariables>;
export const EventsDocument = gql`
    query Events($division: [String], $end: String, $include: [String], $inLanguage: String, $isFree: Boolean, $keyword: [String], $keywordAnd: [String], $keywordNot: [String], $language: String, $location: String, $page: Int, $pageSize: Int, $publisher: ID, $sort: String, $start: String, $superEvent: ID, $superEventType: [String], $text: String, $translation: String, $showAll: Boolean, $publicationStatus: String) {
  events(
    division: $division
    end: $end
    include: $include
    inLanguage: $inLanguage
    isFree: $isFree
    keyword: $keyword
    keywordAnd: $keywordAnd
    keywordNot: $keywordNot
    language: $language
    location: $location
    page: $page
    pageSize: $pageSize
    publisher: $publisher
    sort: $sort
    start: $start
    superEvent: $superEvent
    superEventType: $superEventType
    text: $text
    translation: $translation
    showAll: $showAll
    publicationStatus: $publicationStatus
  ) {
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
 *      division: // value for 'division'
 *      end: // value for 'end'
 *      include: // value for 'include'
 *      inLanguage: // value for 'inLanguage'
 *      isFree: // value for 'isFree'
 *      keyword: // value for 'keyword'
 *      keywordAnd: // value for 'keywordAnd'
 *      keywordNot: // value for 'keywordNot'
 *      language: // value for 'language'
 *      location: // value for 'location'
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
 *      publicationStatus: // value for 'publicationStatus'
 *   },
 * });
 */
export function useEventsQuery(baseOptions?: Apollo.QueryHookOptions<EventsQuery, EventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
      }
export function useEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventsQuery, EventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
        }
export function useEventsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EventsQuery, EventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
        }
export type EventsQueryHookResult = ReturnType<typeof useEventsQuery>;
export type EventsLazyQueryHookResult = ReturnType<typeof useEventsLazyQuery>;
export type EventsSuspenseQueryHookResult = ReturnType<typeof useEventsSuspenseQuery>;
export type EventsQueryResult = Apollo.QueryResult<EventsQuery, EventsQueryVariables>;
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
export type UploadSingleImageMutationFn = Apollo.MutationFunction<UploadSingleImageMutation, UploadSingleImageMutationVariables>;

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
export function useUploadSingleImageMutation(baseOptions?: Apollo.MutationHookOptions<UploadSingleImageMutation, UploadSingleImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadSingleImageMutation, UploadSingleImageMutationVariables>(UploadSingleImageDocument, options);
      }
export type UploadSingleImageMutationHookResult = ReturnType<typeof useUploadSingleImageMutation>;
export type UploadSingleImageMutationResult = Apollo.MutationResult<UploadSingleImageMutation>;
export type UploadSingleImageMutationOptions = Apollo.BaseMutationOptions<UploadSingleImageMutation, UploadSingleImageMutationVariables>;
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
export type UpdateSingleImageMutationFn = Apollo.MutationFunction<UpdateSingleImageMutation, UpdateSingleImageMutationVariables>;

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
export function useUpdateSingleImageMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSingleImageMutation, UpdateSingleImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSingleImageMutation, UpdateSingleImageMutationVariables>(UpdateSingleImageDocument, options);
      }
export type UpdateSingleImageMutationHookResult = ReturnType<typeof useUpdateSingleImageMutation>;
export type UpdateSingleImageMutationResult = Apollo.MutationResult<UpdateSingleImageMutation>;
export type UpdateSingleImageMutationOptions = Apollo.BaseMutationOptions<UpdateSingleImageMutation, UpdateSingleImageMutationVariables>;
export const ImageDocument = gql`
    query Image($id: ID!) {
  image(id: $id) {
    ...imageFields
  }
}
    ${ImageFieldsFragmentDoc}`;

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
export function useImageQuery(baseOptions: Apollo.QueryHookOptions<ImageQuery, ImageQueryVariables> & ({ variables: ImageQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ImageQuery, ImageQueryVariables>(ImageDocument, options);
      }
export function useImageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ImageQuery, ImageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ImageQuery, ImageQueryVariables>(ImageDocument, options);
        }
export function useImageSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ImageQuery, ImageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ImageQuery, ImageQueryVariables>(ImageDocument, options);
        }
export type ImageQueryHookResult = ReturnType<typeof useImageQuery>;
export type ImageLazyQueryHookResult = ReturnType<typeof useImageLazyQuery>;
export type ImageSuspenseQueryHookResult = ReturnType<typeof useImageSuspenseQuery>;
export type ImageQueryResult = Apollo.QueryResult<ImageQuery, ImageQueryVariables>;
export const KeywordDocument = gql`
    query Keyword($id: ID!) {
  keyword(id: $id) {
    ...keywordFields
  }
}
    ${KeywordFieldsFragmentDoc}`;

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
export function useKeywordQuery(baseOptions: Apollo.QueryHookOptions<KeywordQuery, KeywordQueryVariables> & ({ variables: KeywordQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<KeywordQuery, KeywordQueryVariables>(KeywordDocument, options);
      }
export function useKeywordLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<KeywordQuery, KeywordQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<KeywordQuery, KeywordQueryVariables>(KeywordDocument, options);
        }
export function useKeywordSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<KeywordQuery, KeywordQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<KeywordQuery, KeywordQueryVariables>(KeywordDocument, options);
        }
export type KeywordQueryHookResult = ReturnType<typeof useKeywordQuery>;
export type KeywordLazyQueryHookResult = ReturnType<typeof useKeywordLazyQuery>;
export type KeywordSuspenseQueryHookResult = ReturnType<typeof useKeywordSuspenseQuery>;
export type KeywordQueryResult = Apollo.QueryResult<KeywordQuery, KeywordQueryVariables>;
export const KeywordsDocument = gql`
    query Keywords($dataSource: String, $page: Int, $pageSize: Int, $showAllKeywords: Boolean, $sort: String, $text: String) {
  keywords(
    dataSource: $dataSource
    page: $page
    pageSize: $pageSize
    showAllKeywords: $showAllKeywords
    sort: $sort
    text: $text
  ) {
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
export function useKeywordsQuery(baseOptions?: Apollo.QueryHookOptions<KeywordsQuery, KeywordsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<KeywordsQuery, KeywordsQueryVariables>(KeywordsDocument, options);
      }
export function useKeywordsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<KeywordsQuery, KeywordsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<KeywordsQuery, KeywordsQueryVariables>(KeywordsDocument, options);
        }
export function useKeywordsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<KeywordsQuery, KeywordsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<KeywordsQuery, KeywordsQueryVariables>(KeywordsDocument, options);
        }
export type KeywordsQueryHookResult = ReturnType<typeof useKeywordsQuery>;
export type KeywordsLazyQueryHookResult = ReturnType<typeof useKeywordsLazyQuery>;
export type KeywordsSuspenseQueryHookResult = ReturnType<typeof useKeywordsSuspenseQuery>;
export type KeywordsQueryResult = Apollo.QueryResult<KeywordsQuery, KeywordsQueryVariables>;
export const KeywordSetDocument = gql`
    query KeywordSet($setType: KeywordSetType!) {
  keywordSet(setType: $setType) {
    keywords {
      ...keywordFields
    }
    name {
      ...localisedFields
    }
    internalId
  }
}
    ${KeywordFieldsFragmentDoc}
${LocalisedFieldsFragmentDoc}`;

/**
 * __useKeywordSetQuery__
 *
 * To run a query within a React component, call `useKeywordSetQuery` and pass it any options that fit your needs.
 * When your component renders, `useKeywordSetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useKeywordSetQuery({
 *   variables: {
 *      setType: // value for 'setType'
 *   },
 * });
 */
export function useKeywordSetQuery(baseOptions: Apollo.QueryHookOptions<KeywordSetQuery, KeywordSetQueryVariables> & ({ variables: KeywordSetQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<KeywordSetQuery, KeywordSetQueryVariables>(KeywordSetDocument, options);
      }
export function useKeywordSetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<KeywordSetQuery, KeywordSetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<KeywordSetQuery, KeywordSetQueryVariables>(KeywordSetDocument, options);
        }
export function useKeywordSetSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<KeywordSetQuery, KeywordSetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<KeywordSetQuery, KeywordSetQueryVariables>(KeywordSetDocument, options);
        }
export type KeywordSetQueryHookResult = ReturnType<typeof useKeywordSetQuery>;
export type KeywordSetLazyQueryHookResult = ReturnType<typeof useKeywordSetLazyQuery>;
export type KeywordSetSuspenseQueryHookResult = ReturnType<typeof useKeywordSetSuspenseQuery>;
export type KeywordSetQueryResult = Apollo.QueryResult<KeywordSetQuery, KeywordSetQueryVariables>;
export const CreateMyProfileDocument = gql`
    mutation CreateMyProfile($myProfile: CreateMyProfileMutationInput!) {
  createMyProfile(input: $myProfile) {
    myProfile {
      ...personFields
      organisationproposalSet {
        edges {
          node {
            name
          }
        }
      }
    }
  }
}
    ${PersonFieldsFragmentDoc}`;
export type CreateMyProfileMutationFn = Apollo.MutationFunction<CreateMyProfileMutation, CreateMyProfileMutationVariables>;

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
export function useCreateMyProfileMutation(baseOptions?: Apollo.MutationHookOptions<CreateMyProfileMutation, CreateMyProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMyProfileMutation, CreateMyProfileMutationVariables>(CreateMyProfileDocument, options);
      }
export type CreateMyProfileMutationHookResult = ReturnType<typeof useCreateMyProfileMutation>;
export type CreateMyProfileMutationResult = Apollo.MutationResult<CreateMyProfileMutation>;
export type CreateMyProfileMutationOptions = Apollo.BaseMutationOptions<CreateMyProfileMutation, CreateMyProfileMutationVariables>;
export const UpdateMyProfileDocument = gql`
    mutation UpdateMyProfile($myProfile: UpdateMyProfileMutationInput!) {
  updateMyProfile(input: $myProfile) {
    myProfile {
      ...personFields
      organisations {
        edges {
          node {
            ...organisationNodeFields
          }
        }
      }
      organisationproposalSet {
        edges {
          node {
            name
          }
        }
      }
    }
  }
}
    ${PersonFieldsFragmentDoc}
${OrganisationNodeFieldsFragmentDoc}`;
export type UpdateMyProfileMutationFn = Apollo.MutationFunction<UpdateMyProfileMutation, UpdateMyProfileMutationVariables>;

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
export function useUpdateMyProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMyProfileMutation, UpdateMyProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMyProfileMutation, UpdateMyProfileMutationVariables>(UpdateMyProfileDocument, options);
      }
export type UpdateMyProfileMutationHookResult = ReturnType<typeof useUpdateMyProfileMutation>;
export type UpdateMyProfileMutationResult = Apollo.MutationResult<UpdateMyProfileMutation>;
export type UpdateMyProfileMutationOptions = Apollo.BaseMutationOptions<UpdateMyProfileMutation, UpdateMyProfileMutationVariables>;
export const MyProfileDocument = gql`
    query MyProfile {
  myProfile {
    ...myProfileFields
  }
}
    ${MyProfileFieldsFragmentDoc}`;

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
export function useMyProfileQuery(baseOptions?: Apollo.QueryHookOptions<MyProfileQuery, MyProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyProfileQuery, MyProfileQueryVariables>(MyProfileDocument, options);
      }
export function useMyProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyProfileQuery, MyProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyProfileQuery, MyProfileQueryVariables>(MyProfileDocument, options);
        }
export function useMyProfileSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MyProfileQuery, MyProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyProfileQuery, MyProfileQueryVariables>(MyProfileDocument, options);
        }
export type MyProfileQueryHookResult = ReturnType<typeof useMyProfileQuery>;
export type MyProfileLazyQueryHookResult = ReturnType<typeof useMyProfileLazyQuery>;
export type MyProfileSuspenseQueryHookResult = ReturnType<typeof useMyProfileSuspenseQuery>;
export type MyProfileQueryResult = Apollo.QueryResult<MyProfileQuery, MyProfileQueryVariables>;
export const AddOccurrenceDocument = gql`
    mutation AddOccurrence($input: AddOccurrenceMutationInput!) {
  addOccurrence(input: $input) {
    occurrence {
      ...occurrenceFields
    }
  }
}
    ${OccurrenceFieldsFragmentDoc}`;
export type AddOccurrenceMutationFn = Apollo.MutationFunction<AddOccurrenceMutation, AddOccurrenceMutationVariables>;

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
export function useAddOccurrenceMutation(baseOptions?: Apollo.MutationHookOptions<AddOccurrenceMutation, AddOccurrenceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddOccurrenceMutation, AddOccurrenceMutationVariables>(AddOccurrenceDocument, options);
      }
export type AddOccurrenceMutationHookResult = ReturnType<typeof useAddOccurrenceMutation>;
export type AddOccurrenceMutationResult = Apollo.MutationResult<AddOccurrenceMutation>;
export type AddOccurrenceMutationOptions = Apollo.BaseMutationOptions<AddOccurrenceMutation, AddOccurrenceMutationVariables>;
export const EditOccurrenceDocument = gql`
    mutation EditOccurrence($input: UpdateOccurrenceMutationInput!) {
  updateOccurrence(input: $input) {
    occurrence {
      ...occurrenceFields
    }
  }
}
    ${OccurrenceFieldsFragmentDoc}`;
export type EditOccurrenceMutationFn = Apollo.MutationFunction<EditOccurrenceMutation, EditOccurrenceMutationVariables>;

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
export function useEditOccurrenceMutation(baseOptions?: Apollo.MutationHookOptions<EditOccurrenceMutation, EditOccurrenceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditOccurrenceMutation, EditOccurrenceMutationVariables>(EditOccurrenceDocument, options);
      }
export type EditOccurrenceMutationHookResult = ReturnType<typeof useEditOccurrenceMutation>;
export type EditOccurrenceMutationResult = Apollo.MutationResult<EditOccurrenceMutation>;
export type EditOccurrenceMutationOptions = Apollo.BaseMutationOptions<EditOccurrenceMutation, EditOccurrenceMutationVariables>;
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
export function useOccurrenceQuery(baseOptions: Apollo.QueryHookOptions<OccurrenceQuery, OccurrenceQueryVariables> & ({ variables: OccurrenceQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OccurrenceQuery, OccurrenceQueryVariables>(OccurrenceDocument, options);
      }
export function useOccurrenceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OccurrenceQuery, OccurrenceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OccurrenceQuery, OccurrenceQueryVariables>(OccurrenceDocument, options);
        }
export function useOccurrenceSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OccurrenceQuery, OccurrenceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OccurrenceQuery, OccurrenceQueryVariables>(OccurrenceDocument, options);
        }
export type OccurrenceQueryHookResult = ReturnType<typeof useOccurrenceQuery>;
export type OccurrenceLazyQueryHookResult = ReturnType<typeof useOccurrenceLazyQuery>;
export type OccurrenceSuspenseQueryHookResult = ReturnType<typeof useOccurrenceSuspenseQuery>;
export type OccurrenceQueryResult = Apollo.QueryResult<OccurrenceQuery, OccurrenceQueryVariables>;
export const DeleteOccurrenceDocument = gql`
    mutation DeleteOccurrence($input: DeleteOccurrenceMutationInput!) {
  deleteOccurrence(input: $input) {
    clientMutationId
  }
}
    `;
export type DeleteOccurrenceMutationFn = Apollo.MutationFunction<DeleteOccurrenceMutation, DeleteOccurrenceMutationVariables>;

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
export function useDeleteOccurrenceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOccurrenceMutation, DeleteOccurrenceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteOccurrenceMutation, DeleteOccurrenceMutationVariables>(DeleteOccurrenceDocument, options);
      }
export type DeleteOccurrenceMutationHookResult = ReturnType<typeof useDeleteOccurrenceMutation>;
export type DeleteOccurrenceMutationResult = Apollo.MutationResult<DeleteOccurrenceMutation>;
export type DeleteOccurrenceMutationOptions = Apollo.BaseMutationOptions<DeleteOccurrenceMutation, DeleteOccurrenceMutationVariables>;
export const CancelOccurrenceDocument = gql`
    mutation CancelOccurrence($input: CancelOccurrenceMutationInput!) {
  cancelOccurrence(input: $input) {
    clientMutationId
  }
}
    `;
export type CancelOccurrenceMutationFn = Apollo.MutationFunction<CancelOccurrenceMutation, CancelOccurrenceMutationVariables>;

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
export function useCancelOccurrenceMutation(baseOptions?: Apollo.MutationHookOptions<CancelOccurrenceMutation, CancelOccurrenceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelOccurrenceMutation, CancelOccurrenceMutationVariables>(CancelOccurrenceDocument, options);
      }
export type CancelOccurrenceMutationHookResult = ReturnType<typeof useCancelOccurrenceMutation>;
export type CancelOccurrenceMutationResult = Apollo.MutationResult<CancelOccurrenceMutation>;
export type CancelOccurrenceMutationOptions = Apollo.BaseMutationOptions<CancelOccurrenceMutation, CancelOccurrenceMutationVariables>;
export const OccurrencesDocument = gql`
    query Occurrences($after: String, $before: String, $first: Int, $last: Int, $cancelled: Boolean, $pEvent: ID, $orderBy: [String]) {
  occurrences(
    after: $after
    before: $before
    first: $first
    last: $last
    cancelled: $cancelled
    pEvent: $pEvent
    orderBy: $orderBy
  ) {
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
 *      cancelled: // value for 'cancelled'
 *      pEvent: // value for 'pEvent'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useOccurrencesQuery(baseOptions?: Apollo.QueryHookOptions<OccurrencesQuery, OccurrencesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OccurrencesQuery, OccurrencesQueryVariables>(OccurrencesDocument, options);
      }
export function useOccurrencesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OccurrencesQuery, OccurrencesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OccurrencesQuery, OccurrencesQueryVariables>(OccurrencesDocument, options);
        }
export function useOccurrencesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OccurrencesQuery, OccurrencesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OccurrencesQuery, OccurrencesQueryVariables>(OccurrencesDocument, options);
        }
export type OccurrencesQueryHookResult = ReturnType<typeof useOccurrencesQuery>;
export type OccurrencesLazyQueryHookResult = ReturnType<typeof useOccurrencesLazyQuery>;
export type OccurrencesSuspenseQueryHookResult = ReturnType<typeof useOccurrencesSuspenseQuery>;
export type OccurrencesQueryResult = Apollo.QueryResult<OccurrencesQuery, OccurrencesQueryVariables>;
export const OrganisationDocument = gql`
    query Organisation($id: ID!) {
  organisation(id: $id) {
    ...organisationNodeFields
  }
}
    ${OrganisationNodeFieldsFragmentDoc}`;

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
export function useOrganisationQuery(baseOptions: Apollo.QueryHookOptions<OrganisationQuery, OrganisationQueryVariables> & ({ variables: OrganisationQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrganisationQuery, OrganisationQueryVariables>(OrganisationDocument, options);
      }
export function useOrganisationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrganisationQuery, OrganisationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrganisationQuery, OrganisationQueryVariables>(OrganisationDocument, options);
        }
export function useOrganisationSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OrganisationQuery, OrganisationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrganisationQuery, OrganisationQueryVariables>(OrganisationDocument, options);
        }
export type OrganisationQueryHookResult = ReturnType<typeof useOrganisationQuery>;
export type OrganisationLazyQueryHookResult = ReturnType<typeof useOrganisationLazyQuery>;
export type OrganisationSuspenseQueryHookResult = ReturnType<typeof useOrganisationSuspenseQuery>;
export type OrganisationQueryResult = Apollo.QueryResult<OrganisationQuery, OrganisationQueryVariables>;
export const OrganisationsDocument = gql`
    query Organisations($after: String, $before: String, $first: Int, $last: Int, $type: String) {
  organisations(
    after: $after
    before: $before
    first: $first
    last: $last
    type: $type
  ) {
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
 *      type: // value for 'type'
 *   },
 * });
 */
export function useOrganisationsQuery(baseOptions?: Apollo.QueryHookOptions<OrganisationsQuery, OrganisationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrganisationsQuery, OrganisationsQueryVariables>(OrganisationsDocument, options);
      }
export function useOrganisationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrganisationsQuery, OrganisationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrganisationsQuery, OrganisationsQueryVariables>(OrganisationsDocument, options);
        }
export function useOrganisationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<OrganisationsQuery, OrganisationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrganisationsQuery, OrganisationsQueryVariables>(OrganisationsDocument, options);
        }
export type OrganisationsQueryHookResult = ReturnType<typeof useOrganisationsQuery>;
export type OrganisationsLazyQueryHookResult = ReturnType<typeof useOrganisationsLazyQuery>;
export type OrganisationsSuspenseQueryHookResult = ReturnType<typeof useOrganisationsSuspenseQuery>;
export type OrganisationsQueryResult = Apollo.QueryResult<OrganisationsQuery, OrganisationsQueryVariables>;
export const PersonDocument = gql`
    query Person($id: ID!) {
  person(id: $id) {
    ...personFields
  }
}
    ${PersonFieldsFragmentDoc}`;

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
export function usePersonQuery(baseOptions: Apollo.QueryHookOptions<PersonQuery, PersonQueryVariables> & ({ variables: PersonQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PersonQuery, PersonQueryVariables>(PersonDocument, options);
      }
export function usePersonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PersonQuery, PersonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PersonQuery, PersonQueryVariables>(PersonDocument, options);
        }
export function usePersonSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PersonQuery, PersonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PersonQuery, PersonQueryVariables>(PersonDocument, options);
        }
export type PersonQueryHookResult = ReturnType<typeof usePersonQuery>;
export type PersonLazyQueryHookResult = ReturnType<typeof usePersonLazyQuery>;
export type PersonSuspenseQueryHookResult = ReturnType<typeof usePersonSuspenseQuery>;
export type PersonQueryResult = Apollo.QueryResult<PersonQuery, PersonQueryVariables>;
export const PlaceDocument = gql`
    query Place($id: ID!) {
  place(id: $id) {
    ...placeFields
  }
}
    ${PlaceFieldsFragmentDoc}`;

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
export function usePlaceQuery(baseOptions: Apollo.QueryHookOptions<PlaceQuery, PlaceQueryVariables> & ({ variables: PlaceQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlaceQuery, PlaceQueryVariables>(PlaceDocument, options);
      }
export function usePlaceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlaceQuery, PlaceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlaceQuery, PlaceQueryVariables>(PlaceDocument, options);
        }
export function usePlaceSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PlaceQuery, PlaceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PlaceQuery, PlaceQueryVariables>(PlaceDocument, options);
        }
export type PlaceQueryHookResult = ReturnType<typeof usePlaceQuery>;
export type PlaceLazyQueryHookResult = ReturnType<typeof usePlaceLazyQuery>;
export type PlaceSuspenseQueryHookResult = ReturnType<typeof usePlaceSuspenseQuery>;
export type PlaceQueryResult = Apollo.QueryResult<PlaceQuery, PlaceQueryVariables>;
export const PlacesDocument = gql`
    query Places($dataSource: String, $divisions: [String], $page: Int, $pageSize: Int, $showAllPlaces: Boolean, $sort: String, $text: String) {
  places(
    dataSource: $dataSource
    divisions: $divisions
    page: $page
    pageSize: $pageSize
    showAllPlaces: $showAllPlaces
    sort: $sort
    text: $text
  ) {
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
export function usePlacesQuery(baseOptions?: Apollo.QueryHookOptions<PlacesQuery, PlacesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlacesQuery, PlacesQueryVariables>(PlacesDocument, options);
      }
export function usePlacesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlacesQuery, PlacesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlacesQuery, PlacesQueryVariables>(PlacesDocument, options);
        }
export function usePlacesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PlacesQuery, PlacesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PlacesQuery, PlacesQueryVariables>(PlacesDocument, options);
        }
export type PlacesQueryHookResult = ReturnType<typeof usePlacesQuery>;
export type PlacesLazyQueryHookResult = ReturnType<typeof usePlacesLazyQuery>;
export type PlacesSuspenseQueryHookResult = ReturnType<typeof usePlacesSuspenseQuery>;
export type PlacesQueryResult = Apollo.QueryResult<PlacesQuery, PlacesQueryVariables>;
export const SchoolsAndKindergartensListDocument = gql`
    query SchoolsAndKindergartensList {
  schoolsAndKindergartensList {
    meta {
      count
    }
    data {
      id
      name {
        fi
        sv
        en
      }
    }
  }
}
    `;

/**
 * __useSchoolsAndKindergartensListQuery__
 *
 * To run a query within a React component, call `useSchoolsAndKindergartensListQuery` and pass it any options that fit your needs.
 * When your component renders, `useSchoolsAndKindergartensListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSchoolsAndKindergartensListQuery({
 *   variables: {
 *   },
 * });
 */
export function useSchoolsAndKindergartensListQuery(baseOptions?: Apollo.QueryHookOptions<SchoolsAndKindergartensListQuery, SchoolsAndKindergartensListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SchoolsAndKindergartensListQuery, SchoolsAndKindergartensListQueryVariables>(SchoolsAndKindergartensListDocument, options);
      }
export function useSchoolsAndKindergartensListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SchoolsAndKindergartensListQuery, SchoolsAndKindergartensListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SchoolsAndKindergartensListQuery, SchoolsAndKindergartensListQueryVariables>(SchoolsAndKindergartensListDocument, options);
        }
export function useSchoolsAndKindergartensListSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SchoolsAndKindergartensListQuery, SchoolsAndKindergartensListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SchoolsAndKindergartensListQuery, SchoolsAndKindergartensListQueryVariables>(SchoolsAndKindergartensListDocument, options);
        }
export type SchoolsAndKindergartensListQueryHookResult = ReturnType<typeof useSchoolsAndKindergartensListQuery>;
export type SchoolsAndKindergartensListLazyQueryHookResult = ReturnType<typeof useSchoolsAndKindergartensListLazyQuery>;
export type SchoolsAndKindergartensListSuspenseQueryHookResult = ReturnType<typeof useSchoolsAndKindergartensListSuspenseQuery>;
export type SchoolsAndKindergartensListQueryResult = Apollo.QueryResult<SchoolsAndKindergartensListQuery, SchoolsAndKindergartensListQueryVariables>;
export const StudyLevelsDocument = gql`
    query StudyLevels {
  studyLevels {
    edges {
      node {
        ...studyLevelFields
      }
    }
  }
}
    ${StudyLevelFieldsFragmentDoc}`;

/**
 * __useStudyLevelsQuery__
 *
 * To run a query within a React component, call `useStudyLevelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudyLevelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudyLevelsQuery({
 *   variables: {
 *   },
 * });
 */
export function useStudyLevelsQuery(baseOptions?: Apollo.QueryHookOptions<StudyLevelsQuery, StudyLevelsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StudyLevelsQuery, StudyLevelsQueryVariables>(StudyLevelsDocument, options);
      }
export function useStudyLevelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StudyLevelsQuery, StudyLevelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StudyLevelsQuery, StudyLevelsQueryVariables>(StudyLevelsDocument, options);
        }
export function useStudyLevelsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<StudyLevelsQuery, StudyLevelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StudyLevelsQuery, StudyLevelsQueryVariables>(StudyLevelsDocument, options);
        }
export type StudyLevelsQueryHookResult = ReturnType<typeof useStudyLevelsQuery>;
export type StudyLevelsLazyQueryHookResult = ReturnType<typeof useStudyLevelsLazyQuery>;
export type StudyLevelsSuspenseQueryHookResult = ReturnType<typeof useStudyLevelsSuspenseQuery>;
export type StudyLevelsQueryResult = Apollo.QueryResult<StudyLevelsQuery, StudyLevelsQueryVariables>;
export const StudyLevelDocument = gql`
    query StudyLevel($id: ID!) {
  studyLevel(id: $id) {
    ...studyLevelFields
  }
}
    ${StudyLevelFieldsFragmentDoc}`;

/**
 * __useStudyLevelQuery__
 *
 * To run a query within a React component, call `useStudyLevelQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudyLevelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudyLevelQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useStudyLevelQuery(baseOptions: Apollo.QueryHookOptions<StudyLevelQuery, StudyLevelQueryVariables> & ({ variables: StudyLevelQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StudyLevelQuery, StudyLevelQueryVariables>(StudyLevelDocument, options);
      }
export function useStudyLevelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StudyLevelQuery, StudyLevelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StudyLevelQuery, StudyLevelQueryVariables>(StudyLevelDocument, options);
        }
export function useStudyLevelSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<StudyLevelQuery, StudyLevelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StudyLevelQuery, StudyLevelQueryVariables>(StudyLevelDocument, options);
        }
export type StudyLevelQueryHookResult = ReturnType<typeof useStudyLevelQuery>;
export type StudyLevelLazyQueryHookResult = ReturnType<typeof useStudyLevelLazyQuery>;
export type StudyLevelSuspenseQueryHookResult = ReturnType<typeof useStudyLevelSuspenseQuery>;
export type StudyLevelQueryResult = Apollo.QueryResult<StudyLevelQuery, StudyLevelQueryVariables>;
export const CreateVenueDocument = gql`
    mutation CreateVenue($venue: AddVenueMutationInput!) {
  addVenue(input: $venue) {
    venue {
      ...venueFields
    }
  }
}
    ${VenueFieldsFragmentDoc}`;
export type CreateVenueMutationFn = Apollo.MutationFunction<CreateVenueMutation, CreateVenueMutationVariables>;

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
export function useCreateVenueMutation(baseOptions?: Apollo.MutationHookOptions<CreateVenueMutation, CreateVenueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVenueMutation, CreateVenueMutationVariables>(CreateVenueDocument, options);
      }
export type CreateVenueMutationHookResult = ReturnType<typeof useCreateVenueMutation>;
export type CreateVenueMutationResult = Apollo.MutationResult<CreateVenueMutation>;
export type CreateVenueMutationOptions = Apollo.BaseMutationOptions<CreateVenueMutation, CreateVenueMutationVariables>;
export const EditVenueDocument = gql`
    mutation EditVenue($venue: UpdateVenueMutationInput!) {
  updateVenue(input: $venue) {
    venue {
      ...venueFields
    }
  }
}
    ${VenueFieldsFragmentDoc}`;
export type EditVenueMutationFn = Apollo.MutationFunction<EditVenueMutation, EditVenueMutationVariables>;

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
export function useEditVenueMutation(baseOptions?: Apollo.MutationHookOptions<EditVenueMutation, EditVenueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditVenueMutation, EditVenueMutationVariables>(EditVenueDocument, options);
      }
export type EditVenueMutationHookResult = ReturnType<typeof useEditVenueMutation>;
export type EditVenueMutationResult = Apollo.MutationResult<EditVenueMutation>;
export type EditVenueMutationOptions = Apollo.BaseMutationOptions<EditVenueMutation, EditVenueMutationVariables>;
export const VenueDocument = gql`
    query Venue($id: ID!) {
  venue(id: $id) {
    ...venueFields
  }
}
    ${VenueFieldsFragmentDoc}`;

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
export function useVenueQuery(baseOptions: Apollo.QueryHookOptions<VenueQuery, VenueQueryVariables> & ({ variables: VenueQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VenueQuery, VenueQueryVariables>(VenueDocument, options);
      }
export function useVenueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VenueQuery, VenueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VenueQuery, VenueQueryVariables>(VenueDocument, options);
        }
export function useVenueSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<VenueQuery, VenueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VenueQuery, VenueQueryVariables>(VenueDocument, options);
        }
export type VenueQueryHookResult = ReturnType<typeof useVenueQuery>;
export type VenueLazyQueryHookResult = ReturnType<typeof useVenueLazyQuery>;
export type VenueSuspenseQueryHookResult = ReturnType<typeof useVenueSuspenseQuery>;
export type VenueQueryResult = Apollo.QueryResult<VenueQuery, VenueQueryVariables>;