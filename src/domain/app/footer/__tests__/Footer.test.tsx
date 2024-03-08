import * as React from 'react';

import Footer from '../Footer';
import { render } from '../../../../utils/testUtils';

it('Footer matches snapshot', () => {
  const { container } = render(<Footer />);
  expect(container.firstChild).toMatchSnapshot();
});
