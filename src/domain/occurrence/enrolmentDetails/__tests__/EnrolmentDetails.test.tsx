import userEvent from '@testing-library/user-event';
import React from 'react';
import Modal from 'react-modal';

import {
  EnrolmentDocument,
  EnrolmentStatus,
} from '../../../../generated/graphql';
import {
  fakeEnrolment,
  fakeOccurrence,
  fakeOrganisation,
  fakePerson,
  fakePEvent,
  fakeStudyGroup,
} from '../../../../utils/mockDataUtils';
import { render, screen, waitFor } from '../../../../utils/testUtils';
import EnrolmentDetails from '../EnrolmentDetails';

const enrolmentId = 'RW5yb2xtZW50Tm9kZTo1Ng==';

const enrolmentResult = {
  data: {
    enrolment: fakeEnrolment({
      id: enrolmentId,
      enrolmentTime: '2020-08-14T07:15:24.589508+00:00',
      person: fakePerson({
        name: 'Ilmoittautuja',
        phoneNumber: '123321123',
        emailAddress: 'ilmo@ilmoittautuja.com',
      }),
      status: EnrolmentStatus.Approved,
      occurrence: fakeOccurrence({
        pEvent: fakePEvent({
          organisation: fakeOrganisation(),
        }),
      }),
      studyGroup: fakeStudyGroup({
        name: 'Yläaste',
        groupName: 'Ryhmän nimi',
        extraNeeds: 'Lisätietoja tässä',
        person: fakePerson({
          name: 'Ilmoittautuja',
          emailAddress: 'ilmo@ilmoittautuja.com',
          phoneNumber: '123321123',
        }),
      }),
    }),
  },
};

const mocks = [
  {
    request: {
      query: EnrolmentDocument,
      variables: {
        id: enrolmentId,
      },
    },
    result: enrolmentResult,
  },
];

const renderEnrolmentDetails = () => {
  return render(
    <EnrolmentDetails
      enrolmentId={enrolmentId}
      eventId=""
      occurrenceId=""
      onGoBackClick={jest.fn()}
      refetchOccurrence={jest.fn()}
    />,
    { mocks }
  );
};

test('matches snapshot', async () => {
  const { container } = renderEnrolmentDetails();

  await waitFor(() => {
    expect(screen.queryByText('Ilmoittautuneet')).toBeInTheDocument();
  });

  expect(container).toMatchSnapshot();
});

test('renders correct information', async () => {
  renderEnrolmentDetails();

  expect(screen.queryByTestId('loading-spinner')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  // values
  expect(screen.queryByText('14.08.2020 10:15')).toBeInTheDocument();
  expect(screen.queryByText('Hyväksytty')).toBeInTheDocument();
  expect(
    screen.queryByText('Tekstiviestillä, sähköpostilla, kieli: suomi')
  ).toBeInTheDocument();
  expect(screen.queryByText('Yläaste')).toBeInTheDocument();
  expect(screen.queryByText('Ryhmän nimi')).toBeInTheDocument();
  expect(screen.queryByText('Lisätietoja tässä')).toBeInTheDocument();
});

test('enrolment action buttons work correctly', async () => {
  const { container } = renderEnrolmentDetails();

  Modal.setAppElement(container);

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  expect(
    screen.queryByText('Hyväksy ilmoittautuminen')
  ).not.toBeInTheDocument();

  const declineButton = screen.getByRole('button', {
    name: 'Jätä ilman paikkaa',
  });

  userEvent.click(declineButton);

  expect(
    screen.queryByText(
      'Valittujien ilmoittautujien osallistumista ei vahvisteta. Heille lähetetään tieto jäämisestä ilman paikkaa.'
    )
  ).toBeVisible();

  userEvent.click(screen.getByText('Sulje'));
});
