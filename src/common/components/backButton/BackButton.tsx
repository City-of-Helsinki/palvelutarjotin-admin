import { IconArrowLeft } from 'hds-react';
import React from 'react';

import styles from './backButton.module.scss';

interface Props {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const BackButton: React.FC<Props> = ({ onClick, children }) => {
  return (
    <button className={styles.backButton} onClick={onClick}>
      <div className={styles.backIconWrapper}>
        <IconArrowLeft />
      </div>
      <span>{children}</span>
    </button>
  );
};

export default BackButton;
