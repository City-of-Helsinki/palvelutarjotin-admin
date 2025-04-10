import { render } from '@testing-library/react';
import * as React from 'react';
import { MemoryRouter } from 'react-router';

import PageWrapper from '../PageWrapper';

it('PageWrapper matches snapshot', () => {
  const { container } = render(
    <MemoryRouter initialEntries={['/']}>
      <PageWrapper />
    </MemoryRouter>
  );
  expect(container.firstChild).toMatchSnapshot();
});
