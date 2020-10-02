import { shallow } from 'enzyme';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Footer from '../Footer';

it('Footer matches snapshot', () => {
  const footer = shallow(
    <Router>
      <Footer />
    </Router>
  );
  expect(footer.html()).toMatchSnapshot();
});
