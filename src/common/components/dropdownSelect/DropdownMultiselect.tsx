import classNames from 'classnames';
import {
  useSelect,
  UseSelectState,
  UseSelectStateChangeOptions,
} from 'downshift';
import { IconAngleDown } from 'hds-react';
import debounce from 'lodash/debounce';
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

  // To prevent "Cannot update a component (`Formik`) while rendering a different component
  // (`DropdownSelect`). To locate the bad setState() call inside `DropdownSelect`" error set
  // short debounce/delay to change event
  const debouncedChange = debounce((option: DropdownSelectOption) => {
    const newValue = value.includes(option.value)
      ? value.filter((item) => item !== option.value)
      : [...value, option.value];

    onChange(newValue);
  }, 1);

  // To prevent "Cannot update a component (`Formik`) while rendering a different component
  // (`DropdownSelect`). To locate the bad setState() call inside `DropdownSelect`" error set
  // short debounce/delay to Blur event
  const debouncedBlur = debounce((val: string[]) => {
    onBlur(val);
  }, 1);

  const stateReducer = (
    state: UseSelectState<DropdownSelectOption>,
    actionAndChanges: UseSelectStateChangeOptions<DropdownSelectOption>
  ) => {
    const { changes, type } = actionAndChanges;

    switch (type) {
      case useSelect.stateChangeTypes.MenuKeyDownEnter:
      case useSelect.stateChangeTypes.ItemClick:
        const { selectedItem } = changes;
        debouncedChange(selectedItem);

        return {
          ...changes,
          highlightedIndex: state.highlightedIndex, // keep current hichlighted index
          isOpen: true, // Keep menu open
        };
      case useSelect.stateChangeTypes.MenuBlur:
        debouncedBlur(value);
        return changes;
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
    onSelectedItemChange: () => null,
    stateReducer,
  });

  const getValueText = () => {
    if (!value.length) return null;
    if (value.length === 1)
      return options.find((option) => option.value === value[0])?.label;
    else
      return `${
        [
          ...value.map(
            (val) => options.find((option) => option.value === val)?.label
          ),
        ].sort()[0]
      } + ${value.length - 1}`;
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
        {...getToggleButtonProps()}
        className={classNames(styles.dropdownSelectButton, {
          [styles.isOpen]: isOpen,
          [styles.isDisabled]: disabled,
        })}
        disabled={disabled}
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
        {...getMenuProps()}
        className={classNames(styles.dropdownSelectMenu, {
          [styles.isOpen]: isOpen,
        })}
      >
        {isOpen &&
          options.map((item, index) => {
            const checked = value.includes(item.value);
            const highlighted = highlightedIndex === index;

            const { onClick, ...itemProps } = getItemProps({ item, index });

            const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
              event.preventDefault();
              onClick(event);
            };

            return (
              <li
                key={index}
                className={classNames(styles.dropdownMultiselectMenuItem, {
                  [styles.isHighlighted]: highlighted,
                  [styles.isChecked]: checked,
                })}
                role="option"
                aria-checked={checked}
                aria-selected={highlighted}
                {...itemProps}
                onClick={handleClick}
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
