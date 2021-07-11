import userEvent from '@testing-library/user-event';
import * as React from 'react';
import wait from 'waait';

import messages from '../../../../../domain/app/i18n/fi.json';
import { act, render, screen } from '../../../../../utils/testUtils';
import ApproveEnrolmentModal from '../ApproveEnrolmentModal';
import { EnrolleeProps } from '../EnrolmentModal';
import persons from '../mocks/persons';

it('matches snapshot', async () => {
  const { baseElement } = render(
    <ApproveEnrolmentModal
      enrolmentId="123"
      onClose={jest.fn()}
      approveEnrolment={jest.fn()}
      appElement={document.body}
    />
  );

  await act(wait);

  expect(baseElement).toMatchSnapshot();
});

it('renders correctly and calls approve enrolment handler', async () => {
  const onCloseHandler = jest.fn();
  const approveEnrolmentHandler = jest.fn();
  render(
    <ApproveEnrolmentModal
      enrolmentId="123"
      onClose={onCloseHandler}
      approveEnrolment={approveEnrolmentHandler}
      appElement={document.body}
    />
  );

  await act(wait);

  expect(
    screen.queryByText(messages.enrolment.enrolmentModal.approveEnrolment)
  ).toBeInTheDocument();

  expect(
    screen.queryByText(messages.enrolment.enrolmentModal.approveEnrolmentNote)
  ).toBeInTheDocument();

  const approveEnrolmentButton = screen.getByText(
    messages.enrolment.enrolmentModal.sendConfirmationMessage
  );
  userEvent.click(approveEnrolmentButton);

  expect(approveEnrolmentHandler).toHaveBeenCalledTimes(1);
});

it('opens message section when checkbox is clicked and text can be written', async () => {
  render(
    <ApproveEnrolmentModal
      enrolmentId="123"
      onClose={jest.fn()}
      approveEnrolment={jest.fn()}
      appElement={document.body}
    />
  );

  await act(wait);

  const addMessageCheckbox = screen.getByLabelText(/lisää viesti/i);
  userEvent.click(addMessageCheckbox);

  const messageTextArea = screen.getByLabelText(
    messages.enrolment.enrolmentModal.messageToParticipants
  );

  expect(messageTextArea).toBeInTheDocument();

  userEvent.type(messageTextArea, 'Tässä testiviesti');

  expect(messageTextArea).toHaveTextContent('Tässä testiviesti');
});

it('renders enrollees list correctly', async () => {
  render(
    <ApproveEnrolmentModal
      enrolmentId="123"
      onClose={jest.fn()}
      approveEnrolment={jest.fn()}
      appElement={document.body}
      enrollees={persons as EnrolleeProps[]}
    />
  );

  await act(wait);

  persons.forEach((person) => {
    expect(screen.queryByText(person.personName)).toBeInTheDocument();
  });
});
