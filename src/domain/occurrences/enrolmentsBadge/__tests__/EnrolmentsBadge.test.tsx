import * as React from 'react';

import { render, screen } from '../../../../utils/testUtils';
import EnrolmentBadge from '../EnrolmentsBadge';

it('matches snapshot', () => {
  const { container } = render(
    <EnrolmentBadge
      approvedSeatsCount={10}
      pendingSeatsCount={10}
      remainingSeatsCount={30}
    />
  );

  expect(container).toMatchSnapshot();
});

it('renders seat numbers', () => {
  render(<EnrolmentBadge approvedSeatsCount={10} pendingSeatsCount={20} />);

  expect(screen.queryByText('10')).toBeInTheDocument();
  expect(screen.queryByText('20')).toBeInTheDocument();
});
