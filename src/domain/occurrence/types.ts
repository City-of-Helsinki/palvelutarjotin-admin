import { VenueDataFields } from '../venue/types';

export interface OccurrenceFormFields extends VenueDataFields {
  autoAcceptance: boolean;
  date: Date | null;
  startsAt: string;
  endsAt: string;
  languages: string[];
  placeId: string;
  amountOfSeats: string;
  maxGroupSize: string;
  minGroupSize: string;
}