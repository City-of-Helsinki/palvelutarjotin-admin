import { render } from '@testing-library/react';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

import PageWrapper from '../PageWrapper';

it('PageWrapper matches snapshot', () => {
  const { container } = render(
    <MemoryRouter initialEntries={['/']}>
      <PageWrapper />
    </MemoryRouter>
  );
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toMatchSnapshot();
});
