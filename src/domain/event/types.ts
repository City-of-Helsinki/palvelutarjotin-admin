import { Event, Image, LocalisedObject } from '../../generated/graphql';
import { VenueDataFields } from '../venue/types';

export type EventInList = Pick<Event, 'id' | 'startTime' | 'endTime'> & {
  images: Array<Pick<Image, 'id' | 'name' | 'url'>>;
  name: LocalisedObject;
};

export interface EventFormFields extends VenueDataFields {
  audience: string[];
  contactEmail: string;
  contactPersonId: string;
  contactPhoneNumber: string;
  description: LocalisedObject;
  mandatoryAdditionalInformation: boolean;
  enrolmentEndDays: string;
  enrolmentStart: Date | null;
  image: string;
  imageAltText: string;
  imagePhotographerName: string;
  infoUrl: LocalisedObject;
  inLanguage: string[];
  isFree: boolean;
  keywords: string[];
  location: string;
  name: LocalisedObject;
  neededOccurrences: string;
  price: LocalisedObject;
  priceDescription: LocalisedObject;
  shortDescription: LocalisedObject;
  isDraft?: boolean;
  autoAcceptance?: boolean;
  categories: string[];
  additionalCriteria: string[];
  isVirtual: boolean;
}

export interface FirstOccurrenceFields {
  occurrenceDate: Date | null;
  occurrenceStartsAt: string;
  occurrenceEndsAt: string;
}

export type CreateEventFormFields = EventFormFields & FirstOccurrenceFields;
