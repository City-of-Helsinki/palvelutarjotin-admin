import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `Date` scalar type represents a Date
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  Date: any;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  /**
   * Allows use of a JSON String for input / output from the GraphQL schema.
   *
   * Use of this type is *not recommended* as you lose the benefits of having a defined, static
   * schema (one of the key benefits of GraphQL).
   */
  JSONString: any;
  /**
   * The `Time` scalar type represents a Time value as
   * specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  Time: any;
  /**
   * Create scalar that ignores normal serialization/deserialization, since
   * that will be handled by the multipart request spec
   */
  Upload: any;
};

export type AddEventMutation = {
  __typename?: 'AddEventMutation';
  response?: Maybe<EventMutationResponse>;
};

export type AddEventMutationInput = {
  location?: Maybe<IdObjectInput>;
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

export type AddOccurrenceMutationInput = {
  placeId?: Maybe<Scalars['String']>;
  minGroupSize?: Maybe<Scalars['Int']>;
  maxGroupSize?: Maybe<Scalars['Int']>;
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  contactPersons?: Maybe<Array<Maybe<PersonNodeInput>>>;
  pEventId: Scalars['ID'];
  amountOfSeats: Scalars['Int'];
  seatType?: Maybe<SeatType>;
  languages: Array<Maybe<LanguageInput>>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type AddOccurrenceMutationPayload = {
  __typename?: 'AddOccurrenceMutationPayload';
  occurrence?: Maybe<OccurrenceNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type AddOrganisationMutationInput = {
  name: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  type: OrganisationTypeEnum;
  publisherId?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type AddOrganisationMutationPayload = {
  __typename?: 'AddOrganisationMutationPayload';
  organisation?: Maybe<OrganisationNode>;
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
  studyLevels?: Maybe<Array<Maybe<Scalars['String']>>>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type AddStudyGroupMutationPayload = {
  __typename?: 'AddStudyGroupMutationPayload';
  studyGroup?: Maybe<StudyGroupNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type AddVenueMutationInput = {
  /** Place id from linked event */
  id: Scalars['ID'];
  translations?: Maybe<Array<Maybe<VenueTranslationsInput>>>;
  hasClothingStorage: Scalars['Boolean'];
  hasSnackEatingPlace: Scalars['Boolean'];
  outdoorActivity: Scalars['Boolean'];
  hasToiletNearby: Scalars['Boolean'];
  hasAreaForGroupWork: Scalars['Boolean'];
  hasIndoorPlayingArea: Scalars['Boolean'];
  hasOutdoorPlayingArea: Scalars['Boolean'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type AddVenueMutationPayload = {
  __typename?: 'AddVenueMutationPayload';
  venue?: Maybe<VenueNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ApproveEnrolmentMutationInput = {
  enrolmentId: Scalars['ID'];
  customMessage?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ApproveEnrolmentMutationPayload = {
  __typename?: 'ApproveEnrolmentMutationPayload';
  enrolment?: Maybe<EnrolmentNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CancelEnrolmentMutationInput = {
  uniqueId: Scalars['ID'];
  /** Need to be included to actually cancel the enrolment,without this token, BE only initiate thecancellation process by sending a confirmation email to teacher */
  token?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CancelEnrolmentMutationPayload = {
  __typename?: 'CancelEnrolmentMutationPayload';
  enrolment?: Maybe<EnrolmentNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CancelOccurrenceMutationInput = {
  id: Scalars['ID'];
  reason?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CancelOccurrenceMutationPayload = {
  __typename?: 'CancelOccurrenceMutationPayload';
  occurrence?: Maybe<OccurrenceNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateMyProfileMutationInput = {
  name: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  emailAddress: Scalars['String'];
  organisations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** Propose a new organisation being added. Used with 3rd party organisations */
  organisationProposals?: Maybe<Array<Maybe<OrganisationProposalNodeInput>>>;
  /** Default `fi` */
  language?: Maybe<Language>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateMyProfileMutationPayload = {
  __typename?: 'CreateMyProfileMutationPayload';
  myProfile?: Maybe<PersonNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};



export type DeclineEnrolmentMutationInput = {
  enrolmentId: Scalars['ID'];
  customMessage?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeclineEnrolmentMutationPayload = {
  __typename?: 'DeclineEnrolmentMutationPayload';
  enrolment?: Maybe<EnrolmentNode>;
  clientMutationId?: Maybe<Scalars['String']>;
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
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteOccurrenceMutationPayload = {
  __typename?: 'DeleteOccurrenceMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteStudyGroupMutationInput = {
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteStudyGroupMutationPayload = {
  __typename?: 'DeleteStudyGroupMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteVenueMutationInput = {
  /** Place id from linked event */
  id: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type DeleteVenueMutationPayload = {
  __typename?: 'DeleteVenueMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
};

export type Division = {
  __typename?: 'Division';
  type: Scalars['String'];
  /** Open Civic Data ID */
  ocdId?: Maybe<Scalars['String']>;
  municipality?: Maybe<Scalars['String']>;
  name?: Maybe<LocalisedObject>;
};

export type EnrolOccurrenceMutationInput = {
  /** Occurrence ids of event */
  occurrenceIds: Array<Maybe<Scalars['ID']>>;
  /** Study group data */
  studyGroup: StudyGroupInput;
  notificationType?: Maybe<NotificationType>;
  /** Leave blank if the contact person is the same with group contact person */
  person?: Maybe<PersonNodeInput>;
  /** The user response token provided by the reCAPTCHA client-side integration */
  captchaKey?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type EnrolOccurrenceMutationPayload = {
  __typename?: 'EnrolOccurrenceMutationPayload';
  enrolments?: Maybe<Array<Maybe<EnrolmentNode>>>;
  clientMutationId?: Maybe<Scalars['String']>;
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
  status?: Maybe<EnrolmentStatus>;
};

export type EnrolmentNodeConnection = {
  __typename?: 'EnrolmentNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<EnrolmentNodeEdge>>;
  count?: Maybe<Scalars['Int']>;
};

/** A Relay edge containing a `EnrolmentNode` and its cursor. */
export type EnrolmentNodeEdge = {
  __typename?: 'EnrolmentNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<EnrolmentNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/** An enumeration. */
export enum EnrolmentStatus {
  Approved = 'APPROVED',
  Pending = 'PENDING',
  Cancelled = 'CANCELLED',
  Declined = 'DECLINED'
}

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
  shortDescription: LocalisedObject;
  provider?: Maybe<LocalisedObject>;
  infoUrl?: Maybe<LocalisedObject>;
  providerContactInfo?: Maybe<Scalars['String']>;
  description: LocalisedObject;
  pEvent: PalvelutarjotinEventNode;
  venue?: Maybe<VenueNode>;
  publicationStatus?: Maybe<Scalars['String']>;
  /** Only use this field in single event query for best performance. This field only work if `keywords` is included in the query argument */
  categories: Array<Keyword>;
  /** Only use this field in single event query for best performance. This field only work if `keywords` is included in the query argument */
  additionalCriteria: Array<Keyword>;
  /** Only use this field in single event query for best performance. This field only work if `keywords` is included in the query argument */
  activities: Array<Keyword>;
};

export type EventListResponse = {
  __typename?: 'EventListResponse';
  meta: Meta;
  data: Array<Event>;
};

export type EventMutationResponse = {
  __typename?: 'EventMutationResponse';
  statusCode: Scalars['Int'];
  body?: Maybe<Event>;
  resultText?: Maybe<Scalars['String']>;
};

export type EventSearchListResponse = {
  __typename?: 'EventSearchListResponse';
  meta: Meta;
  data: Array<Event>;
};

export type ExtensionCourse = {
  __typename?: 'ExtensionCourse';
  enrolmentStartTime?: Maybe<Scalars['String']>;
  enrolmentEndTime?: Maybe<Scalars['String']>;
  maximumAttendeeCapacity?: Maybe<Scalars['Int']>;
  minimumAttendeeCapacity?: Maybe<Scalars['Int']>;
  remainingAttendeeCapacity?: Maybe<Scalars['Int']>;
};

export type ExternalLink = {
  __typename?: 'ExternalLink';
  name?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
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

export type IdObjectInput = {
  internalId?: Maybe<Scalars['String']>;
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

export type ImageListResponse = {
  __typename?: 'ImageListResponse';
  meta: Meta;
  data: Array<Image>;
};

export type ImageMutationResponse = {
  __typename?: 'ImageMutationResponse';
  statusCode: Scalars['Int'];
  body?: Maybe<Image>;
  resultText?: Maybe<Scalars['String']>;
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

export type KeywordListResponse = {
  __typename?: 'KeywordListResponse';
  meta: Meta;
  data: Array<Keyword>;
};

export type KeywordSet = {
  __typename?: 'KeywordSet';
  id?: Maybe<Scalars['String']>;
  internalId: Scalars['ID'];
  internalContext?: Maybe<Scalars['String']>;
  internalType?: Maybe<Scalars['String']>;
  createdTime?: Maybe<Scalars['String']>;
  lastModifiedTime?: Maybe<Scalars['String']>;
  dataSource?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
  usage?: Maybe<Scalars['String']>;
  keywords: Array<Keyword>;
  name?: Maybe<LocalisedObject>;
};

/** An enumeration. */
export enum KeywordSetType {
  Category = 'CATEGORY',
  AdditionalCriteria = 'ADDITIONAL_CRITERIA',
  Activities = 'ACTIVITIES',
  TargetGroup = 'TARGET_GROUP'
}

/** An enumeration. */
export enum Language {
  Fi = 'FI',
  En = 'EN',
  Sv = 'SV'
}

export type LanguageInput = {
  id?: Maybe<Scalars['String']>;
};

export type LanguageNode = Node & {
  __typename?: 'LanguageNode';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type LanguageNodeConnection = {
  __typename?: 'LanguageNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<LanguageNodeEdge>>;
};

/** A Relay edge containing a `LanguageNode` and its cursor. */
export type LanguageNodeEdge = {
  __typename?: 'LanguageNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<LanguageNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type LocalisedObject = {
  __typename?: 'LocalisedObject';
  fi?: Maybe<Scalars['String']>;
  sv?: Maybe<Scalars['String']>;
  en?: Maybe<Scalars['String']>;
};

export type LocalisedObjectInput = {
  fi?: Maybe<Scalars['String']>;
  sv?: Maybe<Scalars['String']>;
  en?: Maybe<Scalars['String']>;
};

export type MassApproveEnrolmentsMutationInput = {
  enrolmentIds: Array<Maybe<Scalars['ID']>>;
  customMessage?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type MassApproveEnrolmentsMutationPayload = {
  __typename?: 'MassApproveEnrolmentsMutationPayload';
  enrolments: Array<Maybe<EnrolmentNode>>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type Meta = {
  __typename?: 'Meta';
  count?: Maybe<Scalars['Int']>;
  next?: Maybe<Scalars['String']>;
  previous?: Maybe<Scalars['String']>;
};

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
  massApproveEnrolments?: Maybe<MassApproveEnrolmentsMutationPayload>;
  declineEnrolment?: Maybe<DeclineEnrolmentMutationPayload>;
  cancelEnrolment?: Maybe<CancelEnrolmentMutationPayload>;
  createMyProfile?: Maybe<CreateMyProfileMutationPayload>;
  updateMyProfile?: Maybe<UpdateMyProfileMutationPayload>;
  addOrganisation?: Maybe<AddOrganisationMutationPayload>;
  updateOrganisation?: Maybe<UpdateOrganisationMutationPayload>;
  updatePerson?: Maybe<UpdatePersonMutationPayload>;
  addEventMutation?: Maybe<AddEventMutation>;
  updateEventMutation?: Maybe<UpdateEventMutation>;
  /** Using this mutation will update event publication status and also set the `start_time`, `end_time` of linkedEvent */
  publishEventMutation?: Maybe<PublishEventMutation>;
  unpublishEventMutation?: Maybe<UnpublishEventMutation>;
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


export type MutationMassApproveEnrolmentsArgs = {
  input: MassApproveEnrolmentsMutationInput;
};


export type MutationDeclineEnrolmentArgs = {
  input: DeclineEnrolmentMutationInput;
};


export type MutationCancelEnrolmentArgs = {
  input: CancelEnrolmentMutationInput;
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


export type MutationUnpublishEventMutationArgs = {
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

export type Neighborhood = {
  __typename?: 'Neighborhood';
  id: Scalars['ID'];
  name?: Maybe<LocalisedObject>;
};

export type NeighborhoodListResponse = {
  __typename?: 'NeighborhoodListResponse';
  meta: Meta;
  data: Array<Neighborhood>;
};

/** An object with an ID */
export type Node = {
  /** The ID of the object. */
  id: Scalars['ID'];
};

/** An enumeration. */
export enum NotificationTemplateLanguage {
  Fi = 'FI',
  En = 'EN',
  Sv = 'SV'
}

export type NotificationTemplateNode = Node & {
  __typename?: 'NotificationTemplateNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  type: Scalars['String'];
  translations: Array<Maybe<NotificationTranslationType>>;
  preview?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum NotificationTemplateType {
  PersonMyprofileCreation = 'PERSON_MYPROFILE_CREATION',
  PersonMyprofileAccepted = 'PERSON_MYPROFILE_ACCEPTED',
  OccurrenceEnrolment = 'OCCURRENCE_ENROLMENT',
  OccurrenceUnenrolment = 'OCCURRENCE_UNENROLMENT',
  EnrolmentApproved = 'ENROLMENT_APPROVED',
  EnrolmentDeclined = 'ENROLMENT_DECLINED',
  EnrolmentCancellation = 'ENROLMENT_CANCELLATION',
  EnrolmentCancelled = 'ENROLMENT_CANCELLED',
  OccurrenceEnrolmentSms = 'OCCURRENCE_ENROLMENT_SMS',
  OccurrenceUnenrolmentSms = 'OCCURRENCE_UNENROLMENT_SMS',
  EnrolmentApprovedSms = 'ENROLMENT_APPROVED_SMS',
  EnrolmentDeclinedSms = 'ENROLMENT_DECLINED_SMS',
  EnrolmentCancellationSms = 'ENROLMENT_CANCELLATION_SMS',
  EnrolmentCancelledSms = 'ENROLMENT_CANCELLED_SMS',
  OccurrenceCancelled = 'OCCURRENCE_CANCELLED',
  OccurrenceCancelledSms = 'OCCURRENCE_CANCELLED_SMS',
  EnrolmentSummaryReport = 'ENROLMENT_SUMMARY_REPORT'
}

export type NotificationTemplateWithContext = {
  __typename?: 'NotificationTemplateWithContext';
  template?: Maybe<NotificationTemplateNode>;
  customContextPreviewHtml?: Maybe<Scalars['String']>;
  customContextPreviewText?: Maybe<Scalars['String']>;
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
export enum NotificationType {
  EmailSms = 'EMAIL_SMS',
  Email = 'EMAIL',
  Sms = 'SMS'
}

export type OccurrenceNode = Node & {
  __typename?: 'OccurrenceNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  pEvent?: Maybe<PalvelutarjotinEventNode>;
  minGroupSize?: Maybe<Scalars['Int']>;
  maxGroupSize?: Maybe<Scalars['Int']>;
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  contactPersons: PersonNodeConnection;
  studyGroups: StudyGroupNodeConnection;
  placeId: Scalars['String'];
  amountOfSeats: Scalars['Int'];
  languages: LanguageNodeConnection;
  cancelled: Scalars['Boolean'];
  seatType: OccurrenceSeatType;
  enrolments: EnrolmentNodeConnection;
  remainingSeats: Scalars['Int'];
  seatsTaken: Scalars['Int'];
  seatsApproved: Scalars['Int'];
  /** Only use this field in single event query for best performance. */
  linkedEvent?: Maybe<Event>;
};


export type OccurrenceNodeContactPersonsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type OccurrenceNodeStudyGroupsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type OccurrenceNodeLanguagesArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type OccurrenceNodeEnrolmentsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
};

export type OccurrenceNodeConnection = {
  __typename?: 'OccurrenceNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<OccurrenceNodeEdge>>;
};

/** A Relay edge containing a `OccurrenceNode` and its cursor. */
export type OccurrenceNodeEdge = {
  __typename?: 'OccurrenceNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<OccurrenceNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
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
  isFree?: Maybe<Scalars['Boolean']>;
  description?: Maybe<LocalisedObject>;
  price?: Maybe<LocalisedObject>;
  infoUrl?: Maybe<LocalisedObject>;
};

export type OfferInput = {
  isFree?: Maybe<Scalars['Boolean']>;
  description?: Maybe<LocalisedObjectInput>;
  price?: Maybe<LocalisedObjectInput>;
  infoUrl?: Maybe<LocalisedObjectInput>;
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
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type OrganisationNodePEventArgs = {
  offset?: Maybe<Scalars['Int']>;
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

export type OrganisationProposalNode = Node & {
  __typename?: 'OrganisationProposalNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  phoneNumber: Scalars['String'];
  applicant: PersonNode;
};

export type OrganisationProposalNodeConnection = {
  __typename?: 'OrganisationProposalNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<OrganisationProposalNodeEdge>>;
};

/** A Relay edge containing a `OrganisationProposalNode` and its cursor. */
export type OrganisationProposalNodeEdge = {
  __typename?: 'OrganisationProposalNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<OrganisationProposalNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type OrganisationProposalNodeInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum OrganisationType {
  /** Käyttäjä */
  User = 'USER',
  /** Provider */
  Provider = 'PROVIDER'
}

export enum OrganisationTypeEnum {
  User = 'USER',
  Provider = 'PROVIDER'
}

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

export type PalvelutarjotinEventInput = {
  enrolmentStart?: Maybe<Scalars['DateTime']>;
  enrolmentEndDays?: Maybe<Scalars['Int']>;
  externalEnrolmentUrl?: Maybe<Scalars['String']>;
  neededOccurrences: Scalars['Int'];
  contactPersonId?: Maybe<Scalars['ID']>;
  contactPhoneNumber?: Maybe<Scalars['String']>;
  contactEmail?: Maybe<Scalars['String']>;
  autoAcceptance?: Maybe<Scalars['Boolean']>;
  mandatoryAdditionalInformation?: Maybe<Scalars['Boolean']>;
};

export type PalvelutarjotinEventNode = Node & {
  __typename?: 'PalvelutarjotinEventNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  linkedEventId: Scalars['String'];
  enrolmentStart?: Maybe<Scalars['DateTime']>;
  enrolmentEndDays?: Maybe<Scalars['Int']>;
  externalEnrolmentUrl?: Maybe<Scalars['String']>;
  neededOccurrences: Scalars['Int'];
  organisation?: Maybe<OrganisationNode>;
  contactPerson?: Maybe<PersonNode>;
  contactPhoneNumber: Scalars['String'];
  contactEmail: Scalars['String'];
  autoAcceptance: Scalars['Boolean'];
  mandatoryAdditionalInformation: Scalars['Boolean'];
  occurrences: OccurrenceNodeConnection;
  nextOccurrenceDatetime?: Maybe<Scalars['DateTime']>;
  lastOccurrenceDatetime?: Maybe<Scalars['DateTime']>;
};


export type PalvelutarjotinEventNodeOccurrencesArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  upcoming?: Maybe<Scalars['Boolean']>;
  date?: Maybe<Scalars['Date']>;
  time?: Maybe<Scalars['Time']>;
  pEvent?: Maybe<Scalars['ID']>;
  cancelled?: Maybe<Scalars['Boolean']>;
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
  organisationproposalSet: OrganisationProposalNodeConnection;
  pEvent: PalvelutarjotinEventNodeConnection;
  occurrences: OccurrenceNodeConnection;
  studygroupSet: StudyGroupNodeConnection;
  enrolmentSet: EnrolmentNodeConnection;
  isStaff: Scalars['Boolean'];
};


export type PersonNodeOrganisationsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};


export type PersonNodeOrganisationproposalSetArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type PersonNodePEventArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type PersonNodeOccurrencesArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  upcoming?: Maybe<Scalars['Boolean']>;
  date?: Maybe<Scalars['Date']>;
  time?: Maybe<Scalars['Time']>;
  pEvent?: Maybe<Scalars['ID']>;
  cancelled?: Maybe<Scalars['Boolean']>;
};


export type PersonNodeStudygroupSetArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type PersonNodeEnrolmentSetArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
};

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

export type PersonNodeInput = {
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  emailAddress: Scalars['String'];
  /** Default `fi` */
  language?: Maybe<Language>;
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

export type PlaceListResponse = {
  __typename?: 'PlaceListResponse';
  meta: Meta;
  data: Array<Place>;
};

export type PlacePosition = {
  __typename?: 'PlacePosition';
  type: Scalars['String'];
  coordinates: Array<Scalars['Float']>;
};

export type PlaceSearchListResponse = {
  __typename?: 'PlaceSearchListResponse';
  meta: Meta;
  data: Array<Place>;
};

export type PublishEventMutation = {
  __typename?: 'PublishEventMutation';
  response?: Maybe<EventMutationResponse>;
};

export type PublishEventMutationInput = {
  location?: Maybe<IdObjectInput>;
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

export type Query = {
  __typename?: 'Query';
  occurrences?: Maybe<OccurrenceNodeConnection>;
  /** The ID of the object */
  occurrence?: Maybe<OccurrenceNode>;
  studyGroups?: Maybe<StudyGroupNodeConnection>;
  /** The ID of the object */
  studyGroup?: Maybe<StudyGroupNode>;
  studyLevels?: Maybe<StudyLevelNodeConnection>;
  studyLevel?: Maybe<StudyLevelNode>;
  venues?: Maybe<VenueNodeConnection>;
  venue?: Maybe<VenueNode>;
  cancellingEnrolment?: Maybe<EnrolmentNode>;
  languages?: Maybe<LanguageNodeConnection>;
  language?: Maybe<LanguageNode>;
  enrolments?: Maybe<EnrolmentNodeConnection>;
  /** The ID of the object */
  enrolment?: Maybe<EnrolmentNode>;
  enrolmentSummary?: Maybe<EnrolmentNodeConnection>;
  /** Query personal data of logged user */
  myProfile?: Maybe<PersonNode>;
  /** The ID of the object */
  person?: Maybe<PersonNode>;
  persons?: Maybe<PersonNodeConnection>;
  /** The ID of the object */
  organisation?: Maybe<OrganisationNode>;
  organisations?: Maybe<OrganisationNodeConnection>;
  neighborhoodList?: Maybe<NeighborhoodListResponse>;
  events?: Maybe<EventListResponse>;
  event?: Maybe<Event>;
  places?: Maybe<PlaceListResponse>;
  place?: Maybe<Place>;
  images?: Maybe<ImageListResponse>;
  image?: Maybe<Image>;
  keywords?: Maybe<KeywordListResponse>;
  keyword?: Maybe<Keyword>;
  keywordSet?: Maybe<KeywordSet>;
  eventsSearch?: Maybe<EventSearchListResponse>;
  placesSearch?: Maybe<PlaceSearchListResponse>;
  notificationTemplate?: Maybe<NotificationTemplateWithContext>;
};


export type QueryOccurrencesArgs = {
  orderBy?: Maybe<Array<Maybe<Scalars['String']>>>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  upcoming?: Maybe<Scalars['Boolean']>;
  date?: Maybe<Scalars['Date']>;
  time?: Maybe<Scalars['Time']>;
  pEvent?: Maybe<Scalars['ID']>;
  cancelled?: Maybe<Scalars['Boolean']>;
};


export type QueryOccurrenceArgs = {
  id: Scalars['ID'];
};


export type QueryStudyGroupsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryStudyGroupArgs = {
  id: Scalars['ID'];
};


export type QueryStudyLevelsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryStudyLevelArgs = {
  id: Scalars['ID'];
};


export type QueryVenuesArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryVenueArgs = {
  id: Scalars['ID'];
};


export type QueryCancellingEnrolmentArgs = {
  id: Scalars['ID'];
};


export type QueryLanguagesArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryLanguageArgs = {
  id: Scalars['ID'];
};


export type QueryEnrolmentsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryEnrolmentArgs = {
  id: Scalars['ID'];
};


export type QueryEnrolmentSummaryArgs = {
  organisationId: Scalars['ID'];
  status?: Maybe<EnrolmentStatus>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryPersonArgs = {
  id: Scalars['ID'];
};


export type QueryPersonsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryOrganisationArgs = {
  id: Scalars['ID'];
};


export type QueryOrganisationsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};


export type QueryEventsArgs = {
  division?: Maybe<Array<Maybe<Scalars['String']>>>;
  end?: Maybe<Scalars['String']>;
  include?: Maybe<Array<Maybe<Scalars['String']>>>;
  inLanguage?: Maybe<Scalars['String']>;
  isFree?: Maybe<Scalars['Boolean']>;
  keyword?: Maybe<Array<Maybe<Scalars['String']>>>;
  keywordAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
  keywordNot?: Maybe<Array<Maybe<Scalars['String']>>>;
  allOngoingAnd?: Maybe<Array<Maybe<Scalars['String']>>>;
  allOngoingOr?: Maybe<Array<Maybe<Scalars['String']>>>;
  language?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
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


export type QueryKeywordSetArgs = {
  setType: KeywordSetType;
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

/** An enumeration. */
export enum SeatType {
  ChildrenCount = 'CHILDREN_COUNT',
  EnrolmentCount = 'ENROLMENT_COUNT'
}

export type StudyGroupInput = {
  /** If person input doesn't include person id, a new person object will be created */
  person: PersonNodeInput;
  name?: Maybe<Scalars['String']>;
  groupSize: Scalars['Int'];
  groupName?: Maybe<Scalars['String']>;
  extraNeeds?: Maybe<Scalars['String']>;
  amountOfAdult?: Maybe<Scalars['Int']>;
  studyLevels?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type StudyGroupNode = Node & {
  __typename?: 'StudyGroupNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  person: PersonNode;
  name: Scalars['String'];
  groupSize: Scalars['Int'];
  amountOfAdult: Scalars['Int'];
  groupName: Scalars['String'];
  studyLevels: StudyLevelNodeConnection;
  extraNeeds: Scalars['String'];
  occurrences: OccurrenceNodeConnection;
  enrolments: EnrolmentNodeConnection;
};


export type StudyGroupNodeStudyLevelsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type StudyGroupNodeOccurrencesArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  upcoming?: Maybe<Scalars['Boolean']>;
  date?: Maybe<Scalars['Date']>;
  time?: Maybe<Scalars['Time']>;
  pEvent?: Maybe<Scalars['ID']>;
  cancelled?: Maybe<Scalars['Boolean']>;
};


export type StudyGroupNodeEnrolmentsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
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

export type StudyLevelNode = Node & {
  __typename?: 'StudyLevelNode';
  id: Scalars['ID'];
  /** Used to make a hierarchy between study levels. */
  level: Scalars['Int'];
  translations: Array<StudyLevelTranslationType>;
  /** Translated field in the language defined in request ACCEPT-LANGUAGE header  */
  label?: Maybe<Scalars['String']>;
};

export type StudyLevelNodeConnection = {
  __typename?: 'StudyLevelNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<StudyLevelNodeEdge>>;
};

/** A Relay edge containing a `StudyLevelNode` and its cursor. */
export type StudyLevelNodeEdge = {
  __typename?: 'StudyLevelNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<StudyLevelNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type StudyLevelTranslationType = {
  __typename?: 'StudyLevelTranslationType';
  languageCode: Language;
  label: Scalars['String'];
};


export type UnenrolOccurrenceMutationInput = {
  /** Occurrence id of event */
  occurrenceId: Scalars['ID'];
  /** Study group id */
  studyGroupId: Scalars['ID'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UnenrolOccurrenceMutationPayload = {
  __typename?: 'UnenrolOccurrenceMutationPayload';
  occurrence?: Maybe<OccurrenceNode>;
  studyGroup?: Maybe<StudyGroupNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UnpublishEventMutation = {
  __typename?: 'UnpublishEventMutation';
  response?: Maybe<EventMutationResponse>;
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

export type UpdateEnrolmentMutationPayload = {
  __typename?: 'UpdateEnrolmentMutationPayload';
  enrolment?: Maybe<EnrolmentNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateEventMutation = {
  __typename?: 'UpdateEventMutation';
  response?: Maybe<EventMutationResponse>;
};

export type UpdateEventMutationInput = {
  location?: Maybe<IdObjectInput>;
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

export type UpdateMyProfileMutationInput = {
  name?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['String']>;
  /** Default `fi` */
  language?: Maybe<Language>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateMyProfileMutationPayload = {
  __typename?: 'UpdateMyProfileMutationPayload';
  myProfile?: Maybe<PersonNode>;
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
  amountOfSeats?: Maybe<Scalars['Int']>;
  /** If present, should include all languages of the occurrence */
  languages: Array<Maybe<LanguageInput>>;
  seatType?: Maybe<SeatType>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateOccurrenceMutationPayload = {
  __typename?: 'UpdateOccurrenceMutationPayload';
  occurrence?: Maybe<OccurrenceNode>;
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

export type UpdateOrganisationMutationPayload = {
  __typename?: 'UpdateOrganisationMutationPayload';
  organisation?: Maybe<OrganisationNode>;
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

export type UpdatePersonMutationPayload = {
  __typename?: 'UpdatePersonMutationPayload';
  person?: Maybe<PersonNode>;
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
  studyLevels?: Maybe<Array<Maybe<Scalars['String']>>>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateStudyGroupMutationPayload = {
  __typename?: 'UpdateStudyGroupMutationPayload';
  studyGroup?: Maybe<StudyGroupNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateVenueMutationInput = {
  /** Place id from linked event */
  id: Scalars['ID'];
  translations?: Maybe<Array<Maybe<VenueTranslationsInput>>>;
  hasClothingStorage?: Maybe<Scalars['Boolean']>;
  hasSnackEatingPlace?: Maybe<Scalars['Boolean']>;
  outdoorActivity?: Maybe<Scalars['Boolean']>;
  hasToiletNearby?: Maybe<Scalars['Boolean']>;
  hasAreaForGroupWork?: Maybe<Scalars['Boolean']>;
  hasIndoorPlayingArea?: Maybe<Scalars['Boolean']>;
  hasOutdoorPlayingArea?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateVenueMutationPayload = {
  __typename?: 'UpdateVenueMutationPayload';
  venue?: Maybe<VenueNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};


export type UploadImageMutation = {
  __typename?: 'UploadImageMutation';
  response?: Maybe<ImageMutationResponse>;
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

export type VenueNode = Node & {
  __typename?: 'VenueNode';
  hasClothingStorage: Scalars['Boolean'];
  hasSnackEatingPlace: Scalars['Boolean'];
  outdoorActivity: Scalars['Boolean'];
  hasToiletNearby: Scalars['Boolean'];
  hasAreaForGroupWork: Scalars['Boolean'];
  hasIndoorPlayingArea: Scalars['Boolean'];
  hasOutdoorPlayingArea: Scalars['Boolean'];
  translations: Array<VenueTranslationType>;
  /** place_id from linkedEvent */
  id: Scalars['ID'];
  /** Translated field in the language defined in request ACCEPT-LANGUAGE header  */
  description?: Maybe<Scalars['String']>;
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

export type VenueTranslationType = {
  __typename?: 'VenueTranslationType';
  languageCode: Language;
  description: Scalars['String'];
};

export type VenueTranslationsInput = {
  description?: Maybe<Scalars['String']>;
  languageCode: Language;
};

export type EnrolmentTemplateContextQueryVariables = Exact<{
  enrolmentId: Scalars['ID'];
}>;


export type EnrolmentTemplateContextQuery = { __typename?: 'Query', enrolment?: Maybe<{ __typename?: 'EnrolmentNode', id: string, studyGroup: { __typename?: 'StudyGroupNode', id: string, name: string, person: { __typename?: 'PersonNode', id: string, emailAddress: string } }, occurrence: { __typename?: 'OccurrenceNode', id: string, startTime: any, linkedEvent?: Maybe<{ __typename?: 'Event', id: string, name: { __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> } }> } }> };

export type EventNameQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type EventNameQuery = { __typename?: 'Query', event?: Maybe<{ __typename?: 'Event', id: string, name: { __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> } }> };

export type ApproveEnrolmentMutationVariables = Exact<{
  input: ApproveEnrolmentMutationInput;
}>;


export type ApproveEnrolmentMutation = { __typename?: 'Mutation', approveEnrolment?: Maybe<{ __typename?: 'ApproveEnrolmentMutationPayload', clientMutationId?: Maybe<string>, enrolment?: Maybe<{ __typename?: 'EnrolmentNode', id: string, notificationType?: Maybe<NotificationType>, enrolmentTime: any, status?: Maybe<EnrolmentStatus>, person?: Maybe<{ __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language }>, studyGroup: { __typename?: 'StudyGroupNode', id: string, groupSize: number, amountOfAdult: number, name: string, groupName: string, extraNeeds: string, studyLevels: { __typename?: 'StudyLevelNodeConnection', edges: Array<Maybe<{ __typename?: 'StudyLevelNodeEdge', node?: Maybe<{ __typename?: 'StudyLevelNode', id: string, label?: Maybe<string>, level: number, translations: Array<{ __typename?: 'StudyLevelTranslationType', languageCode: Language, label: string }> }> }>> }, person: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language } } }> }> };

export type DeclineEnrolmentMutationVariables = Exact<{
  input: DeclineEnrolmentMutationInput;
}>;


export type DeclineEnrolmentMutation = { __typename?: 'Mutation', declineEnrolment?: Maybe<{ __typename?: 'DeclineEnrolmentMutationPayload', clientMutationId?: Maybe<string>, enrolment?: Maybe<{ __typename?: 'EnrolmentNode', id: string, notificationType?: Maybe<NotificationType>, enrolmentTime: any, status?: Maybe<EnrolmentStatus>, person?: Maybe<{ __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language }>, studyGroup: { __typename?: 'StudyGroupNode', id: string, groupSize: number, amountOfAdult: number, name: string, groupName: string, extraNeeds: string, studyLevels: { __typename?: 'StudyLevelNodeConnection', edges: Array<Maybe<{ __typename?: 'StudyLevelNodeEdge', node?: Maybe<{ __typename?: 'StudyLevelNode', id: string, label?: Maybe<string>, level: number, translations: Array<{ __typename?: 'StudyLevelTranslationType', languageCode: Language, label: string }> }> }>> }, person: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language } } }> }> };

export type DeleteEnrolmentMutationVariables = Exact<{
  input: UnenrolOccurrenceMutationInput;
}>;


export type DeleteEnrolmentMutation = { __typename?: 'Mutation', unenrolOccurrence?: Maybe<{ __typename?: 'UnenrolOccurrenceMutationPayload', clientMutationId?: Maybe<string>, occurrence?: Maybe<{ __typename?: 'OccurrenceNode', id: string }>, studyGroup?: Maybe<{ __typename?: 'StudyGroupNode', id: string }> }> };

export type UpdateEnrolmentMutationVariables = Exact<{
  input: UpdateEnrolmentMutationInput;
}>;


export type UpdateEnrolmentMutation = { __typename?: 'Mutation', updateEnrolment?: Maybe<{ __typename?: 'UpdateEnrolmentMutationPayload', clientMutationId?: Maybe<string>, enrolment?: Maybe<{ __typename?: 'EnrolmentNode', id: string, notificationType?: Maybe<NotificationType>, enrolmentTime: any, status?: Maybe<EnrolmentStatus>, person?: Maybe<{ __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language }>, studyGroup: { __typename?: 'StudyGroupNode', id: string, groupSize: number, amountOfAdult: number, name: string, groupName: string, extraNeeds: string, studyLevels: { __typename?: 'StudyLevelNodeConnection', edges: Array<Maybe<{ __typename?: 'StudyLevelNodeEdge', node?: Maybe<{ __typename?: 'StudyLevelNode', id: string, label?: Maybe<string>, level: number, translations: Array<{ __typename?: 'StudyLevelTranslationType', languageCode: Language, label: string }> }> }>> }, person: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language } } }> }> };

export type StudyGroupFieldsFragment = { __typename?: 'StudyGroupNode', id: string, groupSize: number, amountOfAdult: number, name: string, groupName: string, extraNeeds: string, studyLevels: { __typename?: 'StudyLevelNodeConnection', edges: Array<Maybe<{ __typename?: 'StudyLevelNodeEdge', node?: Maybe<{ __typename?: 'StudyLevelNode', id: string, label?: Maybe<string>, level: number, translations: Array<{ __typename?: 'StudyLevelTranslationType', languageCode: Language, label: string }> }> }>> }, person: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language } };

export type EnrolmentFieldsFragment = { __typename?: 'EnrolmentNode', id: string, notificationType?: Maybe<NotificationType>, enrolmentTime: any, status?: Maybe<EnrolmentStatus>, person?: Maybe<{ __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language }>, studyGroup: { __typename?: 'StudyGroupNode', id: string, groupSize: number, amountOfAdult: number, name: string, groupName: string, extraNeeds: string, studyLevels: { __typename?: 'StudyLevelNodeConnection', edges: Array<Maybe<{ __typename?: 'StudyLevelNodeEdge', node?: Maybe<{ __typename?: 'StudyLevelNode', id: string, label?: Maybe<string>, level: number, translations: Array<{ __typename?: 'StudyLevelTranslationType', languageCode: Language, label: string }> }> }>> }, person: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language } } };

export type EnrolmentQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type EnrolmentQuery = { __typename?: 'Query', enrolment?: Maybe<{ __typename?: 'EnrolmentNode', id: string, notificationType?: Maybe<NotificationType>, enrolmentTime: any, status?: Maybe<EnrolmentStatus>, occurrence: { __typename?: 'OccurrenceNode', id: string, maxGroupSize?: Maybe<number>, minGroupSize?: Maybe<number>, pEvent?: Maybe<{ __typename?: 'PalvelutarjotinEventNode', id: string, organisation?: Maybe<{ __typename?: 'OrganisationNode', id: string }> }> }, person?: Maybe<{ __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language }>, studyGroup: { __typename?: 'StudyGroupNode', id: string, groupSize: number, amountOfAdult: number, name: string, groupName: string, extraNeeds: string, studyLevels: { __typename?: 'StudyLevelNodeConnection', edges: Array<Maybe<{ __typename?: 'StudyLevelNodeEdge', node?: Maybe<{ __typename?: 'StudyLevelNode', id: string, label?: Maybe<string>, level: number, translations: Array<{ __typename?: 'StudyLevelTranslationType', languageCode: Language, label: string }> }> }>> }, person: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language } } }> };

export type NotificationTemplateQueryVariables = Exact<{
  templateType?: Maybe<NotificationTemplateType>;
  context: Scalars['JSONString'];
  language: Language;
}>;


export type NotificationTemplateQuery = { __typename?: 'Query', notificationTemplate?: Maybe<{ __typename?: 'NotificationTemplateWithContext', customContextPreviewHtml?: Maybe<string>, customContextPreviewText?: Maybe<string>, template?: Maybe<{ __typename?: 'NotificationTemplateNode', id: string, type: string, preview?: Maybe<string>, translations: Array<Maybe<{ __typename?: 'NotificationTranslationType', languageCode: NotificationTemplateLanguage, subject?: Maybe<string>, bodyHtml?: Maybe<string>, bodyText?: Maybe<string>, preview?: Maybe<string> }>> }> }> };

export type CreateEventMutationVariables = Exact<{
  event: AddEventMutationInput;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', addEventMutation?: Maybe<{ __typename?: 'AddEventMutation', response?: Maybe<{ __typename?: 'EventMutationResponse', statusCode: number, body?: Maybe<{ __typename?: 'Event', id: string, internalId: string, name: { __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }, shortDescription: { __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }, description: { __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }, images: Array<{ __typename?: 'Image', id?: Maybe<string>, internalId: string, license?: Maybe<string>, name: string, url: string, cropping?: Maybe<string>, photographerName?: Maybe<string>, altText?: Maybe<string> }>, offers: Array<{ __typename?: 'Offer', isFree?: Maybe<boolean>, description?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }>, price?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }>, infoUrl?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }> }>, pEvent: { __typename?: 'PalvelutarjotinEventNode', id: string, neededOccurrences: number, autoAcceptance: boolean }, infoUrl?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }> }> }> }> };

export type DeleteSingleEventMutationVariables = Exact<{
  eventId: Scalars['String'];
}>;


export type DeleteSingleEventMutation = { __typename?: 'Mutation', deleteEventMutation?: Maybe<{ __typename?: 'DeleteEventMutation', response?: Maybe<{ __typename?: 'EventMutationResponse', statusCode: number, body?: Maybe<{ __typename?: 'Event', id: string, internalId: string }> }> }> };

export type PublishSingleEventMutationVariables = Exact<{
  event: PublishEventMutationInput;
}>;


export type PublishSingleEventMutation = { __typename?: 'Mutation', publishEventMutation?: Maybe<{ __typename?: 'PublishEventMutation', response?: Maybe<{ __typename?: 'EventMutationResponse', statusCode: number, resultText?: Maybe<string>, body?: Maybe<{ __typename?: 'Event', id: string, internalId: string, publicationStatus?: Maybe<string> }> }> }> };

export type EditEventMutationVariables = Exact<{
  event: UpdateEventMutationInput;
}>;


export type EditEventMutation = { __typename?: 'Mutation', updateEventMutation?: Maybe<{ __typename?: 'UpdateEventMutation', response?: Maybe<{ __typename?: 'EventMutationResponse', statusCode: number, body?: Maybe<{ __typename?: 'Event', id: string, internalId: string, startTime?: Maybe<string>, publicationStatus?: Maybe<string>, datePublished?: Maybe<string>, endTime?: Maybe<string>, name: { __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }, shortDescription: { __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }, description: { __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }, images: Array<{ __typename?: 'Image', id?: Maybe<string>, internalId: string, license?: Maybe<string>, name: string, url: string, cropping?: Maybe<string>, photographerName?: Maybe<string>, altText?: Maybe<string> }>, infoUrl?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }>, pEvent: { __typename?: 'PalvelutarjotinEventNode', id: string, nextOccurrenceDatetime?: Maybe<any>, autoAcceptance: boolean, contactEmail: string, contactPhoneNumber: string, enrolmentEndDays?: Maybe<number>, enrolmentStart?: Maybe<any>, neededOccurrences: number, mandatoryAdditionalInformation: boolean, contactPerson?: Maybe<{ __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language }>, organisation?: Maybe<{ __typename?: 'OrganisationNode', id: string, name: string, phoneNumber: string, publisherId: string, type: OrganisationType, persons: { __typename?: 'PersonNodeConnection', edges: Array<Maybe<{ __typename?: 'PersonNodeEdge', node?: Maybe<{ __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language }> }>> } }>, occurrences: { __typename?: 'OccurrenceNodeConnection', edges: Array<Maybe<{ __typename?: 'OccurrenceNodeEdge', node?: Maybe<{ __typename?: 'OccurrenceNode', id: string, amountOfSeats: number, minGroupSize?: Maybe<number>, maxGroupSize?: Maybe<number>, seatsTaken: number, seatsApproved: number, seatType: OccurrenceSeatType, remainingSeats: number, startTime: any, endTime: any, placeId: string, cancelled: boolean, pEvent?: Maybe<{ __typename?: 'PalvelutarjotinEventNode', id: string }>, languages: { __typename?: 'LanguageNodeConnection', edges: Array<Maybe<{ __typename?: 'LanguageNodeEdge', node?: Maybe<{ __typename?: 'LanguageNode', id: string, name: string }> }>> } }> }>> } }, inLanguage: Array<{ __typename?: 'InLanguage', id?: Maybe<string>, internalId: string, name?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }> }>, audience: Array<{ __typename?: 'Keyword', id?: Maybe<string>, internalId: string, name?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }> }>, keywords: Array<{ __typename?: 'Keyword', id?: Maybe<string>, internalId: string, name?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }> }>, offers: Array<{ __typename?: 'Offer', isFree?: Maybe<boolean>, description?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }>, price?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }>, infoUrl?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }> }> }> }> }> };

export type PEventFieldsFragment = { __typename?: 'PalvelutarjotinEventNode', id: string, nextOccurrenceDatetime?: Maybe<any>, autoAcceptance: boolean, contactEmail: string, contactPhoneNumber: string, enrolmentEndDays?: Maybe<number>, enrolmentStart?: Maybe<any>, neededOccurrences: number, mandatoryAdditionalInformation: boolean, contactPerson?: Maybe<{ __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language }>, organisation?: Maybe<{ __typename?: 'OrganisationNode', id: string, name: string, phoneNumber: string, publisherId: string, type: OrganisationType, persons: { __typename?: 'PersonNodeConnection', edges: Array<Maybe<{ __typename?: 'PersonNodeEdge', node?: Maybe<{ __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language }> }>> } }>, occurrences: { __typename?: 'OccurrenceNodeConnection', edges: Array<Maybe<{ __typename?: 'OccurrenceNodeEdge', node?: Maybe<{ __typename?: 'OccurrenceNode', id: string, amountOfSeats: number, minGroupSize?: Maybe<number>, maxGroupSize?: Maybe<number>, seatsTaken: number, seatsApproved: number, seatType: OccurrenceSeatType, remainingSeats: number, startTime: any, endTime: any, placeId: string, cancelled: boolean, pEvent?: Maybe<{ __typename?: 'PalvelutarjotinEventNode', id: string }>, languages: { __typename?: 'LanguageNodeConnection', edges: Array<Maybe<{ __typename?: 'LanguageNodeEdge', node?: Maybe<{ __typename?: 'LanguageNode', id: string, name: string }> }>> } }> }>> } };

export type LocalisedFieldsFragment = { __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> };

export type OfferFieldsFragment = { __typename?: 'Offer', isFree?: Maybe<boolean>, description?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }>, price?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }>, infoUrl?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }> };

export type EventFieldsFragment = { __typename?: 'Event', id: string, internalId: string, startTime?: Maybe<string>, publicationStatus?: Maybe<string>, datePublished?: Maybe<string>, endTime?: Maybe<string>, name: { __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }, shortDescription: { __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }, description: { __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }, images: Array<{ __typename?: 'Image', id?: Maybe<string>, internalId: string, license?: Maybe<string>, name: string, url: string, cropping?: Maybe<string>, photographerName?: Maybe<string>, altText?: Maybe<string> }>, infoUrl?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }>, pEvent: { __typename?: 'PalvelutarjotinEventNode', id: string, nextOccurrenceDatetime?: Maybe<any>, autoAcceptance: boolean, contactEmail: string, contactPhoneNumber: string, enrolmentEndDays?: Maybe<number>, enrolmentStart?: Maybe<any>, neededOccurrences: number, mandatoryAdditionalInformation: boolean, contactPerson?: Maybe<{ __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language }>, organisation?: Maybe<{ __typename?: 'OrganisationNode', id: string, name: string, phoneNumber: string, publisherId: string, type: OrganisationType, persons: { __typename?: 'PersonNodeConnection', edges: Array<Maybe<{ __typename?: 'PersonNodeEdge', node?: Maybe<{ __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language }> }>> } }>, occurrences: { __typename?: 'OccurrenceNodeConnection', edges: Array<Maybe<{ __typename?: 'OccurrenceNodeEdge', node?: Maybe<{ __typename?: 'OccurrenceNode', id: string, amountOfSeats: number, minGroupSize?: Maybe<number>, maxGroupSize?: Maybe<number>, seatsTaken: number, seatsApproved: number, seatType: OccurrenceSeatType, remainingSeats: number, startTime: any, endTime: any, placeId: string, cancelled: boolean, pEvent?: Maybe<{ __typename?: 'PalvelutarjotinEventNode', id: string }>, languages: { __typename?: 'LanguageNodeConnection', edges: Array<Maybe<{ __typename?: 'LanguageNodeEdge', node?: Maybe<{ __typename?: 'LanguageNode', id: string, name: string }> }>> } }> }>> } }, inLanguage: Array<{ __typename?: 'InLanguage', id?: Maybe<string>, internalId: string, name?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }> }>, audience: Array<{ __typename?: 'Keyword', id?: Maybe<string>, internalId: string, name?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }> }>, keywords: Array<{ __typename?: 'Keyword', id?: Maybe<string>, internalId: string, name?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }> }>, location?: Maybe<{ __typename?: 'Place', id?: Maybe<string>, internalId: string, name?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }>, streetAddress?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }>, addressLocality?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }>, telephone?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }> }>, venue?: Maybe<{ __typename?: 'VenueNode', id: string, hasClothingStorage: boolean, hasSnackEatingPlace: boolean, outdoorActivity: boolean, hasToiletNearby: boolean, hasAreaForGroupWork: boolean, hasIndoorPlayingArea: boolean, hasOutdoorPlayingArea: boolean, translations: Array<{ __typename?: 'VenueTranslationType', languageCode: Language, description: string }> }>, offers: Array<{ __typename?: 'Offer', isFree?: Maybe<boolean>, description?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }>, price?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }>, infoUrl?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }> }> };

export type EventQueryVariables = Exact<{
  id: Scalars['ID'];
  include?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
}>;


export type EventQuery = { __typename?: 'Query', event?: Maybe<{ __typename?: 'Event', id: string, internalId: string, startTime?: Maybe<string>, publicationStatus?: Maybe<string>, datePublished?: Maybe<string>, endTime?: Maybe<string>, additionalCriteria: Array<{ __typename?: 'Keyword', id?: Maybe<string>, internalId: string, name?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }> }>, categories: Array<{ __typename?: 'Keyword', id?: Maybe<string>, internalId: string, name?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }> }>, name: { __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }, shortDescription: { __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }, description: { __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }, images: Array<{ __typename?: 'Image', id?: Maybe<string>, internalId: string, license?: Maybe<string>, name: string, url: string, cropping?: Maybe<string>, photographerName?: Maybe<string>, altText?: Maybe<string> }>, infoUrl?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }>, pEvent: { __typename?: 'PalvelutarjotinEventNode', id: string, nextOccurrenceDatetime?: Maybe<any>, autoAcceptance: boolean, contactEmail: string, contactPhoneNumber: string, enrolmentEndDays?: Maybe<number>, enrolmentStart?: Maybe<any>, neededOccurrences: number, mandatoryAdditionalInformation: boolean, contactPerson?: Maybe<{ __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language }>, organisation?: Maybe<{ __typename?: 'OrganisationNode', id: string, name: string, phoneNumber: string, publisherId: string, type: OrganisationType, persons: { __typename?: 'PersonNodeConnection', edges: Array<Maybe<{ __typename?: 'PersonNodeEdge', node?: Maybe<{ __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language }> }>> } }>, occurrences: { __typename?: 'OccurrenceNodeConnection', edges: Array<Maybe<{ __typename?: 'OccurrenceNodeEdge', node?: Maybe<{ __typename?: 'OccurrenceNode', id: string, amountOfSeats: number, minGroupSize?: Maybe<number>, maxGroupSize?: Maybe<number>, seatsTaken: number, seatsApproved: number, seatType: OccurrenceSeatType, remainingSeats: number, startTime: any, endTime: any, placeId: string, cancelled: boolean, pEvent?: Maybe<{ __typename?: 'PalvelutarjotinEventNode', id: string }>, languages: { __typename?: 'LanguageNodeConnection', edges: Array<Maybe<{ __typename?: 'LanguageNodeEdge', node?: Maybe<{ __typename?: 'LanguageNode', id: string, name: string }> }>> } }> }>> } }, inLanguage: Array<{ __typename?: 'InLanguage', id?: Maybe<string>, internalId: string, name?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }> }>, audience: Array<{ __typename?: 'Keyword', id?: Maybe<string>, internalId: string, name?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }> }>, keywords: Array<{ __typename?: 'Keyword', id?: Maybe<string>, internalId: string, name?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }> }>, location?: Maybe<{ __typename?: 'Place', id?: Maybe<string>, internalId: string, name?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }>, streetAddress?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }>, addressLocality?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }>, telephone?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }> }>, venue?: Maybe<{ __typename?: 'VenueNode', id: string, hasClothingStorage: boolean, hasSnackEatingPlace: boolean, outdoorActivity: boolean, hasToiletNearby: boolean, hasAreaForGroupWork: boolean, hasIndoorPlayingArea: boolean, hasOutdoorPlayingArea: boolean, translations: Array<{ __typename?: 'VenueTranslationType', languageCode: Language, description: string }> }>, offers: Array<{ __typename?: 'Offer', isFree?: Maybe<boolean>, description?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }>, price?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }>, infoUrl?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }> }> }> };

export type MetaFieldsFragment = { __typename?: 'Meta', count?: Maybe<number>, next?: Maybe<string>, previous?: Maybe<string> };

export type EventsQueryVariables = Exact<{
  division?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  end?: Maybe<Scalars['String']>;
  include?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  inLanguage?: Maybe<Scalars['String']>;
  isFree?: Maybe<Scalars['Boolean']>;
  keyword?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  keywordAnd?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  keywordNot?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  language?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  publisher?: Maybe<Scalars['ID']>;
  sort?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['String']>;
  superEvent?: Maybe<Scalars['ID']>;
  superEventType?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  text?: Maybe<Scalars['String']>;
  translation?: Maybe<Scalars['String']>;
  showAll?: Maybe<Scalars['Boolean']>;
  publicationStatus?: Maybe<Scalars['String']>;
}>;


export type EventsQuery = { __typename?: 'Query', events?: Maybe<{ __typename?: 'EventListResponse', meta: { __typename?: 'Meta', count?: Maybe<number>, next?: Maybe<string>, previous?: Maybe<string> }, data: Array<{ __typename?: 'Event', id: string, internalId: string, startTime?: Maybe<string>, publicationStatus?: Maybe<string>, datePublished?: Maybe<string>, endTime?: Maybe<string>, name: { __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }, shortDescription: { __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }, description: { __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }, images: Array<{ __typename?: 'Image', id?: Maybe<string>, internalId: string, license?: Maybe<string>, name: string, url: string, cropping?: Maybe<string>, photographerName?: Maybe<string>, altText?: Maybe<string> }>, infoUrl?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }>, pEvent: { __typename?: 'PalvelutarjotinEventNode', id: string, nextOccurrenceDatetime?: Maybe<any>, autoAcceptance: boolean, contactEmail: string, contactPhoneNumber: string, enrolmentEndDays?: Maybe<number>, enrolmentStart?: Maybe<any>, neededOccurrences: number, mandatoryAdditionalInformation: boolean, contactPerson?: Maybe<{ __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language }>, organisation?: Maybe<{ __typename?: 'OrganisationNode', id: string, name: string, phoneNumber: string, publisherId: string, type: OrganisationType, persons: { __typename?: 'PersonNodeConnection', edges: Array<Maybe<{ __typename?: 'PersonNodeEdge', node?: Maybe<{ __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language }> }>> } }>, occurrences: { __typename?: 'OccurrenceNodeConnection', edges: Array<Maybe<{ __typename?: 'OccurrenceNodeEdge', node?: Maybe<{ __typename?: 'OccurrenceNode', id: string, amountOfSeats: number, minGroupSize?: Maybe<number>, maxGroupSize?: Maybe<number>, seatsTaken: number, seatsApproved: number, seatType: OccurrenceSeatType, remainingSeats: number, startTime: any, endTime: any, placeId: string, cancelled: boolean, pEvent?: Maybe<{ __typename?: 'PalvelutarjotinEventNode', id: string }>, languages: { __typename?: 'LanguageNodeConnection', edges: Array<Maybe<{ __typename?: 'LanguageNodeEdge', node?: Maybe<{ __typename?: 'LanguageNode', id: string, name: string }> }>> } }> }>> } }, inLanguage: Array<{ __typename?: 'InLanguage', id?: Maybe<string>, internalId: string, name?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }> }>, audience: Array<{ __typename?: 'Keyword', id?: Maybe<string>, internalId: string, name?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }> }>, keywords: Array<{ __typename?: 'Keyword', id?: Maybe<string>, internalId: string, name?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }> }>, location?: Maybe<{ __typename?: 'Place', id?: Maybe<string>, internalId: string, name?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }>, streetAddress?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }>, addressLocality?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }>, telephone?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }> }>, venue?: Maybe<{ __typename?: 'VenueNode', id: string, hasClothingStorage: boolean, hasSnackEatingPlace: boolean, outdoorActivity: boolean, hasToiletNearby: boolean, hasAreaForGroupWork: boolean, hasIndoorPlayingArea: boolean, hasOutdoorPlayingArea: boolean, translations: Array<{ __typename?: 'VenueTranslationType', languageCode: Language, description: string }> }>, offers: Array<{ __typename?: 'Offer', isFree?: Maybe<boolean>, description?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }>, price?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }>, infoUrl?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }> }> }> }> };

