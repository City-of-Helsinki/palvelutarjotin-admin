import { PUBLICATION_STATUS } from '../constants';
import { useEventsQueryHelper } from '../utils';
import useEventsQueryBaseVariables from './useEventsQueryBaseVariables';

export default function usePastEvents() {
  const baseVariables = useEventsQueryBaseVariables();
  return useEventsQueryHelper({
    skip: !baseVariables.publisher,
    variables: {
      ...baseVariables,
      // we will egt past events with end:now
      end: 'now',
      publicationStatus: PUBLICATION_STATUS.PUBLIC,
    },
  });
}
