import { IconCrossCircle } from 'hds-react';
import React from 'react';

import styles from './deleteButton.module.scss';

const DeleteButton: React.FC<{
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}> = ({ onClick, children }) => {
  return (
    <button className={styles.deleteImageButton} onClick={onClick}>
      <div className={styles.deleteIconWrapper}>
        <IconCrossCircle />
      </div>
      <span>{children}</span>
    </button>
  );
};

export default DeleteButton;
