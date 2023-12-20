import React from 'react';

import { useMyProfileQuery } from '../../../generated/graphql';
import { useAppSelector } from '../../../hooks/useAppSelector';
import useDebounce from '../../../hooks/useDebounce';
import { getSelectedOrganisation } from '../../myProfile/utils';
import { activeOrganisationSelector } from '../../organisation/selector';
import { PlaceOption } from '../types';
import EventsSearchFormContext from './EventsSearchFormContext';
import { EventsSearchQueryProvider } from './EventsSearchQueryProvider';

function useEventsPageContext() {
  const [inputValue, setInputValue] = React.useState('');

  const [placesValue, setPlacesValue] = React.useState<PlaceOption[]>([]);

  const searchValue = useDebounce(inputValue, 100);
  const { data: myProfileData } = useMyProfileQuery();

  const activeOrganisation = useAppSelector(activeOrganisationSelector);
  const selectedOrganisation =
    myProfileData?.myProfile &&
    getSelectedOrganisation(myProfileData.myProfile, activeOrganisation);
  return {
    inputValue,
    setInputValue,
    placesValue,
    setPlacesValue,
    searchValue,
    selectedOrganisation,
  };
}

export type EventsSearchFormContextType = ReturnType<
  typeof useEventsPageContext
>;

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
