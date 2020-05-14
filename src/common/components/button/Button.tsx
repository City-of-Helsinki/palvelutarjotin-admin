import { Button as HdsButton, ButtonProps } from 'hds-react';
import React from 'react';

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return <HdsButton {...rest}>{children}</HdsButton>;
};

export default Button;
