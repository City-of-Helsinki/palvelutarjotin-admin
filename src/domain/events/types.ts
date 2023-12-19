import useEventsPageContext from './hooks/useEventsPageContext';
import useEventsPageQueries from './hooks/useEventsPageQueries';

export type EventsSearchFormContextType = ReturnType<
  typeof useEventsPageContext
>;
export type EventsSearchQueryContextType = ReturnType<
  typeof useEventsPageQueries
>;
export type PlaceOption = { label: string; value: string };
