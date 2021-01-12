import * as React from 'react';

import styles from './helperText.module.scss';

const HelperText: React.FC = ({ children }) => (
  <div className={styles.helperText}>{children}</div>
);

export default HelperText;
