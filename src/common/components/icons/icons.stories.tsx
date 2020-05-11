import React from 'react';

import IconLoadingSpinner from './IconLoadingSpinner';

export default {
  title: 'Icons',
  component: IconLoadingSpinner,
};

const Container: React.FC = ({ children }) => (
  <div style={{ width: '50px' }}>{children}</div>
);

export const LoadingSpinner = () => (
  <Container>
    <IconLoadingSpinner />
  </Container>
);
