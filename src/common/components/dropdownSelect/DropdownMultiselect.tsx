import classNames from 'classnames';
import {
  useSelect,
  UseSelectState,
  UseSelectStateChangeOptions,
} from 'downshift';
import { IconAngleDown } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import InputWrapper from '../textInput/InputWrapper';
import { DropdownSelectOption, getA11yStatusMessage } from './DropdownSelect';
import styles from './dropdownSelect.module.scss';

export interface DropdownMultiselectProps {
  buttonText?: string;
  disabled?: boolean;
  helperText?: string;
  id: string;
  invalidText?: string;
  labelText?: string;
  onBlur: (value: DropdownSelectOption[]) => void;
  onChange: (value: DropdownSelectOption[]) => void;
  options: DropdownSelectOption[];
  value: DropdownSelectOption[];
}

const DropdownMultiselect: React.FC<DropdownMultiselectProps> = ({
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

  const handleChange = (option: DropdownSelectOption) => {
    const newValue = value.includes(option)
      ? value.filter((item) => item !== option)
      : [...value, option];

    onChange(newValue);
  };

  const handleBlur = () => {
    onBlur(value);
  };

  const stateReducer = (
    state: UseSelectState<DropdownSelectOption>,
    actionAndChanges: UseSelectStateChangeOptions<DropdownSelectOption>
  ) => {
    const { changes, type } = actionAndChanges;

    switch (type) {
      case useSelect.stateChangeTypes.MenuKeyDownEnter:
      case useSelect.stateChangeTypes.ItemClick:
        return {
          ...changes,
          highlightedIndex: state.highlightedIndex, // keep current highlighted index
          isOpen: true, // Keep menu open
        };
      default:
        return changes; // otherwise business as usual.
    }
  };

  const {
    isOpen,
    highlightedIndex,
    getLabelProps,
    getToggleButtonProps,
    getMenuProps,
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
    getA11ySelectionMessage: () => '',
    id,
    itemToString: (item) => item.label,
    items: options,
    onSelectedItemChange: ({ selectedItem }) =>
      selectedItem && handleChange(selectedItem),
    stateReducer,
  });

  const getFirstValueFromOptions = () =>
    value.map((val) => val?.label).sort()[0];

  const getValueText = () => {
    if (!value.length) return null;
    if (value.length === 1) return value[0]?.label;
    else return `${getFirstValueFromOptions()} + ${value.length - 1}`;
  };

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
      id={buttonId}
      hasIcon={true}
      labelId={labelId}
      {...labelProps}
      className={styles.wrapper}
      helperText={invalidText || helperText}
      invalid={!!invalidText}
      labelText={labelText}
    >
      <button id={buttonId} {...buttonProps}>
        <span>
          {getValueText() ||
            buttonText ||
            t('common.dropdownSelect.buttonText')}
        </span>
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
            const checked = value.includes(item);
            const highlighted = highlightedIndex === index;

            return (
              <li
                {...getItemProps({
                  item,
                  index,
                  key: index,
                  onClick: (e: React.MouseEvent<HTMLLIElement>) => {
                    e.preventDefault();
                  },
                  className: classNames(styles.dropdownMultiselectMenuItem, {
                    [styles.isHighlighted]: highlighted,
                    [styles.isChecked]: checked,
                  }),
                  'aria-checked': checked,
                })}
              >
                <label className={styles.checkbox}>
                  <span className={styles.checkmark} />
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => null}
                    tabIndex={-1}
                  />
                  <span>{item.label}</span>
                </label>
              </li>
            );
          })}
      </ul>
    </InputWrapper>
  );
};

export default DropdownMultiselect;
