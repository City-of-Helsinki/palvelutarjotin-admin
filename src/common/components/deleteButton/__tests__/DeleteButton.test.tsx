import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { vi } from 'vitest';

import DeleteButton from '../DeleteButton';

it('matches snapshot', () => {
  const { container } = render(
    <DeleteButton onClick={vi.fn()}>Delete</DeleteButton>
  );

  expect(container).toMatchSnapshot();
});

it('render correct text and calls onClick callback when clicked', async () => {
  const onClickMock = vi.fn();
  render(<DeleteButton onClick={onClickMock}>Delete</DeleteButton>);

  expect(screen.getByText(/delete/i)).toBeInTheDocument();

  await userEvent.click(screen.getByText(/delete/i));

  expect(onClickMock).toHaveBeenCalled();
});
