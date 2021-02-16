import { render } from '@testing-library/react';
import * as React from 'react';

import Container from '../Container';

it('Container matches snapshot', () => {
  const { container } = render(<Container>TEST CONTENT</Container>);
  expect(container.firstChild).toMatchSnapshot();
});
