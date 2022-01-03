import { SUPPORT_LANGUAGES } from '../../constants';
import { EnrolmentType } from './constants';

export interface OccurrenceSectionFormFields {
  startTime: Date | null;
  endTime: Date | null;
  languages: string[];
  occurrenceLocation: string;
  amountOfSeats: string;
  maxGroupSize: string;
  minGroupSize: string;
  oneGroupFills: boolean;
}

export type LocationDescriptions = { [K in SUPPORT_LANGUAGES]: string };

export type TimeAndLocationFormFields = {
  location: string;
  isVirtual: boolean;
  isBookable: boolean;
  enrolmentNeeded: boolean;
  externalEnrolmentUrl: string;
  enrolmentStart: Date | null;
  enrolmentEndDays: number | string;
  neededOccurrences: number | string;
  autoAcceptance: boolean;
  autoAcceptanceMessage: string | null;
  locationDescription: LocationDescriptions;
  hasClothingStorage: boolean;
  hasSnackEatingPlace: boolean;
  outdoorActivity: boolean;
  hasToiletNearby: boolean;
  hasAreaForGroupWork: boolean;
  hasIndoorPlayingArea: boolean;
  hasOutdoorPlayingArea: boolean;
  enrolmentType: EnrolmentType;
};
