import { number, withKnobs } from '@storybook/addon-knobs';
import { TextArea } from 'hds-react';
import React from 'react';

import { getCommonKnobs } from './helpers';

export default {
  title: 'TextAreaInput',
  component: TextArea,
  decorators: [withKnobs],
};

const Container: React.FC = ({ children }) => (
  <div style={{ padding: '1rem' }}>{children}</div>
);

export const Default = () => {
  return (
    <Container>
      <TextArea
        id="id1"
        {...getCommonKnobs()}
        rows={number('rows', 0)}
        cols={number('cols', 0)}
      />
    </Container>
  );
};
