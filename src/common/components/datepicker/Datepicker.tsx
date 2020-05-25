import {
  OnDatesChangeProps,
  START_DATE,
  useDatepicker,
} from '@datepicker-react/hooks';
import classNames from 'classnames';
import formatDate from 'date-fns/format';
import isValidDate from 'date-fns/isValid';
import parseDate from 'date-fns/parse';
import { IconAngleLeft, IconAngleRight } from 'hds-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import useLocale from '../../../hooks/useLocale';
import IconCalendar from '../../../icons/IconCalendar';
import InputWrapper from '../textInput/InputWrapper';
import inputStyles from '../textInput/inputWrapper.module.scss';
import { DATE_FORMAT, dateLocales } from './contants';
import styles from './datepicker.module.scss';
import DatepickerContext from './datepickerContext';
import Month from './Month';
import MonthNavButton from './MonthNavButton';

type Props = {
  disabled?: boolean;
  helperText?: string;
  id: string;
  invalidText?: string;
  labelText?: string;
  onBlur: () => void;
  onChange: (value?: Date | null) => void;
  value: Date | null;
};

const Datepicker: React.FC<Props> = ({
  value,
  id,
  helperText,
  invalidText,
  labelText,
  onChange,
  onBlur,
}) => {
  const [dateValue, setDateValue] = useState('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const datepickerClicked = React.useRef<boolean>(false);
  const container = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const datepickerContainer = React.useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const { t } = useTranslation();

  React.useEffect(() => {
    if (value && isValidDate(value)) {
      const formattedDate = formatDate(value, DATE_FORMAT);
      setDateValue(formattedDate);
    }
  }, [value]);

  const isComponentFocused = () => {
    const active = document.activeElement;
    const current = container.current;

    if (current && active instanceof Node && current.contains(active)) {
      return true;
    }
    return false;
  };

  const handleDateChange = (data: OnDatesChangeProps) => {
    setIsCalendarOpen(false);
    inputRef.current?.focus();
    if (data.startDate) {
      onChange(data.startDate);
    } else {
      onChange(null);
    }
  };

  const handleDocumentKeyDown = (event: KeyboardEvent) => {
    if (!isComponentFocused()) return;
    switch (event.key) {
      case 'Escape':
        ensureCalendarIsClosed();
        break;
      case 'ArrowDown':
        ensureCalendarIsOpen();
        break;
    }
  };

  const onDocumentClick = () => {
    if (!isComponentFocused() && !datepickerClicked.current) {
      ensureCalendarIsClosed();
    }
    datepickerClicked.current = false;
  };

  const closeCalendar = () => {
    setIsCalendarOpen(false);
    onBlur();
  };

  const preventArrowKeyScroll = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault();
        break;
    }
  };

  const onDocumentFocusin = () => {
    if (!isComponentFocused()) {
      ensureCalendarIsClosed();
    }
  };

  const ensureCalendarIsClosed = () => {
    if (isCalendarOpen) {
      setIsCalendarOpen(false);
      onBlur();
    }
  };

  const ensureCalendarIsOpen = React.useCallback(() => {
    if (!isCalendarOpen) {
      setIsCalendarOpen(true);
    }
  }, [isCalendarOpen]);

  const handleInputFocus = () => {
    if (!isCalendarOpen) {
      setIsCalendarOpen(true);
    } else {
      setIsCalendarOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', handleDocumentKeyDown);
    document.addEventListener('focusin', onDocumentFocusin);

    return () => {
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('keydown', handleDocumentKeyDown);
      document.removeEventListener('focusin', onDocumentFocusin);
    };
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateValue(event.target.value);
    const parsedDate = parseDate(event.target.value, DATE_FORMAT, new Date());
    if (isValidDate(parsedDate) && parsedDate.getFullYear() > 1970) {
      onChange(parsedDate);
    } else {
      onChange(null);
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!isCalendarOpen) {
      onBlur();
    }
  };

  const {
    firstDayOfWeek,
    activeMonths: [activeMonth],
    isDateSelected,
    isDateHovered,
    isFirstOrLastSelectedDate,
    isDateBlocked,
    isDateFocused,
    focusedDate,
    onDateHover,
    onDateSelect,
    onDateFocus,
    goToPreviousMonths,
    goToNextMonths,
  } = useDatepicker({
    startDate: isValidDate(value) ? value : new Date(),
    endDate: isValidDate(value) ? value : new Date(),
    focusedInput: START_DATE,
    onDatesChange: handleDateChange,
    numberOfMonths: 1,
    minBookingDate: new Date(),
  });

  const { month, year } = activeMonth;

  return (
    <DatepickerContext.Provider
      value={{
        focusedDate,
        isDateFocused,
        isDateSelected,
        isDateHovered,
        isDateBlocked,
        isFirstOrLastSelectedDate,
        onDateSelect,
        onDateFocus,
        onDateHover,
      }}
    >
      <div
        ref={container}
        onKeyDown={preventArrowKeyScroll}
        onClick={() => {
          // prevent datepicker closing when clicking inside
          datepickerClicked.current = true;
          setTimeout(() => (datepickerClicked.current = false));
        }}
        className={styles.datepickerWrapper}
      >
        <InputWrapper
          id={id}
          helperText={invalidText || helperText}
          invalid={!!invalidText}
          labelText={labelText}
          hasIcon
        >
          <input
            name={id}
            id={id}
            ref={inputRef}
            className={classNames(inputStyles.input, styles.datepickerInput, {
              [styles.invalid]: !!invalidText,
            })}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            value={dateValue}
          />
          <IconCalendar className={styles.iconCalendar} />
          {isCalendarOpen && (
            <div
              className={styles.datepickerContainer}
              ref={datepickerContainer}
            >
              <div className={styles.monthNavigation}>
                <MonthNavButton
                  onClick={goToPreviousMonths}
                  aria-label={t(
                    'common.datepicker.accessibility.buttonPreviousMonth'
                  )}
                >
                  <IconAngleLeft />
                </MonthNavButton>
                <div className={styles.currentMonth} aria-live="polite">
                  {formatDate(new Date(year, month), 'LLLL yyyy', {
                    locale: dateLocales[locale],
                  })}
                </div>
                <MonthNavButton
                  onClick={goToNextMonths}
                  aria-label={t(
                    'common.datepicker.accessibility.buttonNextMonth'
                  )}
                >
                  <IconAngleRight />
                </MonthNavButton>
              </div>
              <Month
                key={`${year}-${month}`}
                year={year}
                month={month}
                firstDayOfWeek={firstDayOfWeek}
              />
              <button
                className={styles.closeButton}
                onClick={closeCalendar}
                type="button"
              >
                {t('common.datepicker.buttonClose')}
              </button>
            </div>
          )}
        </InputWrapper>
      </div>
    </DatepickerContext.Provider>
  );
};

export default Datepicker;
