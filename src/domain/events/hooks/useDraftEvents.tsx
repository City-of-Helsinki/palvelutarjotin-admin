import { PUBLICATION_STATUS } from '../constants';
import { useEventsQueryHelper } from '../utils';
import useEventsQueryBaseVariables from './useEventsQueryBaseVariables';

export default function useDraftEvents(eventsContext: any) {
  const baseVariables = useEventsQueryBaseVariables(eventsContext);
  return useEventsQueryHelper({
    skip: !baseVariables.publisher,
    variables: {
      ...baseVariables,
      // when querying for events that are in draft should have no occurrences
      publicationStatus: PUBLICATION_STATUS.DRAFT,
    },
  });
}
