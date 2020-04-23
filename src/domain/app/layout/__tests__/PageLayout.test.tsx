import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';

import PageLayout from '../PageLayout';

it('PageLayout matches snapshot', () => {
  const layout = shallow(
    <PageLayout>
      <div>Page layout children</div>
    </PageLayout>
  );
  expect(toJson(layout)).toMatchSnapshot();
});
