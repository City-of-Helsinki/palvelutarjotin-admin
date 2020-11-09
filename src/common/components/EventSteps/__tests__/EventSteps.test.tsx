import { render, screen } from '@testing-library/react';
import React from 'react';

import EventSteps from '../EventSteps';

it('matches snapshot', () => {
  const { container } = render(<EventSteps step={1} />);

  expect(container).toMatchSnapshot();
});

it('renders correct title', () => {
  const { rerender } = render(<EventSteps step={1} />);

  expect(screen.getAllByText('1. Perustiedot')).toHaveLength(2);
  expect(screen.getAllByText('1. Perustiedot')[0]).toHaveClass('active');

  rerender(<EventSteps step={2} />);

  expect(screen.getAllByText('2. Tapahtuma-ajat')).toHaveLength(2);
  expect(screen.getAllByText('2. Tapahtuma-ajat')[0]).toHaveClass('active');

  rerender(<EventSteps step={3} />);

  expect(screen.getAllByText('3. Julkaise')).toHaveLength(2);
  expect(screen.getAllByText('3. Julkaise')[0]).toHaveClass('active');
});
