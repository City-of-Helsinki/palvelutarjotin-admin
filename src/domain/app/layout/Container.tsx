import classnames from 'classnames';
import React, { FunctionComponent } from 'react';

import styles from './container.module.scss';

const Container: FunctionComponent<{
  className?: string;
  isNarrow?: boolean;
}> = ({ children, className, isNarrow = false }) => {
  return (
    <div
      className={classnames(
        styles.container,
        { [styles.narrow]: isNarrow },
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
