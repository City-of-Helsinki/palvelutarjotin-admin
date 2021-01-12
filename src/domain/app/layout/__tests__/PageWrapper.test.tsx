import { shallow } from 'enzyme';
import pretty from 'pretty';
import * as React from 'react';
import { MemoryRouter } from 'react-router';

import PageWrapper from '../PageWrapper';

it('PageWrapper matches snapshot', () => {
  const pageWrapper = shallow(
    <MemoryRouter initialEntries={['/']}>
      <PageWrapper />
    </MemoryRouter>
  );
  expect(pretty(pageWrapper.html())).toMatchSnapshot();
});
