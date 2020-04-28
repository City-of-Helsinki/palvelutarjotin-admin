import classNames from 'classnames';
import { Button as HdsButton, ButtonProps } from 'hds-react';
import React from 'react';

import styles from './button.module.scss';

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  color = 'primary',
  ...rest
}) => {
  return (
    <HdsButton
      className={classNames(className, { [styles[color || '']]: color })}
      color={color}
      {...rest}
    >
      {children}
    </HdsButton>
  );
};

export default Button;