export type UploadSingleImageMutationVariables = Exact<{
  image: UploadImageMutationInput;
}>;


export type UploadSingleImageMutation = { __typename?: 'Mutation', uploadImageMutation?: Maybe<{ __typename?: 'UploadImageMutation', response?: Maybe<{ __typename?: 'ImageMutationResponse', statusCode: number, body?: Maybe<{ __typename?: 'Image', id?: Maybe<string>, internalId: string, license?: Maybe<string>, name: string, url: string, cropping?: Maybe<string>, photographerName?: Maybe<string>, altText?: Maybe<string> }> }> }> };

export type UpdateSingleImageMutationVariables = Exact<{
  image: UpdateImageMutationInput;
}>;


export type UpdateSingleImageMutation = { __typename?: 'Mutation', updateImageMutation?: Maybe<{ __typename?: 'UpdateImageMutation', response?: Maybe<{ __typename?: 'ImageMutationResponse', statusCode: number, body?: Maybe<{ __typename?: 'Image', id?: Maybe<string>, internalId: string, license?: Maybe<string>, name: string, url: string, cropping?: Maybe<string>, photographerName?: Maybe<string>, altText?: Maybe<string> }> }> }> };

export type ImageFieldsFragment = { __typename?: 'Image', id?: Maybe<string>, internalId: string, license?: Maybe<string>, name: string, url: string, cropping?: Maybe<string>, photographerName?: Maybe<string>, altText?: Maybe<string> };

