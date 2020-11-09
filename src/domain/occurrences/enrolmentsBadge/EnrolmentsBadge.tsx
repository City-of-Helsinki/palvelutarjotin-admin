import React from 'react';

import styles from './enrolmentsBadge.module.scss';

interface EnrolmentsBadgeProps {
  acceptedSeatsCount?: number | null;
  pendingSeatsCount?: number | null;
}

const EnrolmentsBadge: React.FC<EnrolmentsBadgeProps> = ({
  acceptedSeatsCount = 0,
  pendingSeatsCount = 0,
}) => {
  return (
    <div className={styles.badgeContainer}>
      <div className={styles.acceptedSeats}>
        <span>{acceptedSeatsCount}</span>
      </div>
      <div className={styles.pendingSeats}>{pendingSeatsCount}</div>
    </div>
  );
};

export default EnrolmentsBadge;
