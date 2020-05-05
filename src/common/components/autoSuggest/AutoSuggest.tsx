import classNames from 'classnames';
import { IconCheck, IconClose } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import useKeyboardNavigation from '../../../hooks/useDropdownKeyboardNavigation';
import ScrollIntoViewWithFocus from '../scrollIntoViewWithFocus/ScrollIntoViewWithFocus';
import InputWrapper from '../textInput/InputWrapper';
import inputStyles from '../textInput/inputWrapper.module.scss';
import { valueEventAriaMessage, valueFocusAriaMessage } from './accessibility';
import styles from './autoSuggest.module.scss';

export type AutoSuggestOption = {
  label: string;
  value: string;
};

interface ListOptionProps {
  index: number;
  isFocused: boolean;
  isSelected: boolean;
  onOptionClick: (option: AutoSuggestOption) => void;
  option: AutoSuggestOption;
  setFocusedIndex: (index: number) => void;
}

const ListOption: React.FC<ListOptionProps> = ({
  index,
  isFocused,
  isSelected,
  onOptionClick,
  option,
  setFocusedIndex,
}) => {
  const component = React.useRef<HTMLLIElement>(null);

  const handleOptionClick = () => {
    onOptionClick(option);
  };

  const handleMouseEnter = () => {
    setFocusedIndex(index);
  };

  return (
    <ScrollIntoViewWithFocus isFocused={isFocused}>
      <li
        ref={component}
        key={option.value}
        className={classNames(styles.listItem, {
          [styles.isFocused]: isFocused,
          [styles.isSelected]: isSelected,
        })}
        onClick={handleOptionClick}
        onMouseEnter={handleMouseEnter}
        role="option"
        aria-selected={isSelected}
      >
        {option.label} <IconCheck />
      </li>
    </ScrollIntoViewWithFocus>
  );
};

interface Props {
  disabled?: boolean;
  helperText?: string;
  id: string;
  inputValue: string;
  invalidText?: string;
  labelledBy?: string;
  labelText: string;
  loading?: boolean;
  onBlur: (val: AutoSuggestOption | null) => void;
  onChange: (val: AutoSuggestOption | null) => void;
  options: AutoSuggestOption[];
  placeholder?: string;
  readOnly?: boolean;
  setInputValue: (value: string) => void;
  value: AutoSuggestOption | null;
}

