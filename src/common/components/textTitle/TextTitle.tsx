import classNames from 'classnames';
import React from 'react';

import styles from './textTitle.module.scss';

type Props = {
  className?: string;
};

const TextTitle: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={classNames(styles.textTitle, className)}>{children}</div>
  );
};

export default TextTitle;
