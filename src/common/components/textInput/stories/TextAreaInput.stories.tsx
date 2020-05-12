import { number, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import TextAreaInput from '../TextAreaInput';
import { getCommonKnobs } from './helpers';

export default {
  title: 'TextAreaInput',
  component: TextAreaInput,
  decorators: [withKnobs],
};

const Container: React.FC = ({ children }) => (
  <div style={{ padding: '1rem' }}>{children}</div>
);

export const Default = () => {
  return (
    <Container>
      <TextAreaInput
        id="id1"
        {...getCommonKnobs()}
        rows={number('rows', 0)}
        cols={number('cols', 0)}
      />
    </Container>
  );
};
