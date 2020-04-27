import { shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import { store } from '../../store';
import MobileNavbar from '../MobileNavbar';

it('MobileNavbar matches snapshot', () => {
  const container = shallow(
    <Provider store={store}>
      <MemoryRouter>
        <MobileNavbar />
      </MemoryRouter>
    </Provider>
  );
  expect(container.html()).toMatchSnapshot();
});