export type ImageQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ImageQuery = { __typename?: 'Query', image?: Maybe<{ __typename?: 'Image', id?: Maybe<string>, internalId: string, license?: Maybe<string>, name: string, url: string, cropping?: Maybe<string>, photographerName?: Maybe<string>, altText?: Maybe<string> }> };

export type KeywordFieldsFragment = { __typename?: 'Keyword', id?: Maybe<string>, internalId: string, name?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }> };

export type KeywordQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type KeywordQuery = { __typename?: 'Query', keyword?: Maybe<{ __typename?: 'Keyword', id?: Maybe<string>, internalId: string, name?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }> }> };

export type KeywordsQueryVariables = Exact<{
  dataSource?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  showAllKeywords?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
}>;


export type KeywordsQuery = { __typename?: 'Query', keywords?: Maybe<{ __typename?: 'KeywordListResponse', meta: { __typename?: 'Meta', count?: Maybe<number>, next?: Maybe<string>, previous?: Maybe<string> }, data: Array<{ __typename?: 'Keyword', id?: Maybe<string>, internalId: string, name?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }> }> }> };

export type KeywordSetQueryVariables = Exact<{
  setType: KeywordSetType;
}>;


export type KeywordSetQuery = { __typename?: 'Query', keywordSet?: Maybe<{ __typename?: 'KeywordSet', internalId: string, keywords: Array<{ __typename?: 'Keyword', id?: Maybe<string>, internalId: string, name?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }> }>, name?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }> }> };

