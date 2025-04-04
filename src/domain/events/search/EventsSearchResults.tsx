import DraftEventsList from './DraftEventsList';
import PastEventsList from './PastEventsList';
import UpcomingEventsList from './UpcomingEventsList';
import LoadingSpinner from '../../../common/components/loadingSpinner/LoadingSpinner';
import useNavigate from '../../../hooks/useNavigate';
import { ROUTES } from '../../app/routes/constants';
import { useEventsSearchQueryContext } from '../hooks/useEventsSearchQueryContext';

export default function EventsSearchResults() {
  const { pushWithLocale } = useNavigate();
  const goToEventSummaryPage = (id: string) => {
    pushWithLocale(ROUTES.EVENT_SUMMARY.replace(':id', id));
  };

  const {
    loadingUpcomingEvents,
    loadingPastEvents,
    loadingEventsWithoutOccurrences,
  } = useEventsSearchQueryContext();

  const loadingEvents =
    loadingUpcomingEvents ||
    loadingEventsWithoutOccurrences ||
    loadingPastEvents;

  return (
    <LoadingSpinner isLoading={loadingEvents}>
      <UpcomingEventsList goToEventSummaryPage={goToEventSummaryPage} />
      <DraftEventsList goToEventSummaryPage={goToEventSummaryPage} />
      <PastEventsList goToEventSummaryPage={goToEventSummaryPage} />
    </LoadingSpinner>
  );
}
