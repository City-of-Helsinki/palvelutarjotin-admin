import EventsSearchFormContext from './EventsSearchFormContext';
import { EventsSearchQueryProvider } from './EventsSearchQueryProvider';
import useEventsPageContext from '../hooks/useEventsPageContext';

export function EventsSearchProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const eventsPageContext = useEventsPageContext();
  return (
    <EventsSearchFormContext.Provider value={eventsPageContext}>
      <EventsSearchQueryProvider>{children}</EventsSearchQueryProvider>
    </EventsSearchFormContext.Provider>
  );
}