export type CreateMyProfileMutationVariables = Exact<{
  myProfile: CreateMyProfileMutationInput;
}>;


export type CreateMyProfileMutation = { __typename?: 'Mutation', createMyProfile?: Maybe<{ __typename?: 'CreateMyProfileMutationPayload', myProfile?: Maybe<{ __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, organisationproposalSet: { __typename?: 'OrganisationProposalNodeConnection', edges: Array<Maybe<{ __typename?: 'OrganisationProposalNodeEdge', node?: Maybe<{ __typename?: 'OrganisationProposalNode', name: string }> }>> } }> }> };

export type UpdateMyProfileMutationVariables = Exact<{
  myProfile: UpdateMyProfileMutationInput;
}>;


export type UpdateMyProfileMutation = { __typename?: 'Mutation', updateMyProfile?: Maybe<{ __typename?: 'UpdateMyProfileMutationPayload', myProfile?: Maybe<{ __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language, organisations: { __typename?: 'OrganisationNodeConnection', edges: Array<Maybe<{ __typename?: 'OrganisationNodeEdge', node?: Maybe<{ __typename?: 'OrganisationNode', id: string, name: string, phoneNumber: string, publisherId: string, type: OrganisationType, persons: { __typename?: 'PersonNodeConnection', edges: Array<Maybe<{ __typename?: 'PersonNodeEdge', node?: Maybe<{ __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language }> }>> } }> }>> }, organisationproposalSet: { __typename?: 'OrganisationProposalNodeConnection', edges: Array<Maybe<{ __typename?: 'OrganisationProposalNodeEdge', node?: Maybe<{ __typename?: 'OrganisationProposalNode', name: string }> }>> } }> }> };

