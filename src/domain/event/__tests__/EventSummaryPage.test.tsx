import { advanceTo } from 'jest-date-mock';
import * as React from 'react';

import { EventDocument, MyProfileDocument } from '../../../generated/graphql';
import {
  fakeEvent,
  fakeLocalizedObject,
  fakeOccurrences,
  fakeOrganisation,
  fakeOrganisations,
  fakePerson,
  fakePEvent,
} from '../../../utils/mockDataUtils';
import {
  renderWithRoute,
  screen,
  userEvent,
  waitFor,
} from '../../../utils/testUtils';
import { ROUTES } from '../../app/routes/constants';
import { PUBLICATION_STATUS } from '../../events/constants';
import EventSummaryPage from '../EventSummaryPage';

const eventId1 = 'eventMockId';
const eventName = 'Tapahtuma123456';
const eventDescription = 'Tapahtuman kuvaus';
const organisationName = 'Testiorganisaatio';
const organisationId = 'organisationId';

const eventId2 = 'eventMockId2';

const eventMock1 = fakeEvent({
  id: eventId1,
  name: fakeLocalizedObject(eventName),
  description: fakeLocalizedObject(eventDescription),
  publicationStatus: PUBLICATION_STATUS.DRAFT,
  pEvent: fakePEvent({
    organisation: fakeOrganisation({ id: organisationId }),
    occurrences: fakeOccurrences(3, [
      { startTime: new Date(2020, 11, 11).toISOString() },
      { startTime: new Date(2020, 11, 12).toISOString() },
      { startTime: new Date(2020, 11, 13).toISOString() },
    ]),
  }),
});

const eventMock2 = fakeEvent({
  id: eventId2,
  name: fakeLocalizedObject(eventName),
  description: fakeLocalizedObject(eventDescription),
  publicationStatus: PUBLICATION_STATUS.PUBLIC,
  pEvent: fakePEvent({
    organisation: fakeOrganisation({ id: organisationId }),
    occurrences: fakeOccurrences(3, [
      { startTime: new Date(2020, 11, 11).toISOString() },
      { startTime: new Date(2020, 9, 12).toISOString() },
      { startTime: new Date(2020, 8, 13).toISOString() },
    ]),
  }),
});

const profileMock = fakePerson({
  organisations: fakeOrganisations(1, [
    fakeOrganisation({
      id: organisationId,
      name: organisationName,
    }),
  ]),
});

const mocks = [
  {
    request: {
      query: EventDocument,
      variables: {
        id: eventId1,
        include: ['location', 'keywords'],
      },
    },
    result: {
      data: {
        event: eventMock1,
      },
    },
  },
  {
    request: {
      query: EventDocument,
      variables: {
        id: eventId2,
        include: ['location', 'keywords'],
      },
    },
    result: {
      data: {
        event: eventMock2,
      },
    },
  },
  {
    request: {
      query: MyProfileDocument,
      variables: {},
    },
    result: {
      data: {
        myProfile: profileMock,
      },
    },
  },
];

advanceTo(new Date(2020, 10, 10));
it('displays event and occurrences correctly', async () => {
  renderWithRoute(<EventSummaryPage />, {
    mocks,
    path: ROUTES.EVENT_SUMMARY,
    routes: [`/events/${eventId1}/summary`],
  });

  await waitFor(() => {
    expect(screen.queryByText(organisationName)).toBeInTheDocument();
    expect(screen.queryAllByText(eventName)).toHaveLength(2);
  });

  expect(
    screen.queryByRole('heading', { name: /^tapahtuman esikatselu/i })
  ).toBeInTheDocument();
  expect(
    screen.queryByText(/klikkaa koko tapahtuman esikatseluun/i)
  ).toBeInTheDocument();

  expect(screen.queryByText(eventDescription)).toBeInTheDocument();

  expect(
    screen.queryByRole('button', { name: 'Takaisin tapahtuma-aikoihin' })
  ).toBeInTheDocument();

  expect(
    screen.queryByRole('link', {
      name: 'Muokkaa perustietoja',
    })
  ).toBeInTheDocument();

  expect(
    screen.queryByRole('heading', { name: 'Tapahtuma-ajat 3 kpl' })
  ).toBeInTheDocument();

  //temporary commented out pt-598
  /*expect(
    screen.queryByRole('heading', { name: 'Tapahtuman julkaisu' })
  ).toBeInTheDocument();*/

  // pt-598 Aseta julkaisuajankohta
  expect(
    screen.queryByRole('button', { name: 'Julkaise tapahtuma' })
  ).toBeInTheDocument();

  expect(
    screen.queryByRole('link', { name: 'Muokkaa tapahtuma-aikoja' })
  ).toBeInTheDocument();

  expect(
    screen.queryByRole('button', { name: 'Näytä tapahtuman tiedot' })
  ).toBeInTheDocument();
});

