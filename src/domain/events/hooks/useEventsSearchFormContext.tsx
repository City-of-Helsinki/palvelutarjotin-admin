import React from 'react';

import EventsSearchFormContext from '../contextProviders/EventsSearchFormContext';

export function useEventsSearchFormContext() {
  const context = React.useContext(EventsSearchFormContext);
  if (!context) {
    throw new Error(
      `Event search components cannot be rendered outside the EventsSearchProvider.`
    );
  }
  return context;
}
