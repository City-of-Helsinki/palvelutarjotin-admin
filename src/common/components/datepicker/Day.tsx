import { useDay } from '@datepicker-react/hooks';
import classNames from 'classnames';
import formatDate from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import isToday from 'date-fns/isToday';
import React, { useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import useLocale from '../../../hooks/useLocale';
import { dateLocales } from './contants';
import styles from './datepicker.module.scss';
import DatepickerContext from './datepickerContext';

const Day: React.FC<{ dayLabel: string; date: Date }> = ({
  dayLabel,
  date,
}) => {
  const dayRef = useRef(null);
  const { t } = useTranslation();
  const locale = useLocale();

  const {
    focusedDate,
    isDateFocused,
    isDateSelected,
    isDateHovered,
    isDateBlocked,
    isFirstOrLastSelectedDate,
    onDateSelect,
    onDateFocus,
    onDateHover,
    selectedDate,
  } = useContext(DatepickerContext);

  const { disabledDate, onClick, onKeyDown, onMouseEnter, tabIndex } = useDay({
    date,
    focusedDate,
    isDateFocused,
    isDateSelected,
    isDateHovered,
    isDateBlocked,
    isFirstOrLastSelectedDate,
    onDateFocus,
    onDateSelect,
    onDateHover,
    dayRef,
  });

  if (!dayLabel) {
    return <div />;
  }

  return (
    <button
      className={classNames(styles.dayButton, {
        [styles.daySelected]: selectedDate
          ? isSameDay(selectedDate, date)
          : false,
        [styles.dayDisabled]: disabledDate,
        [styles.dayToday]: isToday(date),
      })}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onMouseEnter={onMouseEnter}
      onFocus={() => onDateFocus(date)}
      tabIndex={tabIndex}
      type="button"
      ref={dayRef}
      aria-label={t('common.datepicker.accessibility.selectDate', {
        value: formatDate(date, 'dd.MM.yyyy', { locale: dateLocales[locale] }),
      })}
    >
      {dayLabel}
    </button>
  );
};

export default Day;
