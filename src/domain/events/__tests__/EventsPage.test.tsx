/* eslint-disable @typescript-eslint/no-explicit-any */
import { MockedResponse } from '@apollo/client/testing';
import { advanceTo } from 'jest-date-mock';
import * as React from 'react';
import { toast } from 'react-toastify';

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
  fakeOrganisations,
  fakePerson,
  fakePlace,
} from '../../../utils/mockDataUtils';
import {
  configure,
  render,
  screen,
  userEvent,
  waitFor,
} from '../../../utils/testUtils';
import { EVENT_SORT_KEYS, PAGE_SIZE, PUBLICATION_STATUS } from '../constants';
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
const activePlaceEvents = fakeEvents(5);
const pastEvents = fakeEvents(5);
const draftEvents = fakeEvents(
  5,
  Array.from({ length: 5 }).map((_) => ({
    publicationStatus: PUBLICATION_STATUS.DRAFT,
  }))
);

eventsMock1.meta.next = 'https://test.fi?page=2';
eventsMock2.meta.next = 'https://test.fi?page=3';

const baseVariables = {
  pageSize: PAGE_SIZE,
  publisher: organisationsMock.edges[0]?.node?.publisherId,
  sort: EVENT_SORT_KEYS.START_TIME,
  text: '',
  showAll: true,
  location: '',
};

const apolloMocks: MockedResponse[] = [
  // upcoming events
  {
    request: {
      query: EventsDocument,
      variables: {
        ...baseVariables,
        start: 'now',
      },
    },
    result: {
      data: {
        events: eventsMock1,
      },
    },
  },
  // eventsWithoutOccurrencesData - draft events
  {
    request: {
      query: EventsDocument,
      variables: {
        ...baseVariables,
        publicationStatus: PUBLICATION_STATUS.DRAFT,
      },
    },
    result: {
      data: {
        events: draftEvents,
      },
    },
  },
  // past events
  {
    request: {
      query: EventsDocument,
      variables: {
        ...baseVariables,
        start: undefined,
        end: 'now',
        publicationStatus: PUBLICATION_STATUS.PUBLIC,
      },
    },
    result: {
      data: {
        events: pastEvents,
      },
    },
  },
  // active events
  {
    request: {
      query: EventsDocument,
      variables: {
        ...baseVariables,
        start: 'now',
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
        start: 'now',
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
        start: 'now',
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

const apolloPlaceEventMocks = [
  // active place events
  ...places.map(({ id, name }) => ({
    request: {
      query: EventsDocument,
      variables: {
        ...baseVariables,
        location: id,
        start: 'now',
        publicationStatus: PUBLICATION_STATUS.PUBLIC,
      },
    },
    result: {
      data: {
        events: activePlaceEvents,
      },
    },
  })),
  // past place events
  ...places.map(({ id, name }) => ({
    request: {
      query: EventsDocument,
      variables: {
        ...baseVariables,
        location: id,
        end: 'now',
        publicationStatus: PUBLICATION_STATUS.PUBLIC,
      },
    },
    result: {
      data: {
        events: pastEvents,
      },
    },
  })),
  // draft place events
  ...places.map(({ id, name }) => ({
    request: {
      query: EventsDocument,
      variables: {
        ...baseVariables,
        location: id,
        publicationStatus: PUBLICATION_STATUS.DRAFT,
      },
    },
    result: {
      data: {
        events: pastEvents,
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
    expect(screen.queryByText(event.name!.fi!)).toBeInTheDocument();
    expect(screen.queryByText(event.shortDescription!.fi!)).toBeInTheDocument();
    expect(screen.queryByText(event.description!.fi!)).not.toBeInTheDocument();
  });

  // shouldn't be in the document before fetching more event
  expect(
    screen.queryByText(eventOverrides[6].shortDescription!.fi!)
  ).not.toBeInTheDocument();

  userEvent.click(screen.getAllByRole('button', { name: /näytä lisää/i })[0]);

  expect(screen.queryByTestId('loading-spinner')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  await waitFor(() => {
    screen.getByText(eventOverrides[5].name!.fi!);
  });
  eventOverrides.slice(5, 11).forEach((event) => {
    expect(screen.queryByText(event.name!.fi!)).toBeInTheDocument();
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
            start: 'now',
            text: eventName,
          },
        },
        result: {
          data: {
            events: textSearchEventsMock,
          },
        },
      },
      ...apolloMocks.map((mock) =>
        mock.request.query === EventsDocument
          ? {
              ...mock,
              request: {
                ...mock.request,
                variables: {
                  ...mock.request.variables,
                  text: eventName,
                },
              },
            }
          : mock
      ),
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
    mocks: [
      ...events.map((event) => ({
        request: {
          query: EventsDocument,
          variables: {
            ...baseVariables,
            start: 'now',
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
      ...apolloPlaceEventMocks,
    ],
  };
  renderComponent(searchMock);

  await screen.findByRole('heading', { name: `Tapahtumat 5 kpl` });

  // Test first place filter and clear it
  const placesDropdownToggle = screen.getByRole('button', {
    name: /paikat: avaa valikko/i,
  });
  userEvent.click(placesDropdownToggle);
  userEvent.click(screen.getByRole('option', { name: places[0].name!.fi! }));

  await screen.findByRole('heading', { name: `Tapahtumat 1 kpl` });
  expect(screen.queryByText(events[0].eventName)).toBeInTheDocument();
  expect(screen.queryByText(events[0].eventDescription)).toBeInTheDocument();

  const clearPlacesButton = screen.getByRole('button', {
    name: /tyhjennä kaikki paikat/i,
  });
  userEvent.click(clearPlacesButton);

  await screen.findByRole('heading', { name: `Tapahtumat 5 kpl` });

  // Test second place filter
  userEvent.click(screen.getByRole('option', { name: places[1].name!.fi! }));
  await screen.findByRole('heading', { name: `Tapahtumat 1 kpl` });
  expect(screen.queryByText(events[1].eventName)).toBeInTheDocument();
  expect(screen.queryByText(events[1].eventDescription)).toBeInTheDocument();
});
