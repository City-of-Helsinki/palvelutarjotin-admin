import userEvent from '@testing-library/user-event';
import * as React from 'react';

import messages from '../../../../../domain/app/i18n/fi.json';
import {
  actWait,
  configure,
  render,
  screen,
} from '../../../../../utils/testUtils';
import DeclineEnrolmentModal from '../DeclineEnrolmentModal';
import { EnrolleeProps } from '../EnrolmentModal';
import persons from '../mocks/persons';

configure({ defaultHidden: true });

it('matches snapshot', async () => {
  const { baseElement } = render(
    <DeclineEnrolmentModal
      enrolmentId="123"
      onClose={jest.fn()}
      declineEnrolment={jest.fn()}
      appElement={document.body}
    />
  );

  await actWait();

  expect(baseElement).toMatchSnapshot();
});

it('renders correctly and calls decline enrolment handler', async () => {
  const onCloseHandler = jest.fn();
  const declineEnrolmentHandler = jest.fn();
  render(
    <DeclineEnrolmentModal
      enrolmentId="123"
      onClose={onCloseHandler}
      declineEnrolment={declineEnrolmentHandler}
      appElement={document.body}
    />
  );

  await actWait();

  expect(
    screen.queryByText(messages.enrolment.enrolmentModal.declineEnrolment)
  ).toBeInTheDocument();

  expect(
    screen.queryByText(messages.enrolment.enrolmentModal.declineEnrolmentNote)
  ).toBeInTheDocument();

  const declineEnrolmentButton = screen.getByText(
    messages.enrolment.enrolmentModal.sendCancelMessage
  );
  userEvent.click(declineEnrolmentButton);

  expect(declineEnrolmentHandler).toHaveBeenCalledTimes(1);
});

it('calls close handle when close button is clicked', async () => {
  const onCloseHandler = jest.fn();
  const declineEnrolmentHandler = jest.fn();
  render(
    <DeclineEnrolmentModal
      enrolmentId="123"
      onClose={onCloseHandler}
      declineEnrolment={declineEnrolmentHandler}
      appElement={document.body}
    />
  );

  await actWait();

  const cancelButton = screen.getByRole('button', {
    name: messages.enrolment.enrolmentModal.cancelEnrolment,
  });

  userEvent.click(cancelButton);

  expect(onCloseHandler).toHaveBeenCalledTimes(1);
});

it('renders enrollees list correctly', async () => {
  render(
    <DeclineEnrolmentModal
      enrolmentId="123"
      onClose={jest.fn()}
      declineEnrolment={jest.fn()}
      appElement={document.body}
      enrollees={persons as EnrolleeProps[]}
    />
  );

  await actWait();

  persons.forEach((person) => {
    expect(screen.queryByText(person.personName)).toBeInTheDocument();
  });
});