const AutoSuggest: React.FC<Props> = ({
  disabled,
  helperText,
  id,
  inputValue,
  invalidText,
  labelledBy,
  labelText,
  loading,
  onBlur,
  onChange,
  options,
  placeholder,
  readOnly,
  setInputValue,
  value,
}) => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [ariaLiveSelection, setAriaLiveSelection] = React.useState('');
  const input = React.useRef<HTMLInputElement>(null);

  const container = React.useRef<HTMLDivElement>(null);
  const {
    focusedIndex,
    setFocusedIndex,
    setup: setupKeyboardNav,
    teardown: teardownKeyboardNav,
  } = useKeyboardNavigation({
    container: container,
    listLength: options.length,
  });

  const focusedValue = React.useMemo(() => {
    return options.length > focusedIndex ? options[focusedIndex] : null;
  }, [focusedIndex, options]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const isComponentFocused = () => {
    const active = document.activeElement;
    const current = container && container.current;

    if (current && active instanceof Node && current.contains(active)) {
      return true;
    }
    return false;
  };

  const ensureMenuIsClosed = () => {
    if (isMenuOpen) {
      setInputValue('');
      setIsMenuOpen(false);
    }
  };

  const ensureMenuIsOpen = React.useCallback(() => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
    }
  }, [isMenuOpen]);

  const ensureIsFocused = () => {
    if (!isFocused) {
      setIsFocused(true);
    }
  };

  const ensureIsNotFocused = () => {
    if (isFocused) {
      setIsFocused(false);
    }
  };

  const onDocumentClick = () => {
    // Close menu when clicking outside of the component
    if (!isComponentFocused()) {
      if (isFocused) {
        onBlur(value);
      }

      ensureIsNotFocused();
      ensureMenuIsClosed();
    }
  };

  const onDocumentFocusin = () => {
    if (isComponentFocused()) {
      ensureIsFocused();
    } else {
      if (isFocused) {
        onBlur(value);
      }

      ensureIsNotFocused();
      ensureMenuIsClosed();
    }
  };

  const announceAriaLiveSelection = ({
    event,
    val,
  }: {
    event: string;
    val: string;
  }) => {
    setAriaLiveSelection(valueEventAriaMessage({ event, value: val, t }));
  };

  const selectOption = (newValue: AutoSuggestOption) => {
    announceAriaLiveSelection({
      event: 'select-option',
      val: newValue.label,
    });
  };

  const deselectOption = () => {
    announceAriaLiveSelection({
      event: 'remove-value',
      val: value ? value.label : '',
    });
  };

  const handleOptionClick = (option: AutoSuggestOption) => {
    ensureMenuIsClosed();
    onChange(option);
    selectOption(option);
    setInputValue('');
  };

  const handleDocumentKeyDown = (event: KeyboardEvent) => {
    // Handle keyboard events only if current element is focused
    if (!isComponentFocused()) return;
    switch (event.key) {
      // Close menu on ESC key
      case 'Escape':
        ensureMenuIsClosed();
        break;
      case 'ArrowUp':
        ensureMenuIsOpen();
        break;
      case 'ArrowDown':
        ensureMenuIsOpen();
        break;
      case 'Enter':
        if (focusedValue) {
          handleOptionClick(focusedValue);
        }
        break;
    }
  };

  React.useEffect(() => {
    if (inputValue) {
      ensureMenuIsOpen();
    }
  }, [ensureMenuIsOpen, inputValue]);

  React.useEffect(() => {
    setupKeyboardNav();
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', handleDocumentKeyDown);
    document.addEventListener('focusin', onDocumentFocusin);
    // Clean up event listener to prevent memory leaks
    return () => {
      teardownKeyboardNav();
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('keydown', handleDocumentKeyDown);
      document.removeEventListener('focusin', onDocumentFocusin);
    };
  });

  const constructAriaLiveMessage = () => {
    const focusedValueMsg = focusedValue
      ? valueFocusAriaMessage({
          focusedValue,
          getOptionLabel: () => focusedValue.label,
          options,
          t,
        })
      : '';

    return isMenuOpen ? `${focusedValueMsg}` : '';
  };

  const renderLiveRegion = () => {
    if (!isFocused) return null;

    return (
      <span className={styles.a11yText} aria-live="polite">
        <p>{ariaLiveSelection}</p>
        <p>{constructAriaLiveMessage()}</p>
      </span>
    );
  };

  const clearValue = () => {
    ensureMenuIsClosed();
    onChange({ value: '', label: '' });
    deselectOption();
    setInputValue('');
    if (input.current) {
      input.current.focus();
    }
  };

  return (
    <div className={styles.autoSuggest} ref={container}>
      {renderLiveRegion()}

      <InputWrapper
        helperText={helperText}
        id={id}
        invalid={!!invalidText}
        invalidText={invalidText}
        labelText={labelText}
      >
        <input
          ref={input}
          aria-autocomplete="list"
          type="text"
          className={inputStyles.input}
          aria-labelledby={labelledBy}
          disabled={disabled}
          id={id}
          onChange={handleInputChange}
          placeholder={!value ? placeholder : ''}
          readOnly={readOnly}
          value={inputValue}
        />
        {value && (
          <button
            aria-label={t(
              'common.autoSuggest.accessibility.removeValueButtonAriaMessage'
            )}
            className={styles.removeButton}
            onClick={clearValue}
          >
            <IconClose />
          </button>
        )}
        {!inputValue && (
          <div className={styles.singleValue}>{value?.label}</div>
        )}
        {isMenuOpen && (
          <div className={styles.autoSuggestMenu}>
            <>
              {options.length ? (
                <ul role="listbox">
                  {options.map((option, index) => {
                    return (
                      <ListOption
                        key={option.value}
                        index={index}
                        isFocused={focusedIndex === index}
                        isSelected={!!value && value.value === option.value}
                        onOptionClick={handleOptionClick}
                        option={option}
                        setFocusedIndex={setFocusedIndex}
                      />
                    );
                  })}
                </ul>
              ) : (
                <div className={styles.infoMessage}>
                  {loading
                    ? t('common.autoSuggest.loading')
                    : t('common.autoSuggest.noResults')}
                </div>
              )}
            </>
          </div>
        )}
      </InputWrapper>
    </div>
  );
};

export default AutoSuggest;
