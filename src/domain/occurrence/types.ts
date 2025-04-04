import { EnrolmentType } from './constants';
import { SUPPORT_LANGUAGES } from '../../constants';

export interface OccurrenceSectionFormFields {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  languages: string[];
  occurrenceLocation: string;
  amountOfSeats: string;
  maxGroupSize: string;
  minGroupSize: string;
  oneGroupFills: boolean;
  isMultidayOccurrence: boolean;
}

export type LocationDescriptions = { [K in SUPPORT_LANGUAGES]: string };

export type TimeAndLocationFormFields = {
  location: string;
  isVirtual: boolean;
  isBookable: boolean;
  enrolmentNeeded: boolean;
  externalEnrolmentUrl: string;
  enrolmentStartDate: string;
  enrolmentStartTime: string;
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
