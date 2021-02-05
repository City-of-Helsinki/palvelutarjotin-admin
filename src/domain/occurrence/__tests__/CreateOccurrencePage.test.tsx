import { MockedResponse } from '@apollo/react-testing';
import { addDays, format, formatISO } from 'date-fns';
import { advanceTo, clear } from 'jest-date-mock';
import range from 'lodash/range';
import * as React from 'react';

import * as graphql from '../../../generated/graphql';
import { runCommonEventFormTests } from '../../../utils/CommonEventFormTests';
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

const initializeMocks = (fromDate = new Date(2020, 7, 2), occurrences = 5) => {
  advanceTo(fromDate);

  const occurrenceFormData = {
    date: '13.08.2020',
    startsAt: '12:00',
    endsAt: '13:00',
    amountOfSeats: '30',
    minGroupSize: '10',
    maxGroupSize: '20',
  };
  const fakeOccurrenceOverrides: Partial<graphql.OccurrenceNode>[] = range(
    1,
    occurrences
  ).map((occurrence) => ({
    startTime: formatISO(addDays(fromDate, occurrence)),
  }));

  const eventMockedResponse: MockedResponse = {
    request: {
      query: graphql.EventDocument,
      variables: {
        id: eventMock.id,
        include: ['keywords', 'location'],
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
  };
  const apolloMocks: MockedResponse[] = [
    {
      request: {
        query: graphql.MyProfileDocument,
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
        query: graphql.PlaceDocument,
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
        query: graphql.VenueDocument,
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
  fromDate = new Date(2020, 7, 2),
  occurrences = 5
) => {
  const {
    fakeOccurrenceOverrides,
    occurrenceFormData,
    apolloMocks,
  } = initializeMocks(fromDate, occurrences);
  renderWithRoute(<CreateOccurrencePage />, {
    mocks: apolloMocks,
    ...renderOptions,
  });
  return { fakeOccurrenceOverrides, occurrenceFormData };
};

test('renders coming occurrences table correctly', async () => {
  const { fakeOccurrenceOverrides } = initializeMocksAndRenderPage({
    routes: [ROUTES.CREATE_OCCURRENCE.replace(':id', eventMock.id)],
    path: ROUTES.CREATE_OCCURRENCE,
  });

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  expect(
    screen.queryByText(
      `Tulevat tapahtuma-ajat ${fakeOccurrenceOverrides.length} kpl`
    )
  );

  expect(screen.getAllByRole('row')).toHaveLength(
    fakeOccurrenceOverrides.length + 1
  );

  // check that all the occurrences are displayed with right dates
  fakeOccurrenceOverrides.forEach((o) => {
    const formattedTime = format(new Date(o.startTime), 'dd.MM.yyyy');
    expect(screen.queryByText(formattedTime)).toBeInTheDocument();
  });
});

test('can create new occurrence with form', async () => {
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
  await waitFor(() => {
    expect(screen.queryByText('TestiVenue')).toBeInTheDocument();
  });
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
          languages: [{ id: 'EN' }, { id: 'FI' }],
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

test('initializes pre-filled occurrence values from URL', async () => {
  const queryString =
    '?date=2020-10-25T22%3A00%3A00.000Z&startsAt=12%3A00&endsAt=13%3A00';
  initializeMocksAndRenderPage({
    routes: [
      '/fi' +
        ROUTES.CREATE_FIRST_OCCURRENCE.replace(':id', eventMock.id) +
        queryString,
    ],
    path: '/fi' + ROUTES.CREATE_FIRST_OCCURRENCE,
  });

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  expect(screen.getByRole('textbox', { name: /päivämäärä/i })).toHaveValue(
    '26.10.2020'
  );
  expect(screen.getByRole('textbox', { name: /alkaa klo/i })).toHaveValue(
    '12:00'
  );
  expect(screen.getByRole('textbox', { name: /loppuu klo/i })).toHaveValue(
    '13:00'
  );
});

test('does not initializes values from URL if they are invalid', async () => {
  const queryString =
    '?date=2020-101-25T22%3A00%3A00.000Z&startsAt=12%3A000&endsAt=13%3A00';
  initializeMocksAndRenderPage({
    routes: [
      ROUTES.CREATE_OCCURRENCE.replace(':id', eventMock.id) + queryString,
    ],
    path: ROUTES.CREATE_OCCURRENCE,
  });

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  expect(screen.getByRole('textbox', { name: /päivämäärä/i })).toHaveValue('');
  expect(screen.getByRole('textbox', { name: /alkaa klo/i })).toHaveValue('');
  expect(screen.getByRole('textbox', { name: /loppuu klo/i })).toHaveValue('');
});

describe('common event form tests', () => {
  runCommonEventFormTests((currentDate: Date) =>
    initializeMocksAndRenderPage(
      {
        routes: [ROUTES.CREATE_OCCURRENCE.replace(':id', eventMock.id)],
        path: ROUTES.CREATE_OCCURRENCE,
      },
      currentDate,
      1
    )
  );
});

test('when only one group checkbox is checked, amount of seats should be disabled', async () => {
  const { apolloMocks } = initializeMocks();
  renderWithRoute(<CreateOccurrencePage />, {
    mocks: apolloMocks,
    routes: [ROUTES.CREATE_OCCURRENCE.replace(':id', eventMock.id)],
    path: ROUTES.CREATE_OCCURRENCE,
  });

  const seatsCountInput = await screen.findByLabelText('Paikkoja yhteensä');
  const oneGroupFillsCheckbox = screen.getByRole('checkbox', {
    name: /yksi ryhmä täyttää tapahtuman/i,
  });
  userEvent.click(oneGroupFillsCheckbox);

  await waitFor(() => {
    expect(seatsCountInput).toHaveValue(1);
  });
  expect(seatsCountInput).toBeDisabled();
});
