import { EventFieldsFragment } from '../../generated/graphql';
import { formatIntoDateTime } from '../../utils/time/format';

export const getEventPublishedTime = (event: EventFieldsFragment) => {
  // TODO: use only this when it is available
  if (event.datePublished) {
    return formatIntoDateTime(new Date(event.datePublished));
  }

  if (event.startTime) {
    return formatIntoDateTime(new Date(event.startTime));
  }

  return null;
};
