import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { waitFor } from '@testing-library/react';

import messages from '../../../../../domain/app/i18n/fi.json';
import { configure, render, screen } from '../../../../../utils/testUtils';
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

  // Wait until the modal has opened so the snapshot is consistent
  await waitFor(() => {
    expect(
      baseElement.querySelector(
        '.ReactModal__Overlay.ReactModal__Overlay--after-open'
      )
    ).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(
      baseElement.querySelector(
        '.ReactModal__Content.ReactModal__Content--after-open'
      )
    ).toBeInTheDocument();
  });

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
  render(
    <DeclineEnrolmentModal
      onClose={onCloseHandler}
      declineEnrolment={declineEnrolmentHandler}
      appElement={document.body}
    />
  );

  const cancelButton = await screen.findByRole('button', {
    name: messages.enrolment.enrolmentModal.cancelEnrolment,
  });

  await userEvent.click(cancelButton);

  await waitFor(() => expect(onCloseHandler).toHaveBeenCalledTimes(1));
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

  for (const person of persons) {
    expect(await screen.findByText(person.personName)).toBeInTheDocument();
  }
});
