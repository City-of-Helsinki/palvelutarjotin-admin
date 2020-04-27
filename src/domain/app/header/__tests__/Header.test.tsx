import { mount } from 'enzyme';
import pretty from 'pretty';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import { store } from '../../store';
import Header from '../Header';

it('Header matches snapshot', () => {
  const container = mount(
    <Provider store={store}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>
  );
  expect(pretty(container.html())).toMatchSnapshot();
});
