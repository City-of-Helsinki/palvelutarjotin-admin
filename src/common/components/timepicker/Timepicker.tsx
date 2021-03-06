import classNames from 'classnames';
import { useCombobox, UseComboboxState } from 'downshift';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import InputWrapper from '../textInput/InputWrapper';
import inputStyles from '../textInput/inputWrapper.module.scss';
import styles from './timepicker.module.scss';
import { getTimes } from './utils';

export type Props = {
  className?: string;
  disabled?: boolean;
  helperText?: string;
  id: string;
  invalidText?: string;
  labelText?: string;
  value: string;
  invalid: boolean;
  onChange: (value: string) => void;
  onBlur: (value: string) => void;
  minuteInterval?: number;
};

const TIME_INTERVAL = 15;

const Timepicker: React.FC<Props> = ({
  className,
  value,
  invalidText,
  helperText,
  labelText,
  onChange,
  onBlur,
  minuteInterval = TIME_INTERVAL,
  id,
}) => {
  const [timesList] = React.useState(() => getTimes(minuteInterval));
  const [inputItems, setInputItems] = React.useState(timesList);
  // used to prevent onBlur being called when user is clicking menu item with mouse
  const menuItemClicked = React.useRef<boolean>(false);
  const { t } = useTranslation();

  const handleInputValueChange = ({
    inputValue,
  }: Partial<UseComboboxState<string>>) => {
    if (inputValue) {
      const modifiedInputValue = inputValue.replace('.', ':').toLowerCase();
      setInputItems(
        timesList.filter((time) => time.startsWith(modifiedInputValue))
      );
    } else {
      setInputItems(timesList);
    }
    onChange(inputValue || '');
  };

  const {
    isOpen,
    selectedItem,
    openMenu,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    id,
    items: inputItems,
    onInputValueChange: handleInputValueChange,
    getA11ySelectionMessage: ({ selectedItem }) => {
      return t('common.dropdownSelect.accessibility.selectionMessage', {
        value: selectedItem,
      });
    },
  });

  const handleInputOnFocus = () => {
    openMenu();
  };

  const handleInputOnBlur = () => {
    if (!menuItemClicked.current) {
      onBlur(selectedItem || value);
    }
    menuItemClicked.current = false;
  };

  const { id: inputId, ...inputProps } = getInputProps({
    className: classNames(inputStyles.input),
    onFocus: handleInputOnFocus,
    onBlur: handleInputOnBlur,
    value: value,
  });
  const { htmlFor, ...labelProps } = getLabelProps();
  const showDropdown = isOpen && inputItems.length > 0;

  return (
    <InputWrapper
      className={classNames(styles.wrapper, className)}
      helperText={invalidText || helperText}
      errorText={invalidText}
      invalid={!!invalidText}
      labelText={labelText}
      {...labelProps}
      id={htmlFor}
      labelId={labelProps.id}
    >
      <div {...getComboboxProps()}>
        <input id={inputId} {...inputProps} />
      </div>
      <ul
        {...getMenuProps({
          className: classNames(styles.dropdownMenu, {
            [styles.isOpen]: showDropdown,
          }),
        })}
      >
        {showDropdown &&
          inputItems.map((item, index) => (
            <li
              {...getItemProps({
                key: `${item}${index}`,
                item,
                index,
                className: classNames(styles.dropdownMenuItem, {
                  [styles.isHighlighted]: highlightedIndex === index,
                }),
                // prevent onBlur being called when clicking menu item
                onMouseDown: () => {
                  menuItemClicked.current = true;
                  setTimeout(() => (menuItemClicked.current = false));
                },
              })}
            >
              {item}
            </li>
          ))}
      </ul>
    </InputWrapper>
  );
};

export default Timepicker;