it('navigates to edit event page when edit button is clicked', async () => {
  const { history } = renderWithRoute(<EventSummaryPage />, {
    mocks,
    path: ROUTES.EVENT_SUMMARY,
    routes: [`/events/${eventId1}/summary`],
  });

  const historyPush = jest.spyOn(history, 'push');

  await waitFor(() => {
    expect(screen.queryByText(organisationName)).toBeInTheDocument();
    expect(screen.queryAllByText(eventName)).toHaveLength(2);
  });

  userEvent.click(
    screen.queryByRole('link', {
      name: 'Muokkaa perustietoja',
    })
  );

  expect(historyPush).toHaveBeenCalledWith(
    '/fi/events/eventMockId/edit?navigatedFrom=eventSummary'
  );
});

it('navigates to edit occurrences page when edit occurrences button is clicked', async () => {
  const { history } = renderWithRoute(<EventSummaryPage />, {
    mocks,
    path: ROUTES.EVENT_SUMMARY,
    routes: [`/events/${eventId1}/summary`],
  });

  const historyPush = jest.spyOn(history, 'push');

  await waitFor(() => {
    expect(screen.queryByText(organisationName)).toBeInTheDocument();
    expect(screen.queryAllByText(eventName)).toHaveLength(2);
  });

  userEvent.click(
    screen.queryByRole('link', {
      name: 'Muokkaa tapahtuma-aikoja',
    })
  );

  expect(historyPush).toHaveBeenCalledWith(
    '/fi/events/eventMockId/occurrences/create'
  );
});

it('hides edit buttons when event has been published', async () => {
  renderWithRoute(<EventSummaryPage />, {
    mocks,
    path: ROUTES.EVENT_SUMMARY,
    routes: [`/events/${eventId2}/summary`],
  });

  await waitFor(() => {
    expect(screen.queryByText(organisationName)).toBeInTheDocument();
    expect(screen.queryAllByText(eventName)).toHaveLength(2);
  });

  expect(
    screen.queryByRole('button', { name: 'Aseta julkaisuajankohta' })
  ).not.toBeInTheDocument();

  expect(
    screen.queryByRole('link', { name: 'Muokkaa tapahtuma-aikoja' })
  ).not.toBeInTheDocument();

  expect(
    screen.queryByRole('link', {
      name: 'Muokkaa perustietoja',
    })
  ).not.toBeInTheDocument();

  expect(
    screen.queryByRole('button', {
      name: 'Peru julkaisu',
    })
  ).toBeInTheDocument();
});

it('shows upcoming and past occurrences', async () => {
  renderWithRoute(<EventSummaryPage />, {
    mocks,
    path: ROUTES.EVENT_SUMMARY,
    routes: [`/events/${eventId2}/summary`],
  });

  await waitFor(() => {
    expect(screen.queryByText(organisationName)).toBeInTheDocument();
    expect(screen.queryAllByText(eventName)).toHaveLength(2);
  });

  expect(
    screen.getByRole('heading', { name: 'Tapahtuma-ajat 1 kpl' })
  ).toBeInTheDocument();

  expect(
    screen.getByRole('heading', { name: 'Menneet tapahtuma-ajat 2 kpl' })
  ).toBeInTheDocument();
});
