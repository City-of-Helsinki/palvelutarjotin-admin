import { number, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import NumberInput from '../NumberInput';
import { getCommonKnobs } from './helpers';

export default {
  title: 'NumberInput',
  component: NumberInput,
  decorators: [withKnobs],
};

const Container: React.FC = ({ children }) => (
  <div style={{ padding: '1rem' }}>{children}</div>
);

export const Default = () => {
  return (
    <Container>
      <NumberInput
        id="id1"
        {...getCommonKnobs()}
        defaultValue={number('defaultValue', 0)}
        max={number('max', 20)}
        min={number('min', 0)}
        step={number('step', 1)}
      />
    </Container>
  );
};
