/* eslint-disable @typescript-eslint/no-explicit-any */
import { MockedResponse } from '@apollo/client/testing';
import { advanceTo } from 'jest-date-mock';
import * as React from 'react';
import { toast } from 'react-toastify';
import wait from 'waait';

import {
  Event,
  EventsDocument,
  MyProfileDocument,
} from '../../../generated/graphql';
import {
  fakeEvents,
  fakeLocalizedObject,
  fakeOrganisations,
  fakePerson,
} from '../../../utils/mockDataUtils';
import {
  act,
  render,
  screen,
  userEvent,
  waitFor,
} from '../../../utils/testUtils';
import * as organisationSelectors from '../../organisation/selector';
import { EVENT_SORT_KEYS, PAGE_SIZE } from '../constants';
import EventsPage from '../EventsPage';

const eventOverrides: Partial<Event>[] = Array.from({ length: 10 }).map(
  (_, i) => {
    const number = i + 1;
    return {
      name: fakeLocalizedObject(`Tapahtuma ${number}`),
      shortDescription: fakeLocalizedObject(`Lyhyt kuvaus ${number}`),
      description: fakeLocalizedObject(`Pitkä kuvaus ${number}`),
      // pEvent: {
      //   ...fakePEvent(),
      //   // this override mock won't appear in the test atm
      //   // TODO: investigate
      //   occurrences: fakeOccurrences(1, [
      //     {
      //       startTime: '2020-04-03T09:00:00+00:00',
      //       endTime: '2020-04-03T09:30:00+00:00',
      //     },
      //   ]),
      // },
    };
  }
);

const organisationsMock = fakeOrganisations();
const eventsMock1 = fakeEvents(5, eventOverrides.slice(0, 5));
const eventsMock2 = fakeEvents(5, eventOverrides.slice(5));

eventsMock1.meta.next = 'https://test.fi?page=2';
eventsMock2.meta.next = 'https://test.fi?page=3';

const baseVariables = {
  pageSize: PAGE_SIZE,
  publisher: organisationsMock.edges[0]?.node?.publisherId,
  sort: EVENT_SORT_KEYS.START_TIME,
  text: '',
  showAll: true,
  start: 'now',
};

const apolloMocks: MockedResponse[] = [
  {
    request: {
      query: EventsDocument,
      variables: {
        ...baseVariables,
      },
    },
    result: {
      data: {
        events: eventsMock1,
      },
    },
  },
  // load more mock
  {
    request: {
      query: EventsDocument,
      variables: {
        ...baseVariables,
        page: 2,
      },
    },
    result: {
      data: {
        events: eventsMock2,
      },
    },
  },
  {
    request: {
      query: EventsDocument,
      variables: {
        ...baseVariables,
        page: 3,
      },
    },
    error: new Error('Error!'),
  },
  {
    request: {
      query: MyProfileDocument,
      variables: {},
    },
    result: {
      data: {
        myProfile: fakePerson({ organisations: organisationsMock }),
      },
    },
  },
];

test('renders events list and load more events button works', async () => {
  advanceTo(new Date(2020, 5, 20));
  jest
    .spyOn(organisationSelectors, 'activeOrganisationSelector')
    .mockReturnValue(organisationsMock.edges[0]?.node?.id as any);
  const toastErrorSpy = jest.spyOn(toast, 'error');

  render(<EventsPage />, { mocks: apolloMocks, routes: ['/'] });

  await act(wait);

  await waitFor(() => {
    expect(
      screen.queryByRole('heading', { name: `Tapahtumat 5 kpl` })
    ).toBeInTheDocument();
  });

  eventOverrides.slice(0, 5).forEach((event) => {
    expect(screen.queryByText(event.name.fi)).toBeInTheDocument();
    expect(screen.queryByText(event.shortDescription.fi)).toBeInTheDocument();
    expect(screen.queryByText(event.description.fi)).not.toBeInTheDocument();
  });

  // shouldn't be in the document before fetching more event
  expect(
    screen.queryByText(eventOverrides[6].shortDescription.fi)
  ).not.toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: /näytä lisää/i }));

  expect(screen.queryByTestId('loading-spinner')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  eventOverrides.slice(5, 11).forEach((event) => {
    expect(screen.queryByText(event.name.fi)).toBeInTheDocument();
  });

  userEvent.click(screen.getByRole('button', { name: /näytä lisää/i }));

  await waitFor(() => {
    expect(toastErrorSpy).toHaveBeenCalled();
  });

  expect(toastErrorSpy.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        "Tapahtumien lataaminen epäonnistui",
      ],
    ]
  `);
});
