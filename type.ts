import { SUPPORT_LANGUAGES } from '../../constants';

export type OldVenueDataFields = {
  locationDescription: string;
  hasClothingStorage: boolean;
  hasSnackEatingPlace: boolean;
  outdoorActivity: boolean;
  hasToiletNearby: boolean;
  hasAreaForGroupWork: boolean;
  hasIndoorPlayingArea: boolean;
  hasOutdoorPlayingArea: boolean;
};

export type VenueDataFields = {
  locationDescription: { [K in SUPPORT_LANGUAGES]: string };
  hasClothingStorage: boolean;
  hasSnackEatingPlace: boolean;
  outdoorActivity: boolean;
  hasToiletNearby: boolean;
  hasAreaForGroupWork: boolean;
  hasIndoorPlayingArea: boolean;
  hasOutdoorPlayingArea: boolean;
};
