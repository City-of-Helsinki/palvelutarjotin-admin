import { shallow } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router';

import MobileNavbar from '../MobileNavbar';

it('MobileNavbar matches snapshot', () => {
  const container = shallow(
    <MemoryRouter>
      <MobileNavbar />
    </MemoryRouter>
  );
  expect(container.html()).toMatchSnapshot();
});
