import React from 'react';

import AutoSuggest, {
  AutoSuggestOption,
} from '../../common/components/autoSuggest/AutoSuggest';
import {
  Place,
  usePlaceDetailsQuery,
  usePlaceListQuery,
} from '../../generated/graphql';
import useDebounce from '../../hooks/useDebounce';
import useLocale from '../../hooks/useLocale';
import getLocalizedString from '../../utils/getLocalizedString';

interface Props {
  helperText?: string;
  id: string;
  invalidText?: string;
  labelText: string;
  onBlur: (val: string | null) => void;
  onChange: (val: string | null) => void;
  value: string;
}

const PlaceSelector: React.FC<Props> = ({
  helperText,
  id,
  invalidText,
  labelText,
  onBlur,
  onChange,
  value,
}) => {
  const [inputValue, setInputValue] = React.useState('');
  const searchValue = useDebounce(inputValue, 100);

  const { data: placesData, loading } = usePlaceListQuery({
    skip: !searchValue,
    variables: { dataSource: 'tprek', pageSize: 20, text: searchValue },
  });

  const { data: placeData } = usePlaceDetailsQuery({
    skip: !value,
    variables: { id: value },
  });

  const locale = useLocale();

  const getOptionLabel = (place: Place) =>
    `${getLocalizedString(place.name || {}, locale)}, ${getLocalizedString(
      place.streetAddress || {},
      locale
    )}`;

  const placeOptions = placesData
    ? placesData.placeList.data.map((place) => ({
        label: getOptionLabel(place),
        value: place.id || '',
      }))
    : [];

  const handleBlur = (option: AutoSuggestOption | null) => {
    onBlur(option ? option.value : null);
  };

  const handleChange = (option: AutoSuggestOption | null) => {
    onChange(option ? option.value : null);
  };

  return (
    <AutoSuggest
      helperText={helperText}
      id={id}
      inputValue={inputValue}
      invalidText={invalidText}
      labelText={labelText}
      loading={loading}
      onBlur={handleBlur}
      onChange={handleChange}
      options={placeOptions}
      setInputValue={setInputValue}
      value={
        placeData
          ? {
              label: getOptionLabel(placeData.placeDetails),
              value: placeData.placeDetails.id || '',
            }
          : null
      }
    />
  );
};

export default PlaceSelector;
