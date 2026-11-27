import { useApolloClient } from '@apollo/client';
import * as React from 'react';

import PlaceText from './PlaceText';
import AutoSuggest, {
  AutoSuggestOption,
} from '../../common/components/autoSuggest/AutoSuggest';
import { AUTOSUGGEST_OPTIONS_AMOUNT } from '../../common/components/autoSuggest/contants';
import {
  getAutoSuggestOptionValue,
  getAutoSuggestSelectedValue,
} from '../../common/components/autoSuggest/utils';
import {
  Place,
  PlaceDocument,
  PlaceQuery,
  usePlacesQuery,
} from '../../generated/graphql';
import useDebounce from '../../hooks/useDebounce';
import useLocale from '../../hooks/useLocale';
import { Language } from '../../types';
import getLocalizedString from '../../utils/getLocalizedString';

interface Props {
  className?: string;
  helperText?: string;
  id: string;
  invalidText?: string;
  labelText: string;
  onBlur: (val: string | string[] | null) => void;
  onChange: (val: string | string[] | null) => void;
  placeholder?: string;
  value: string | string[];
  required?: boolean;
  disabled: boolean;
}

const PlaceSelector: React.FC<Props> = ({
  className,
  helperText,
  id,
  invalidText,
  labelText,
  onBlur,
  onChange,
  placeholder,
  value,
  required,
  disabled,
}) => {
  const [inputValue, setInputValue] = React.useState('');
  const searchValue = useDebounce(inputValue, 100);
  const apolloClient = useApolloClient();

  const { data: placesData, loading } = usePlacesQuery({
    skip: !searchValue,
    variables: {
      dataSource: 'tprek',
      pageSize: AUTOSUGGEST_OPTIONS_AMOUNT,
      showAllPlaces: true,
      text: searchValue,
    },
  });

  const locale = useLocale();

  const optionLabelToString = (option: AutoSuggestOption, locale: Language) => {
    const data = apolloClient.readQuery<PlaceQuery>({
      query: PlaceDocument,
      variables: { id: option.value },
    });

    return getLocalizedString(data?.place?.name || {}, locale);
  };

  const getOptionLabel = (place: Place) =>
    `${getLocalizedString(place.name || {}, locale)}, ${getLocalizedString(
      place.streetAddress || {},
      locale
    )}`;

  const placeOptions =
    placesData?.places?.data.map((place) => ({
      label: getOptionLabel(place),
      value: place.id || '',
    })) || [];

  const handleBlur = (
    option: AutoSuggestOption | AutoSuggestOption[] | null
  ) => {
    onBlur(getAutoSuggestOptionValue(option));
  };

  const handleChange = (
    option: AutoSuggestOption | AutoSuggestOption[] | null
  ) => {
    onChange(getAutoSuggestOptionValue(option));
  };

  const selectedValue = getAutoSuggestSelectedValue(value, (id) => (
    <PlaceText id={id} />
  ));

  return (
    <AutoSuggest
      className={className}
      helperText={helperText}
      disabled={disabled}
      id={id}
      required={required}
      inputValue={inputValue}
      invalidText={invalidText}
      labelText={labelText}
      loading={loading}
      onBlur={handleBlur}
      onChange={handleChange}
      optionLabelToString={optionLabelToString}
      options={placeOptions}
      placeholder={placeholder}
      setInputValue={setInputValue}
      value={selectedValue}
    />
  );
};

export default React.memo(PlaceSelector);
