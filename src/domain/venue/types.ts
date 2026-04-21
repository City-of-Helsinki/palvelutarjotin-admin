import { LocalisedObjectInput } from '../../generated/graphql';

export type VenueDataFields = {
  locationDescription: LocalisedObjectInput;
  hasClothingStorage: boolean;
  hasSnackEatingPlace: boolean;
  outdoorActivity: boolean;
  hasToiletNearby: boolean;
  hasAreaForGroupWork: boolean;
  hasIndoorPlayingArea: boolean;
  hasOutdoorPlayingArea: boolean;
};
