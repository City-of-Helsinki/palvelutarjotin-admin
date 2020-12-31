import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as React from 'react';

import Container from '../Container';

it('Container matches snapshot', () => {
  const container = shallow(<Container>TEST CONTENT</Container>);
  expect(toJson(container)).toMatchSnapshot();
});
