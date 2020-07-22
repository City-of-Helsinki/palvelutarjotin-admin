import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import messages from '../../../../../domain/app/i18n/fi.json';
import DeleteEnrolmentModal from '../DeleteEnrolmentModal';

it('matches snapshot', () => {
  const { baseElement } = render(
    <DeleteEnrolmentModal
      isOpen
      onClose={jest.fn()}
      deleteEnrolment={jest.fn()}
      appElement={document.body}
    />
  );

  expect(baseElement).toMatchSnapshot();
});

it('renders correctly and calls delete enrolment handler when button is clicked', () => {
  const onCloseHandler = jest.fn();
  const deleteEnrolmentHandler = jest.fn();
  render(
    <DeleteEnrolmentModal
      isOpen
      onClose={onCloseHandler}
      deleteEnrolment={deleteEnrolmentHandler}
      appElement={document.body}
    />
  );

  expect(
    screen.queryByText(messages.enrolment.enrolmentModal.deleteEnrolment, {
      selector: 'p',
    })
  ).toBeInTheDocument();

  const deleteEnrolmentButton = screen.getByRole('button', {
    name: messages.enrolment.enrolmentModal.deleteEnrolment,
    // for some reason react-modal sets aria-hidden attribute true in the tests.
    hidden: true,
  });

  userEvent.click(deleteEnrolmentButton);

  expect(deleteEnrolmentHandler).toHaveBeenCalledTimes(1);
});
