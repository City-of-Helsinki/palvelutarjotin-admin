import * as React from 'react';
import { Link as RouterLink } from 'react-router';

const Link: React.FC<{ to: string; children?: React.ReactNode }> = ({
  to,
  children,
  ...rest
}) => {
  return (
    <RouterLink to={to} {...rest}>
      {children}
    </RouterLink>
  );
};

export default Link;
