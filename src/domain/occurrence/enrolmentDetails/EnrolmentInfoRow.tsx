import classNames from 'classnames';
import React from 'react';

import styles from './enrolmentDetails.module.scss';

const EnrolmentInfoRow: React.FC<{
  label: string;
  value?: string;
  space?: boolean;
}> = ({ label, value, space = false }) => {
  return (
    <tr className={classNames(styles.infoRow, { [styles.spacingRow]: space })}>
      <td className={styles.infoLabel}>{`${label}:`}</td>
      <td>{value}</td>
    </tr>
  );
};

export default EnrolmentInfoRow;
