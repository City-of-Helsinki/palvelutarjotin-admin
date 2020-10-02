import React from 'react';

import styles from './formGroup.module.scss';

const FormGroup: React.FC = ({ children }) => {
  return <div className={styles.formGroup}>{children}</div>;
};

export default FormGroup;
