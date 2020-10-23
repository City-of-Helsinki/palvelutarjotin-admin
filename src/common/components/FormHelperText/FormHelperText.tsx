import classnames from 'classnames';
import React from 'react';

import styles from './formHelperText.module.scss';

const FormHelperText: React.FC<{
  text: string;
  className?: string;
  style?: React.CSSProperties;
}> = ({ text, className, style }) => {
  return (
    <div className={classnames(styles.helperText, className)} style={style}>
      {text}
    </div>
  );
};

export default FormHelperText;
