import React from 'react';

import BackButton from './BackButton';

export default {
  title: 'BackButton',
  component: BackButton,
};

export const Default = () => (
  <BackButton onClick={() => {}}>Back to event list</BackButton>
);
