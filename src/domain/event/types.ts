import { Event, Image, LocalisedObject } from '../../generated/graphql';
import { VenueDataFields } from '../venue/types';

export type EventLanguages = 'en' | 'fi' | 'sv';

export type EventInList = Pick<Event, 'id' | 'startTime' | 'endTime'> & {
  images: Array<Pick<Image, 'id' | 'name' | 'url'>>;
  name: LocalisedObject;
};

export interface EventFormFields extends VenueDataFields {
  audience: string[];
  contactEmail: string;
  contactPersonId: string;
  contactPhoneNumber: string;
  description: string;
  duration: string;
  enrolmentEndDays: string;
  enrolmentStart: Date | null;
  image: string;
  imageAltText: string;
  imagePhotographerName: string;
  infoUrl: string;
  inLanguage: string[];
  isFree: boolean;
  keywords: string[];
  location: string;
  name: string;
  neededOccurrences: string;
  price: string;
  shortDescription: string;
}
