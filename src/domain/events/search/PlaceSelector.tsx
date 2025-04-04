import { Combobox } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import useLocale from '../../../hooks/useLocale';
import useProfilePlaces from '../../../hooks/useProfilePlaces';
import getLocalizedString from '../../../utils/getLocalizedString';
import { PlaceOption } from '../types';

export type PlaceSelectorProps = {
  onChange: (selected: PlaceOption[]) => void;
  value: PlaceOption[];
};

function PlaceSelector({
  onChange,
  value,
}: Readonly<PlaceSelectorProps>): React.ReactElement<PlaceSelectorProps> {
  const { t } = useTranslation();
  const locale = useLocale();
  const { places } = useProfilePlaces();

  const placeOptions: PlaceOption[] = places
    ? places.map(
        (place): PlaceOption => ({
          label: getLocalizedString(place.name, locale),
          value: place.id ?? '',
        })
      )
    : [];

  return (
    <Combobox<PlaceOption>
      value={value}
      multiselect
      label={t('events.search.labelPlaces')}
      helper={t('events.search.helperPlaces')}
      placeholder={t('events.search.placeholderPlaces')}
      toggleButtonAriaLabel={t('events.search.placesToggleButtonAriaLabel')}
      clearButtonAriaLabel={t('events.search.placesClearButtonAriaLabel')}
      selectedItemRemoveButtonAriaLabel={t(
        'events.search.placesSelectedItemRemoveButtonAriaLabel'
      )}
      onChange={onChange}
      options={placeOptions}
    />
  );
}

export default PlaceSelector;
