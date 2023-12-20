import useDraftEvents from '../hooks/useDraftEvents';
import usePastEvents from '../hooks/usePastEvents';
import useUpcomingEvents from '../hooks/useUpcomingEvents';
import EventsSearchQueryContext from './EventsSearchQueryContext';

function useEventsPageQueriesContext() {
  const {
    data: upcomingEventsData,
    loading: loadingUpcomingEvents,
    isLoadingMore: isLoadingMoreUpcomingEvents,
    hasNextPage: upcomingEventsHasNextPage,
    fetchMore: fetchMoreUpcomingEvents,
  } = useUpcomingEvents();

  const {
    data: pastEventsData,
    loading: loadingPastEvents,
    isLoadingMore: loadingMorePastEvents,
    fetchMore: fetchMorePastEvents,
    hasNextPage: pastEventsHasNextPage,
  } = usePastEvents();

  const {
    data: eventsWithoutOccurrencesData,
    loading: loadingEventsWithoutOccurrences,
    isLoadingMore: loadingMoreEventsWithoutOccurrences,
    fetchMore: fetchMoreEventsWithoutOccurrences,
    hasNextPage: eventsWithoutOccurrencesHasNextPage,
  } = useDraftEvents();

  const eventsWithComingOccurrences = upcomingEventsData?.events?.data || [];
  const eventsWithComingOccurrencesCount =
    upcomingEventsData?.events?.meta.count;

  const eventsWithoutOccurrences =
    eventsWithoutOccurrencesData?.events?.data || [];
  const eventsWithoutOccurrencesCount =
    eventsWithoutOccurrencesData?.events?.meta.count;

  const eventsWithPastOccurrences = pastEventsData?.events?.data || [];
  const eventsWithPastOccurrencesCount = pastEventsData?.events?.meta.count;

  return {
    upcomingEventsData,
    loadingUpcomingEvents,
    isLoadingMoreUpcomingEvents,
    upcomingEventsHasNextPage,
    fetchMoreUpcomingEvents,
    pastEventsData,
    loadingPastEvents,
    loadingMorePastEvents,
    fetchMorePastEvents,
    pastEventsHasNextPage,
    eventsWithoutOccurrencesData,
    loadingEventsWithoutOccurrences,
    loadingMoreEventsWithoutOccurrences,
    fetchMoreEventsWithoutOccurrences,
    eventsWithoutOccurrencesHasNextPage,
    eventsWithComingOccurrences,
    eventsWithComingOccurrencesCount,
    eventsWithoutOccurrences,
    eventsWithoutOccurrencesCount,
    eventsWithPastOccurrences,
    eventsWithPastOccurrencesCount,
  };
}

export type EventsSearchQueryContextType = ReturnType<
  typeof useEventsPageQueriesContext
>;

export function EventsSearchQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const eventsPageQueriesContext = useEventsPageQueriesContext();
  return (
    <EventsSearchQueryContext.Provider value={eventsPageQueriesContext}>
      {children}
    </EventsSearchQueryContext.Provider>
  );
}