export type MyProfileFieldsFragment = { __typename?: 'PersonNode', isStaff: boolean, language: Language, id: string, emailAddress: string, name: string, phoneNumber: string, organisations: { __typename?: 'OrganisationNodeConnection', edges: Array<Maybe<{ __typename?: 'OrganisationNodeEdge', node?: Maybe<{ __typename?: 'OrganisationNode', id: string, name: string, phoneNumber: string, publisherId: string, type: OrganisationType, persons: { __typename?: 'PersonNodeConnection', edges: Array<Maybe<{ __typename?: 'PersonNodeEdge', node?: Maybe<{ __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language }> }>> } }> }>> }, organisationproposalSet: { __typename?: 'OrganisationProposalNodeConnection', edges: Array<Maybe<{ __typename?: 'OrganisationProposalNodeEdge', node?: Maybe<{ __typename?: 'OrganisationProposalNode', name: string }> }>> } };

export type MyProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type MyProfileQuery = { __typename?: 'Query', myProfile?: Maybe<{ __typename?: 'PersonNode', isStaff: boolean, language: Language, id: string, emailAddress: string, name: string, phoneNumber: string, organisations: { __typename?: 'OrganisationNodeConnection', edges: Array<Maybe<{ __typename?: 'OrganisationNodeEdge', node?: Maybe<{ __typename?: 'OrganisationNode', id: string, name: string, phoneNumber: string, publisherId: string, type: OrganisationType, persons: { __typename?: 'PersonNodeConnection', edges: Array<Maybe<{ __typename?: 'PersonNodeEdge', node?: Maybe<{ __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language }> }>> } }> }>> }, organisationproposalSet: { __typename?: 'OrganisationProposalNodeConnection', edges: Array<Maybe<{ __typename?: 'OrganisationProposalNodeEdge', node?: Maybe<{ __typename?: 'OrganisationProposalNode', name: string }> }>> } }> };

