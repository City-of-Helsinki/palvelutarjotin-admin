import classNames from 'classnames';
import { useSelect } from 'downshift';
import { IconAngleDown, IconCheck } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import InputWrapper from '../textInput/InputWrapper';
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

export interface DropdownSelectProps {
  buttonText?: string;
  disabled?: boolean;
  helperText?: string;
  id: string;
  invalidText?: string;
  labelText?: string;
  onBlur: (value?: DropdownSelectOption) => void;
  onChange: (value?: DropdownSelectOption) => void;
  options: DropdownSelectOption[];
  value?: DropdownSelectOption;
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

  const handleBlur = () => {
    onBlur(value);
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
      onChange(event.selectedItem);
    },
    selectedItem: value,
  });

  const { id: labelId, ...labelProps } = getLabelProps();
  const { id: buttonId, ...buttonProps } = getToggleButtonProps({
    className: classNames(styles.dropdownSelectButton, {
      [styles.invalid]: !!invalidText,
      [styles.isOpen]: isOpen,
      [styles.isDisabled]: disabled,
    }),
    disabled,
  });
  return (
    <InputWrapper
      {...labelProps}
      id={buttonId}
      hasIcon={true}
      labelId={labelId}
      className={styles.wrapper}
      helperText={invalidText || helperText}
      invalid={!!invalidText}
      labelText={labelText}
    >
      <button id={buttonId} {...buttonProps} type="button">
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
        {...getMenuProps({
          className: classNames(styles.dropdownSelectMenu, {
            [styles.isOpen]: isOpen,
          }),
          onBlur: () => setTimeout(handleBlur, 0),
        })}
      >
        {isOpen &&
          options.map((item, index) => {
            return (
              <li
                {...getItemProps({
                  item,
                  index,
                  key: index,
                  className: classNames(styles.dropdownSelectMenuItem, {
                    [styles.isHighlighted]: highlightedIndex === index,
                    [styles.isSelected]: selectedItem === item,
                  }),
                })}
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
  );
};

export default DropdownSelect;
