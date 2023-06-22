import classnames from 'classnames';
import { FunctionComponent } from 'react';

import styles from './container.module.scss';

const Container: FunctionComponent<{
  className?: string;
  size?: 'default' | 'xsmall' | 'small';
  children?: React.ReactNode;
}> = ({ children, className, size = 'default' }) => {
  return (
    <div className={classnames(styles.container, styles[size], className)}>
      {children}
    </div>
  );
};

export default Container;
