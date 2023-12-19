import { useTranslation } from 'react-i18next';

import EventsCategoryList, {
  EventsCategoryListProps,
} from '../eventsCategoryList/EventsCategoryList';
import { useEventsSearchQueryContext } from '../hooks/useEventsSearchQueryContext';

export default function DraftEventsList({
  goToEventSummaryPage,
}: {
  goToEventSummaryPage: EventsCategoryListProps['onGoToEventSummaryPage'];
}) {
  const { t } = useTranslation();
  const {
    loadingMoreEventsWithoutOccurrences,
    fetchMoreEventsWithoutOccurrences,
    eventsWithoutOccurrencesHasNextPage,
    eventsWithoutOccurrences,
    eventsWithoutOccurrencesCount,
  } = useEventsSearchQueryContext();
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
