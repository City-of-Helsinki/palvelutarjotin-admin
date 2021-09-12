import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Link: React.FC<{ to: string }> = ({ to, children, ...rest }) => {
  return (
    <RouterLink to={to} {...rest}>
      {children}
    </RouterLink>
  );
};

export default Link;
