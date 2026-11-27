import type { AutoSuggestOption } from './AutoSuggest';

type OptionLabel = (value: string) => AutoSuggestOption['label'];

export const getAutoSuggestOptionValue = (
  option: AutoSuggestOption | AutoSuggestOption[] | null
) =>
  Array.isArray(option)
    ? option.map((item) => item.value)
    : option?.value || '';

export const getAutoSuggestSelectedValue = (
  value: string | string[],
  renderLabel: OptionLabel,
  renderSingleLabel: OptionLabel = renderLabel
): AutoSuggestOption | AutoSuggestOption[] | null => {
  if (Array.isArray(value)) {
    return value.map((item) => ({
      label: renderLabel(item),
      value: item,
    }));
  }

  if (value) {
    return {
      label: renderSingleLabel(value),
      value,
    };
  }

  return null;
};
