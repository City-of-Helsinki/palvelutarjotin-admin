import { Select } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import useLocale from '../../../hooks/useLocale';
import useProfilePlaces from '../../../hooks/useProfilePlaces';
import getLocalizedString from '../../../utils/getLocalizedString';
import { PlaceOption } from '../types';

export type PlaceSelectorProps = {
  clearable?: boolean;
  onChange: (selected: PlaceOption[]) => void;
  value: PlaceOption[];
};

function PlaceSelector({
  clearable,
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
    <Select
      value={value}
      multiSelect
      texts={{
        assistive: t('events.search.helperPlaces'),
        clearButtonAriaLabel_multiple: t(
          'events.search.placesClearButtonAriaLabel'
        ),
        clearButtonAriaLabel_one: t('events.search.placesClearButtonAriaLabel'),
        label: t('events.search.labelPlaces'),
        language: locale,
        placeholder: t('events.search.placeholderPlaces'),
      }}
      clearable={clearable}
      onChange={onChange}
      options={placeOptions}
    />
  );
}

export default PlaceSelector;
