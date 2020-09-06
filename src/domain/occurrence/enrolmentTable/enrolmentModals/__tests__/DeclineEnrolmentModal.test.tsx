import userEvent from '@testing-library/user-event';
import React from 'react';
import wait from 'waait';

import persons from '../__mocks__/persons';
import messages from '../../../../../domain/app/i18n/fi.json';
import { act, render, screen } from '../../../../../utils/testUtils';
import DeclineEnrolmentModal from '../DeclineEnrolmentModal';
import { EnrolleeProps } from '../EnrolmentModal';

it('matches snapshot', async () => {
  const { baseElement } = render(
    <DeclineEnrolmentModal
      enrolmentId="123"
      isOpen
      onClose={jest.fn()}
      declineEnrolment={jest.fn()}
      appElement={document.body}
    />
  );

  await act(wait);

  expect(baseElement).toMatchSnapshot();
});

it('renders correctly and calls decline enrolment handler', async () => {
  const onCloseHandler = jest.fn();
  const declineEnrolmentHandler = jest.fn();
  render(
    <DeclineEnrolmentModal
      enrolmentId="123"
      isOpen
      onClose={onCloseHandler}
      declineEnrolment={declineEnrolmentHandler}
      appElement={document.body}
    />
  );

  await act(wait);

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
      isOpen
      onClose={onCloseHandler}
      declineEnrolment={declineEnrolmentHandler}
      appElement={document.body}
    />
  );

  await act(wait);

  const cancelButton = screen.getByRole('button', {
    name: messages.enrolment.enrolmentModal.cancelEnrolment,
    hidden: true,
  });

  userEvent.click(cancelButton);

  expect(onCloseHandler).toHaveBeenCalledTimes(1);
});

it('renders enrollees list correctly', async () => {
  render(
    <DeclineEnrolmentModal
      enrolmentId="123"
      isOpen
      onClose={jest.fn()}
      declineEnrolment={jest.fn()}
      appElement={document.body}
      enrollees={persons as EnrolleeProps[]}
    />
  );

  await act(wait);

  persons.forEach((person) => {
    expect(screen.queryByText(person.personName)).toBeInTheDocument();
  });
});
