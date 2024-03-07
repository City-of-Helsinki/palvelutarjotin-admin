import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { vi } from 'vitest';

import BackButton from '../BackButton';

it('matches snapshot', () => {
  render(<BackButton onClick={vi.fn()} />);
});

it('calls onClick callback when clicked and displays correct text', async () => {
  const onClickMock = vi.fn();
  render(<BackButton onClick={onClickMock}>Back</BackButton>);

  expect(screen.getByText(/back/i)).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: 'Back' }));
  expect(onClickMock).toHaveBeenCalled();
});
