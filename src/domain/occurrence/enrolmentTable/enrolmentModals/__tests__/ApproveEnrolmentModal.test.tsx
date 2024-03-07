import userEvent from '@testing-library/user-event';
import * as React from 'react';

import messages from '../../../../../domain/app/i18n/fi.json';
import {
  actWait,
  render,
  screen,
  waitFor,
} from '../../../../../utils/testUtils';
import ApproveEnrolmentModal from '../ApproveEnrolmentModal';
import { EnrolleeProps } from '../EnrolmentModal';
import persons from '../mocks/persons';

it('matches snapshot', async () => {
  const { baseElement } = render(
    <ApproveEnrolmentModal
      onClose={vi.fn()}
      approveEnrolment={vi.fn()}
      appElement={document.body}
    />
  );

  await actWait();

  await waitFor(() => {
    // A small "hack" to wait for modal to open fully
    expect(
      baseElement.querySelector('.ReactModal__Content--after-open')
    ).toBeInTheDocument();
  });

  expect(baseElement).toMatchSnapshot();
});

it('renders correctly and calls approve enrolment handler', async () => {
  const onCloseHandler = vi.fn();
  const approveEnrolmentHandler = vi.fn();
  render(
    <ApproveEnrolmentModal
      onClose={onCloseHandler}
      approveEnrolment={approveEnrolmentHandler}
      appElement={document.body}
    />
  );

  await actWait();

  expect(
    screen.getByText(messages.enrolment.enrolmentModal.approveEnrolment)
  ).toBeInTheDocument();

  expect(
    screen.getByText(messages.enrolment.enrolmentModal.approveEnrolmentNote)
  ).toBeInTheDocument();

  expect(
    screen.getByText(
      /vahvistusviesti sisältää automaattisesti seuraavat tiedot/i
    )
  ).toBeInTheDocument();

  const columnsRegExp = new RegExp(
    [
      'personoitu tervehdys',
      'ilmoittautuminen vahvistettu',
      'tapahtuman tiedot',
      'aika',
      'varattujen paikkojen lukumäärä',
      'kieli',
      'paikka',
      'osoite',
      'järjestäjän yhteystiedot',
    ].join(', ') + '\\.',
    'i'
  );
  expect(screen.getByText(columnsRegExp)).toBeInTheDocument();

  const approveEnrolmentButton = screen.getByText(
    messages.enrolment.enrolmentModal.sendConfirmationMessage
  );
  await userEvent.click(approveEnrolmentButton);

  expect(approveEnrolmentHandler).toHaveBeenCalledTimes(1);
});

it('opens message section when checkbox is clicked and text can be written', async () => {
  render(
    <ApproveEnrolmentModal
      onClose={vi.fn()}
      approveEnrolment={vi.fn()}
      appElement={document.body}
    />
  );

  await actWait();

  const addMessageCheckbox = screen.getByLabelText(/lisää viesti/i);
  await userEvent.click(addMessageCheckbox);

  const messageTextArea = screen.getByLabelText(
    messages.enrolment.enrolmentModal.messageToParticipants
  );

  expect(messageTextArea).toBeInTheDocument();

  await userEvent.type(messageTextArea, 'Tässä testiviesti');

  expect(messageTextArea).toHaveTextContent('Tässä testiviesti');
});

it('renders enrollees list correctly', async () => {
  render(
    <ApproveEnrolmentModal
      onClose={vi.fn()}
      approveEnrolment={vi.fn()}
      appElement={document.body}
      enrollees={persons as EnrolleeProps[]}
    />
  );

  await actWait();

  persons.forEach((person) => {
    expect(screen.getByText(person.personName)).toBeInTheDocument();
  });
});
