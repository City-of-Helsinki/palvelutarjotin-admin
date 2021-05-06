import * as React from 'react';

import {
  EnrolmentStatus,
  EventDocument,
  OccurrenceDocument,
  PlaceDocument,
  VenueDocument,
} from '../../../generated/graphql';
import {
  fakeEnrolments,
  fakeEvent,
  fakeLanguages,
  fakeLocalizedObject,
  fakeOccurrence,
  fakePerson,
  fakePlace,
  fakeStudyGroup,
  fakeVenue,
} from '../../../utils/mockDataUtils';
import {
  renderWithRoute,
  screen,
  userEvent,
  waitFor,
} from '../../../utils/testUtils';
import { ROUTES } from '../../app/routes/constants';
import { PUBLICATION_STATUS } from '../../events/constants';
import OccurrenceDetailsPage from '../OccurrenceDetailsPage';

const placeId = 'tprek:15376';
const eventId = 'palvelutarjotin:afzunowba4';
const occurrenceId = 'T2NjdXJyZW5jZU5vZGU6MTIz';
const enrolmentId = 'afdgsgfsdg23532';
const testPath = ROUTES.OCCURRENCE_DETAILS.replace(':id', eventId).replace(
  ':occurrenceId',
  occurrenceId
);

const placeMock = fakePlace({
  id: placeId,
  name: fakeLocalizedObject('Soukan kirjasto'),
});

const eventResult = {
  data: {
    event: fakeEvent({
      id: eventId,
      name: fakeLocalizedObject('Tapahtuma 13.7.2020'),
      publicationStatus: PUBLICATION_STATUS.DRAFT,
      location: placeMock,
    }),
  },
};

const placeResult = {
  data: {
    place: placeMock,
  },
};

const venueResult = {
  data: {
    venue: fakeVenue({
      hasClothingStorage: true,
      translations: [
        {
          languageCode: 'FI' as any,
          description: 'Soukkas',
          __typename: 'VenueTranslationType',
        },
      ],
    }),
  },
};

const occurrenceResult = {
  data: {
    occurrence: fakeOccurrence({
      placeId,
      amountOfSeats: 30,
      minGroupSize: 10,
      maxGroupSize: 20,
      seatsTaken: 20,
      languages: fakeLanguages([
        {
          id: 'fi',
          name: 'Finnish',
        },
        {
          id: 'en',
          name: 'English',
        },
      ]),
      startTime: '2020-09-10T09:00:00+00:00',
      endTime: '2020-09-10T09:30:00+00:00',
      enrolments: fakeEnrolments(2, [
        {
          status: EnrolmentStatus.Approved,
          studyGroup: fakeStudyGroup({
            groupSize: 8,
            amountOfAdult: 2,
          }),
          person: fakePerson({ name: 'Testi Testaaja' }),
          id: enrolmentId,
        },
        {
          status: EnrolmentStatus.Approved,
          person: fakePerson({ name: 'Ilmoittautuja' }),
          studyGroup: fakeStudyGroup({
            groupSize: 10,
            amountOfAdult: 0,
          }),
        },
      ]),
    }),
  },
};

const mocks = [
  {
    request: {
      query: EventDocument,
      variables: {
        id: eventId,
        include: ['keywords', 'location'],
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
        id: placeId,
      },
    },
    result: placeResult,
  },
  {
    request: {
      query: VenueDocument,
      variables: {
        id: placeId,
      },
    },
    result: venueResult,
  },
];

// test('is accessible', async () => {
//   const { container } = renderWithRoute(<OccurrenceDetailsPage />, {
//     routes: [testPath],
//     path: ROUTES.OCCURRENCE_DETAILS,
//     mocks,
//   });

//   await waitFor(() => {
//     expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
//   });

//   // wait for venue request to finish
//   await waitFor(() => {
//     expect(screen.queryByText('Soukkas')).toBeInTheDocument();
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
    screen.queryByText('30 paikkaa, ryhmän koko 10–20')
  ).toBeInTheDocument();
  expect(screen.queryByText('Kieli: suomi, englanti')).toBeInTheDocument();

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
    `/fi${testPath}/enrolments/${enrolmentId}`
  );
});
