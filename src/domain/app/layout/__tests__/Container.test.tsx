import { render } from '@testing-library/react';
import * as React from 'react';

import Container from '../Container';

it('Container matches snapshot', () => {
  const { container } = render(<Container>TEST CONTENT</Container>);
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toMatchSnapshot();
});
