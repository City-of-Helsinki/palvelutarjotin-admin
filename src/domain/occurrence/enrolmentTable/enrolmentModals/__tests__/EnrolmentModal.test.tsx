import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import EnrolmentModal from '../EnrolmentModal';

it('matches snapshot', () => {
  const { baseElement } = render(
    <EnrolmentModal
      isOpen
      title="Title"
      onClose={jest.fn()}
      appElement={document.body}
    />
  );

  expect(baseElement).toMatchSnapshot();
});

it('renders correctly and calls onClose handler when close button is clicked', () => {
  const onCloseHandler = jest.fn();
  render(
    <EnrolmentModal
      isOpen
      title="Title"
      onClose={onCloseHandler}
      appElement={document.body}
    />
  );

  expect(screen.queryByText(/Title/i)).toBeInTheDocument();

  const closeButton = screen.getByText(/sulje/i);
  userEvent.click(closeButton);

  expect(onCloseHandler).toHaveBeenCalledTimes(1);
});
