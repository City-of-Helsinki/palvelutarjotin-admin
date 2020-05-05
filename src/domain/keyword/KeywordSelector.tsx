import React from 'react';

import AutoSuggest, {
  AutoSuggestOption,
} from '../../common/components/autoSuggest/AutoSuggest';
import {
  Keyword,
  useKeywordDetailsQuery,
  useKeywordListQuery,
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
  placeholder?: string;
  value: string;
}

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

  const { data: keywordsData, loading } = useKeywordListQuery({
    skip: !searchValue,
    variables: { pageSize: 20, text: searchValue },
  });

  const { data: keywordData } = useKeywordDetailsQuery({
    skip: !value,
    variables: { id: value },
  });

  const locale = useLocale();

  const getOptionLabel = (keyword: Keyword) =>
    getLocalizedString(keyword.name || {}, locale);

  const keywordOptions = keywordsData
    ? keywordsData.keywordList.data.map((keyword) => ({
        label: getOptionLabel(keyword),
        value: keyword.id || '',
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
      options={keywordOptions}
      placeholder={placeholder}
      setInputValue={setInputValue}
      value={
        keywordData
          ? {
              label: getOptionLabel(keywordData.keywordDetails),
              value: keywordData.keywordDetails.id || '',
            }
          : null
      }
    />
  );
};

export default KeywordSelector;
