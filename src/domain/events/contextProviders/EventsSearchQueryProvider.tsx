import useEventsPageQueries from '../hooks/useEventsPageQueries';
import EventsSearchQueryContext from './EventsSearchQueryContext';

export function EventsSearchQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const eventsPageQueriesContext = useEventsPageQueries();
  return (
    <EventsSearchQueryContext.Provider value={eventsPageQueriesContext}>
      {children}
    </EventsSearchQueryContext.Provider>
  );
}
