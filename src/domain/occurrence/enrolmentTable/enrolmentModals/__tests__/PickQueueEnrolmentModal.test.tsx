import userEvent from '@testing-library/user-event';
import * as React from 'react';

import {
  actWait,
  configure,
  render,
  screen,
} from '../../../../../utils/testUtils';
import messages from '../../../../app/i18n/fi.json';
import { EnrolleeProps } from '../EnrolmentModal';
import persons from '../mocks/persons';
import PickQueueEnrolmentModal from '../PickQueueEnrolmentModal';

configure({ defaultHidden: true });

it('matches snapshot', () => {
  const { baseElement } = render(
    <PickQueueEnrolmentModal
      onClose={jest.fn()}
      pickQueueEnrolment={jest.fn()}
      appElement={document.body}
    />
  );

  expect(baseElement).toMatchSnapshot();
});

it('renders correctly and calls delete enrolment handler when button is clicked', () => {
  const onCloseHandler = jest.fn();
  const pickQueueEnrolmentHandler = jest.fn();
  render(
    <PickQueueEnrolmentModal
      onClose={onCloseHandler}
      pickQueueEnrolment={pickQueueEnrolmentHandler}
      appElement={document.body}
    />
  );

  expect(
    screen.queryByText(
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

  userEvent.click(pickQueueEnrolmentButton);

  expect(pickQueueEnrolmentHandler).toHaveBeenCalledTimes(1);
});

it('renders enrollees list correctly', async () => {
  render(
    <PickQueueEnrolmentModal
      onClose={jest.fn()}
      pickQueueEnrolment={jest.fn()}
      appElement={document.body}
      enrollees={persons as EnrolleeProps[]}
    />
  );

  await actWait();

  persons.forEach((person) => {
    expect(screen.queryByText(person.personName)).toBeInTheDocument();
  });
});
