import classNames from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import SrOnly from '../../../common/components/SrOnly/SrOnly';
import styles from './enrolmentsBadge.module.scss';

interface EnrolmentsBadgeProps {
  acceptedSeatsCount?: number | null;
  pendingSeatsCount?: number | null;
  remainingSeatsCount?: number | null;
}

const EnrolmentsBadge: React.FC<EnrolmentsBadgeProps> = ({
  acceptedSeatsCount = 0,
  pendingSeatsCount = 0,
  remainingSeatsCount = 0,
}) => {
  const { t } = useTranslation();
  const isOccurrenceFull = remainingSeatsCount === 0;
  return (
    <div className={styles.badgeContainer}>
      <div
        className={classNames(styles.acceptedSeats, {
          [styles.enrolmentFull]: isOccurrenceFull,
        })}
      >
        <span>{acceptedSeatsCount}</span>
        {isOccurrenceFull && (
          <div className={styles.eventFullTooltip} aria-hidden>
            {t('occurrences.occurrenceIsFull')}
          </div>
        )}
      </div>
      <div className={styles.pendingSeats}>{pendingSeatsCount}</div>
      {isOccurrenceFull && (
        <SrOnly> {t('occurrences.occurrenceIsFull')}</SrOnly>
      )}
    </div>
  );
};

export default EnrolmentsBadge;
