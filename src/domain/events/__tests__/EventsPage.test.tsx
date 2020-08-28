/* eslint-disable @typescript-eslint/no-explicit-any */
import { MockedResponse } from '@apollo/react-testing';
import { advanceTo } from 'jest-date-mock';
import React from 'react';
import wait from 'waait';

import {
  Event,
  EventsDocument,
  MyProfileDocument,
} from '../../../generated/graphql';
import {
  fakeEvents,
  fakeLocalizedObject,
  fakeOccurrences,
  fakeOrganisations,
  fakePerson,
  fakePEvent,
} from '../../../utils/mockDataUtils';
import { act, render, screen, waitFor } from '../../../utils/testUtils';
import * as organisationSelectors from '../../organisation/selector';
import { EVENT_SORT_KEYS, PAGE_SIZE } from '../constants';
import EventsPage from '../EventsPage';

const eventOverrides: Partial<Event>[] = [
  { name: fakeLocalizedObject('Tapahtuma 1') },
  { name: fakeLocalizedObject('Tapahtuma 2') },
  { name: fakeLocalizedObject('Tapahtuma 3') },
  { name: fakeLocalizedObject('Tapahtuma 4') },
  {
    name: fakeLocalizedObject('Tapahtuma 5'),
    pEvent: {
      ...fakePEvent(),
      // this override mock won't appear in the test atm
      // TODO: investigate
      occurrences: fakeOccurrences(1, [
        {
          startTime: '2020-04-03T09:00:00+00:00',
          endTime: '2020-04-03T09:30:00+00:00',
        },
      ]),
    },
  },
];

const organisationsMock = fakeOrganisations();
const eventsMock = fakeEvents(5, eventOverrides);

const apolloMocks: MockedResponse[] = [
  {
    request: {
      query: EventsDocument,
      variables: {
        pageSize: PAGE_SIZE,
        publisher: organisationsMock.edges[0]?.node?.publisherId,
        sort: EVENT_SORT_KEYS.START_TIME,
        text: '',
        showAll: true,
      },
    },
    result: {
      data: {
        events: eventsMock,
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
        myProfile: fakePerson({ organisations: organisationsMock }),
      },
    },
  },
];

test('renders without errors', async () => {
  advanceTo(new Date(2020, 5, 20));
  jest
    .spyOn(organisationSelectors, 'activeOrganisationSelector')
    .mockReturnValue(organisationsMock.edges[0]?.node?.id as any);
  render(<EventsPage />, { mocks: apolloMocks, routes: ['/'] });

  await act(wait);

  await waitFor(() => {
    expect(
      screen.queryByRole('heading', { name: `Tapahtumat 5 kpl` })
    ).toBeInTheDocument();
  });

  expect(screen.queryByText('Tapahtuma 1')).toBeInTheDocument();
  expect(screen.queryByText('Tapahtuma 2')).toBeInTheDocument();
  expect(screen.queryByText('Tapahtuma 3')).toBeInTheDocument();
  expect(screen.queryByText('Tapahtuma 4')).toBeInTheDocument();
  expect(screen.queryByText('Tapahtuma 5')).toBeInTheDocument();
});
