import classNames from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import SrOnly from '../../../common/components/SrOnly/SrOnly';
import styles from './enrolmentsBadge.module.scss';

interface EnrolmentsBadgeProps {
  approvedSeatsCount?: number | null;
  pendingSeatsCount?: number | null;
  isOccurrenceFull: boolean;
}

const EnrolmentsBadge: React.FC<EnrolmentsBadgeProps> = ({
  approvedSeatsCount = 0,
  pendingSeatsCount = 0,
  isOccurrenceFull,
}) => {
  const { t } = useTranslation();
  return (
    <div className={styles.badgeContainer}>
      <div
        className={classNames(styles.approvedSeats, {
          [styles.enrolmentFull]: isOccurrenceFull,
        })}
      >
        <span aria-hidden>{approvedSeatsCount}</span>
        <SrOnly>
          {t('occurrences.approvedEnrolments', {
            count: approvedSeatsCount || 0,
          })}
        </SrOnly>
        {isOccurrenceFull && (
          <div className={styles.eventFullTooltip} aria-hidden>
            {t('occurrences.occurrenceIsFull')}
          </div>
        )}
      </div>
      <div className={styles.pendingSeats}>
        <span aria-hidden>{pendingSeatsCount}</span>
        <SrOnly>
          {t('occurrences.pendingEnrolments', {
            count: pendingSeatsCount || 0,
          })}
        </SrOnly>
      </div>
      {isOccurrenceFull && (
        <SrOnly> {t('occurrences.occurrenceIsFull')}</SrOnly>
      )}
    </div>
  );
};

export default EnrolmentsBadge;
