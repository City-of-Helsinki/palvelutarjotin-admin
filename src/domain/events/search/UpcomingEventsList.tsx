import { useTranslation } from 'react-i18next';

import EventsCategoryList from '../eventsCategoryList/EventsCategoryList';
import useEventsPageQueries from '../hooks/useEventsPageQueries';

export default function UpcomingEventsList({
  eventsContext,
  goToEventSummaryPage,
}: any) {
  const { t } = useTranslation();
  const {
    isLoadingMoreUpcomingEvents,
    upcomingEventsHasNextPage,
    fetchMoreUpcomingEvents,
    eventsWithComingOccurrences,
    eventsWithComingOccurrencesCount,
  } = useEventsPageQueries(eventsContext);
  return (
    <EventsCategoryList
      eventsCount={
        eventsWithComingOccurrencesCount || eventsWithComingOccurrences.length
      }
      title={t('events.titleComingEvents')}
      events={eventsWithComingOccurrences}
      onGoToEventSummaryPage={goToEventSummaryPage}
      isLoadingMoreEvents={isLoadingMoreUpcomingEvents}
      onFetchMoreEvents={fetchMoreUpcomingEvents}
      hasNextPage={upcomingEventsHasNextPage}
      notFoundText={t('events.textNoComingEvents')}
    />
  );
}
