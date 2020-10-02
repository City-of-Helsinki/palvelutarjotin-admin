import userEvent from '@testing-library/user-event';
import React from 'react';

import messages from '../../../../../domain/app/i18n/fi.json';
import { configure, render, screen } from '../../../../../utils/testUtils';
import DeleteEnrolmentModal from '../DeleteEnrolmentModal';

configure({ defaultHidden: true });

it('matches snapshot', () => {
  const { baseElement } = render(
    <DeleteEnrolmentModal
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
  });

  userEvent.click(deleteEnrolmentButton);

  expect(deleteEnrolmentHandler).toHaveBeenCalledTimes(1);
});
