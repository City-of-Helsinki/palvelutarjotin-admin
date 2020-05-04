import classNames from 'classnames';
import { IconCheck } from 'hds-react';
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
        lang={option.value}
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

  const isComponentFocused = React.useCallback(() => {
    const active = document.activeElement;
    const current = container && container.current;

    if (current && active instanceof Node && current.contains(active)) {
      return true;
    }
    return false;
  }, []);

  const ensureMenuIsClosed = React.useCallback(() => {
    if (isMenuOpen) {
      setInputValue('');
      setIsMenuOpen(false);
    }
  }, [isMenuOpen, setInputValue]);

  const ensureMenuIsOpen = React.useCallback(() => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
    }
  }, [isMenuOpen]);

  const ensureIsFocused = React.useCallback(() => {
    if (!isFocused) {
      setIsFocused(true);
    }
  }, [isFocused]);

  const ensureIsNotFocused = React.useCallback(() => {
    if (isFocused) {
      setIsFocused(false);
    }
  }, [isFocused]);

  const onDocumentClick = React.useCallback(() => {
    // Close menu when clicking outside of the component
    if (!isComponentFocused()) {
      if (isFocused) {
        onBlur(value);
      }

      ensureIsNotFocused();
      ensureMenuIsClosed();
    }
  }, [
    ensureIsNotFocused,
    ensureMenuIsClosed,
    isComponentFocused,
    isFocused,
    onBlur,
    value,
  ]);

  const onDocumentFocusin = React.useCallback(() => {
    if (isComponentFocused()) {
      ensureIsFocused();
    } else {
      if (isFocused) {
        onBlur(value);
      }

      ensureIsNotFocused();
      ensureMenuIsClosed();
    }
  }, [
    ensureIsFocused,
    ensureIsNotFocused,
    ensureMenuIsClosed,
    isComponentFocused,
    isFocused,
    onBlur,
    value,
  ]);

  const announceAriaLiveSelection = React.useCallback(
    ({ event, val }: { event: string; val: string }) => {
      setAriaLiveSelection(valueEventAriaMessage({ event, value: val, t }));
    },
    [t]
  );

  const selectOption = React.useCallback(
    (newValue: AutoSuggestOption) => {
      announceAriaLiveSelection({
        event: 'select-option',
        val: newValue.label,
      });
    },
    [announceAriaLiveSelection]
  );

  const handleOptionClick = React.useCallback(
    (option: AutoSuggestOption) => {
      ensureMenuIsClosed();
      onChange(option);
      selectOption(option);
      setInputValue('');
    },
    [ensureMenuIsClosed, onChange, selectOption, setInputValue]
  );

  const handleDocumentKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
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
    },
    [
      ensureMenuIsClosed,
      ensureMenuIsOpen,
      focusedValue,
      handleOptionClick,
      isComponentFocused,
    ]
  );

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
  }, [
    handleDocumentKeyDown,
    onDocumentClick,
    onDocumentFocusin,
    setupKeyboardNav,
    teardownKeyboardNav,
  ]);

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
          aria-autocomplete="list"
          type="text"
          className={inputStyles.input}
          aria-labelledby={labelledBy}
          disabled={disabled}
          id={id}
          onChange={handleInputChange}
          placeholder={placeholder}
          readOnly={readOnly}
          value={inputValue}
        />
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
