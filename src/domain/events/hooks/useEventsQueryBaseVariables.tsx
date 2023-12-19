import { EventsQueryVariables } from '../../../generated/graphql';
import { EVENT_SORT_KEYS, PAGE_SIZE } from '../constants';
import { PlaceOption } from '../types';

export default function useEventsQueryBaseVariables({
  searchValue,
  placesValue,
  selectedOrganisation,
}: any): EventsQueryVariables {
  return {
    pageSize: PAGE_SIZE,
    publisher: selectedOrganisation?.publisherId,
    sort: EVENT_SORT_KEYS.START_TIME,
    text: searchValue,
    location: placesValue.map((p: PlaceOption) => p.value).join(','),
    showAll: true,
  };
}
