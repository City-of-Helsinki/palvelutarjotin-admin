import { MockedResponse } from '@apollo/react-testing';
import { format } from 'date-fns';
import { advanceTo, clear } from 'jest-date-mock';
import React from 'react';

import {
  EventDocument,
  MyProfileDocument,
  OccurrenceNode,
  PlaceDocument,
  VenueDocument,
} from '../../../generated/graphql';
import * as graphqlFns from '../../../generated/graphql';
import {
  fakeEvent,
  fakeLocalizedObject,
  fakeLocation,
  fakeOccurrences,
  fakeOrganisations,
  fakePerson,
  fakePEvent,
  fakeVenue,
} from '../../../utils/mockDataUtils';
import {
  renderWithRoute,
  screen,
  userEvent,
  waitFor,
} from '../../../utils/testUtils';
import { ROUTES } from '../../app/routes/constants';
import CreateOccurrencePage from '../CreateOccurrencePage';

const eventName = 'Testitapahtuma';
const eventMock = fakeEvent({
  name: fakeLocalizedObject(eventName),
  startTime: '2020-07-13T05:51:05.761000Z',
});
const placeMock = fakeLocation({
  streetAddress: fakeLocalizedObject('Testikatu'),
});
const venueMock = fakeVenue();

advanceTo(new Date(2020, 7, 2));
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

const occurrenceFormData = {
  date: '13.08.2020',
  startsAt: '12:00',
  endsAt: '13:00',
  amountOfSeats: '30',
  minGroupSize: '10',
  maxGroupSize: '20',
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
            occurrences: fakeOccurrences(5, fakeOccurrenceOverrides),
          }),
        },
      },
    },
  },
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

afterAll(() => {
  clear();
});

test('renders coming occurrences table correctly', async () => {
  renderWithRoute(<CreateOccurrencePage />, {
    mocks: apolloMocks,
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
  const createOccurrenceSpy = jest.fn();
  jest
    .spyOn(graphqlFns, 'useAddOccurrenceMutation')
    .mockReturnValue([createOccurrenceSpy] as any);
  renderWithRoute(<CreateOccurrencePage />, {
    mocks: apolloMocks,
    routes: [ROUTES.CREATE_OCCURRENCE.replace(':id', eventMock.id)],
    path: ROUTES.CREATE_OCCURRENCE,
  });

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  expect(
    screen.queryByRole('heading', { name: eventName })
  ).toBeInTheDocument();

  // Location and venue data renders
  await waitFor(() => {
    expect(screen.queryByText('TestiVenue')).toBeInTheDocument();
  });
  expect(screen.queryByText('Testikatu')).toBeInTheDocument();

  const dateInput = screen.getByLabelText('Päivämäärä');
  // click first so focus is kept
  userEvent.click(dateInput);
  userEvent.type(dateInput, '13.08.2020');

  const startsAtInput = screen.getByLabelText('Alkaa klo', {
    selector: 'input',
  });
  userEvent.type(startsAtInput, occurrenceFormData.startsAt);
  userEvent.click(
    screen.getByRole('option', {
      name: occurrenceFormData.startsAt,
      hidden: true,
    })
  );

  const endsAtInput = screen.getByLabelText('Loppuu klo', {
    selector: 'input',
  });
  userEvent.type(endsAtInput, occurrenceFormData.endsAt);
  userEvent.click(
    screen.getByRole('option', {
      name: occurrenceFormData.endsAt,
      hidden: true,
    })
  );

  // select languages
  const languageSelectorButton = screen.getByLabelText('Tapahtuman kieli', {
    selector: 'button',
  });
  userEvent.click(languageSelectorButton);
  userEvent.click(
    screen.getByRole('option', { name: 'Englanti', hidden: true })
  );
  userEvent.click(screen.getByRole('option', { name: 'Suomi', hidden: true }));
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

  userEvent.click(
    screen.getByRole('button', { name: 'Tallenna', hidden: true })
  );

  await waitFor(() => {
    expect(screen.queryByText('Tämä kenttä on pakollinen')).toBeInTheDocument();
  });

  const maxGroupSizeInput = screen.getByLabelText('Ryhmäkoko max');
  userEvent.type(maxGroupSizeInput, occurrenceFormData.maxGroupSize);

  await waitFor(() => {
    expect(
      screen.queryByText('Tämä kenttä on pakollinen')
    ).not.toBeInTheDocument();
  });

  userEvent.click(
    screen.getByRole('button', { name: 'Tallenna', hidden: true })
  );

  await waitFor(() => {
    expect(createOccurrenceSpy).toHaveBeenCalledWith({
      variables: {
        input: {
          amountOfSeats: 30,
          autoAcceptance: true,
          endTime: new Date('2020-08-13T10:00:00.000Z'),
          languages: [{ id: 'EN' }, { id: 'FI' }],
          maxGroupSize: 20,
          minGroupSize: 10,
          pEventId: 'UGFsdmVsdXRhcmpvdGluRXZlbnROb2RlOjcw',
          placeId: '',
          startTime: new Date('2020-08-13T09:00:00.000Z'),
        },
      },
    });
  });
});