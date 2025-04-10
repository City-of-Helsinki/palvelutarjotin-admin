import React from 'react';

import useDebounce from '../../../hooks/useDebounce';
import useOrganisationContext from '../../organisation/contextProviders/useOrganisationContext';
import { PlaceOption } from '../types';

/**
 * @protected Should only be called from EventsSearchProvider!
 */
export default function useEventsPageContext() {
  const [inputValue, setInputValue] = React.useState('');

  const [placesValue, setPlacesValue] = React.useState<PlaceOption[]>([]);

  const searchValue = useDebounce(inputValue, 100);

  const { activeOrganisation: selectedOrganisation } = useOrganisationContext();

  return {
    inputValue,
    setInputValue,
    placesValue,
    setPlacesValue,
    searchValue,
    selectedOrganisation,
  };
}
