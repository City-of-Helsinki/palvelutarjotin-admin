import { MockedResponse } from '@apollo/react-testing';
import { addDays, format, formatISO } from 'date-fns';
import { advanceTo, clear } from 'jest-date-mock';
import range from 'lodash/range';
import * as React from 'react';

import { DATE_FORMAT } from '../../../common/components/datepicker/contants';
import {
  EventDocument,
  Language,
  MyProfileDocument,
  OccurrenceNode,
  PlaceDocument,
  VenueDocument,
} from '../../../generated/graphql';
import * as graphql from '../../../generated/graphql';
import {
  fakeEvent,
  fakeLocalizedObject,
  fakeOccurrences,
  fakeOrganisations,
  fakePerson,
  fakePEvent,
  fakePlace,
  fakeVenue,
} from '../../../utils/mockDataUtils';
import {
  fireEvent,
  renderWithRoute,
  screen,
  userEvent,
  waitFor,
} from '../../../utils/testUtils';
import apolloClient from '../../app/apollo/apolloClient';
import { ROUTES } from '../../app/routes/constants';
import CreateOccurrencePage from '../CreateOccurrencePage';

const eventName = 'Testitapahtuma';
const eventMock = fakeEvent({
  name: fakeLocalizedObject(eventName),
  startTime: '2020-07-13T05:51:05.761000Z',
});

const placeMock = fakePlace({
  streetAddress: fakeLocalizedObject('Testikatu'),
});
const venueMock = fakeVenue();

const venueResponse = {
  data: {
    venue: fakeVenue({
      outdoorActivity: true,
      hasClothingStorage: true,
      hasSnackEatingPlace: true,
      hasToiletNearby: true,
      hasAreaForGroupWork: true,
      hasIndoorPlayingArea: true,
      hasOutdoorPlayingArea: true,
      translations: [
        {
          languageCode: Language.Fi,
          description: 'Test venue description',
          __typename: 'VenueTranslationType',
        },
      ],
    }),
  },
};

jest.spyOn(apolloClient, 'query').mockResolvedValue(venueResponse as any);

const initializeMocks = (
  fromDate = new Date(2020, 7, 2),
  occurrences = 5,
  enrolmentStart = null,
  enrolmentEndDays = 3
) => {
  const pEventOverrides = {
    enrolmentStart: enrolmentStart || fromDate,
    enrolmentEndDays,
  };

  const occurrenceFormData = {
    date: '13.08.2020',
    startsAt: '12:00',
    endsAt: '13:00',
    amountOfSeats: '30',
    minGroupSize: '10',
    maxGroupSize: '20',
  };
  const fakeOccurrenceOverrides: Partial<OccurrenceNode>[] = range(
    1,
    occurrences
  ).map((occurrence) => ({
    startTime: formatISO(addDays(fromDate, occurrence)),
  }));

  const eventMockedResponse: MockedResponse = {
    request: {
      query: EventDocument,
      variables: {
        id: eventMock.id,
        include: ['location', 'keywords', 'audience'],
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
            ...pEventOverrides,
          }),
        },
      },
    },
  };
  const apolloMocks: MockedResponse[] = [
    {
      request: {
        query: MyProfileDocument,
        variables: {},
      },
      result: {
        data: { myProfile: fakePerson({ organisations: fakeOrganisations() }) },
      },
    },
    // refetch() event data requires second mock
    eventMockedResponse,
    eventMockedResponse,
    {
      request: {
        query: PlaceDocument,
        variables: {
          id: eventMock.location.id,
        },
      },
      result: {
        data: {
          place: {
            ...placeMock,
          },
        },
      },
    },
    {
      request: {
        query: VenueDocument,
        variables: {
          id: eventMock.location.id,
        },
      },
      result: {
        data: {
          venue: venueMock,
        },
      },
    },
  ];
  return { fakeOccurrenceOverrides, occurrenceFormData, apolloMocks };
};

afterAll(() => {
  clear();
});

