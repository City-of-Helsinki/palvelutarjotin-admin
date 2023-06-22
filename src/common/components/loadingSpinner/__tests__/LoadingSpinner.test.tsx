import { render } from '@testing-library/react';
import * as React from 'react';

import LoadingSpinner from '../LoadingSpinner';

it('LoadingSpinner matches snapshot', () => {
  const { container } = render(<LoadingSpinner isLoading={true} />);
  expect(container).toMatchSnapshot();
});
