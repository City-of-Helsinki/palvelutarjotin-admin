import classnames from 'classnames';
import React, { FunctionComponent } from 'react';

import styles from './container.module.scss';

const Container: FunctionComponent<{
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={classnames(styles.container, className)}>{children}</div>
  );
};

export default Container;
