import { MockedResponse } from '@apollo/client/testing';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import Modal from 'react-modal';
import { vi } from 'vitest';

import * as graphql from '../../../generated/graphql';
import {
  fakeEvent,
  fakeImage,
  fakeLocalizedObject,
  fakeOccurrences,
  fakeOrganisations,
  fakePerson,
  fakePEvent,
  fakePlace,
  fakeVenue,
} from '../../../utils/mockDataUtils';
import { renderWithRoute } from '../../../utils/testUtils';
import { clearApolloCache } from '../../app/apollo/apolloClient';
import { ROUTES } from '../../app/routes/constants';
import EventDetailsPage from '../EventDetailsPage';

vi.mock('../../../generated/graphql', async () => {
  const actual = await vi.importActual('../../../generated/graphql');
  return { ...actual };
});

vi.mock('../../app/apollo/apolloClient', async () => {
  const actual = await vi.importActual('../../app/apollo/apolloClient');
  return {
    ...actual,
    clearApolloCache: vi.fn(),
  };
});

beforeEach(() => {
  vi.setSystemTime(new Date(2021, 7, 20));
});

const personId = 'personId1';
const personName = 'Nimi niminen';

const occurrenceTimes = [
  '2021-08-25T21:00:00+00:00',
  '2021-08-26T21:00:00+00:00',
  '2021-08-27T21:00:00+00:00',
  '2021-08-28T21:00:00+00:00',
  '2021-08-29T21:00:00+00:00',
  '2021-08-30T21:00:00+00:00',
];

const eventMock = fakeEvent({
  name: fakeLocalizedObject('Testitapahtuma'),
  description: fakeLocalizedObject('Tapahtuman testikuvaus'),
  images: [fakeImage({ altText: 'moi' })],
  pEvent: fakePEvent({
    contactEmail: 'test@email.com',
    contactPerson: fakePerson({ id: personId, name: personName }),
    occurrences: fakeOccurrences(
      6,
      occurrenceTimes.map((startTime) => ({ startTime }))
    ),
  }),
});

const externallyEnrollableEventMock = {
  ...eventMock,
  pEvent: {
    ...eventMock.pEvent,
    externalEnrolmentUrl: 'https://kultus.hel.fi',
  },
};

const profileMock = fakePerson({
  id: personId,
  organisations: fakeOrganisations(),
  name: 'Nimi niminen',
});
const venueMock = fakeVenue({
  id: eventMock.location!.id!,
  hasSnackEatingPlace: true,
  hasClothingStorage: true,
  outdoorActivity: true,
  hasToiletNearby: true,
  hasAreaForGroupWork: true,
  hasIndoorPlayingArea: true,
  hasOutdoorPlayingArea: true,
});

const apolloMocks: MockedResponse[] = [
  {
    request: {
      query: graphql.EventDocument,
      variables: {
        id: 'palvelutarjotin:afzunowba4',
        include: ['audience', 'in_language', 'keywords', 'location'],
      },
    },
    result: {
      data: {
        event: eventMock,
      },
    },
  },
  {
    request: {
      query: graphql.ImageDocument,
      variables: {
        id: eventMock.images[0].id,
      },
    },
    result: {
      data: {
        image: fakeImage({ altText: 'Kuvan vaihtoehtoinen teksti' }),
      },
    },
  },
  {
    request: {
      query: graphql.MyProfileDocument,
      variables: {},
    },
    result: {
      data: {
        myProfile: profileMock,
      },
    },
  },
  {
    request: {
      query: graphql.PersonDocument,
      variables: {
        id: personId,
      },
    },
    result: {
      data: {
        person: fakePerson({ name: personName }),
      },
    },
  },
  {
    request: {
      query: graphql.PlaceDocument,
      variables: { id: eventMock.location!.id },
    },
    result: {
      data: {
        place: fakePlace(),
      },
    },
  },
  {
    request: {
      query: graphql.VenueDocument,
      variables: { id: eventMock.location!.id },
    },
    result: {
      data: {
        venue: venueMock,
      },
    },
  },
];

