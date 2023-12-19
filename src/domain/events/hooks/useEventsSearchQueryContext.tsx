import React from 'react';

import EventsSearchQueryContext from '../contextProviders/EventsSearchQueryContext';

export function useEventsSearchQueryContext() {
  const context = React.useContext(EventsSearchQueryContext);
  if (!context) {
    throw new Error(
      `Event search components cannot be rendered outside the EventsSearchProvider.`
    );
  }
  return context;
}
