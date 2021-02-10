import { render } from '@testing-library/react';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Footer from '../Footer';

it('Footer matches snapshot', () => {
  const { container } = render(
    <Router>
      <Footer />
    </Router>
  );
  expect(container.firstChild).toMatchSnapshot();
});
