import { LocalisedObject } from '../../generated/graphql';

export interface CreateEventFormFields {
  audience: string[];
  contactEmail: string;
  contactPersonId: string;
  contactPhoneNumber: string;
  shortDescription: LocalisedObject;
  description: LocalisedObject;
  mandatoryAdditionalInformation: boolean;
  image: string;
  imageAltText: string;
  imagePhotographerName: string;
  infoUrl: LocalisedObject;
  inLanguage: string[];
  isFree: boolean;
  isQueueingAllowed: boolean;
  keywords: string[];
  name: LocalisedObject;
  price: number | string;
  priceDescription: LocalisedObject;
  isDraft?: boolean;
  categories: string[];
  additionalCriteria: string[];
}