test('renders correct information and delete works', async () => {
  const deleteMock = vi.fn();
  vi.spyOn(graphql, 'useDeleteSingleEventMutation').mockReturnValue([
    deleteMock,
  ] as any);
  const { container } = renderWithRoute(<EventDetailsPage />, {
    routes: ['/events/palvelutarjotin:afzunowba4'],
    path: ROUTES.EVENT_DETAILS,
    mocks: apolloMocks,
  });

  Modal.setAppElement(container);

  await waitFor(() =>
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
  );

  await waitFor(() =>
    expect(screen.getByText('TestiVenue')).toBeInTheDocument()
  );

  // Suomi language is active
  expect(screen.getByTestId('eventLanguageSelector-suomi')).toHaveClass(
    'isSelected'
  );

  expect(
    screen.getByRole('heading', { name: 'Testitapahtuma' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: 'Tapahtuman perustiedot' })
  ).toBeInTheDocument();

  expect(screen.getByText('Tapahtuman testikuvaus')).toBeInTheDocument();

  expect(
    screen.getByRole('heading', { name: 'Yhteyshenkilö' })
  ).toBeInTheDocument();

  await waitFor(() => expect(screen.getByText(personName)).toBeInTheDocument());

  expect(screen.getByText('test@email.com')).toBeInTheDocument();
  expect(screen.getByText('1233211234')).toBeInTheDocument();

  expect(screen.getByText('TestiVenue')).toBeInTheDocument();
  expect(screen.getByText('Eväidensyöntipaikka')).toBeInTheDocument();
  expect(screen.getByText('Vaatesäilytys')).toBeInTheDocument();
  expect(screen.getByText(/ilmoittautuminen alkaa/i)).toBeInTheDocument();
  expect(
    screen.getByText(/ilmoittautuminen sulkeutuu, päivää/i)
  ).toBeInTheDocument();

  const eventImage = screen.getByAltText('Kuvan vaihtoehtoinen teksti');
  expect(eventImage).toHaveAttribute(
    'src',
    'https://linkedevents.api.test.hel.ninja/media/images/test.png'
  );

  const deleteButton = screen.getByRole('button', { name: 'Poista tapahtuma' });
  await userEvent.click(deleteButton);

  const modal = within(screen.getByRole('dialog'));
  expect(
    modal.getByText('Poista tapahtuma', { selector: 'div' })
  ).toBeInTheDocument();

  const modalTexts = [
    /Muista lähettää ilmoittautuneille peruutusviesti, ennen kuin poistat tapahtuman/i,
    /Oletko varma että haluat poistaa tapahtuman/i,
    /Tulevat tapahtuma-ajat \(6\)/i,
  ];

  modalTexts.forEach((t) => {
    expect(modal.getByText(t)).toBeInTheDocument();
  });

  expect(modal.getByText('26.8.2021 klo 00:00')).toBeInTheDocument();
  expect(modal.getByTestId('dots')).toBeInTheDocument();
  expect(modal.getByText('31.8.2021 klo 00:00')).toBeInTheDocument();

  expect(deleteMock).not.toHaveBeenCalled();
  expect(clearApolloCache).not.toHaveBeenCalled();

  await userEvent.click(
    modal.getByRole('button', { name: 'Poista tapahtuma' })
  );

  expect(deleteMock).toHaveBeenCalledWith({
    variables: {
      eventId: eventMock.id,
    },
  });
  expect(clearApolloCache).toHaveBeenCalled();
});

test('enrolment info is not shown when enrolments are not done internally', async () => {
  const { container } = renderWithRoute(<EventDetailsPage />, {
    routes: ['/events/palvelutarjotin:afzunowba4'],
    path: ROUTES.EVENT_DETAILS,
    mocks: [
      {
        request: {
          query: graphql.EventDocument,
          variables: {
            id: 'palvelutarjotin:afzunowba4',
            include: ['audience', 'in_language', 'keywords', 'location'],
          },
        },
        result: {
          data: {
            event: externallyEnrollableEventMock,
          },
        },
      },
      ...apolloMocks.slice(1),
    ],
  });

  Modal.setAppElement(container);

  await waitFor(() =>
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
  );
  expect(
    screen.getByRole('heading', { name: 'Tapahtuman perustiedot' })
  ).toBeInTheDocument();
  expect(screen.queryByText(/ilmoittautuminen alkaa/i)).not.toBeInTheDocument();
  expect(
    screen.queryByText(/ilmoittautuminen sulkeutuu, päivää/i)
  ).not.toBeInTheDocument();
});
