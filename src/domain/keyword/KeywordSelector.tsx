import React from 'react';

import AutoSuggest, {
  AutoSuggestOption,
} from '../../common/components/autoSuggest/AutoSuggest';
import { AUTOSUGGEST_OPTIONS_AMOUNT } from '../../common/components/autoSuggest/contants';
import {
  Keyword,
  KeywordDocument,
  useKeywordsQuery,
} from '../../generated/graphql';
import useDebounce from '../../hooks/useDebounce';
import useLocale from '../../hooks/useLocale';
import { Language } from '../../types';
import getLocalizedString from '../../utils/getLocalizedString';
import apolloClient from '../app/apollo/apolloClient';
import KeywordText from './KeywordText';

interface Props {
  helperText?: string;
  id: string;
  invalidText?: string;
  labelText: string;
  onBlur: (val: string | string[] | null) => void;
  onChange: (val: string | string[] | null) => void;
  placeholder?: string;
  value: string | string[];
}

const optionLabelToString = (option: AutoSuggestOption, locale: Language) => {
  const data = apolloClient.readQuery({
    query: KeywordDocument,
    variables: { id: option.value },
  });
  return data && data.keyword
    ? getLocalizedString(data.keyword.name || {}, locale)
    : '';
};

const KeywordSelector: React.FC<Props> = ({
  helperText,
  id,
  invalidText,
  labelText,
  onBlur,
  onChange,
  placeholder,
  value,
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
    keywordsData && keywordsData.keywords
      ? keywordsData.keywords.data.map((keyword) => ({
          label: getOptionLabel(keyword),
          value: keyword.id || '',
        }))
      : [];

  const handleBlur = (
    option: AutoSuggestOption | AutoSuggestOption[] | null
  ) => {
    onBlur(
      Array.isArray(option)
        ? option.map((item) => item.value)
        : option
        ? option.value
        : null
    );
  };

  const handleChange = (
    option: AutoSuggestOption | AutoSuggestOption[] | null
  ) => {
    onChange(
      Array.isArray(option)
        ? option.map((item) => item.value)
        : option
        ? option.value
        : null
    );
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
      optionLabelToString={optionLabelToString}
      options={keywordOptions}
      placeholder={placeholder}
      setInputValue={setInputValue}
      value={
        Array.isArray(value)
          ? value.map((item) => ({
              label: <KeywordText id={item} />,
              value: item,
            }))
          : value
          ? { label: <KeywordText id={value} />, value: value }
          : null
      }
    />
  );
};

export default KeywordSelector;
