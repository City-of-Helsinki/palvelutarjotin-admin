import { shallow } from 'enzyme';
import pretty from 'pretty';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import { store } from '../../store';
import PageLayout from '../PageLayout';

it('PageLayout matches snapshot', () => {
  const layout = shallow(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <PageLayout>
          <div>Page layout children</div>
        </PageLayout>
      </MemoryRouter>
    </Provider>
  );
  expect(pretty(layout.html())).toMatchSnapshot();
});
