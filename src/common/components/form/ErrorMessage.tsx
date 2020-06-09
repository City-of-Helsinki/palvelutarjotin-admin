import React from 'react';

import styles from './errorMessage.module.scss';

const ErrorMessage: React.FC = ({ children }) => (
  <div className={styles.errorMessage}>{children}</div>
);

export default ErrorMessage;
