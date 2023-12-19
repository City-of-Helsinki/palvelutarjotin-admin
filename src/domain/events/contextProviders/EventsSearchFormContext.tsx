import React from 'react';

import { EventsSearchFormContextType } from '../types';

const EventsSearchFormContext =
  React.createContext<EventsSearchFormContextType | null>(null);

export default EventsSearchFormContext;
