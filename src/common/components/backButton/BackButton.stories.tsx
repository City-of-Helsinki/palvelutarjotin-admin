import * as React from 'react';

import BackButton from './BackButton';

export default {
  title: 'BackButton',
  component: BackButton,
};

export const Default = () => (
  <BackButton
    onClick={() => {
      /* no-op */
    }}
  >
    Back to event list
  </BackButton>
);
