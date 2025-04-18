import * as React from 'react';

import KeywordText from './KeywordText';
import AutoSuggest, {
  AutoSuggestOption,
} from '../../common/components/autoSuggest/AutoSuggest';
import { AUTOSUGGEST_OPTIONS_AMOUNT } from '../../common/components/autoSuggest/contants';
import {
  Keyword,
  KeywordDocument,
  KeywordQuery,
  useKeywordsQuery,
} from '../../generated/graphql';
import useDebounce from '../../hooks/useDebounce';
import useLocale from '../../hooks/useLocale';
import { Language } from '../../types';
import getLocalizedString from '../../utils/getLocalizedString';
import { initializeApolloClient } from '../app/apollo/apolloClient';

interface Props {
  className?: string;
  helperText?: string;
  id: string;
  required?: boolean;
  invalidText?: string;
  labelText: string;
  onBlur: (val: string | string[] | null) => void;
  onChange: (val: string | string[] | null) => void;
  placeholder?: string;
  value: string | string[];
}

const optionLabelToString = (option: AutoSuggestOption, locale: Language) => {
  const apolloClient = initializeApolloClient();
  const data = apolloClient.readQuery<KeywordQuery>({
    query: KeywordDocument,
    variables: { id: option.value },
  });
  return getLocalizedString(data?.keyword?.name || {}, locale);
};

const KeywordSelector: React.FC<Props> = ({
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
}) => {
  const [inputValue, setInputValue] = React.useState('');
  const searchValue = useDebounce(inputValue, 100);

  const { data: keywordsData, loading } = useKeywordsQuery({
    skip: !searchValue,
    variables: { pageSize: AUTOSUGGEST_OPTIONS_AMOUNT, text: searchValue },
  });

  const locale = useLocale();

  const getOptionLabel = (keyword: Keyword) =>
    getLocalizedString(keyword.name || {}, locale);

  const keywordOptions =
    keywordsData?.keywords?.data.map((keyword) => ({
      label: getOptionLabel(keyword),
      value: keyword.internalId || '',
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
        label: <KeywordText id={item} />,
        value: item,
      }));
    } else if (value) {
      return { label: <KeywordText id={value} />, value: value };
    }

    return null;
  };

  return (
    <AutoSuggest
      className={className}
      helperText={helperText}
      id={id}
      required={required}
      inputValue={inputValue}
      invalidText={invalidText}
      labelText={labelText}
      loading={loading}
      onBlur={handleBlur}
      onChange={handleChange}
      optionLabelToString={optionLabelToString}
      options={keywordOptions}
      placeholder={placeholder}
      setInputValue={setInputValue}
      value={getValue()}
    />
  );
};

export default KeywordSelector;
