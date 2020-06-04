import { isFuture } from 'date-fns';
import forEach from 'lodash/forEach';

import { EventFieldsFragment } from '../../generated/graphql';

export const hasOccurrences = (event: EventFieldsFragment) => {
  return Boolean(event.pEvent?.occurrences.edges.length);
};

export const hasComingOccurrences = (event: EventFieldsFragment) => {
  let hasComingItems = false;

  forEach(event.pEvent?.occurrences.edges, (edge) => {
    if (edge?.node?.startTime && isFuture(new Date(edge?.node?.startTime))) {
      hasComingItems = true;
      return false;
    }
  });

  return Boolean(hasComingItems);
};
