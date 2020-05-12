import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import React, { useState } from 'react';

import AutoSuggest from './AutoSuggest';

export default {
  title: 'AutoSuggest',
  component: AutoSuggest,
  decorators: [withKnobs],
};

const Container: React.FC = ({ children }) => (
  <div style={{ padding: '1rem' }}>{children}</div>
);

export const Default = () => {
  const [inputValue, setInputValue] = useState('');

  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  return (
    <Container>
      <AutoSuggest
        id="id"
        helperText={text('helperText', '')}
        placeholder={text('placeholder', '')}
        disabled={boolean('disabled', false)}
        loading={boolean('loading', false)}
        labelText={text('labelText', '')}
        inputValue={inputValue}
        options={options}
        onBlur={action('onBlur')}
        onChange={action('onChange')}
        setInputValue={(value) => setInputValue(value)}
        value={null}
        invalidText={text('invalidText', '')}
      />
    </Container>
  );
};
