import { IconPen } from 'hds-react';
import * as React from 'react';
import { Link } from 'react-router';

import styles from './editButton.module.scss';

const EditButton: React.FC<{ text: string; link: string }> = ({
  link,
  text,
}) => {
  return (
    <Link className={styles.editButton} to={link}>
      <IconPen />
      {text}
    </Link>
  );
};

export default EditButton;
