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
  PlaceDocument,
} from '../../../generated/graphql';
import {
  fakeEvent,
  fakeEvents,
  fakeLocalizedObject,
  fakeOccurrences,
  fakeOrganisations,
  fakePerson,
  fakePEvent,
  fakePlace,
} from '../../../utils/mockDataUtils';
import {
  act,
  configure,
  render,
  screen,
  userEvent,
  waitFor,
} from '../../../utils/testUtils';
import * as organisationSelectors from '../../organisation/selector';
import { EVENT_SORT_KEYS, PAGE_SIZE } from '../constants';
import EventsPage from '../EventsPage';

configure({ defaultHidden: true });

const places = [
  {
    id: 'placeId1',
    name: fakeLocalizedObject('Paikka1'),
  },
  {
    id: 'placeId2',
    name: fakeLocalizedObject('Paikka2'),
  },
];

const eventOverrides: Partial<Event>[] = Array.from({ length: 10 }).map(
  (_, i) => {
    const number = i + 1;
    return {
      name: fakeLocalizedObject(`Tapahtuma ${number}`),
      shortDescription: fakeLocalizedObject(`Lyhyt kuvaus ${number}`),
      description: fakeLocalizedObject(`Pitkä kuvaus ${number}`),
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
  location: '',
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
        myProfile: fakePerson({
          organisations: organisationsMock,
          placeIds: places.map((place) => place.id),
        }),
      },
    },
  },
  ...places.map(({ id, name }) => ({
    request: {
      query: PlaceDocument,
      variables: {
        id,
      },
    },
    result: {
      data: {
        place: fakePlace({ name, id }),
      },
    },
  })),
];

const renderComponent = ({ mocks }: { mocks?: MockedResponse[] } = {}) => {
  return render(<EventsPage />, {
    mocks: [...apolloMocks, ...(mocks ?? [])],
    initialState: {
      organisation: {
        activeOrganisation: organisationsMock.edges[0]?.node?.id,
      },
    },
    routes: ['/'],
  });
};

test('renders events list and load more events button works', async () => {
  advanceTo(new Date(2020, 5, 20));
  const toastErrorSpy = jest.spyOn(toast, 'error');
  renderComponent();

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

test('events can be searched with text', async () => {
  const eventName = 'Haettu tapahtuma';
  const eventDescription = 'Haeutun tapahtuma kuvaus';
  const textSearchEventsMock = fakeEvents(1, [
    {
      name: fakeLocalizedObject(eventName),
      shortDescription: fakeLocalizedObject(eventDescription),
      description: fakeLocalizedObject(eventDescription),
    },
  ]);
  const searchMock = {
    mocks: [
      {
        request: {
          query: EventsDocument,
          variables: {
            ...baseVariables,
            text: eventName,
          },
        },
        result: {
          data: {
            events: textSearchEventsMock,
          },
        },
      },
    ],
  };
  renderComponent(searchMock);

  const searchInput = screen.getByRole('textbox', {
    name: /haku/i,
  });
  userEvent.type(searchInput, eventName);

  await screen.findByRole('heading', { name: `Tapahtumat 1 kpl` });
  expect(screen.queryByText(eventName)).toBeInTheDocument();
  expect(screen.queryByText(eventDescription)).toBeInTheDocument();

  userEvent.clear(searchInput);
  await screen.findByRole('heading', { name: `Tapahtumat 1 kpl` });
});

test('events can be searched with places from user profile', async () => {
  // events that have matching placeId
  const events = [
    {
      placeId: places[0].id,
      eventName: 'Haettu tapahtuma',
      eventDescription: 'Haeutun tapahtuma kuvaus',
    },
    {
      placeId: places[1].id,
      eventName: 'Haettu tapahtuma2',
      eventDescription: 'Haeutun tapahtuma kuvaus2',
    },
  ];
  const searchMock = {
    mocks: events.map((event) => ({
      request: {
        query: EventsDocument,
        variables: {
          ...baseVariables,
          location: event.placeId,
        },
      },
      result: {
        data: {
          events: fakeEvents(1, [
            fakeEvent({
              name: fakeLocalizedObject(event.eventName),
              shortDescription: fakeLocalizedObject(event.eventDescription),
            }),
          ]),
        },
      },
    })),
  };
  renderComponent(searchMock);

  await screen.findByRole('heading', { name: `Tapahtumat 5 kpl` });

  // Test first place filter and clear it
  const placesDropdownToggle = screen.getByRole('button', {
    name: /paikat: avaa valikko/i,
  });
  userEvent.click(placesDropdownToggle);
  userEvent.click(screen.getByRole('option', { name: places[0].name.fi }));

  await screen.findByRole('heading', { name: `Tapahtumat 1 kpl` });
  expect(screen.queryByText(events[0].eventName)).toBeInTheDocument();
  expect(screen.queryByText(events[0].eventDescription)).toBeInTheDocument();

  const clearPlacesButton = screen.getByRole('button', {
    name: /tyhjennä kaikki paikat/i,
  });
  userEvent.click(clearPlacesButton);

  await screen.findByRole('heading', { name: `Tapahtumat 5 kpl` });

  // Test second place filter
  userEvent.click(screen.getByRole('option', { name: places[1].name.fi }));
  await screen.findByRole('heading', { name: `Tapahtumat 1 kpl` });
  expect(screen.queryByText(events[1].eventName)).toBeInTheDocument();
  expect(screen.queryByText(events[1].eventDescription)).toBeInTheDocument();
});
