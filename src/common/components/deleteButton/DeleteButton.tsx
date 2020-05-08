import React from 'react';

import DeleteIcon from '../../../icons/DeleteIcon';
import styles from './deleteButton.module.scss';

const DeleteButton: React.FC<{
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}> = ({ onClick, children }) => {
  return (
    <button className={styles.deleteImageButton} onClick={onClick}>
      <div className={styles.deleteIconWrapper}>
        <DeleteIcon />
      </div>
      <span>{children}</span>
    </button>
  );
};

export default DeleteButton;
