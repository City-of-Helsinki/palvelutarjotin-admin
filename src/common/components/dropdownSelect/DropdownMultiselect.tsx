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
import inputStyles from '../textInput/inputWrapper.module.scss';
import { DropdownSelectOption, getA11yStatusMessage } from './DropdownSelect';
import styles from './dropdownSelect.module.scss';

export interface DropdownMultiselectProps {
  buttonText?: string;
  disabled?: boolean;
  helperText?: string;
  id: string;
  invalidText?: string;
  labelText?: string;
  onBlur: (value: string[]) => void;
  onChange: (value: string[]) => void;
  options: DropdownSelectOption[];
  value: string[];
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
    const newValue = value.includes(option.value)
      ? value.filter((item) => item !== option.value)
      : [...value, option.value];

    onChange(newValue);
  };

  const handledBlur = () => {
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
    value
      .map((val) => options.find((option) => option.value === val)?.label)
      .sort()[0];

  const getValueText = () => {
    if (!value.length) return null;
    if (value.length === 1)
      return options.find((option) => option.value === value[0])?.label;
    else return `${getFirstValueFromOptions()} + ${value.length - 1}`;
  };

  return (
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
        {...getToggleButtonProps({
          className: classNames(styles.dropdownSelectButton, {
            [styles.isOpen]: isOpen,
            [styles.isDisabled]: disabled,
          }),
          disabled,
        })}
      >
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
          onBlur: () => setTimeout(handledBlur, 0),
        })}
      >
        {isOpen &&
          options.map((item, index) => {
            const checked = value.includes(item.value);
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
