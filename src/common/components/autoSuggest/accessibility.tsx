import { TFunction } from 'i18next';

import { AutoSuggestOption } from './AutoSuggest';

export const valueEventAriaMessage = ({
  event,
  value,
  t,
}: {
  event: string;
  value: string;
  t: TFunction;
}) => {
  if (!value) return '';
  switch (event) {
    case 'remove-value':
      return t('common.autoSuggest.accessibility.removeValueAriaMessage', {
        value: value,
      });
    case 'select-option':
      return t('common.autoSuggest.accessibility.selectValueAriaMessage', {
        value: value,
      });
    default:
      return '';
  }
};

export const valueFocusAriaMessage = ({
  focusedValue,
  getOptionLabel,
  options,
  t,
}: {
  focusedValue: AutoSuggestOption;
  getOptionLabel: (option: AutoSuggestOption) => string;
  options: AutoSuggestOption[];
  t: TFunction;
}) =>
  t('common.autoSuggest.accessibility.focusAriaMessage', {
    value: getOptionLabel(focusedValue),
    index: options.indexOf(focusedValue) + 1,
    n: options.length,
  });
