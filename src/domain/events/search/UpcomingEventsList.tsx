import { useTranslation } from 'react-i18next';

import EventsCategoryList, {
  EventsCategoryListProps,
} from '../eventsCategoryList/EventsCategoryList';
import { useEventsSearchQueryContext } from '../hooks/useEventsSearchQueryContext';

export default function UpcomingEventsList({
  goToEventSummaryPage,
}: {
  goToEventSummaryPage: EventsCategoryListProps['onGoToEventSummaryPage'];
}) {
  const { t } = useTranslation();
  const {
    isLoadingMoreUpcomingEvents,
    upcomingEventsHasNextPage,
    fetchMoreUpcomingEvents,
    eventsWithComingOccurrences,
    eventsWithComingOccurrencesCount,
  } = useEventsSearchQueryContext();
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
