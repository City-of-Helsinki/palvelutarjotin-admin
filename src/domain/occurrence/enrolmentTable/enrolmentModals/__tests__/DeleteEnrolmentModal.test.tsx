import { configure, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import messages from '../../../../../domain/app/i18n/fi.json';
import { customRender } from '../../../../../utils/testUtils';
import DeleteEnrolmentModal from '../DeleteEnrolmentModal';

configure({ defaultHidden: true });

it('matches snapshot', () => {
  const { baseElement } = customRender(
    <DeleteEnrolmentModal
      onClose={vi.fn()}
      deleteEnrolment={vi.fn()}
      appElement={document.body}
    />
  );

  expect(baseElement).toMatchSnapshot();
});

it('renders correctly and calls delete enrolment handler when button is clicked', async () => {
  const onCloseHandler = vi.fn();
  const deleteEnrolmentHandler = vi.fn();
  customRender(
    <DeleteEnrolmentModal
      onClose={onCloseHandler}
      deleteEnrolment={deleteEnrolmentHandler}
      appElement={document.body}
    />
  );

  expect(
    screen.getByText(messages.enrolment.enrolmentModal.deleteEnrolment, {
      selector: 'p',
    })
  ).toBeInTheDocument();

  const deleteEnrolmentButton = screen.getByRole('button', {
    name: messages.enrolment.enrolmentModal.deleteEnrolment,
    // for some reason react-modal sets aria-hidden attribute true in the tests.
  });

  await userEvent.click(deleteEnrolmentButton);

  expect(deleteEnrolmentHandler).toHaveBeenCalledTimes(1);
});
