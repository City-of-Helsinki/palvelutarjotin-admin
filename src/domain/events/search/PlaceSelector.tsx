import { Combobox } from 'hds-react';
import { useTranslation } from 'react-i18next';

import useLocale from '../../../hooks/useLocale';
import useProfilePlaces from '../../../hooks/useProfilePlaces';
import getLocalizedString from '../../../utils/getLocalizedString';
import { PlaceOption } from '../types';

const PlaceSelector: React.FC<{
  onChange: (selected: PlaceOption[]) => void;
  value: PlaceOption[];
}> = ({ onChange, value }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const { places } = useProfilePlaces();

  const placeOptions: PlaceOption[] = places
    ? places.map((place) => ({
        label: getLocalizedString(place.name, locale),
        value: place.id ?? '',
      }))
    : [];

  return (
    <Combobox
      value={value as any}
      label={t('events.search.labelPlaces')}
      multiselect
      placeholder={t('events.search.placeholderPlaces')}
      toggleButtonAriaLabel={t('events.search.placesToggleButtonAriaLabel')}
      clearButtonAriaLabel={t('events.search.placesClearButtonAriaLabel')}
      selectedItemRemoveButtonAriaLabel={t(
        'events.search.placesSelectedItemRemoveButtonAriaLabel'
      )}
      onChange={onChange as any}
      options={placeOptions}
    />
  );
};

export default PlaceSelector;
