import { createContext } from 'react';

import type { EventsSearchFormContextType } from './EventsSearchProvider';

const EventsSearchFormContext =
  createContext<EventsSearchFormContextType | null>(null);

export default EventsSearchFormContext;
