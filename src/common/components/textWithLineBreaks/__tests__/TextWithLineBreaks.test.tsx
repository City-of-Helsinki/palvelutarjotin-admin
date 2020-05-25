import { shallow } from 'enzyme';
import * as React from 'react';

import TextWithLineBreaks from '../TextWithLineBreaks';

it('TextWithLineBreaks matches snapshot', () => {
  const text = `Line 1
  Line 2`;
  const component = shallow(<TextWithLineBreaks as="div" text={text} />);
  expect(component.html()).toMatchSnapshot();
});
