import React from 'react';

import { EventsSearchQueryContextType } from '../types';

const EventsSearchQueryContext =
  React.createContext<EventsSearchQueryContextType | null>(null);

export default EventsSearchQueryContext;