afterEach(() => {
  jest.restoreAllMocks();
});

const initializeMocksAndRenderPage = (
  renderOptions,
  {
    fromDate = new Date(2020, 7, 2),
    enrolmentStart = fromDate,
    enrolmentEndDays = 0,
    occurrences = 5,
  } = {
    fromDate: new Date(2020, 7, 2),
    enrolmentStart: new Date(2020, 7, 2),
    enrolmentEndDays: 0,
    occurrences: 5,
  }
) => {
  const {
    fakeOccurrenceOverrides,
    occurrenceFormData,
    apolloMocks,
  } = initializeMocks(fromDate, occurrences, enrolmentStart, enrolmentEndDays);
  renderWithRoute(<CreateOccurrencePage />, {
    mocks: apolloMocks,
    ...renderOptions,
  });
  return { fakeOccurrenceOverrides, occurrenceFormData };
};

test.skip('renders occurrences table correctly', async () => {
  const { fakeOccurrenceOverrides } = initializeMocksAndRenderPage({
    routes: [ROUTES.CREATE_OCCURRENCE.replace(':id', eventMock.id)],
    path: ROUTES.CREATE_OCCURRENCE,
  });

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  expect(screen.getAllByRole('row')).toHaveLength(
    fakeOccurrenceOverrides.length + 1
  );

  // check that all the occurrences are displayed with right dates
  fakeOccurrenceOverrides.forEach((o) => {
    const formattedTime = format(new Date(o.startTime), 'dd.MM.yyyy');
    expect(screen.queryByText(formattedTime)).toBeInTheDocument();
  });
});

test.skip('can create new occurrence with form', async () => {
  // query is used for venue
  jest.spyOn(apolloClient, 'query').mockImplementation(({ query }): any => {
    if (query === graphql.VenueDocument) {
      return {
        data: {
          venue: fakeVenue(),
        },
      };
    }
  });
  /// mutate is used for creating new venue (errors without mock)
  jest.spyOn(apolloClient, 'mutate').mockResolvedValue({});

  const createOccurrenceSpy = jest.fn();
  jest
    .spyOn(graphql, 'useAddOccurrenceMutation')
    .mockReturnValue([createOccurrenceSpy] as any);

  const { occurrenceFormData } = initializeMocksAndRenderPage({
    routes: [ROUTES.CREATE_OCCURRENCE.replace(':id', eventMock.id)],
    path: ROUTES.CREATE_OCCURRENCE,
  });

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  expect(
    screen.queryByRole('heading', { name: eventMock.name.fi })
  ).toBeInTheDocument();

  // Location and venue data renders
  await screen.findByText('TestiVenue');
  expect(screen.queryByText('Testikatu')).toBeInTheDocument();

  const dateInput = screen.getByLabelText('Päivämäärä');
  // click first so focus is kept
  userEvent.click(dateInput);
  userEvent.type(dateInput, occurrenceFormData.date);

  const startsAtInput = screen.getByLabelText('Alkaa klo', {
    selector: 'input',
  });
  userEvent.type(startsAtInput, occurrenceFormData.startsAt);
  userEvent.click(
    screen.getByRole('option', {
      name: occurrenceFormData.startsAt,
    })
  );

  const endsAtInput = screen.getByLabelText('Loppuu klo', {
    selector: 'input',
  });
  userEvent.type(endsAtInput, occurrenceFormData.endsAt);
  userEvent.click(
    screen.getByRole('option', {
      name: occurrenceFormData.endsAt,
    })
  );

  // select languages
  const languageSelectorButton = screen.getByLabelText(/Tapahtuman kieli/i, {
    selector: 'button',
  });
  userEvent.click(languageSelectorButton);
  userEvent.click(screen.getByText(/englanti/i));
  userEvent.click(screen.getByText(/suomi/i));

  userEvent.click(
    screen.getByLabelText('Tapahtuman kieli', { selector: 'button' })
  );

  const seatsInTotalInput = screen.getByLabelText('Paikkoja yhteensä');
  userEvent.type(seatsInTotalInput, occurrenceFormData.amountOfSeats);

  const minGroupSizeInput = screen.getByLabelText('Ryhmäkoko min');
  userEvent.type(minGroupSizeInput, occurrenceFormData.minGroupSize);

  expect(
    screen.queryByText('Tämä kenttä on pakollinen')
  ).not.toBeInTheDocument();

  const maxGroupSizeInput = screen.getByLabelText('Ryhmäkoko max');
  userEvent.type(maxGroupSizeInput, occurrenceFormData.maxGroupSize);

  const oneGroupFillsCheckbox = screen.getByRole('checkbox', {
    name: /yksi ryhmä täyttää tapahtuman/i,
  });
  expect(oneGroupFillsCheckbox).not.toBeChecked();
  userEvent.click(oneGroupFillsCheckbox);
  expect(oneGroupFillsCheckbox).toBeChecked();

  await waitFor(() => {
    expect(
      screen.queryByText('Tämä kenttä on pakollinen')
    ).not.toBeInTheDocument();
  });

  userEvent.click(
    screen.getByRole('button', { name: 'Tallenna ja lisää uusi' })
  );

  await waitFor(() => {
    expect(createOccurrenceSpy).toHaveBeenCalledWith({
      variables: {
        input: {
          amountOfSeats: 1,
          endTime: new Date('2020-08-13T10:00:00.000Z'),
          languages: [{ id: 'en' }, { id: 'fi' }],
          maxGroupSize: 20,
          minGroupSize: 10,
          pEventId: 'UGFsdmVsdXRhcmpvdGluRXZlbnROb2RlOjcw',
          placeId: '',
          seatType: 'ENROLMENT_COUNT',
          startTime: new Date('2020-08-13T09:00:00.000Z'),
        },
      },
    });
  });

  await waitFor(() => {
    expect(
      screen.getByLabelText('Alkaa klo', {
        selector: 'input',
      })
    ).toHaveValue('');
  });

  // amount of seats should not reset after saving and creating new occurrence
  // 1 because one group fills was selected
  expect(screen.getByLabelText('Paikkoja yhteensä')).toHaveValue(1);
});

