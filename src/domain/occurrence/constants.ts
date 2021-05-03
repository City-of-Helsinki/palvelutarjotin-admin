import { TimeAndLocationFormFields } from './types';

export enum OCCURRENCE_URL_PARAMS {
  ENROLMENT_UPDATED = 'enrolmentUpdated',
}

export const defaultInitialValues: TimeAndLocationFormFields = {
  location: '',
  isVirtual: false,
  enrolmentNeeded: false,
  externalEnrolment: false,
  externalEnrolmentUrl: '',
  enrolmentStart: null,
  enrolmentEndDays: '',
  neededOccurrences: '',
  autoAcceptance: true,
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
