import { Event, Image, LocalisedObject } from '../../generated/graphql';

export type EventInList = Pick<Event, 'id' | 'startTime' | 'endTime'> & {
  images: Array<Pick<Image, 'id' | 'name' | 'url'>>;
  name: LocalisedObject;
};

export interface CreateEventFormFields {
  audience: string[];
  contactEmail: string;
  contactPersonId: string;
  contactPhoneNumber: string;
  description: LocalisedObject;
  mandatoryAdditionalInformation: boolean;
  image: string;
  imageAltText: string;
  imagePhotographerName: string;
  infoUrl: LocalisedObject;
  inLanguage: string[];
  isFree: boolean;
  keywords: string[];
  name: LocalisedObject;
  price: LocalisedObject;
  priceDescription: LocalisedObject;
  shortDescription: LocalisedObject;
  isDraft?: boolean;
  categories: string[];
  additionalCriteria: string[];
}
