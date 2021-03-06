import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import DeleteButton from '../DeleteButton';

it('matches snapshot', () => {
  const { container } = render(
    <DeleteButton onClick={jest.fn()}>Delete</DeleteButton>
  );

  expect(container).toMatchSnapshot();
});

it('render correct text and calls onClick callback when clicked', () => {
  const onClickMock = jest.fn();
  render(<DeleteButton onClick={onClickMock}>Delete</DeleteButton>);

  expect(screen.queryByText(/delete/i)).toBeInTheDocument();

  userEvent.click(screen.getByText(/delete/i));

  expect(onClickMock).toHaveBeenCalled();
});
