import * as React from 'react';

import styles from './formGroup.module.scss';

interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const FormGroup: React.FC<FormGroupProps> = ({ children, ...rest }) => {
  return (
    <div className={styles.formGroup} {...rest}>
      {children}
    </div>
  );
};

export default FormGroup;
