import { waitFor, configure, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import messages from '../../../../../domain/app/i18n/fi.json';
import { customRender } from '../../../../../utils/testUtils';
import DeclineEnrolmentModal from '../DeclineEnrolmentModal';
import { EnrolleeProps } from '../EnrolmentModal';
import persons from '../mocks/persons';

configure({ defaultHidden: true });

it('matches snapshot', async () => {
  const { baseElement } = customRender(
    <DeclineEnrolmentModal onClose={vi.fn()} declineEnrolment={vi.fn()} />
  );

  expect(baseElement).toMatchSnapshot();
});

it('renders correctly and calls decline enrolment handler', async () => {
  const onCloseHandler = vi.fn();
  const declineEnrolmentHandler = vi.fn();
  customRender(
    <DeclineEnrolmentModal
      onClose={onCloseHandler}
      declineEnrolment={declineEnrolmentHandler}
    />
  );

  expect(
    await screen.findByText(messages.enrolment.enrolmentModal.declineEnrolment)
  ).toBeInTheDocument();

  expect(
    await screen.findByText(
      messages.enrolment.enrolmentModal.declineEnrolmentNote
    )
  ).toBeInTheDocument();

  const declineEnrolmentButton = await screen.findByText(
    messages.enrolment.enrolmentModal.sendCancelMessage
  );
  await userEvent.click(declineEnrolmentButton);

  await waitFor(() => expect(declineEnrolmentHandler).toHaveBeenCalledTimes(1));
});

it('calls close handle when close button is clicked', async () => {
  const onCloseHandler = vi.fn();
  const declineEnrolmentHandler = vi.fn();
  customRender(
    <DeclineEnrolmentModal
      onClose={onCloseHandler}
      declineEnrolment={declineEnrolmentHandler}
    />
  );

  const cancelButton = await screen.findByRole('button', {
    name: messages.enrolment.enrolmentModal.cancelEnrolment,
  });

  await userEvent.click(cancelButton);

  await waitFor(() => expect(onCloseHandler).toHaveBeenCalledTimes(1));
});

it('renders enrollees list correctly', async () => {
  customRender(
    <DeclineEnrolmentModal
      onClose={vi.fn()}
      declineEnrolment={vi.fn()}
      enrollees={persons as EnrolleeProps[]}
    />
  );

  for (const person of persons) {
    expect(await screen.findByText(person.personName)).toBeInTheDocument();
  }
});