export type AddOccurrenceMutationVariables = Exact<{
  input: AddOccurrenceMutationInput;
}>;


export type AddOccurrenceMutation = { __typename?: 'Mutation', addOccurrence?: Maybe<{ __typename?: 'AddOccurrenceMutationPayload', occurrence?: Maybe<{ __typename?: 'OccurrenceNode', id: string, amountOfSeats: number, minGroupSize?: Maybe<number>, maxGroupSize?: Maybe<number>, seatsTaken: number, seatsApproved: number, seatType: OccurrenceSeatType, remainingSeats: number, startTime: any, endTime: any, placeId: string, cancelled: boolean, pEvent?: Maybe<{ __typename?: 'PalvelutarjotinEventNode', id: string }>, languages: { __typename?: 'LanguageNodeConnection', edges: Array<Maybe<{ __typename?: 'LanguageNodeEdge', node?: Maybe<{ __typename?: 'LanguageNode', id: string, name: string }> }>> } }> }> };

export type EditOccurrenceMutationVariables = Exact<{
  input: UpdateOccurrenceMutationInput;
}>;


export type EditOccurrenceMutation = { __typename?: 'Mutation', updateOccurrence?: Maybe<{ __typename?: 'UpdateOccurrenceMutationPayload', occurrence?: Maybe<{ __typename?: 'OccurrenceNode', id: string, amountOfSeats: number, minGroupSize?: Maybe<number>, maxGroupSize?: Maybe<number>, seatsTaken: number, seatsApproved: number, seatType: OccurrenceSeatType, remainingSeats: number, startTime: any, endTime: any, placeId: string, cancelled: boolean, pEvent?: Maybe<{ __typename?: 'PalvelutarjotinEventNode', id: string }>, languages: { __typename?: 'LanguageNodeConnection', edges: Array<Maybe<{ __typename?: 'LanguageNodeEdge', node?: Maybe<{ __typename?: 'LanguageNode', id: string, name: string }> }>> } }> }> };

