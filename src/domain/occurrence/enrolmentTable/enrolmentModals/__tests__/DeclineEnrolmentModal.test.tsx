import userEvent from '@testing-library/user-event';
import React from 'react';

import persons from '../__mocks__/persons';
import messages from '../../../../../domain/app/i18n/fi.json';
import { PersonFieldsFragment } from '../../../../../generated/graphql';
import { render, screen } from '../../../../../utils/testUtils';
import DeclineEnrolmentModal from '../DeclineEnrolmentModal';

it('matches snapshot', () => {
  const { baseElement } = render(
    <DeclineEnrolmentModal
      isOpen
      onClose={jest.fn()}
      declineEnrolment={jest.fn()}
      appElement={document.body}
    />
  );

  expect(baseElement).toMatchSnapshot();
});

it('renders correctly and calls decline enrolment handler', () => {
  const onCloseHandler = jest.fn();
  const declineEnrolmentHandler = jest.fn();
  render(
    <DeclineEnrolmentModal
      isOpen
      onClose={onCloseHandler}
      declineEnrolment={declineEnrolmentHandler}
      appElement={document.body}
    />
  );

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

it('calls close handle when close button is clicked', () => {
  const onCloseHandler = jest.fn();
  const declineEnrolmentHandler = jest.fn();
  render(
    <DeclineEnrolmentModal
      isOpen
      onClose={onCloseHandler}
      declineEnrolment={declineEnrolmentHandler}
      appElement={document.body}
    />
  );

  const cancelButton = screen.getByRole('button', {
    name: messages.enrolment.enrolmentModal.cancelEnrolment,
    hidden: true,
  });

  userEvent.click(cancelButton);

  expect(onCloseHandler).toHaveBeenCalledTimes(1);
});

it('renders enrollees list correctly', () => {
  render(
    <DeclineEnrolmentModal
      isOpen
      onClose={jest.fn()}
      declineEnrolment={jest.fn()}
      appElement={document.body}
      enrollees={persons as PersonFieldsFragment[]}
    />
  );

  persons.forEach((person) => {
    expect(screen.queryByText(person.name)).toBeInTheDocument();
  });
});
