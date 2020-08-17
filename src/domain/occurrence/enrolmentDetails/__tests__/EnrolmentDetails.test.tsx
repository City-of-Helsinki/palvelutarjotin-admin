import { MockedProvider } from '@apollo/react-testing';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Modal from 'react-modal';
import { MemoryRouter } from 'react-router';

import { EnrolmentDocument } from '../../../../generated/graphql';
import EnrolmentDetails from '../EnrolmentDetails';
import { enrolmentResult } from './mocks';

const mocks = [
  {
    request: {
      query: EnrolmentDocument,
      variables: {
        id: 'RW5yb2xtZW50Tm9kZTo1Ng==',
      },
    },
    result: enrolmentResult,
  },
];

test('matches snapshot', async () => {
  const { container } = render(
    <MemoryRouter>
      <MockedProvider mocks={mocks}>
        <EnrolmentDetails
          enrolmentId="RW5yb2xtZW50Tm9kZTo1Ng=="
          eventId=""
          occurrenceId=""
          onGoBackClick={jest.fn()}
        />
      </MockedProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.queryByText('Ilmoittautuneet')).toBeInTheDocument();
  });

  expect(container).toMatchSnapshot();
});

test('renders correct information', async () => {
  render(
    <MemoryRouter>
      <MockedProvider mocks={mocks}>
        <EnrolmentDetails
          enrolmentId="RW5yb2xtZW50Tm9kZTo1Ng=="
          eventId=""
          occurrenceId=""
          onGoBackClick={jest.fn()}
        />
      </MockedProvider>
    </MemoryRouter>
  );

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
  const { container } = render(
    <MemoryRouter>
      <MockedProvider mocks={mocks}>
        <EnrolmentDetails
          enrolmentId="RW5yb2xtZW50Tm9kZTo1Ng=="
          eventId=""
          occurrenceId=""
          onGoBackClick={jest.fn()}
        />
      </MockedProvider>
    </MemoryRouter>
  );

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
