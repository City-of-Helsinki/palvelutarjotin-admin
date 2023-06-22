import * as React from 'react';

import styles from './errorMessage.module.scss';

const ErrorMessage: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => <div className={styles.errorMessage}>{children}</div>;

export default ErrorMessage;
