import { useTranslation } from 'react-i18next';

import EventsCategoryList from '../eventsCategoryList/EventsCategoryList';
import useEventsPageQueries from '../hooks/useEventsPageQueries';

export default function DraftEventsList({
  eventsContext,
  goToEventSummaryPage,
}: any) {
  const { t } = useTranslation();
  const {
    loadingMoreEventsWithoutOccurrences,
    fetchMoreEventsWithoutOccurrences,
    eventsWithoutOccurrencesHasNextPage,
    eventsWithoutOccurrences,
    eventsWithoutOccurrencesCount,
  } = useEventsPageQueries(eventsContext);
  return (
    <EventsCategoryList
      eventsCount={
        eventsWithoutOccurrencesCount || eventsWithoutOccurrences.length
      }
      title={t('events.titleEventsWithoutOccurrences')}
      events={eventsWithoutOccurrences}
      onGoToEventSummaryPage={goToEventSummaryPage}
      isLoadingMoreEvents={loadingMoreEventsWithoutOccurrences}
      onFetchMoreEvents={fetchMoreEventsWithoutOccurrences}
      hasNextPage={eventsWithoutOccurrencesHasNextPage}
    />
  );
}
