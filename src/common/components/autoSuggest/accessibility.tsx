import type { TFunction } from 'i18next';

import { AutoSuggestOption } from './AutoSuggest';

export enum ACCESSIBILITY_EVENT_TYPE {
  DESELECT_OPTION = 'deselect_option',
  SELECT_OPTION = 'select_option',
}

export const valueEventAriaMessage = ({
  event,
  value,
  t,
}: {
  event: ACCESSIBILITY_EVENT_TYPE;
  value: string;
  t: TFunction;
}) => {
  if (!value) return '';
  switch (event) {
    case ACCESSIBILITY_EVENT_TYPE.DESELECT_OPTION:
      return t('common.autoSuggest.accessibility.deselectOptionAriaMessage', {
        value: value,
      });
    case ACCESSIBILITY_EVENT_TYPE.SELECT_OPTION:
      return t('common.autoSuggest.accessibility.selectOptionAriaMessage', {
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
