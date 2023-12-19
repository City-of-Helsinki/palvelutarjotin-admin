import useDraftEvents from './useDraftEvents';
import usePastEvents from './usePastEvents';
import useUpcomingEvents from './useUpcomingEvents';

export default function useEventsPageQueries(eventsContext: any) {
  const {
    data: upcomingEventsData,
    loading: loadingUpcomingEvents,
    isLoadingMore: isLoadingMoreUpcomingEvents,
    hasNextPage: upcomingEventsHasNextPage,
    fetchMore: fetchMoreUpcomingEvents,
  } = useUpcomingEvents(eventsContext);

  const {
    data: pastEventsData,
    loading: loadingPastEvents,
    isLoadingMore: loadingMorePastEvents,
    fetchMore: fetchMorePastEvents,
    hasNextPage: pastEventsHasNextPage,
  } = usePastEvents(eventsContext);

  const {
    data: eventsWithoutOccurrencesData,
    loading: loadingEventsWithoutOccurrences,
    isLoadingMore: loadingMoreEventsWithoutOccurrences,
    fetchMore: fetchMoreEventsWithoutOccurrences,
    hasNextPage: eventsWithoutOccurrencesHasNextPage,
  } = useDraftEvents(eventsContext);

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
