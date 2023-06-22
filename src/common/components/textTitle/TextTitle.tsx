import classNames from 'classnames';
import * as React from 'react';

import styles from './textTitle.module.scss';

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const TextTitle: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={classNames(styles.textTitle, className)}>{children}</div>
  );
};

export default TextTitle;
