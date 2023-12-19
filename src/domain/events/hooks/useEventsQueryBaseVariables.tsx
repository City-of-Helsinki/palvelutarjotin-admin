import { EventsQueryVariables } from '../../../generated/graphql';
import { EVENT_SORT_KEYS, PAGE_SIZE } from '../constants';
import { PlaceOption } from '../types';
import { useEventsSearchFormContext } from './useEventsSearchFormContext';

/**
 * @protected Should only be called from useEventsPageQueriesContext!
 */
export default function useEventsQueryBaseVariables(): EventsQueryVariables {
  const { searchValue, placesValue, selectedOrganisation } =
    useEventsSearchFormContext();
  return {
    pageSize: PAGE_SIZE,
    publisher: selectedOrganisation?.publisherId,
    sort: EVENT_SORT_KEYS.START_TIME,
    text: searchValue,
    location: placesValue.map((p: PlaceOption) => p.value).join(','),
    showAll: true,
  };
}
