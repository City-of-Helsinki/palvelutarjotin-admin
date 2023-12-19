import { useTranslation } from 'react-i18next';

import EventsCategoryList from '../eventsCategoryList/EventsCategoryList';
import useEventsPageQueries from '../hooks/useEventsPageQueries';

export default function PastEventsList({
  eventsContext,
  goToEventSummaryPage,
}: any) {
  const { t } = useTranslation();
  const {
    loadingMorePastEvents,
    fetchMorePastEvents,
    pastEventsHasNextPage,
    eventsWithPastOccurrences,
    eventsWithPastOccurrencesCount,
  } = useEventsPageQueries(eventsContext);
  return (
    <EventsCategoryList
      eventsCount={
        eventsWithPastOccurrencesCount || eventsWithPastOccurrences.length
      }
      title={t('events.titleEventsWithPastOccurrences')}
      events={eventsWithPastOccurrences}
      onGoToEventSummaryPage={goToEventSummaryPage}
      isLoadingMoreEvents={loadingMorePastEvents}
      onFetchMoreEvents={fetchMorePastEvents}
      hasNextPage={pastEventsHasNextPage}
    />
  );
}
