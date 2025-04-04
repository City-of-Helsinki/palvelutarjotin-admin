import { useApolloClient } from '@apollo/client';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import PlaceText from './placeText/PlaceText';
import AutoSuggest, {
  AutoSuggestOption,
} from '../../common/components/autoSuggest/AutoSuggest';
import {
  Place,
  PlaceDocument,
  PlaceQuery,
  useSchoolsAndKindergartensListQuery,
} from '../../generated/graphql';
import useDebounce from '../../hooks/useDebounce';
import useLocale from '../../hooks/useLocale';
import { Language } from '../../types';
import getLocalisedString from '../../utils/getLocalizedString';

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

const UnitPlaceSelector: React.FC<Props> = ({
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
  const searchValue = useDebounce(inputValue, 500);

  const apolloClient = useApolloClient();

  const { data: unitsData, loading } = useSchoolsAndKindergartensListQuery({
    skip: !searchValue,
    variables: {
      search: searchValue,
    },
  });

  const locale = useLocale();
  const { t } = useTranslation();

  const optionLabelToString = (option: AutoSuggestOption, locale: Language) => {
    if (!option.value) {
      return '';
    }
    const data = apolloClient.readQuery<PlaceQuery>({
      query: PlaceDocument,
      variables: { id: option.value },
    });

    return getLocalisedString(data?.place?.name || {}, locale);
  };

  const getOptionLabel = (place: Place) => {
    return getLocalisedString(place.name || {}, locale);
  };

  const placeOptions =
    unitsData?.schoolsAndKindergartensList?.data.map((place) => ({
      label: getOptionLabel(place as Place),
      value: place.id || '',
    })) || [];

  const handleBlur = (
    option: AutoSuggestOption | AutoSuggestOption[] | null
  ) => {
    if (Array.isArray(option)) {
      onBlur(option.map((item) => item.value));
    } else {
      onBlur(option?.value || '');
    }
  };

  const handleChange = (
    option: AutoSuggestOption | AutoSuggestOption[] | null
  ) => {
    if (Array.isArray(option)) {
      onChange(option.map((item) => item.value));
    } else {
      onChange(option?.value || '');
    }
  };

  const getValue = () => {
    if (Array.isArray(value)) {
      return value.map((item) => ({
        label: <PlaceText placeId={item} />,
        value: item,
      }));
    } else if (value) {
      return {
        label: (
          <PlaceText
            placeId={value}
            errorText={t('unitPlaceSelector.noPlaceFoundError')}
          />
        ),
        value: value,
      };
    }

    return null;
  };

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
      value={getValue()}
    />
  );
};

export default UnitPlaceSelector;
