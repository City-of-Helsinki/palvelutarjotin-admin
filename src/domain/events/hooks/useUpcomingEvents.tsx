import { useEventsQueryHelper } from '../utils';
import useEventsQueryBaseVariables from './useEventsQueryBaseVariables';

export default function useUpcomingEvents(eventsContext: any) {
  const baseVariables = useEventsQueryBaseVariables(eventsContext);
  return useEventsQueryHelper({
    skip: !baseVariables.publisher,
    variables: {
      ...baseVariables,
      // with start:now we can get events that have upcoming occurrences
      start: 'now',
    },
  });
}