describe('occurrence form tests', () => {
  afterAll(() => {
    clear();
  });

  test('when only one group checkbox is checked, amount of seats should be disabled', async () => {
    initializeMocksAndRenderPage({
      routes: [ROUTES.CREATE_OCCURRENCE.replace(':id', eventMock.id)],
      path: ROUTES.CREATE_OCCURRENCE,
    });

    const seatsCountInput = await screen.findByLabelText('Paikkoja');
    const oneGroupFillsCheckbox = screen.getByRole('checkbox', {
      name: /yksi ryhmä täyttää tapahtuman/i,
    });
    userEvent.click(oneGroupFillsCheckbox);

    await waitFor(() => {
      expect(seatsCountInput).toHaveValue(1);
    });
    expect(seatsCountInput).toBeDisabled();
  });

  test('occurrence date cannot be before enrolments ending day', async () => {
    const currentDate = new Date('2008-08-01');
    advanceTo('2008-07-01');

    initializeMocksAndRenderPage(
      {
        routes: [ROUTES.CREATE_OCCURRENCE.replace(':id', eventMock.id)],
        path: ROUTES.CREATE_OCCURRENCE,
      },
      {
        fromDate: currentDate,
        enrolmentStart: currentDate,
        enrolmentEndDays: 2,
      }
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    expect(
      screen.queryByText('Päivämäärän on oltava aikaisintaan 03.08.2008')
    ).not.toBeInTheDocument();

    const dateInput = await screen.findByRole('textbox', { name: 'Alkaa' });
    userEvent.click(dateInput);
    userEvent.type(dateInput, format(currentDate, DATE_FORMAT));
    fireEvent.blur(dateInput);
    await waitFor(() => {
      expect(dateInput).toBeInvalid();
    });
    expect(dateInput).toHaveAttribute('aria-describedby');
    expect(
      screen.queryByText('Päivämäärän on oltava aikaisintaan 03.08.2008')
    ).toBeInTheDocument();
  });

  it('yesterday is not valid event start day', async () => {
    // TODO: mock VenueDataFields apolloCLient.query to avoid errors.
    const currentDate = new Date('2008-08-01');
    advanceTo(currentDate);
    initializeMocksAndRenderPage(
      {
        routes: [ROUTES.CREATE_OCCURRENCE.replace(':id', eventMock.id)],
        path: ROUTES.CREATE_OCCURRENCE,
      },
      {
        fromDate: currentDate,
        enrolmentStart: currentDate,
        enrolmentEndDays: 2,
      }
    );

    expect(screen.queryByTestId('loading-spinner')).toBeInTheDocument();

    const dateInput = await screen.findByRole('textbox', { name: 'Alkaa' });
    userEvent.click(dateInput);
    userEvent.type(dateInput, format(addDays(currentDate, -1), DATE_FORMAT));
    fireEvent.blur(dateInput);
    await waitFor(() => {
      expect(dateInput).toBeInvalid();
    });
    expect(dateInput).toHaveAttribute('aria-describedby');
    expect(
      screen.queryByText('Päivämäärä ei voi olla menneisyydessä')
    ).toBeInTheDocument();
  });

  it.skip('today is valid event start day', async () => {
    const currentDate = new Date(2020, 7, 2);
    advanceTo(currentDate);
    initializeMocksAndRenderPage(
      {
        routes: [ROUTES.CREATE_OCCURRENCE.replace(':id', eventMock.id)],
        path: ROUTES.CREATE_OCCURRENCE,
      },
      {
        fromDate: currentDate,
        enrolmentStart: currentDate,
        enrolmentEndDays: 2,
      }
    );

    expect(screen.queryByTestId('loading-spinner')).toBeInTheDocument();

    const dateInput = await screen.findByRole('textbox', {
      name: 'Alkaa',
    });
    userEvent.click(dateInput);
    userEvent.type(dateInput, format(currentDate, DATE_FORMAT));
    fireEvent.blur(dateInput);
    await waitFor(() => {
      expect(dateInput).toBeValid();
    });
    expect(dateInput).not.toHaveAttribute('aria-describedby');
    expect(
      screen.queryByText('Päivämäärä ei voi olla menneisyydessä')
    ).not.toBeInTheDocument();
  });
});
// test('virtual event checkbox works correctly', async () => {
//   const { history } = render(<EditEventPage />, { mocks: editMocks });

//   const goBack = jest.spyOn(history, 'goBack');

//   await waitFor(() => {
//     expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
//   });

//   await screen.findByText(defaultOrganizationName);

//   expect(screen.getAllByText(placeName)).toHaveLength(2);

//   userEvent.click(
//     screen.getByRole('checkbox', {
//       name: /tapahtuma järjestetään virtuaalisesti/i,
//     })
//   );

//   // Location shouldn't be shown after virtual event checkbox has been clicked
//   await waitFor(() => {
//     expect(screen.queryByText(placeName)).not.toBeInTheDocument();
//   });

//   userEvent.click(
//     screen.getByRole('button', {
//       name: 'Tallenna',
//     })
//   );

//   await waitFor(() => {
//     expect(goBack).toHaveBeenCalled();
//   });
// });

// test('virtual event checkbox sets internet location correctly', async () => {
//   advanceTo(new Date(2020, 7, 8));
//   const pushMock = mockUseHistory();
//   const { container } = render(<CreateEventPage />, { mocks });

//   Modal.setAppElement(container);

//   await fillForm(defaultFormData);

//   const defaultLocationInput = screen.getByRole('textbox', {
//     name: /oletustapahtumapaikka/i,
//   });
//   expect(defaultLocationInput).not.toBeDisabled();

//   const virtualEventCheckbox = screen.getByRole('checkbox', {
//     name: /tapahtuma järjestetään virtuaalisesti/i,
//   });
//   userEvent.click(virtualEventCheckbox);

//   expect(defaultLocationInput).toBeDisabled();

//   userEvent.click(
//     screen.getByRole('button', {
//       name: 'Tallenna ja siirry tapahtuma-aikoihin',
//     })
//   );

//   const parsedOccurrenceDate = parseDate(
//     defaultFormData.firstOccurrenceDate,
//     'dd.MM.yyyy',
//     new Date()
//   );

//   const encodedUrlDate = encodeURIComponent(parsedOccurrenceDate.toISOString());
//   await waitFor(() => {
//     expect(pushMock).toHaveBeenCalledWith({
//       pathname: '/fi/events/palvelutarjotin:afz52lpyta/occurrences/createfirst',
//       search: `date=${encodedUrlDate}&startsAt=12%3A00&endsAt=13%3A00`,
//     });
//   });
// });

// expect(screen.getByLabelText(/Tapahtumapaikan kuvaus/i)).toHaveTextContent(
//   venueDescription
// );

// expect(screen.getAllByText(placeName)).toHaveLength(2);

// expect(screen.getByLabelText('Ulkovaatesäilytys')).toBeChecked();
// expect(screen.getByLabelText('Eväidensyöntipaikka')).toBeChecked();

// const dateInput = screen.getByLabelText(/Päivämäärä/i);
// // click first so focus is kept
// userEvent.click(dateInput);
// userEvent.type(dateInput, eventFormData.firstOccurrenceDate);

// const startsAtInput = screen.getByLabelText(/Alkaa klo/i, {
//   selector: 'input',
// });
// userEvent.type(startsAtInput, eventFormData.startTime);
// userEvent.click(
//   screen.getByRole('option', {
//     name: eventFormData.startTime,
//   })
// );

// const endsAtInput = screen.getByLabelText(/Loppuu klo/i, {
//   selector: 'input',
// });
// userEvent.type(endsAtInput, eventFormData.endTime);
// userEvent.click(
//   screen.getByRole('option', {
//     name: eventFormData.endTime,
//   })
// );

// const enrolmentStartsAtInput = screen.getByLabelText(
//   /ilmoittautuminen alkaa/i
// );
// userEvent.click(enrolmentStartsAtInput);
// userEvent.type(enrolmentStartsAtInput, eventFormData.enrolmentStart);
// userEvent.type(
//   screen.getByLabelText(/ilmoittautuminen sulkeutuu/i),
//   eventFormData.enrolmentEndDays
// );

// const neededOccurrencesInput = screen.getByLabelText(
//   /tarvittavat käyntikerrat/i
// );

// userEvent.clear(neededOccurrencesInput);
// userEvent.type(neededOccurrencesInput, eventFormData.neededOccurrences);

// expect(screen.getByTestId('event-form')).toHaveFormValues({
//   enrolmentStart: eventFormData.enrolmentStart,
//   enrolmentEndDays: Number(eventFormData.enrolmentEndDays),
//   neededOccurrences: Number(eventFormData.neededOccurrences),
// });

// const placeInput = screen.getByLabelText(/Oletustapahtumapaikka/);
// userEvent.click(placeInput);
// userEvent.type(placeInput, 'Sellon');

// const place = await screen.findByText(/Sellon kirjasto/i);
// userEvent.click(place);

// await waitFor(() =>
//   expect(screen.getByLabelText('Tapahtumapaikan kuvaus')).toHaveTextContent(
//     venueDescription
//   )
// );

// expect(screen.getByLabelText('Ulkovaatesäilytys')).toBeChecked();
// expect(screen.getByLabelText('Eväidensyöntipaikka')).toBeChecked();

// // Venue mutation mock
// jest.spyOn(apolloClient, 'mutate').mockResolvedValue({});
