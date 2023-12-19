import React from 'react';

import { useMyProfileQuery } from '../../../generated/graphql';
import { useAppSelector } from '../../../hooks/useAppSelector';
import useDebounce from '../../../hooks/useDebounce';
import { getSelectedOrganisation } from '../../myProfile/utils';
import { activeOrganisationSelector } from '../../organisation/selector';
import { PlaceOption } from '../types';

/**
 * @protected Should only be called from EventsSearchProvider!
 */
export default function useEventsPageContext() {
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
