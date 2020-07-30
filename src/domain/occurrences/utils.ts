import { format } from 'date-fns';

import { EventFieldsFragment } from '../../generated/graphql';

export const getEventPublishedTime = (event: EventFieldsFragment) => {
  const dateFormat = 'dd.MM.yyyy HH:mm';
  if (event.datePublished) {
    return format(new Date(event.datePublished), dateFormat);
  }

  if (event.startTime) {
    return format(new Date(event.startTime), dateFormat);
  }

  return null;
};
