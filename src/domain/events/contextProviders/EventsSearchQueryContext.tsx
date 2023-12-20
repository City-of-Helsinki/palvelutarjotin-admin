import React from 'react';

import type { EventsSearchQueryContextType } from './EventsSearchQueryProvider';

const EventsSearchQueryContext =
  React.createContext<EventsSearchQueryContextType | null>(null);

export default EventsSearchQueryContext;
