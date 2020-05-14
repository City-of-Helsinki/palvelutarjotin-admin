import { Event, Image, LocalisedObject } from '../../generated/graphql';

export type EventInList = Pick<Event, 'id' | 'startTime' | 'endTime'> & {
  images: Array<Pick<Image, 'id' | 'name' | 'url'>>;
  name: LocalisedObject;
};
