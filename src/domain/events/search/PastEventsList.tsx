import { useTranslation } from 'react-i18next';

import EventsCategoryList, {
  EventsCategoryListProps,
} from '../eventsCategoryList/EventsCategoryList';
import { useEventsSearchQueryContext } from '../hooks/useEventsSearchQueryContext';

export default function PastEventsList({
  goToEventSummaryPage,
}: {
  goToEventSummaryPage: EventsCategoryListProps['onGoToEventSummaryPage'];
}) {
  const { t } = useTranslation();
  const {
    loadingMorePastEvents,
    fetchMorePastEvents,
    pastEventsHasNextPage,
    eventsWithPastOccurrences,
    eventsWithPastOccurrencesCount,
  } = useEventsSearchQueryContext();
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
