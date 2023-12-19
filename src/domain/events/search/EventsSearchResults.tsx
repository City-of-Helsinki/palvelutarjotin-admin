import LoadingSpinner from '../../../common/components/loadingSpinner/LoadingSpinner';
import useNavigate from '../../../hooks/useNavigate';
import { ROUTES } from '../../app/routes/constants';
import useEventsPageQueries from '../hooks/useEventsPageQueries';
import DraftEventsList from './DraftEventsList';
import PastEventsList from './PastEventsList';
import UpcomingEventsList from './UpcomingEventsList';

export default function EventsSearchResults({ eventsContext }: any) {
  const { pushWithLocale } = useNavigate();
  const goToEventSummaryPage = (id: string) => {
    pushWithLocale(ROUTES.EVENT_SUMMARY.replace(':id', id));
  };

  const {
    loadingUpcomingEvents,
    loadingPastEvents,
    loadingEventsWithoutOccurrences,
  } = useEventsPageQueries(eventsContext);

  const loadingEvents =
    loadingUpcomingEvents ||
    loadingEventsWithoutOccurrences ||
    loadingPastEvents;

  return (
    <LoadingSpinner isLoading={loadingEvents}>
      <UpcomingEventsList
        eventsContext={eventsContext}
        goToEventSummaryPage={goToEventSummaryPage}
      />
      <DraftEventsList
        eventsContext={eventsContext}
        goToEventSummaryPage={goToEventSummaryPage}
      />
      <PastEventsList
        eventsContext={eventsContext}
        goToEventSummaryPage={goToEventSummaryPage}
      />
    </LoadingSpinner>
  );
}
