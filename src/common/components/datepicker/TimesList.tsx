import classNames from 'classnames';
import React from 'react';

import useDropdownKeyboardNavigation from '../../../hooks/useDropdownKeyboardNavigation';
import { formatTime, TimeObject } from '../timepicker/utils';
import styles from './datepicker.module.scss';

type TimesListProps = {
  times: TimeObject[];
  onTimeClick: (time: TimeObject) => void;
  datetime: Date | null;
};

const TimesList = React.forwardRef<HTMLDivElement, TimesListProps>(
  ({ times, onTimeClick, datetime }, forwardedRef) => {
    const findSelectedIndex = React.useCallback(() => {
      if (datetime) {
        const index = times.findIndex(
          (time) =>
            datetime.getHours() === time.hours &&
            datetime.getMinutes() === time.minutes
        );
        return index < 0 ? 0 : index;
      }
      return 0;
    }, [datetime, times]);

    const [selectedIndex, setSelectedIndex] = React.useState<number>(() => {
      return findSelectedIndex();
    });

    const {
      focusedIndex,
      setFocusedIndex,
      setup: setupKeyboardNav,
      teardown: teardownKeyoboardNav,
    } = useDropdownKeyboardNavigation({
      container: forwardedRef as React.MutableRefObject<HTMLDivElement | null>,
      listLength: times.length,
    });

    React.useEffect(() => {
      setupKeyboardNav();
      return () => {
        teardownKeyoboardNav();
      };
    }, [setupKeyboardNav, teardownKeyoboardNav]);

    React.useEffect(() => {
      setSelectedIndex(findSelectedIndex());
    }, [datetime, findSelectedIndex, setFocusedIndex]);

    const handleTimesListKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      switch (e.key) {
        case 'DownArrow':
        case 'UpArrow':
        // handle initial focus
      }
    };

    return (
      <>
        <div className={styles.timesDivider} />
        <div
          className={styles.timesListContainer}
          tabIndex={0}
          ref={forwardedRef}
          onKeyDown={handleTimesListKeyDown}
        >
          <div className={styles.timesList}>
            {times.map((time, index) => (
              <TimeItem
                key={`${time.hours}:${time.minutes}`}
                time={time}
                index={index}
                selected={selectedIndex === index}
                focused={focusedIndex === index}
                setFocusedIndex={setFocusedIndex}
                onTimeClick={onTimeClick}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
);

type TimeItemProps = {
  time: TimeObject;
  focused: boolean;
  index: number;
  setFocusedIndex: (index: number) => void;
  onTimeClick: (time: TimeObject) => void;
  selected: boolean;
};

const TimeItem: React.FC<TimeItemProps> = ({
  time,
  focused,
  index,
  selected,
  setFocusedIndex,
  onTimeClick,
}) => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  // Scrolls selected time button smoothly into view
  React.useEffect(() => {
    if (selected) {
      buttonRef.current?.scrollIntoView({
        block: 'center',
        inline: 'center',
        behavior: 'smooth',
      });
    }
  }, [selected]);

  // scroll focused element into view
  React.useEffect(() => {
    if (focused) {
      buttonRef.current?.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }, [focused]);

  React.useEffect(() => {
    if (focused) {
      buttonRef.current?.focus();
    }
  }, [focused]);

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setFocusedIndex(index);
  };

  return (
    <button
      className={classNames(styles.timeItem, {
        [styles.selectedTimeItem]: selected,
      })}
      ref={buttonRef}
      type="button"
      onMouseEnter={(e) => {
        handleMouseEnter(e);
      }}
      tabIndex={focused ? 0 : -1}
      onClick={() => onTimeClick(time)}
    >
      {formatTime(time)}
    </button>
  );
};

export default TimesList;
