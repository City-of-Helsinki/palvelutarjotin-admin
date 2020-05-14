import { text, withKnobs } from '@storybook/addon-knobs';
import { TextInput } from 'hds-react';
import React from 'react';

import { getCommonKnobs } from './helpers';

export default {
  title: 'TextInput',
  component: TextInput,
  decorators: [withKnobs],
};

const Container: React.FC = ({ children }) => (
  <div style={{ padding: '1rem' }}>{children}</div>
);

export const Default = () => {
  return (
    <Container>
      <TextInput id="id1" {...getCommonKnobs()} type={text('type', '')} />
    </Container>
  );
};