export type LanguageFieldsFragment = { __typename?: 'LanguageNode', id: string, name: string };

export type OccurrenceFieldsFragment = { __typename?: 'OccurrenceNode', id: string, amountOfSeats: number, minGroupSize?: Maybe<number>, maxGroupSize?: Maybe<number>, seatsTaken: number, seatsApproved: number, seatType: OccurrenceSeatType, remainingSeats: number, startTime: any, endTime: any, placeId: string, cancelled: boolean, pEvent?: Maybe<{ __typename?: 'PalvelutarjotinEventNode', id: string }>, languages: { __typename?: 'LanguageNodeConnection', edges: Array<Maybe<{ __typename?: 'LanguageNodeEdge', node?: Maybe<{ __typename?: 'LanguageNode', id: string, name: string }> }>> } };

export type OccurrenceQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type OccurrenceQuery = { __typename?: 'Query', occurrence?: Maybe<{ __typename?: 'OccurrenceNode', id: string, amountOfSeats: number, minGroupSize?: Maybe<number>, maxGroupSize?: Maybe<number>, seatsTaken: number, seatsApproved: number, seatType: OccurrenceSeatType, remainingSeats: number, startTime: any, endTime: any, placeId: string, cancelled: boolean, enrolments: { __typename?: 'EnrolmentNodeConnection', edges: Array<Maybe<{ __typename?: 'EnrolmentNodeEdge', node?: Maybe<{ __typename?: 'EnrolmentNode', id: string, notificationType?: Maybe<NotificationType>, enrolmentTime: any, status?: Maybe<EnrolmentStatus>, person?: Maybe<{ __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language }>, studyGroup: { __typename?: 'StudyGroupNode', id: string, groupSize: number, amountOfAdult: number, name: string, groupName: string, extraNeeds: string, studyLevels: { __typename?: 'StudyLevelNodeConnection', edges: Array<Maybe<{ __typename?: 'StudyLevelNodeEdge', node?: Maybe<{ __typename?: 'StudyLevelNode', id: string, label?: Maybe<string>, level: number, translations: Array<{ __typename?: 'StudyLevelTranslationType', languageCode: Language, label: string }> }> }>> }, person: { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language } } }> }>> }, pEvent?: Maybe<{ __typename?: 'PalvelutarjotinEventNode', id: string }>, languages: { __typename?: 'LanguageNodeConnection', edges: Array<Maybe<{ __typename?: 'LanguageNodeEdge', node?: Maybe<{ __typename?: 'LanguageNode', id: string, name: string }> }>> } }> };

export type DeleteOccurrenceMutationVariables = Exact<{
  input: DeleteOccurrenceMutationInput;
}>;


export type DeleteOccurrenceMutation = { __typename?: 'Mutation', deleteOccurrence?: Maybe<{ __typename?: 'DeleteOccurrenceMutationPayload', clientMutationId?: Maybe<string> }> };

export type CancelOccurrenceMutationVariables = Exact<{
  input: CancelOccurrenceMutationInput;
}>;


export type CancelOccurrenceMutation = { __typename?: 'Mutation', cancelOccurrence?: Maybe<{ __typename?: 'CancelOccurrenceMutationPayload', clientMutationId?: Maybe<string> }> };

export type OccurrencesQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  cancelled?: Maybe<Scalars['Boolean']>;
  pEvent?: Maybe<Scalars['ID']>;
  orderBy?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
}>;


export type OccurrencesQuery = { __typename?: 'Query', occurrences?: Maybe<{ __typename?: 'OccurrenceNodeConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: Maybe<string>, endCursor?: Maybe<string> }, edges: Array<Maybe<{ __typename?: 'OccurrenceNodeEdge', cursor: string, node?: Maybe<{ __typename?: 'OccurrenceNode', id: string, amountOfSeats: number, minGroupSize?: Maybe<number>, maxGroupSize?: Maybe<number>, seatsTaken: number, seatsApproved: number, seatType: OccurrenceSeatType, remainingSeats: number, startTime: any, endTime: any, placeId: string, cancelled: boolean, pEvent?: Maybe<{ __typename?: 'PalvelutarjotinEventNode', id: string }>, languages: { __typename?: 'LanguageNodeConnection', edges: Array<Maybe<{ __typename?: 'LanguageNodeEdge', node?: Maybe<{ __typename?: 'LanguageNode', id: string, name: string }> }>> } }> }>> }> };

export type OrganisationNodeFieldsFragment = { __typename?: 'OrganisationNode', id: string, name: string, phoneNumber: string, publisherId: string, type: OrganisationType, persons: { __typename?: 'PersonNodeConnection', edges: Array<Maybe<{ __typename?: 'PersonNodeEdge', node?: Maybe<{ __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language }> }>> } };

export type OrganisationQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type OrganisationQuery = { __typename?: 'Query', organisation?: Maybe<{ __typename?: 'OrganisationNode', id: string, name: string, phoneNumber: string, publisherId: string, type: OrganisationType, persons: { __typename?: 'PersonNodeConnection', edges: Array<Maybe<{ __typename?: 'PersonNodeEdge', node?: Maybe<{ __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language }> }>> } }> };

export type PageInfoFieldsFragment = { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: Maybe<string>, endCursor?: Maybe<string> };

export type OrganisationsQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
}>;


export type OrganisationsQuery = { __typename?: 'Query', organisations?: Maybe<{ __typename?: 'OrganisationNodeConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: Maybe<string>, endCursor?: Maybe<string> }, edges: Array<Maybe<{ __typename?: 'OrganisationNodeEdge', node?: Maybe<{ __typename?: 'OrganisationNode', id: string, name: string, phoneNumber: string, publisherId: string, type: OrganisationType, persons: { __typename?: 'PersonNodeConnection', edges: Array<Maybe<{ __typename?: 'PersonNodeEdge', node?: Maybe<{ __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language }> }>> } }> }>> }> };

export type PersonFieldsFragment = { __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language };

export type PersonQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PersonQuery = { __typename?: 'Query', person?: Maybe<{ __typename?: 'PersonNode', id: string, emailAddress: string, name: string, phoneNumber: string, language: Language }> };

export type PlaceFieldsFragment = { __typename?: 'Place', id?: Maybe<string>, internalId: string, name?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }>, streetAddress?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }>, addressLocality?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }>, telephone?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }> };

export type PlaceQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PlaceQuery = { __typename?: 'Query', place?: Maybe<{ __typename?: 'Place', id?: Maybe<string>, internalId: string, name?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }>, streetAddress?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }>, addressLocality?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }>, telephone?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }> }> };

export type PlacesQueryVariables = Exact<{
  dataSource?: Maybe<Scalars['String']>;
  divisions?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  showAllPlaces?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
}>;


export type PlacesQuery = { __typename?: 'Query', places?: Maybe<{ __typename?: 'PlaceListResponse', meta: { __typename?: 'Meta', count?: Maybe<number>, next?: Maybe<string>, previous?: Maybe<string> }, data: Array<{ __typename?: 'Place', id?: Maybe<string>, internalId: string, name?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }>, streetAddress?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }>, addressLocality?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }>, telephone?: Maybe<{ __typename?: 'LocalisedObject', en?: Maybe<string>, fi?: Maybe<string>, sv?: Maybe<string> }> }> }> };

export type StudyLevelFieldsFragment = { __typename?: 'StudyLevelNode', id: string, label?: Maybe<string>, level: number, translations: Array<{ __typename?: 'StudyLevelTranslationType', languageCode: Language, label: string }> };

export type StudyLevelsQueryVariables = Exact<{ [key: string]: never; }>;


export type StudyLevelsQuery = { __typename?: 'Query', studyLevels?: Maybe<{ __typename?: 'StudyLevelNodeConnection', edges: Array<Maybe<{ __typename?: 'StudyLevelNodeEdge', node?: Maybe<{ __typename?: 'StudyLevelNode', id: string, label?: Maybe<string>, level: number, translations: Array<{ __typename?: 'StudyLevelTranslationType', languageCode: Language, label: string }> }> }>> }> };

export type StudyLevelQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type StudyLevelQuery = { __typename?: 'Query', studyLevel?: Maybe<{ __typename?: 'StudyLevelNode', id: string, label?: Maybe<string>, level: number, translations: Array<{ __typename?: 'StudyLevelTranslationType', languageCode: Language, label: string }> }> };

export type CreateVenueMutationVariables = Exact<{
  venue: AddVenueMutationInput;
}>;


export type CreateVenueMutation = { __typename?: 'Mutation', addVenue?: Maybe<{ __typename?: 'AddVenueMutationPayload', venue?: Maybe<{ __typename?: 'VenueNode', id: string, hasClothingStorage: boolean, hasSnackEatingPlace: boolean, outdoorActivity: boolean, hasToiletNearby: boolean, hasAreaForGroupWork: boolean, hasIndoorPlayingArea: boolean, hasOutdoorPlayingArea: boolean, translations: Array<{ __typename?: 'VenueTranslationType', languageCode: Language, description: string }> }> }> };

export type EditVenueMutationVariables = Exact<{
  venue: UpdateVenueMutationInput;
}>;


export type EditVenueMutation = { __typename?: 'Mutation', updateVenue?: Maybe<{ __typename?: 'UpdateVenueMutationPayload', venue?: Maybe<{ __typename?: 'VenueNode', id: string, hasClothingStorage: boolean, hasSnackEatingPlace: boolean, outdoorActivity: boolean, hasToiletNearby: boolean, hasAreaForGroupWork: boolean, hasIndoorPlayingArea: boolean, hasOutdoorPlayingArea: boolean, translations: Array<{ __typename?: 'VenueTranslationType', languageCode: Language, description: string }> }> }> };

