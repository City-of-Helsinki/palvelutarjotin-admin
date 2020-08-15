import { MockedProvider } from '@apollo/react-testing';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Router from 'react-router';

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

beforeEach(() => {
  jest.spyOn(Router, 'useParams').mockReturnValue({});
  jest
    .spyOn(Router, 'useLocation')
    .mockReturnValue({ pathname: '/', search: '', state: '', hash: '' });
  jest.spyOn(Router, 'useHistory').mockReturnValue({});
});

test('matches snapshot', async () => {
  const { container } = render(
    <MockedProvider mocks={mocks}>
      <EnrolmentDetails
        enrolmentId="RW5yb2xtZW50Tm9kZTo1Ng=="
        eventId=""
        occurrenceId=""
        onGoBackClick={jest.fn()}
      />
    </MockedProvider>
  );

  await waitFor(() => {
    expect(screen.queryByText('Ilmoittautuneet')).toBeInTheDocument();
  });

  expect(container).toMatchSnapshot();
});

test('renders correct information', async () => {
  render(
    <MockedProvider mocks={mocks}>
      <EnrolmentDetails
        enrolmentId="RW5yb2xtZW50Tm9kZTo1Ng=="
        eventId=""
        occurrenceId=""
        onGoBackClick={jest.fn()}
      />
    </MockedProvider>
  );

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  // values
  expect(screen.queryByText('14.08.2020 10:15')).toBeInTheDocument();
  expect(screen.queryByText('Hyväksytty')).toBeInTheDocument();
  // expect(screen.queryByText('Ilmoittautuja')).toBeInTheDocument();
  // expect(screen.queryByText('ilmo@ilmoittautuja.com')).toBeInTheDocument();
  expect(
    screen.queryByText('Tekstiviestillä, sähköpostilla, kieli: suomi')
  ).toBeInTheDocument();
  // expect(screen.queryByText('123321123')).toBeInTheDocument();
  expect(screen.queryByText('Yläaste')).toBeInTheDocument();
  expect(screen.queryByText('Ryhmän nimi')).toBeInTheDocument();
  // expect(screen.queryByText('ilmo@ilmoittautuja.com')).toBeInTheDocument();
  expect(screen.queryByText('Lisätietoja tässä')).toBeInTheDocument();
});
