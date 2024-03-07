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
      onClose={vi.fn()}
      declineEnrolment={vi.fn()}
      appElement={document.body}
    />
  );

  await actWait();

  expect(baseElement).toMatchSnapshot();
});

it('renders correctly and calls decline enrolment handler', async () => {
  const onCloseHandler = vi.fn();
  const declineEnrolmentHandler = vi.fn();
  render(
    <DeclineEnrolmentModal
      onClose={onCloseHandler}
      declineEnrolment={declineEnrolmentHandler}
      appElement={document.body}
    />
  );

  await actWait();

  expect(
    screen.getByText(messages.enrolment.enrolmentModal.declineEnrolment)
  ).toBeInTheDocument();

  expect(
    screen.getByText(messages.enrolment.enrolmentModal.declineEnrolmentNote)
  ).toBeInTheDocument();

  const declineEnrolmentButton = screen.getByText(
    messages.enrolment.enrolmentModal.sendCancelMessage
  );
  await userEvent.click(declineEnrolmentButton);

  expect(declineEnrolmentHandler).toHaveBeenCalledTimes(1);
});

it('calls close handle when close button is clicked', async () => {
  const onCloseHandler = vi.fn();
  const declineEnrolmentHandler = vi.fn();
  render(
    <DeclineEnrolmentModal
      onClose={onCloseHandler}
      declineEnrolment={declineEnrolmentHandler}
      appElement={document.body}
    />
  );

  await actWait();

  const cancelButton = screen.getByRole('button', {
    name: messages.enrolment.enrolmentModal.cancelEnrolment,
  });

  await userEvent.click(cancelButton);

  expect(onCloseHandler).toHaveBeenCalledTimes(1);
});

it('renders enrollees list correctly', async () => {
  render(
    <DeclineEnrolmentModal
      onClose={vi.fn()}
      declineEnrolment={vi.fn()}
      appElement={document.body}
      enrollees={persons as EnrolleeProps[]}
    />
  );

  await actWait();

  persons.forEach((person) => {
    expect(screen.getByText(person.personName)).toBeInTheDocument();
  });
});
