import { MockedResponse } from '@apollo/client/testing';
import { configure, waitFor, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
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
import { customRender } from '../../../utils/testUtils';
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
  Array(5).fill({ publicationStatus: PUBLICATION_STATUS.DRAFT })
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
  ...places.map(({ id }) => ({
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
  ...places.map(({ id }) => ({
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
  ...places.map(({ id }) => ({
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
  return customRender(<EventsPage />, {
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
  vi.setSystemTime(new Date(2020, 5, 20));
  const toastErrorSpy = vi.spyOn(toast, 'error');
  const consoleErrorSpy = vi
    .spyOn(console, 'error')
    .mockImplementation(() => {});

  renderComponent();

  await waitFor(() =>
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
  );

  await screen.findByRole(
    'heading',
    { name: `Tapahtumat 5 kpl` },
    { timeout: 2_000 }
  );

  for (const event of eventOverrides.slice(0, 5)) {
    await screen.findByText(event.name!.fi!);
    await screen.findByText(event.shortDescription!.fi!);
    await waitFor(() =>
      expect(screen.queryByText(event.description!.fi!)).not.toBeInTheDocument()
    );
  }

  // shouldn't be in the document before fetching more event
  await waitFor(() => {
    expect(
      screen.queryByText(eventOverrides[6].shortDescription!.fi!)
    ).not.toBeInTheDocument();
  });

  await userEvent.click(
    (await screen.findAllByRole('button', { name: /näytä lisää/i }))[0]
  );

  await waitFor(() =>
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
  );

  await screen.findByText(eventOverrides[5].name!.fi!);
  for (const event of eventOverrides.slice(5, 11)) {
    await screen.findByText(event.name!.fi!);
  }

  await userEvent.click(
    await screen.findByRole('button', { name: /näytä lisää/i })
  );

  await waitFor(
    () => {
      expect(toastErrorSpy).toHaveBeenCalled();
    },
    { timeout: 5_000 }
  );

  expect(toastErrorSpy.mock.calls).toMatchInlineSnapshot(`
    [
      [
        "Tapahtumien lataaminen epäonnistui",
      ],
    ]
  `);

  expect(consoleErrorSpy.mock.calls.at(-1)).toMatchInlineSnapshot(`
    [
      "Failed to fetch more events",
      {
        "error": [ApolloError: Error!],
      },
    ]
  `);
}, 20_000);

test('events can be searched with text', async () => {
  const eventName = 'Haettu tapahtuma';
  const eventDescription = 'Haetun tapahtuma kuvaus';
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
  await waitFor(() =>
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
  );

  const searchInput = await screen.findByRole('textbox', {
    name: /haku/i,
  });
  await userEvent.type(searchInput, eventName);
  await waitFor(() => expect(searchInput).toHaveValue(eventName));

  await waitFor(() =>
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
  );

  await screen.findByRole(
    'heading',
    { name: `Tapahtumat 1 kpl` },
    { timeout: 2_000 }
  );
  expect(await screen.findByText(eventName)).toBeInTheDocument();
  expect(await screen.findByText(eventDescription)).toBeInTheDocument();

  await userEvent.clear(searchInput);
  await waitFor(() => expect(searchInput).toHaveValue(''));

  await waitFor(() =>
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
  );

  await screen.findByRole(
    'heading',
    { name: `Tapahtumat 5 kpl` },
    { timeout: 2_000 }
  );
}, 20_000);

test('events can be searched with places from user profile', async () => {
  // events that have matching placeId
  const events = [
    {
      placeId: places[0].id,
      eventName: 'Haettu tapahtuma',
      eventDescription: 'Haetun tapahtuma kuvaus',
    },
    {
      placeId: places[1].id,
      eventName: 'Haettu tapahtuma2',
      eventDescription: 'Haetun tapahtuma kuvaus2',
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

  await waitFor(() =>
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
  );

  await screen.findByRole(
    'heading',
    { name: `Tapahtumat 5 kpl` },
    { timeout: 2_000 }
  );

  // Test first place filter and clear it
  const placesDropdownToggle = await screen.findByRole('button', {
    name: /paikat: avaa valikko/i,
  });
  await userEvent.click(placesDropdownToggle);
  await userEvent.click(
    await screen.findByRole('option', { name: places[0].name!.fi! })
  );

  await waitFor(() =>
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
  );

  await screen.findByRole(
    'heading',
    { name: `Tapahtumat 1 kpl` },
    { timeout: 2_000 }
  );
  expect(await screen.findByText(events[0].eventName)).toBeInTheDocument();
  expect(
    await screen.findByText(events[0].eventDescription)
  ).toBeInTheDocument();

  const clearPlacesButton = await screen.findByRole('button', {
    name: /tyhjennä kaikki paikat/i,
  });
  await userEvent.click(clearPlacesButton);

  await waitFor(() =>
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
  );

  await screen.findByRole(
    'heading',
    { name: `Tapahtumat 5 kpl` },
    { timeout: 2_000 }
  );

  await userEvent.click(placesDropdownToggle);

  // Test second place filter
  await userEvent.click(
    await screen.findByRole('option', { name: places[1].name!.fi! })
  );

  await waitFor(() =>
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
  );

  await screen.findByRole(
    'heading',
    { name: `Tapahtumat 1 kpl` },
    { timeout: 2_000 }
  );
  expect(await screen.findByText(events[1].eventName)).toBeInTheDocument();
  expect(
    await screen.findByText(events[1].eventDescription)
  ).toBeInTheDocument();
}, 20_000);
