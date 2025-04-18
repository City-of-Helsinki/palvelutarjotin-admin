import { MockedResponse } from '@apollo/client/testing';
import {
  BoundFunctions,
  configure,
  queries,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import * as ICS from 'ics';
import * as React from 'react';
import { Route, Routes } from 'react-router';
import { toast } from 'react-toastify';
import { vi, Mock } from 'vitest';

import {
  CancelOccurrenceDocument,
  Event,
  EventDocument,
  MyProfileDocument,
  OccurrenceDocument,
  PalvelutarjotinEventNode,
} from '../../../generated/graphql';
import {
  placeId,
  placeMockResponse,
} from '../../../test/CreateOccurrencePageTestUtils';
import {
  fakeEvent,
  fakeLocalizedObject,
  fakeOccurrence,
  fakeOccurrences,
  fakeOrganisation,
  fakeOrganisations,
  fakePerson,
  fakePEvent,
  pageInfoMock,
} from '../../../utils/mockDataUtils';
import { customRender, renderWithRoute } from '../../../utils/testUtils';
import { ROUTES } from '../../app/routes/constants';
import { PUBLICATION_STATUS } from '../../events/constants';
import EventSummaryPage from '../EventSummaryPage';
const includeArray = ['location', 'keywords', 'in_language'];

configure({ defaultHidden: true });

const originalCreateEvent = ICS.createEvent;

beforeAll(() => {
  (ICS as any).createEvent = vi.fn();
});
beforeEach(() => {
  vi.clearAllMocks();
});
afterAll(() => {
  (ICS as any).createEvent = originalCreateEvent;
});

const eventId1 = 'eventMockId';
const eventId2 = 'eventMockId2';
const eventName = 'Tapahtuma123456';
const eventDescription = 'Tapahtuman kuvaus';
const eventShortDescription = 'Tapahtuman lyhyt kuvaus';
const organisationName = 'Testiorganisaatio';
const organisationId = 'organisationId';

const seatsApproved = 10;
const occurrenceId1 = 'occurrenceId1';
const occurrenceId2 = 'occurrenceId2';
const occurrenceId3 = 'occurrenceId3';

const cancelReasonMessageText = 'testmessage';

const mockOccurrence1 = fakeOccurrence({
  startTime: new Date(2020, 11, 11).toISOString(),
  id: occurrenceId1,
  placeId,
  enrolments: {
    edges: [],
    pageInfo: pageInfoMock,
  },
});

const occurrences = fakeOccurrences(3, [
  {
    ...mockOccurrence1,
  },
  {
    startTime: new Date(2020, 11, 12).toISOString(),
    id: occurrenceId2,
    placeId,
  },
  {
    startTime: new Date(2020, 11, 13).toISOString(),
    remainingSeats: 0,
    seatsApproved,
    seatsTaken: 30,
    id: occurrenceId3,
    placeId,
  },
]);

const occurrencesOneCancelled = fakeOccurrences(3, [
  {
    startTime: new Date(2020, 11, 11).toISOString(),
    id: occurrenceId1,
    cancelled: true,
    placeId,
  },
  {
    startTime: new Date(2020, 11, 12).toISOString(),
    id: occurrenceId2,
    placeId,
  },
  {
    startTime: new Date(2020, 11, 13).toISOString(),
    remainingSeats: 0,
    seatsApproved,
    seatsTaken: 30,
    id: occurrenceId3,
    placeId,
  },
]);

const getFakeEvent = (
  eventOverrides: Partial<Event> = {},
  pEventOverrides: Partial<PalvelutarjotinEventNode> = {}
) =>
  fakeEvent({
    id: eventId1,
    name: fakeLocalizedObject(eventName),
    description: fakeLocalizedObject(eventDescription),
    shortDescription: fakeLocalizedObject(eventShortDescription),
    publicationStatus: PUBLICATION_STATUS.DRAFT,
    pEvent: fakePEvent({
      organisation: fakeOrganisation({
        id: organisationId,
        name: organisationName,
      }),
      occurrences,
      ...pEventOverrides,
    }),
    ...eventOverrides,
  });

const eventMock1 = getFakeEvent();

const eventMock2 = getFakeEvent(
  {
    id: eventId2,
    publicationStatus: PUBLICATION_STATUS.PUBLIC,
  },
  {
    occurrences: fakeOccurrences(4, [
      { startTime: new Date(2020, 11, 11).toISOString(), placeId },
      // occurrence with startTime in the past but endTime in the future
      {
        startTime: new Date(2020, 9, 13).toISOString(),
        endTime: new Date(2020, 11, 11).toISOString(),
        placeId,
      },
      { startTime: new Date(2020, 9, 12).toISOString(), placeId },
      { startTime: new Date(2020, 8, 13).toISOString(), placeId },
    ]),
  }
);

const eventMockWithExternalEnrolments = getFakeEvent(
  {
    id: eventId1,
    publicationStatus: PUBLICATION_STATUS.PUBLIC,
  },
  { enrolmentStart: null, externalEnrolmentUrl: 'https://kultus.hel.fi' }
);

const profileMock = fakePerson({
  organisations: fakeOrganisations(1, [
    fakeOrganisation({
      id: organisationId,
      name: organisationName,
    }),
  ]),
});

const eventResponseWithOneCancelledOccurrence = {
  request: {
    query: EventDocument,
    variables: {
      id: eventId1,
      include: includeArray,
    },
  },
  result: {
    data: {
      event: getFakeEvent(
        {
          id: eventId1,
          publicationStatus: PUBLICATION_STATUS.PUBLIC,
        },
        { occurrences: occurrencesOneCancelled }
      ),
    },
  },
};

const getMocks = ({
  event1,
  event2,
  mocks = [],
}: { event1?: Event; event2?: Event; mocks?: MockedResponse[] } = {}) => [
  {
    request: {
      query: EventDocument,
      variables: {
        id: eventId1,
        include: includeArray,
      },
    },
    result: {
      data: {
        event: event1 || eventMock1,
      },
    },
  },
  {
    request: {
      query: EventDocument,
      variables: {
        id: eventId2,
        include: includeArray,
      },
    },
    result: {
      data: {
        event: event2 || eventMock2,
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
  {
    request: {
      query: CancelOccurrenceDocument,
      variables: {
        input: {
          id: occurrenceId1,
          reason: cancelReasonMessageText,
        },
      },
    },
    result: {
      data: {
        cancelOccurrence: {
          clientMutationId: null,
          __typename: 'CancelOccurrenceMutationPayload',
        },
      },
    },
  },
  {
    request: {
      query: OccurrenceDocument,
      variables: {
        id: occurrenceId1,
      },
    },
    result: {
      data: {
        occurrence: mockOccurrence1,
      },
    },
  },
  placeMockResponse,
  ...mocks,
];

const renderComponent = (
  mocks: {
    event1?: Event;
    event2?: Event;
    mocks?: MockedResponse[];
  } = {}
) =>
  renderWithRoute(<EventSummaryPage />, {
    mocks: getMocks(mocks),
    path: ROUTES.EVENT_SUMMARY,
    routes: [`/events/${eventId1}/summary`],
  });

vi.setSystemTime(new Date(2020, 10, 10));

it('displays event and occurrences correctly', async () => {
  renderWithRoute(<EventSummaryPage />, {
    mocks: getMocks(),
    path: ROUTES.EVENT_SUMMARY,
    routes: [`/events/${eventId1}/summary`],
  });

  await waitFor(() => expect(screen.getAllByText(eventName)).toHaveLength(2));
  expect(await screen.findByText(organisationName)).toBeInTheDocument();

  expect(
    await screen.findByRole('heading', { name: /^tapahtuman esikatselu/i })
  ).toBeInTheDocument();
  expect(
    await screen.findByText(/klikkaa koko tapahtuman esikatseluun/i)
  ).toBeInTheDocument();

  expect(await screen.findByText(eventShortDescription)).toBeInTheDocument();

  expect(
    await screen.findByRole('button', { name: 'Takaisin tapahtuma-aikoihin' })
  ).toBeInTheDocument();

  expect(
    await screen.findByRole('link', {
      name: 'Muokkaa perustietoja',
    })
  ).toBeInTheDocument();

  expect(
    await screen.findByRole('heading', { name: 'Tapahtuma-ajat 3 kpl' })
  ).toBeInTheDocument();

  //temporary commented out pt-598
  /*expect(
    screen.getByRole('heading', { name: 'Tapahtuman julkaisu' })
  ).toBeInTheDocument();*/

  // pt-598 Aseta julkaisuajankohta
  expect(
    await screen.findByRole('button', { name: 'Julkaise tapahtuma' })
  ).toBeInTheDocument();

  expect(
    await screen.findByRole('link', { name: 'Muokkaa tapahtuma-aikoja' })
  ).toBeInTheDocument();

  expect(
    await screen.findByRole('button', { name: 'Näytä tapahtuman tiedot' })
  ).toBeInTheDocument();
});

it('navigates to edit event page when edit button is clicked', async () => {
  customRender(
    <Routes>
      <Route
        path={`/fi${ROUTES.EVENT_SUMMARY}`}
        element={<EventSummaryPage />}
      />
      <Route path={`/fi${ROUTES.EDIT_EVENT}`} element={<></>} />
    </Routes>,
    {
      mocks: getMocks(),
      routes: [`/fi/events/${eventId1}/summary`],
    }
  );

  await waitFor(() => expect(screen.getAllByText(eventName)).toHaveLength(2));

  await userEvent.click(
    await screen.findByRole('link', {
      name: 'Muokkaa perustietoja',
    })
  );

  await waitFor(() =>
    expect(window.location.pathname).toEqual(`/fi/events/${eventId1}/edit`)
  );
  await waitFor(() => {
    expect(window.location.search).toEqual(
      `?returnPath=%2Fevents%2F${eventId1}%2Fsummary`
    );
  });
});

it('navigates to edit occurrences page when edit occurrences button is clicked', async () => {
  customRender(
    <Routes>
      <Route
        path={`/fi${ROUTES.EVENT_SUMMARY}`}
        element={<EventSummaryPage />}
      />
      <Route path={`/fi${ROUTES.CREATE_OCCURRENCE}`} element={<></>} />
    </Routes>,
    {
      mocks: getMocks(),
      routes: [`/fi/events/${eventId1}/summary`],
    }
  );

  await waitFor(() => expect(screen.getAllByText(eventName)).toHaveLength(2));

  await userEvent.click(
    await screen.findByRole('link', {
      name: 'Muokkaa tapahtuma-aikoja',
    })
  );

  await waitFor(() => {
    expect(window.location.pathname).toEqual(
      `/fi/events/${eventId1}/occurrences/create`
    );
  });
  await waitFor(() => expect(window.location.search).toEqual(``));
});

it('changes edit occurrences button when event has been published', async () => {
  renderWithRoute(<EventSummaryPage />, {
    mocks: getMocks(),
    path: ROUTES.EVENT_SUMMARY,
    routes: [`/events/${eventId2}/summary`],
  });

  await waitFor(() => expect(screen.getAllByText(eventName)).toHaveLength(2));
  expect(await screen.findByText(organisationName)).toBeInTheDocument();
  await waitFor(() => {
    expect(
      screen.queryByRole('button', { name: 'Aseta julkaisuajankohta' })
    ).not.toBeInTheDocument();
  });

  await waitFor(() => {
    expect(
      screen.queryByRole('link', { name: 'Muokkaa tapahtuma-aikoja' })
    ).toHaveAttribute('href', '/fi/events/eventMockId2/occurrences/edit');
  });

  expect(
    await screen.findByRole('link', {
      name: 'Muokkaa perustietoja',
    })
  ).toBeInTheDocument();

  expect(
    await screen.findByRole('button', {
      name: /lataa ilmoittautumiset \(csv\)/i,
    })
  ).toBeInTheDocument();
});

it('does not show enrolments download button when enrolments are not done internally', async () => {
  renderWithRoute(<EventSummaryPage />, {
    mocks: getMocks({ event1: eventMockWithExternalEnrolments }),
    path: ROUTES.EVENT_SUMMARY,
    routes: [`/events/${eventId1}/summary`],
  });
  expect(await screen.findByText(organisationName)).toBeInTheDocument();
  await waitFor(() => {
    expect(
      screen.queryByRole('button', {
        name: /lataa ilmoittautumiset \(csv\)/i,
      })
    ).not.toBeInTheDocument();
  });
});

it('shows upcoming and past occurrences', async () => {
  renderWithRoute(<EventSummaryPage />, {
    mocks: getMocks(),
    path: ROUTES.EVENT_SUMMARY,
    routes: [`/events/${eventId2}/summary`],
  });

  await waitFor(() => expect(screen.getAllByText(eventName)).toHaveLength(2));
  expect(await screen.findByText(organisationName)).toBeInTheDocument();
  expect(
    await screen.findByRole('heading', { name: 'Tapahtuma-ajat 2 kpl' })
  ).toBeInTheDocument();

  expect(
    await screen.findByRole('heading', { name: 'Menneet tapahtuma-ajat 2 kpl' })
  ).toBeInTheDocument();
});

it('shows full and not full occurrence rows correctly', async () => {
  const fullOccurrenceRowText =
    '13.12.2020 00:00 – 01:00 Sellon kirjasto 30 13.7.2020 10 hyväksytty 20 hyväksymättä Tapahtuma on täynnä Valitse';
  const notFullOccurrenceRowText =
    '12.12.2020 00:00 – 01:00 Sellon kirjasto 30 13.7.2020 0 hyväksytty 0 hyväksymättä Valitse';
  const seatsApproved = 10;
  renderWithRoute(<EventSummaryPage />, {
    mocks: getMocks({
      event1: getFakeEvent(undefined, {
        occurrences: fakeOccurrences(3, [
          { startTime: new Date(2020, 11, 12).toISOString(), placeId },
          {
            startTime: new Date(2020, 11, 13).toISOString(),
            remainingSeats: 0,
            seatsApproved,
            seatsTaken: 30,
            placeId,
          },
          { placeId },
        ]),
      }),
    }),
    path: ROUTES.EVENT_SUMMARY,
    routes: [`/events/${eventId1}/summary`],
  });

  await waitFor(() => expect(screen.getAllByText(eventName)).toHaveLength(2));
  expect(await screen.findByText(organisationName)).toBeInTheDocument();
  const fullOccurrence = await screen.findByRole('row', {
    name: fullOccurrenceRowText,
  });
  const notFullOccurrence = await screen.findByRole('row', {
    name: notFullOccurrenceRowText,
  });

  expect(fullOccurrence).toBeInTheDocument();

  const withinFullOccurrence = within(fullOccurrence);
  const withinNotFullOccurrence = within(notFullOccurrence);
  const acceptedEnrolments = await withinFullOccurrence.findByText(
    seatsApproved.toString()
  );
  const acceptedEnrolments2 = (
    await withinNotFullOccurrence.findAllByText('0')
  )[0];

  await waitFor(() =>
    expect(acceptedEnrolments.parentElement).toHaveClass('enrolmentFull')
  );
  await waitFor(() => {
    expect(acceptedEnrolments.parentElement).toHaveTextContent(
      /Tapahtuma on täynnä/i
    );
  });

  await waitFor(() =>
    expect(acceptedEnrolments2.parentElement).not.toHaveClass('enrolmentFull')
  );
  await waitFor(() => {
    expect(acceptedEnrolments2.parentElement).not.toHaveTextContent(
      /Tapahtuma on täynnä/i
    );
  });
});

it('can cancel occurrences from occurrence table actions', async () => {
  let occurrenceRow: BoundFunctions<typeof queries>;
  let cancelDialog: BoundFunctions<typeof queries>;
  renderComponent({ mocks: [eventResponseWithOneCancelledOccurrence] });

  const toastSuccessSpy = vi.spyOn(toast, 'success');

  async function getOccurrenceRow() {
    expect(await screen.findByText(organisationName)).toBeInTheDocument();
    occurrenceRow = within((await screen.findAllByRole('row'))[1]);
  }

  async function clickOccurrenceDropdownCancelAction() {
    const actionsDropdown = await occurrenceRow.findByRole('button', {
      name: /valitse/i,
    });
    await userEvent.click(actionsDropdown);

    const cancelButton = await occurrenceRow.findByRole('menuitem', {
      name: /peruuta/i,
    });
    await userEvent.click(cancelButton);
  }

  async function checkThatCancelDialogRendersCorrectly() {
    // Cancel occurrence modal should be rendered
    const dialog = within(await screen.findByRole('dialog'));
    const expectedTextsToBeVisible = [
      'Peruuta tapahtuma-aika',
      'Oletko varma, että haluat peruuttaa valitun tapahtuma-ajan?',
      'Tähän tapahtuma-aikaan ilmoittautuneiden ilmoittautumiset perutaan ja heille lähetetään peruutusviesti',
    ] as const;
    for (const text of expectedTextsToBeVisible) {
      expect(await dialog.findByText(text)).toBeInTheDocument();
    }
    cancelDialog = dialog;
  }

  async function addMessageToTextarea() {
    // Add message to the occurrence cancelation
    const addMessageCheckbox = await cancelDialog.findByRole('checkbox', {
      name: 'Lisää viesti',
    });
    await userEvent.click(addMessageCheckbox);

    const textArea = await cancelDialog.findByRole('textbox', {
      name: 'Viesti osallistujille',
    });
    await userEvent.type(textArea, cancelReasonMessageText);
  }

  async function confirmOccurrenceCancelation() {
    const sendButton = await cancelDialog.findByRole('button', {
      name: 'Lähetä',
    });
    await userEvent.click(sendButton);

    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    );
    await waitFor(
      () => {
        expect(toastSuccessSpy).toHaveBeenCalled();
      },
      { timeout: 2_000 }
    );
  }

  async function checkThatOccurrenHasUpdated() {
    expect(await occurrenceRow.findByText('Peruttu')).toBeInTheDocument();

    const actionsButton = await occurrenceRow.findByRole('button', {
      name: 'Valitse',
    });
    await userEvent.click(actionsButton);

    expect(
      await occurrenceRow.findByRole('menuitem', { name: 'Ilmoittautuneet' })
    ).toBeInTheDocument();
    // Peruuta action should be no longer visible
    await waitFor(() => {
      expect(
        occurrenceRow.queryByRole('menuitem', { name: 'Peruuta' })
      ).not.toBeInTheDocument();
    });
  }

  await getOccurrenceRow();
  await clickOccurrenceDropdownCancelAction();
  await checkThatCancelDialogRendersCorrectly();
  await addMessageToTextarea();
  await confirmOccurrenceCancelation();
  await checkThatOccurrenHasUpdated();
});

it('can download ics file from actions dropdown', async () => {
  renderComponent({ mocks: getMocks() });

  expect(await screen.findByText(organisationName)).toBeInTheDocument();

  const occurrenceRow = within((await screen.findAllByRole('row'))[1]);
  const actionsDropdown = await occurrenceRow.findByRole('button', {
    name: /valitse/i,
  });
  await userEvent.click(actionsDropdown);

  const importToCalendarButton = await occurrenceRow.findByRole('menuitem', {
    name: /lataa kalenteriin/i,
  });
  await userEvent.click(importToCalendarButton);

  await waitFor(
    () => {
      expect(ICS.createEvent).toHaveBeenCalledTimes(1);
    },
    { timeout: 2_000 }
  );

  expect((ICS.createEvent as Mock).mock.calls[0]).toMatchInlineSnapshot(`
    [
      {
        "description": "Tapahtuman lyhyt kuvaus",
        "end": [
          2020,
          12,
          11,
          1,
          0,
        ],
        "location": "Sellon kirjasto, Test street, Test city",
        "productId": "City-of-Helsinki/palvelutarjotin-admin",
        "start": [
          2020,
          12,
          11,
          0,
          0,
        ],
        "startOutputType": "local",
        "title": "Tapahtuma123456",
      },
      [Function],
    ]
  `);
});
