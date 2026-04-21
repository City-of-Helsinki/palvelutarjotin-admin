import { configure, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import messages from '../../../../../domain/app/i18n/fi.json';
import { customRender } from '../../../../../utils/testUtils';
import DeleteEnrolmentModal from '../DeleteEnrolmentModal';

configure({ defaultHidden: true });

it('matches snapshot', () => {
  const { baseElement } = customRender(
    <DeleteEnrolmentModal onClose={vi.fn()} deleteEnrolment={vi.fn()} />
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
    />
  );

  expect(
    screen.getByRole('heading', {
      name: messages.enrolment.enrolmentModal.deleteEnrolment,
    })
  ).toBeInTheDocument();

  const deleteEnrolmentButton = screen.getByRole('button', {
    name: messages.enrolment.enrolmentModal.deleteEnrolment,
  });

  await userEvent.click(deleteEnrolmentButton);

  expect(deleteEnrolmentHandler).toHaveBeenCalledTimes(1);
});
