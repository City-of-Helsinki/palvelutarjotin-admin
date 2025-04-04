import { configure, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { customRender } from '../../../../../utils/testUtils';
import messages from '../../../../app/i18n/fi.json';
import { EnrolleeProps } from '../EnrolmentModal';
import persons from '../mocks/persons';
import PickQueueEnrolmentModal from '../PickQueueEnrolmentModal';

configure({ defaultHidden: true });

it('matches snapshot', () => {
  const { baseElement } = customRender(
    <PickQueueEnrolmentModal
      onClose={vi.fn()}
      pickQueueEnrolment={vi.fn()}
      appElement={document.body}
    />
  );

  expect(baseElement).toMatchSnapshot();
});

it('renders correctly and calls delete enrolment handler when button is clicked', async () => {
  const onCloseHandler = vi.fn();
  const pickQueueEnrolmentHandler = vi.fn();
  customRender(
    <PickQueueEnrolmentModal
      onClose={onCloseHandler}
      pickQueueEnrolment={pickQueueEnrolmentHandler}
      appElement={document.body}
    />
  );

  expect(
    screen.getByText(
      messages.enrolment.enrolmentModal.pickQueueEnrolmentTitle,
      {
        selector: 'p',
      }
    )
  ).toBeInTheDocument();

  const pickQueueEnrolmentButton = screen.getByRole('button', {
    name: messages.enrolment.enrolmentModal.pickQueueEnrolmentButton,
    // for some reason react-modal sets aria-hidden attribute true in the tests.
  });

  await userEvent.click(pickQueueEnrolmentButton);

  expect(pickQueueEnrolmentHandler).toHaveBeenCalledTimes(1);
});

it('renders enrollees list correctly', async () => {
  customRender(
    <PickQueueEnrolmentModal
      onClose={vi.fn()}
      pickQueueEnrolment={vi.fn()}
      appElement={document.body}
      enrollees={persons as EnrolleeProps[]}
    />
  );

  persons.forEach((person) => {
    expect(screen.getByText(person.personName)).toBeInTheDocument();
  });
});
