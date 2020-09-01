import userEvent from '@testing-library/user-event';
import React from 'react';

import persons from '../__mocks__/persons';
import messages from '../../../../../domain/app/i18n/fi.json';
import { PersonFieldsFragment } from '../../../../../generated/graphql';
import { render, screen } from '../../../../../utils/testUtils';
import ApproveEnrolmentModal from '../ApproveEnrolmentModal';

it('matches snapshot', () => {
  const { baseElement } = render(
    <ApproveEnrolmentModal
      isOpen
      onClose={jest.fn()}
      approveEnrolment={jest.fn()}
      appElement={document.body}
    />
  );

  expect(baseElement).toMatchSnapshot();
});

it('renders correctly and calls approve enrolment handler', () => {
  const onCloseHandler = jest.fn();
  const approveEnrolmentHandler = jest.fn();
  render(
    <ApproveEnrolmentModal
      isOpen
      onClose={onCloseHandler}
      approveEnrolment={approveEnrolmentHandler}
      appElement={document.body}
    />
  );

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

it('opens message section when checkbox is clicked and text can be written', () => {
  render(
    <ApproveEnrolmentModal
      isOpen
      onClose={jest.fn()}
      approveEnrolment={jest.fn()}
      appElement={document.body}
    />
  );

  const addMessageCheckbox = screen.getByLabelText(/lisää viesti/i);
  userEvent.click(addMessageCheckbox);

  const messageTextArea = screen.getByLabelText(
    messages.enrolment.enrolmentModal.messageToParticipants
  );

  expect(messageTextArea).toBeInTheDocument();

  userEvent.type(messageTextArea, 'Tässä testiviesti');

  expect(messageTextArea).toHaveTextContent('Tässä testiviesti');
});

it('renders enrollees list correctly', () => {
  render(
    <ApproveEnrolmentModal
      isOpen
      onClose={jest.fn()}
      approveEnrolment={jest.fn()}
      appElement={document.body}
      enrollees={persons as PersonFieldsFragment[]}
    />
  );

  persons.forEach((person) => {
    expect(screen.queryByText(person.name)).toBeInTheDocument();
  });
});
