import { render } from '@testing-library/react';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { DEFAULT_ROUTER_PROPS } from '../../router/constants';
import PageWrapper from '../PageWrapper';

it('PageWrapper matches snapshot', () => {
  const { container } = render(
    <MemoryRouter {...DEFAULT_ROUTER_PROPS} initialEntries={['/']}>
      <PageWrapper />
    </MemoryRouter>
  );
  expect(container.firstChild).toMatchSnapshot();
});
