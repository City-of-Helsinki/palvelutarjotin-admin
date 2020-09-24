import { MockedResponse } from '@apollo/react-testing';
import { format } from 'date-fns';
import { advanceTo, clear } from 'jest-date-mock';
import React from 'react';

import { EventDocument, OccurrenceNode } from '../../../generated/graphql';
import {
  fakeEvent,
  fakeLocalizedObject,
  fakeOccurrences,
  fakePEvent,
} from '../../../utils/mockDataUtils';
import {
  renderWithRoute,
  screen,
  userEvent,
  waitFor,
} from '../../../utils/testUtils';
import { ROUTES } from '../../app/routes/constants';
import OccurrencesPage from '../OccurrencesPage';

const eventName = 'Testitapahtuma';
const eventMock = fakeEvent({
  name: fakeLocalizedObject(eventName),
  startTime: '2020-07-13T05:51:05.761000Z',
  publicationStatus: 'draft',
});

const fakeOccurrenceOverrides: Partial<OccurrenceNode>[] = [
  {
    startTime: '2020-08-03T09:00:00+00:00',
  },
  {
    startTime: '2020-08-04T09:00:00+00:00',
  },
  {
    startTime: '2020-08-05T09:00:00+00:00',
  },
  {
    startTime: '2020-08-06T09:00:00+00:00',
  },
  {
    startTime: '2020-08-07T09:00:00+00:00',
  },
];

const apolloMocks: MockedResponse[] = [
  {
    request: {
      query: EventDocument,
      variables: {
        id: eventMock.id,
        include: ['location'],
      },
    },
    result: {
      data: {
        event: {
          ...eventMock,
          pEvent: fakePEvent({
            occurrences: fakeOccurrences(
              fakeOccurrenceOverrides.length,
              fakeOccurrenceOverrides
            ),
          }),
        },
      },
    },
  },
];

afterAll(() => {
  clear();
});

advanceTo(new Date(2020, 7, 5));

test('renders occurrences page correctly', async () => {
  const { history } = renderWithRoute(<OccurrencesPage />, {
    mocks: apolloMocks,
    routes: [`/events/${eventMock.id}/occurrences`],
    path: ROUTES.OCCURRENCES,
  });

  const historyPushSpy = jest
    .spyOn(history, 'push')
    .mockImplementation(jest.fn());

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  expect(screen.queryByText(eventName)).toBeInTheDocument();

  const rows = screen.getAllByRole('row');
  expect(rows).toHaveLength(7);

  expect(screen.queryByText('Tulevat tapahtuma-ajat 3 kpl'));
  expect(screen.queryByText('Menneet tapahtuma-ajat 2 kpl'));

  // TODO: test this when API actually returns published time
  // expect(
  //   screen.queryByText('Tapahtuma julkaistu 13.07.2020 08:51')
  // ).toBeInTheDocument();
  expect(
    screen.queryByRole('heading', { name: 'Tapahtuman julkaisu' })
  ).toBeInTheDocument();

  const eventDetailsButton = screen.getByRole('button', {
    name: 'Näytä tapahtuman tiedot',
  });
  userEvent.click(eventDetailsButton);

  expect(historyPushSpy).toHaveBeenCalledWith(`/fi/events/${eventMock.id}`);

  const addNewOccurrenceButton = screen.getByText('Lisää uusi tapahtuma-aika');
  expect(addNewOccurrenceButton).toHaveAttribute(
    'href',
    `/fi/events/${eventMock.id}/occurrences/create`
  );

  // check that all the occurrences are displayed with right dates
  fakeOccurrenceOverrides.forEach((o) => {
    const formattedTime = format(new Date(o.startTime), 'dd.MM.yyyy');
    expect(screen.queryByText(formattedTime)).toBeInTheDocument();
  });
});
