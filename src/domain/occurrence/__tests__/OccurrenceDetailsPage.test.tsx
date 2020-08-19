// import { axe, toHaveNoViolations } from 'jest-axe';
import React from 'react';

import {
  EventDocument,
  OccurrenceDocument,
  PlaceDocument,
  VenueDocument,
} from '../../../generated/graphql';
import {
  renderWithRoute,
  screen,
  userEvent,
  waitFor,
} from '../../../utils/testUtils';
import { ROUTES } from '../../app/routes/constants';
import OccurrenceDetailsPage from '../OccurrenceDetailsPage';
import {
  eventResult,
  occurrenceResult,
  placeResult,
  venueResult,
} from './mocks';

const eventId = 'palvelutarjotin:afzunowba4';
const occurrenceId = 'T2NjdXJyZW5jZU5vZGU6MTIz';
const testPath = ROUTES.OCCURRENCE_DETAILS.replace(':id', eventId).replace(
  ':occurrenceId',
  occurrenceId
);

const mocks = [
  {
    request: {
      query: EventDocument,
      variables: {
        id: eventId,
        include: ['location'],
      },
    },
    result: eventResult,
  },
  {
    request: {
      query: OccurrenceDocument,
      variables: {
        id: occurrenceId,
      },
    },
    result: occurrenceResult,
  },
  {
    request: {
      query: PlaceDocument,
      variables: {
        id: 'tprek:15376',
      },
    },
    result: placeResult,
  },
  {
    request: {
      query: VenueDocument,
      variables: {
        id: 'tprek:15376',
      },
    },
    result: venueResult,
  },
];

// TODO: uncomment this when enrolment table is accessible (labels for checkboxes)
// test('is accessible', async () => {
//   const { container } = renderWithRoute(<OccurrenceDetailsPage />, {
//     routes: [testPath],
//     path: ROUTES.OCCURRENCE_DETAILS,
//     mocks,
//   });

//   await waitFor(() => {
//     expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
//   });

//   const result = await axe(container);

//   expect(result).toHaveNoViolations();
// });

test('occurrence details are rendered', async () => {
  renderWithRoute(<OccurrenceDetailsPage />, {
    routes: [testPath],
    path: ROUTES.OCCURRENCE_DETAILS,
    mocks,
  });

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  expect(screen.queryByText('Tapahtuma 13.7.2020')).toBeInTheDocument();
  expect(
    screen.queryByText('10.09.2020 klo 12:00 – 12:30')
  ).toBeInTheDocument();
  expect(
    screen.queryByText(
      '30 paikkaa, ryhmän koko 10–20, suomenkielinen, englanninkielinen'
    )
  ).toBeInTheDocument();

  expect(
    screen.queryByRole('button', { name: 'Näytä tapahtuman tiedot' })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('button', { name: 'Muokkaa tapahtuma-aikaa' })
  ).toBeInTheDocument();

  // wait for place request to finish
  await waitFor(() => {
    expect(screen.queryByText('Soukan kirjasto')).toBeInTheDocument();
  });

  // wait for venue request to finish
  await waitFor(() => {
    expect(screen.queryByText('Soukkas')).toBeInTheDocument();
  });

  expect(screen.queryByText('Vaatesäilytys')).toBeInTheDocument();
  expect(screen.queryByText('Tapahtuma 13.7.2020')).toBeInTheDocument();

  // enrolment table title
  expect(
    screen.queryByText('20 kpl, 20 vahvistettu, 0 jonossa')
  ).toBeInTheDocument();
});

test('enrolment table renders correct information', async () => {
  const { history } = renderWithRoute(<OccurrenceDetailsPage />, {
    routes: [testPath],
    path: ROUTES.OCCURRENCE_DETAILS,
    mocks,
  });
  const pushSpy = jest.spyOn(history, 'push');

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  // wait for venue request to finish
  await waitFor(() => {
    expect(screen.queryByText('Soukan kirjasto')).toBeInTheDocument();
  });

  expect(screen.getAllByText('18.08.2020')).toHaveLength(2);
  expect(screen.getAllByText('Hyväksytty')).toHaveLength(2);
  expect(screen.queryByText('Testi Testaaja')).toBeInTheDocument();
  expect(screen.queryByText('Ilmoittautuja')).toBeInTheDocument();

  userEvent.click(screen.getByText('Testi Testaaja'));

  expect(pushSpy).toHaveBeenCalledWith(
    `/fi${testPath}/enrolments/RW5yb2xtZW50Tm9kZTo4NQ==`
  );
});
