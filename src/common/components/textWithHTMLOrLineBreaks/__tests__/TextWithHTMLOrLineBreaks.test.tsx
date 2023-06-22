import { render } from '@testing-library/react';
import * as React from 'react';

import TextWithHTMLOrLineBreaks from '../TextWithHTMLOrLineBreaks';

it.each([
  `Line 1
  Line 2`,
  `<p>Line1</p>
  <p>Line2</p>`,
])('TextWithHTMLOrLineBreaks matches snapshot', (text) => {
  const { container } = render(
    <TextWithHTMLOrLineBreaks
      text={text}
      className={'textWithHTMLOrLineBreaks'}
    />
  );
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toMatchSnapshot();
});
