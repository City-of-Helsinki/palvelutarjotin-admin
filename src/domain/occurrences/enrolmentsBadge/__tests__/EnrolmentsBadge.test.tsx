import React from 'react';

import { render, screen } from '../../../../utils/testUtils';
import EnrolmentBadge from '../EnrolmentsBadge';

it('matches snapshot', () => {
  const { container } = render(
    <EnrolmentBadge acceptedSeatsCount={10} pendingSeatsCount={10} />
  );

  expect(container).toMatchSnapshot();
});

it('renders seat numbers', () => {
  render(<EnrolmentBadge acceptedSeatsCount={10} pendingSeatsCount={20} />);

  expect(screen.queryByText('10')).toBeInTheDocument();
  expect(screen.queryByText('20')).toBeInTheDocument();
});
