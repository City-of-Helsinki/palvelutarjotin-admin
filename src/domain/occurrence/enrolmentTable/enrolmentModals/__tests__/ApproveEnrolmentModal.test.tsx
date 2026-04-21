import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import messages from '../../../../../domain/app/i18n/fi.json';
import { customRender } from '../../../../../utils/testUtils';
import ApproveEnrolmentModal from '../ApproveEnrolmentModal';
import { EnrolleeProps } from '../EnrolmentModal';
import persons from '../mocks/persons';

it('matches snapshot', () => {
  const { baseElement } = customRender(
    <ApproveEnrolmentModal onClose={vi.fn()} approveEnrolment={vi.fn()} />
  );

  expect(baseElement).toMatchSnapshot();
});

it('renders correctly and calls approve enrolment handler', async () => {
  const onCloseHandler = vi.fn();
  const approveEnrolmentHandler = vi.fn();
  customRender(
    <ApproveEnrolmentModal
      onClose={onCloseHandler}
      approveEnrolment={approveEnrolmentHandler}
    />
  );

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
  customRender(
    <ApproveEnrolmentModal onClose={vi.fn()} approveEnrolment={vi.fn()} />
  );

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
  customRender(
    <ApproveEnrolmentModal
      onClose={vi.fn()}
      approveEnrolment={vi.fn()}
      enrollees={persons as EnrolleeProps[]}
    />
  );

  persons.forEach((person) => {
    expect(screen.getByText(person.personName)).toBeInTheDocument();
  });
});
