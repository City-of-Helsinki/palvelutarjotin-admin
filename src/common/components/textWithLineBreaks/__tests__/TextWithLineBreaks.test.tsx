import { render } from '@testing-library/react';
import React from 'react';

import TextWithLineBreaks from '../TextWithLineBreaks';

it('TextWithLineBreaks matches snapshot', () => {
  const text = `Line 1
  Line 2`;
  const { container } = render(<TextWithLineBreaks as="div" text={text} />);
  expect(container.firstChild).toMatchSnapshot();
});
