import { MockedResponse } from '@apollo/react-testing';
import { format } from 'date-fns';
import { advanceTo, clear } from 'jest-date-mock';
import * as React from 'react';

import * as graphql from '../../../generated/graphql';
import {
  fakeEvent,
  fakeLanguages,
  fakeLocalizedObject,
  fakeOccurrence,
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
  within,
} from '../../../utils/testUtils';
import { ROUTES } from '../../app/routes/constants';
import EditOccurrencePage from '../EditOccurrencePage';

const eventName = 'Testitapahtuma';
const eventMock = fakeEvent({
  name: fakeLocalizedObject(eventName),
  startTime: '2020-07-13T05:51:05.761000Z',
});
const placeMock = fakePlace({
  streetAddress: fakeLocalizedObject('Testikatu'),
});
const venueMock = fakeVenue({ hasClothingStorage: true });
const occurrenceId = 'T2NjdXJyZW5jZU5vZGU6MTE5';

advanceTo(new Date(2020, 7, 2));

const occurrence = {
  amountOfSeats: 30,
  maxGroupSize: 20,
  minGroupSize: 10,

  startTime: '2020-08-03T09:00:00+00:00',
  endTime: '2020-08-03T09:30:00+00:00',
  languages: fakeLanguages([
    { id: 'en', name: 'English' },
    { id: 'fi', name: 'Finnish' },
  ]),
};

const fakeOccurrenceOverrides: Partial<graphql.OccurrenceNode>[] = [
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
      query: graphql.MyProfileDocument,
      variables: {},
    },
    result: {
      data: { myProfile: fakePerson({ organisations: fakeOrganisations() }) },
    },
  },
  {
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
  },
  {
    request: {
      query: graphql.OccurrenceDocument,
      variables: {
        id: occurrenceId,
      },
    },
    result: {
      data: {
        occurrence: fakeOccurrence(occurrence),
      },
    },
  },
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

afterAll(() => {
  clear();
});

test('renders coming occurrences correctly', async () => {
  renderWithRoute(<EditOccurrencePage />, {
    mocks: apolloMocks,
    routes: [`/events/${eventMock.id}/occurrences/${occurrenceId}/edit`],
    path: ROUTES.EDIT_OCCURRENCE,
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

test('initializes edit occurrence form correctly', async () => {
  const editOccurrenceSpy = jest.fn();
  jest
    .spyOn(graphql, 'useEditOccurrenceMutation')
    .mockReturnValue([editOccurrenceSpy] as any);
  renderWithRoute(<EditOccurrencePage />, {
    mocks: apolloMocks,
    routes: [`/events/${eventMock.id}/occurrences/${occurrenceId}/edit`],
    path: ROUTES.EDIT_OCCURRENCE,
  });

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  expect(
    screen.queryByRole('heading', { name: eventName })
  ).toBeInTheDocument();
  expect(screen.queryByText('Muokkaa tapahtuma-aikaa')).toBeInTheDocument();

  expect(screen.getByLabelText('Päivämäärä')).toHaveValue('03.08.2020');
  expect(screen.getByLabelText('Alkaa klo', { selector: 'input' })).toHaveValue(
    '12:00'
  );
  expect(
    screen.getByLabelText('Loppuu klo', { selector: 'input' })
  ).toHaveValue('12:30');
  expect(screen.getByLabelText('Paikkoja yhteensä')).toHaveValue(30);
  expect(screen.getByLabelText('Ryhmäkoko min')).toHaveValue(10);
  expect(screen.getByLabelText('Ryhmäkoko max')).toHaveValue(20);

  const dropdown = within(screen.getByTestId('language-dropdown'));
  expect(dropdown.queryByText('Suomi')).toBeInTheDocument();
  expect(dropdown.queryByText('Englanti')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.queryByText('Testikatu')).toBeInTheDocument();
    expect(screen.queryByText('Vaatesäilytys')).toBeInTheDocument();
  });

  userEvent.type(screen.getByLabelText('Paikkoja yhteensä'), '40');
  userEvent.type(screen.getByLabelText('Ryhmäkoko max'), '30');

  userEvent.click(
    screen.getByRole('button', { name: 'Tallenna ja siirry julkaisuun' })
  );

  await waitFor(() => {
    expect(editOccurrenceSpy).toHaveBeenCalledWith({
      variables: {
        input: {
          amountOfSeats: 3040,
          seatType: 'CHILDREN_COUNT',
          startTime: new Date('2020-08-03T09:00:00.000Z'),
          endTime: new Date('2020-08-03T09:30:00.000Z'),
          id: occurrenceId,
          languages: [{ id: 'en' }, { id: 'fi' }],
          maxGroupSize: 2030,
          minGroupSize: 10,
          pEventId: 'UGFsdmVsdXRhcmpvdGluRXZlbnROb2RlOjcw',
          placeId: '',
        },
      },
    });
  });
});
