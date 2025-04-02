import * as React from 'react';

import { customRender } from '../../../../utils/testUtils';
import FormHelperText from '../FormHelperText';

test('matches snapshot', () => {
  const { container } = customRender(
    <FormHelperText text="Test" className="className" />
  );

  expect(container).toMatchSnapshot();
});
