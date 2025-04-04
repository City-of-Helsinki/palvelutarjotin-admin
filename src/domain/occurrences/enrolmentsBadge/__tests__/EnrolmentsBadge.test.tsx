import { screen } from '@testing-library/react';
import * as React from 'react';

import { customRender } from '../../../../utils/testUtils';
import EnrolmentBadge from '../EnrolmentsBadge';

it('matches snapshot', () => {
  const { container } = customRender(
    <EnrolmentBadge
      approvedSeatsCount={10}
      pendingSeatsCount={10}
      isOccurrenceFull={false}
    />
  );

  expect(container).toMatchSnapshot();
});

it('renders seat numbers', () => {
  customRender(
    <EnrolmentBadge
      approvedSeatsCount={10}
      pendingSeatsCount={20}
      isOccurrenceFull={false}
    />
  );

  expect(screen.getByText('10')).toBeInTheDocument();
  expect(screen.getByText('20')).toBeInTheDocument();
});
