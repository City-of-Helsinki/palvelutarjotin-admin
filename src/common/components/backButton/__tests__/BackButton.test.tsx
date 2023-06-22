import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import BackButton from '../BackButton';

it('matches snapshot', () => {
  render(<BackButton onClick={jest.fn()} />);
});

it('calls onClick callback when clicked and displays correct text', async () => {
  const onClickMock = jest.fn();
  render(<BackButton onClick={onClickMock}>Back</BackButton>);

  expect(screen.getByText(/back/i)).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: 'Back' }));
  expect(onClickMock).toHaveBeenCalled();
});
