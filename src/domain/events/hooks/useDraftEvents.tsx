import { PUBLICATION_STATUS } from '../constants';
import { useEventsQueryHelper } from '../utils';
import useEventsQueryBaseVariables from './useEventsQueryBaseVariables';

export default function useDraftEvents() {
  const baseVariables = useEventsQueryBaseVariables();
  return useEventsQueryHelper({
    skip: !baseVariables.publisher,
    variables: {
      ...baseVariables,
      // when querying for events that are in draft should have no occurrences
      publicationStatus: PUBLICATION_STATUS.DRAFT,
    },
  });
}
