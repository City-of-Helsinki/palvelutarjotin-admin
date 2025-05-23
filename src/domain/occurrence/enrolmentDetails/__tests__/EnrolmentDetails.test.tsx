import { waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import Modal from 'react-modal';

import {
  EnrolmentDocument,
  EnrolmentNode,
  EnrolmentStatus,
} from '../../../../generated/graphql';
import {
  fakeEnrolment,
  fakeOccurrence,
  fakeOrganisation,
  fakePerson,
  fakePEvent,
  fakeStudyGroup,
  fakeStudyLevels,
} from '../../../../utils/mockDataUtils';
import { customRender } from '../../../../utils/testUtils';
import EnrolmentDetails from '../EnrolmentDetails';

const enrolmentId = 'RW5yb2xtZW50Tm9kZTo1Ng==';

const getMocks = (overrides?: Partial<EnrolmentNode>) => [
  {
    request: {
      query: EnrolmentDocument,
      variables: {
        id: enrolmentId,
      },
    },
    result: {
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
            unitName: 'Yläaste',
            groupName: 'Ryhmän nimi',
            extraNeeds: 'Lisätietoja tässä',
            person: fakePerson({
              name: 'Ilmoittautuja',
              emailAddress: 'ilmo@ilmoittautuja.com',
              phoneNumber: '123321123',
            }),
            studyLevels: fakeStudyLevels(6),
          }),
          ...overrides,
        }),
      },
    },
  },
];

const renderEnrolmentDetails = (mocks = getMocks()) => {
  return customRender(
    <EnrolmentDetails
      enrolmentId={enrolmentId}
      eventId=""
      occurrenceId=""
      onGoBackClick={vi.fn()}
      refetchOccurrence={vi.fn()}
    />,
    { mocks }
  );
};

test('matches snapshot', async () => {
  const { container } = renderEnrolmentDetails();

  await waitFor(() =>
    expect(screen.getByText('Ilmoittautuneet')).toBeInTheDocument()
  );

  expect(container).toMatchSnapshot();
});

test('renders correct information', async () => {
  renderEnrolmentDetails();

  expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

  await waitFor(() =>
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
  );

  // values
  expect(screen.getByText('14.8.2020 10:15')).toBeInTheDocument();
  expect(screen.getByText('Hyväksytty')).toBeInTheDocument();
  expect(
    screen.getByText('Tekstiviestillä, sähköpostilla, kieli: suomi')
  ).toBeInTheDocument();
  expect(screen.getByText('Yläaste')).toBeInTheDocument();
  expect(screen.getByText('Ryhmän nimi')).toBeInTheDocument();
  expect(screen.getByText('Lisätietoja tässä')).toBeInTheDocument();
  expect(screen.queryByText(/5\. luokka/i)).toBeVisible();
});

test('enrolment action buttons work correctly', async () => {
  const { container } = renderEnrolmentDetails();

  Modal.setAppElement(container);

  await waitFor(() =>
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
  );

  expect(
    screen.queryByText('Hyväksy ilmoittautuminen')
  ).not.toBeInTheDocument();

  const declineButton = screen.getByRole('button', {
    name: 'Jätä ilman paikkaa',
  });

  await userEvent.click(declineButton);

  expect(
    screen.queryByText(
      'Valittujien ilmoittautujien osallistumista ei vahvisteta. Heille lähetetään tieto jäämisestä ilman paikkaa.'
    )
  ).toBeVisible();

  await userEvent.click(screen.getByText('Sulje'));
});

test('renders multiple studygroups correctly', async () => {
  const { container } = renderEnrolmentDetails(
    getMocks({
      studyGroup: fakeStudyGroup({
        studyLevels: fakeStudyLevels(),
      }),
    })
  );
  Modal.setAppElement(container);

  await waitFor(() =>
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
  );

  expect(screen.queryByText(/5\. luokka, 6\. luokka/i)).toBeVisible();
});
