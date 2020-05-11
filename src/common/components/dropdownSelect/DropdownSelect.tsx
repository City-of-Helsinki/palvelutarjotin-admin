import classNames from 'classnames';
import {
  useSelect,
  UseSelectState,
  UseSelectStateChangeOptions,
} from 'downshift';
import { IconAngleDown, IconCheck } from 'hds-react';
import debounce from 'lodash/debounce';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { boolean } from 'yup';

import InputWrapper from '../textInput/InputWrapper';
import inputStyles from '../textInput/inputWrapper.module.scss';
import styles from './dropdownSelect.module.scss';

export type DropdownSelectOption = {
  label: string;
  value: string;
};

export const getA11yStatusMessage = ({
  isOpen,
  previousResultCount,
  resultCount,
  t,
}: {
  isOpen: boolean;
  previousResultCount: number;
  resultCount: number;
  t: (str: string, options?: any) => string;
}) => {
  if (!isOpen) {
    return '';
  }

  if (!resultCount) {
    return t('common.dropdownSelect.accessibility.statusMessageNoResults');
  }

  if (resultCount !== previousResultCount) {
    if (resultCount === 1) {
      return t('common.dropdownSelect.accessibility.statusMessageSingleResult');
    }

    return t(
      'common.dropdownSelect.accessibility.statusMessageMultipleResult',
      { resultCount }
    );
  }

  return '';
};

export const dataTestIds = {
  toggleButton: 'toggle-button-id',
  menu: 'menu-id',
  item: (index: number) => `item-id-${index}`,
};

export interface DropdownSelectProps {
  buttonText?: string;
  disabled?: boolean;
  helperText?: string;
  id: string;
  invalidText?: string;
  labelText?: string;
  onBlur: (value?: string) => void;
  onChange: (value?: string) => void;
  options: DropdownSelectOption[];
  value?: string;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  buttonText,
  disabled,
  helperText,
  id,
  invalidText,
  labelText,
  onBlur,
  onChange,
  options,
  value,
}) => {
  const { t } = useTranslation();
  const container = React.useRef<HTMLDivElement>(null);

  // To prevent "Cannot update a component (`Formik`) while rendering a different component
  // (`DropdownSelect`). To locate the bad setState() call inside `DropdownSelect`" error set
  // short debounce/delay to Blur event
  const debouncedBlur = debounce((value?: string) => {
    onBlur(value);
  }, 1);

  const stateReducer = (
    state: UseSelectState<DropdownSelectOption>,
    actionAndChanges: UseSelectStateChangeOptions<DropdownSelectOption>
  ) => {
    const { changes, type } = actionAndChanges;

    switch (type) {
      case useSelect.stateChangeTypes.MenuBlur:
        debouncedBlur(value);
        return changes;
      default:
        return changes; // otherwise business as usual.
    }
  };

  const {
    isOpen,
    selectedItem,
    getLabelProps,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    getA11yStatusMessage({ isOpen, resultCount, previousResultCount }) {
      return getA11yStatusMessage({
        isOpen,
        resultCount,
        previousResultCount,
        t,
      });
    },
    getA11ySelectionMessage: ({ itemToString, selectedItem }) => {
      return t('common.dropdownSelect.accessibility.selectionMessage', {
        value: itemToString(selectedItem),
      });
    },
    id,
    itemToString: (item) => item.label,
    items: options,
    onSelectedItemChange: (event) => {
      onChange(event.selectedItem?.value);
    },
    selectedItem: options.find((item) => item.value === value),
    stateReducer,
  });

  return (
    <div ref={container}>
      <InputWrapper
        id={id}
        helperText={helperText}
        invalid={!!invalidText}
        invalidText={invalidText}
      >
        <label className={inputStyles.label} {...getLabelProps()}>
          {labelText}
        </label>
        <button
          data-testid={dataTestIds.toggleButton}
          {...getToggleButtonProps()}
          className={classNames(styles.dropdownSelectButton, {
            [styles.isOpen]: isOpen,
            [styles.isDisabled]: disabled,
          })}
          disabled={disabled}
        >
          {selectedItem?.label ||
            buttonText ||
            t('common.dropdownSelect.buttonText')}
          <IconAngleDown
            className={classNames(styles.icon, {
              [styles.arrowUp]: isOpen,
            })}
          />
        </button>
        <ul
          data-testid={dataTestIds.menu}
          {...getMenuProps()}
          className={classNames(styles.dropdownSelectMenu, {
            [styles.isOpen]: isOpen,
          })}
        >
          {isOpen &&
            options.map((item, index) => {
              return (
                <li
                  data-testid={dataTestIds.item(index)}
                  className={classNames(styles.dropdownSelectMenuItem, {
                    [styles.isHighlighted]: highlightedIndex === index,
                    [styles.isSelected]: selectedItem === item,
                  })}
                  key={`${item.value}${index}`}
                  {...getItemProps({ item, index })}
                >
                  {item.label}
                  {selectedItem === item && (
                    <IconCheck className={styles.checkIcon} />
                  )}
                </li>
              );
            })}
        </ul>
      </InputWrapper>
    </div>
  );
};

export default DropdownSelect;