export type VenueFieldsFragment = { __typename?: 'VenueNode', id: string, hasClothingStorage: boolean, hasSnackEatingPlace: boolean, outdoorActivity: boolean, hasToiletNearby: boolean, hasAreaForGroupWork: boolean, hasIndoorPlayingArea: boolean, hasOutdoorPlayingArea: boolean, translations: Array<{ __typename?: 'VenueTranslationType', languageCode: Language, description: string }> };

export type VenueQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type VenueQuery = { __typename?: 'Query', venue?: Maybe<{ __typename?: 'VenueNode', id: string, hasClothingStorage: boolean, hasSnackEatingPlace: boolean, outdoorActivity: boolean, hasToiletNearby: boolean, hasAreaForGroupWork: boolean, hasIndoorPlayingArea: boolean, hasOutdoorPlayingArea: boolean, translations: Array<{ __typename?: 'VenueTranslationType', languageCode: Language, description: string }> }> };

export const PersonFieldsFragmentDoc = gql`
    fragment personFields on PersonNode {
  id
  emailAddress
  name
  phoneNumber
  language
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
  name
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
  contactPerson {
    ...personFields
  }
  contactEmail
  contactPhoneNumber
  enrolmentEndDays
  enrolmentStart
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
export function useEnrolmentTemplateContextQuery(baseOptions: Apollo.QueryHookOptions<EnrolmentTemplateContextQuery, EnrolmentTemplateContextQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EnrolmentTemplateContextQuery, EnrolmentTemplateContextQueryVariables>(EnrolmentTemplateContextDocument, options);
      }
export function useEnrolmentTemplateContextLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EnrolmentTemplateContextQuery, EnrolmentTemplateContextQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EnrolmentTemplateContextQuery, EnrolmentTemplateContextQueryVariables>(EnrolmentTemplateContextDocument, options);
        }
export type EnrolmentTemplateContextQueryHookResult = ReturnType<typeof useEnrolmentTemplateContextQuery>;
export type EnrolmentTemplateContextLazyQueryHookResult = ReturnType<typeof useEnrolmentTemplateContextLazyQuery>;
export type EnrolmentTemplateContextQueryResult = Apollo.QueryResult<EnrolmentTemplateContextQuery, EnrolmentTemplateContextQueryVariables>;
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
export function useEventNameQuery(baseOptions: Apollo.QueryHookOptions<EventNameQuery, EventNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventNameQuery, EventNameQueryVariables>(EventNameDocument, options);
      }
export function useEventNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventNameQuery, EventNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventNameQuery, EventNameQueryVariables>(EventNameDocument, options);
        }
export type EventNameQueryHookResult = ReturnType<typeof useEventNameQuery>;
export type EventNameLazyQueryHookResult = ReturnType<typeof useEventNameLazyQuery>;
export type EventNameQueryResult = Apollo.QueryResult<EventNameQuery, EventNameQueryVariables>;
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
export function useEnrolmentQuery(baseOptions: Apollo.QueryHookOptions<EnrolmentQuery, EnrolmentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EnrolmentQuery, EnrolmentQueryVariables>(EnrolmentDocument, options);
      }
export function useEnrolmentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EnrolmentQuery, EnrolmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EnrolmentQuery, EnrolmentQueryVariables>(EnrolmentDocument, options);
        }
export type EnrolmentQueryHookResult = ReturnType<typeof useEnrolmentQuery>;
export type EnrolmentLazyQueryHookResult = ReturnType<typeof useEnrolmentLazyQuery>;
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
export function useNotificationTemplateQuery(baseOptions: Apollo.QueryHookOptions<NotificationTemplateQuery, NotificationTemplateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotificationTemplateQuery, NotificationTemplateQueryVariables>(NotificationTemplateDocument, options);
      }
export function useNotificationTemplateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationTemplateQuery, NotificationTemplateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotificationTemplateQuery, NotificationTemplateQueryVariables>(NotificationTemplateDocument, options);
        }
export type NotificationTemplateQueryHookResult = ReturnType<typeof useNotificationTemplateQuery>;
export type NotificationTemplateLazyQueryHookResult = ReturnType<typeof useNotificationTemplateLazyQuery>;
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
export function useEventQuery(baseOptions: Apollo.QueryHookOptions<EventQuery, EventQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventQuery, EventQueryVariables>(EventDocument, options);
      }
export function useEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventQuery, EventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventQuery, EventQueryVariables>(EventDocument, options);
        }
export type EventQueryHookResult = ReturnType<typeof useEventQuery>;
export type EventLazyQueryHookResult = ReturnType<typeof useEventLazyQuery>;
export type EventQueryResult = Apollo.QueryResult<EventQuery, EventQueryVariables>;
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
export type EventsQueryHookResult = ReturnType<typeof useEventsQuery>;
export type EventsLazyQueryHookResult = ReturnType<typeof useEventsLazyQuery>;
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
export function useImageQuery(baseOptions: Apollo.QueryHookOptions<ImageQuery, ImageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ImageQuery, ImageQueryVariables>(ImageDocument, options);
      }
export function useImageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ImageQuery, ImageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ImageQuery, ImageQueryVariables>(ImageDocument, options);
        }
export type ImageQueryHookResult = ReturnType<typeof useImageQuery>;
export type ImageLazyQueryHookResult = ReturnType<typeof useImageLazyQuery>;
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
export function useKeywordQuery(baseOptions: Apollo.QueryHookOptions<KeywordQuery, KeywordQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<KeywordQuery, KeywordQueryVariables>(KeywordDocument, options);
      }
export function useKeywordLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<KeywordQuery, KeywordQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<KeywordQuery, KeywordQueryVariables>(KeywordDocument, options);
        }
export type KeywordQueryHookResult = ReturnType<typeof useKeywordQuery>;
export type KeywordLazyQueryHookResult = ReturnType<typeof useKeywordLazyQuery>;
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
export type KeywordsQueryHookResult = ReturnType<typeof useKeywordsQuery>;
export type KeywordsLazyQueryHookResult = ReturnType<typeof useKeywordsLazyQuery>;
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
export function useKeywordSetQuery(baseOptions: Apollo.QueryHookOptions<KeywordSetQuery, KeywordSetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<KeywordSetQuery, KeywordSetQueryVariables>(KeywordSetDocument, options);
      }
export function useKeywordSetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<KeywordSetQuery, KeywordSetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<KeywordSetQuery, KeywordSetQueryVariables>(KeywordSetDocument, options);
        }
export type KeywordSetQueryHookResult = ReturnType<typeof useKeywordSetQuery>;
export type KeywordSetLazyQueryHookResult = ReturnType<typeof useKeywordSetLazyQuery>;
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
export type MyProfileQueryHookResult = ReturnType<typeof useMyProfileQuery>;
export type MyProfileLazyQueryHookResult = ReturnType<typeof useMyProfileLazyQuery>;
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
export function useOccurrenceQuery(baseOptions: Apollo.QueryHookOptions<OccurrenceQuery, OccurrenceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OccurrenceQuery, OccurrenceQueryVariables>(OccurrenceDocument, options);
      }
export function useOccurrenceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OccurrenceQuery, OccurrenceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OccurrenceQuery, OccurrenceQueryVariables>(OccurrenceDocument, options);
        }
export type OccurrenceQueryHookResult = ReturnType<typeof useOccurrenceQuery>;
export type OccurrenceLazyQueryHookResult = ReturnType<typeof useOccurrenceLazyQuery>;
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
export type OccurrencesQueryHookResult = ReturnType<typeof useOccurrencesQuery>;
export type OccurrencesLazyQueryHookResult = ReturnType<typeof useOccurrencesLazyQuery>;
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
export function useOrganisationQuery(baseOptions: Apollo.QueryHookOptions<OrganisationQuery, OrganisationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrganisationQuery, OrganisationQueryVariables>(OrganisationDocument, options);
      }
export function useOrganisationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrganisationQuery, OrganisationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrganisationQuery, OrganisationQueryVariables>(OrganisationDocument, options);
        }
export type OrganisationQueryHookResult = ReturnType<typeof useOrganisationQuery>;
export type OrganisationLazyQueryHookResult = ReturnType<typeof useOrganisationLazyQuery>;
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
export type OrganisationsQueryHookResult = ReturnType<typeof useOrganisationsQuery>;
export type OrganisationsLazyQueryHookResult = ReturnType<typeof useOrganisationsLazyQuery>;
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
export function usePersonQuery(baseOptions: Apollo.QueryHookOptions<PersonQuery, PersonQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PersonQuery, PersonQueryVariables>(PersonDocument, options);
      }
export function usePersonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PersonQuery, PersonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PersonQuery, PersonQueryVariables>(PersonDocument, options);
        }
export type PersonQueryHookResult = ReturnType<typeof usePersonQuery>;
export type PersonLazyQueryHookResult = ReturnType<typeof usePersonLazyQuery>;
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
export function usePlaceQuery(baseOptions: Apollo.QueryHookOptions<PlaceQuery, PlaceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlaceQuery, PlaceQueryVariables>(PlaceDocument, options);
      }
export function usePlaceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlaceQuery, PlaceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlaceQuery, PlaceQueryVariables>(PlaceDocument, options);
        }
export type PlaceQueryHookResult = ReturnType<typeof usePlaceQuery>;
export type PlaceLazyQueryHookResult = ReturnType<typeof usePlaceLazyQuery>;
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
export type PlacesQueryHookResult = ReturnType<typeof usePlacesQuery>;
export type PlacesLazyQueryHookResult = ReturnType<typeof usePlacesLazyQuery>;
export type PlacesQueryResult = Apollo.QueryResult<PlacesQuery, PlacesQueryVariables>;
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
export type StudyLevelsQueryHookResult = ReturnType<typeof useStudyLevelsQuery>;
export type StudyLevelsLazyQueryHookResult = ReturnType<typeof useStudyLevelsLazyQuery>;
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
export function useStudyLevelQuery(baseOptions: Apollo.QueryHookOptions<StudyLevelQuery, StudyLevelQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StudyLevelQuery, StudyLevelQueryVariables>(StudyLevelDocument, options);
      }
export function useStudyLevelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StudyLevelQuery, StudyLevelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StudyLevelQuery, StudyLevelQueryVariables>(StudyLevelDocument, options);
        }
export type StudyLevelQueryHookResult = ReturnType<typeof useStudyLevelQuery>;
export type StudyLevelLazyQueryHookResult = ReturnType<typeof useStudyLevelLazyQuery>;
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
export function useVenueQuery(baseOptions: Apollo.QueryHookOptions<VenueQuery, VenueQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VenueQuery, VenueQueryVariables>(VenueDocument, options);
      }
export function useVenueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VenueQuery, VenueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VenueQuery, VenueQueryVariables>(VenueDocument, options);
        }
export type VenueQueryHookResult = ReturnType<typeof useVenueQuery>;
export type VenueLazyQueryHookResult = ReturnType<typeof useVenueLazyQuery>;
export type VenueQueryResult = Apollo.QueryResult<VenueQuery, VenueQueryVariables>;