import { render } from '@testing-library/react';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Footer from '../Footer';

it('Footer matches snapshot', () => {
  const { container } = render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );
  expect(container.firstChild).toMatchSnapshot();
});
