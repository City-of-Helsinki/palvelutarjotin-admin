import { mount } from 'enzyme';
import pretty from 'pretty';
import React from 'react';
import { MemoryRouter } from 'react-router';

import Header from '../Header';

it('Header matches snapshot', () => {
  const container = mount(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  expect(pretty(container.html())).toMatchSnapshot();
});
