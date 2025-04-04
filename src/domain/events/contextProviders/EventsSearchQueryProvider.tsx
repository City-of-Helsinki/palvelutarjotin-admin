import EventsSearchQueryContext from './EventsSearchQueryContext';
import useEventsPageQueries from '../hooks/useEventsPageQueries';

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
