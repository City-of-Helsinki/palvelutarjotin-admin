import { TimeAndLocationFormFields } from './types';

export enum OCCURRENCE_URL_PARAMS {
  ENROLMENT_UPDATED = 'enrolmentUpdated',
}

export enum EnrolmentType {
  Internal = 'internal',
  External = 'external',
  Unenrollable = 'unenrollable',
}

export const defaultInitialValues: TimeAndLocationFormFields = {
  location: '',
  isVirtual: false,
  isBookable: false,
  enrolmentType: EnrolmentType.Internal,
  enrolmentNeeded: false,
  externalEnrolmentUrl: '',
  enrolmentStart: null,
  enrolmentEndDays: '',
  neededOccurrences: '',
  autoAcceptance: true,
  autoAcceptanceMessage: '',
  locationDescription: {
    fi: '',
    en: '',
    sv: '',
  },
  hasClothingStorage: false,
  hasSnackEatingPlace: false,
  outdoorActivity: false,
  hasToiletNearby: false,
  hasAreaForGroupWork: false,
  hasIndoorPlayingArea: false,
  hasOutdoorPlayingArea: false,
};
