import { LocalisedObject } from '../../generated/graphql';

export type VenueDataFields = {
  locationDescription?: LocalisedObject | null;
  hasClothingStorage: boolean;
  hasSnackEatingPlace: boolean;
  outdoorActivity: boolean;
  hasToiletNearby: boolean;
  hasAreaForGroupWork: boolean;
  hasIndoorPlayingArea: boolean;
  hasOutdoorPlayingArea: boolean;
};
