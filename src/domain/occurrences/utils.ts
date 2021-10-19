import { format } from 'date-fns';

import { EventFieldsFragment } from '../../generated/graphql';

export const getEventPublishedTime = (event: EventFieldsFragment) => {
  const dateFormat = 'd.M.yyyy HH:mm';

  // TODO: use only this when it is available
  if (event.datePublished) {
    return format(new Date(event.datePublished), dateFormat);
  }

  if (event.startTime) {
    return format(new Date(event.startTime), dateFormat);
  }

  return null;
};
