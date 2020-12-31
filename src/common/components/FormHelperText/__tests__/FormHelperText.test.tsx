import * as React from 'react';

import { render } from '../../../../utils/testUtils';
import FormHelperText from '../FormHelperText';

test('matches snapshot', () => {
  const { container } = render(
    <FormHelperText text="Test" className="className" />
  );

  expect(container).toMatchSnapshot();
});
