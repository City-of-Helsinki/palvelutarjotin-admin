import * as React from 'react';

import styles from './formGroup.module.scss';

const FormGroup: React.FC = ({ children, ...rest }) => {
  return (
    <div className={styles.formGroup} {...rest}>
      {children}
    </div>
  );
};

export default FormGroup;
