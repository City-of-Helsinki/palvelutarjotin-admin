import classNames from 'classnames';
import { IconAngleDown } from 'hds-react';
import * as React from 'react';

import styles from './enrolmentTable.module.scss';

type Props = {
  isExpanded: boolean;
  onToggle: () => void;
  ariaLabel: string;
};

const EnrolmentExpandToggleCell: React.FC<Props> = ({
  isExpanded,
  onToggle,
  ariaLabel,
}) => {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onToggle}
      aria-expanded={isExpanded}
    >
      <IconAngleDown
        className={classNames(styles.iconAngle, {
          [styles.iconAngleUp]: isExpanded,
        })}
      />
    </button>
  );
};

export default EnrolmentExpandToggleCell;
