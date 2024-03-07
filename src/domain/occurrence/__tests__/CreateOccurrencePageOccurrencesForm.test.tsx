import { MockedResponse } from '@apollo/client/testing';
import { addDays, format, parse as parseDate } from 'date-fns';
import * as React from 'react';

import { OccurrenceNode } from '../../../generated/graphql';
import * as graphql from '../../../generated/graphql';
import {
  baseApolloMocks,
  eventId,
  fillAndSubmitOccurrenceForm,
  getAddOccurrenceMockResponse,
  getDefaultOccurrenceValues,
  getDeleteOccurrenceMockResponse,
  getEventMockedResponse,
  getFormElement,
  getOccurrenceFormElement,
  placeId,
  placeName,
  selectLocation,
} from '../../../test/CreateOccurrencePageTestUtils';
import { fakeLanguages, fakeOccurrences } from '../../../utils/mockDataUtils';
import {
  actWait,
  configure,
  fireEvent,
  renderWithRoute,
  screen,
  userEvent,
  waitFor,
  within,
} from '../../../utils/testUtils';
import { DATE_FORMAT, DATETIME_FORMAT } from '../../../utils/time/format';
import { ROUTES } from '../../app/routes/constants';
import CreateOccurrencePage from '../CreateOccurrencePage';
import { occurrencesTableTestId } from '../occurrencesFormPart/OccurrencesFormPart';

configure({ defaultHidden: true });

afterAll(() => {
  vi.useRealTimers();
});

afterEach(() => {
  vi.restoreAllMocks();
});

const mockOccurrences = fakeOccurrences(
  5,
  Array.from({ length: 5 }).map((_) => ({ placeId }))
);

const renderComponent = ({ mocks = [] }: { mocks?: MockedResponse[] } = {}) => {
  return renderWithRoute(<CreateOccurrencePage />, {
    mocks: [...baseApolloMocks, ...mocks],
    routes: [ROUTES.CREATE_OCCURRENCE.replace(':id', eventId)],
    path: ROUTES.CREATE_OCCURRENCE,
  });
};

vi.setSystemTime('2021-04-02');

describe('occurrences form', () => {
  test('location input is prefilled when default location has been selected', async () => {
    const eventWithoutEnrolmentAndLocationInfoMockedResponse =
      getEventMockedResponse({
        occurrences: fakeOccurrences(1, [{ placeId: '' }]),
      });
    renderComponent({
      mocks: [
        eventWithoutEnrolmentAndLocationInfoMockedResponse,
        eventWithoutEnrolmentAndLocationInfoMockedResponse,
      ],
    });

    // Wait for form to have been initialized
    await screen.findByTestId('time-and-location-form');
    await selectLocation();

    const occurrenceLocationInput = getOccurrenceFormElement('location')!;

    await waitFor(() => {
      expect(occurrenceLocationInput.parentElement).toHaveTextContent(
        'Sellon kirjasto'
      );
    });
    await actWait();
  });

  test('location input and orderable event checkbox are disabled when virtual event checkbox is checked', async () => {
    renderComponent({
      mocks: [getEventMockedResponse({ occurrences: mockOccurrences })],
    });

    // Wait for form to have been initialized
    await screen.findByTestId('time-and-location-form');

    const virtualEventCheckbox = getFormElement('virtualEvent');
    await userEvent.click(virtualEventCheckbox);
    expect(virtualEventCheckbox).toBeChecked();

    const orderableEventCheckbox = getFormElement('orderableEvent');
    expect(orderableEventCheckbox).toBeDisabled();

    const placeInput = getFormElement('location');
    expect(placeInput).toBeDisabled();

    const occurrenceLocationInput = getOccurrenceFormElement('location');
    expect(occurrenceLocationInput).toBeDisabled();

    await userEvent.click(virtualEventCheckbox);

    // await to get rid of act warnings
    await waitFor(() => {
      expect(virtualEventCheckbox).not.toBeChecked();
    });
    expect(occurrenceLocationInput).toBeEnabled();
    expect(placeInput).toBeEnabled();
    await actWait();
  });

  test('location input and virtual event checkbox are disabled when orderable event checkbox is checked', async () => {
    renderComponent({
      mocks: [getEventMockedResponse({ occurrences: mockOccurrences })],
    });

    // Wait for form to have been initialized
    await screen.findByTestId('time-and-location-form');

    const orderableEventCheckbox = getFormElement('orderableEvent');
    await userEvent.click(orderableEventCheckbox);

    expect(orderableEventCheckbox).toBeChecked();

    const virtualEventCheckbox = getFormElement('virtualEvent');
    expect(virtualEventCheckbox).toBeDisabled();

    const placeInput = getFormElement('location');
    expect(placeInput).toBeDisabled();

    const occurrenceLocationInput = getOccurrenceFormElement('location');
    expect(occurrenceLocationInput).toBeDisabled();

    await userEvent.click(orderableEventCheckbox);

    // await to get rid of act warnings
    await waitFor(() => {
      expect(orderableEventCheckbox).not.toBeChecked();
    });
    expect(occurrenceLocationInput).toBeEnabled();
    expect(placeInput).toBeEnabled();
    await actWait();
  });

  test('seats input is disabled and has value 1 when one group fills checkbox is checked', async () => {
    renderComponent({
      mocks: [getEventMockedResponse({ occurrences: mockOccurrences })],
    });

    // Wait for form to have been initialized
    await screen.findByTestId('time-and-location-form');

    const oneGroupFillsCheckbox = getOccurrenceFormElement('oneGroupFills')!;
    await userEvent.click(oneGroupFillsCheckbox);

    await waitFor(() => {
      expect(oneGroupFillsCheckbox).toBeChecked();
    });

    const seatsInput = getOccurrenceFormElement('seats');
    expect(seatsInput).toBeDisabled();
    expect(seatsInput).toHaveValue(1);

    await userEvent.click(oneGroupFillsCheckbox);

    await waitFor(() => {
      expect(oneGroupFillsCheckbox).not.toBeChecked();
    });
    expect(seatsInput).toBeEnabled();
    await actWait();
  });

  // FIXME: After upgrading the dependencies, the apollo-query's update command is no longer mocked properly.
  test.skip('can create new occurrence and it is added to occurrences table', async () => {
    const {
      occurrenceEndTime,
      occurrenceStartDate,
      occurrenceStartTime,
      occurrenceStartDateTime,
      occurrenceEndDateTime,
    } = getDefaultOccurrenceValues();

    const occurrenceData1 = {
      amountOfSeats: 30,
      seatType: graphql.OccurrenceSeatType.ChildrenCount,
      languages: ['fi', 'en'],
      minGroupSize: 10,
      maxGroupSize: 20,
      endTime: occurrenceEndTime,
      startTime: occurrenceStartTime,
    };
    const eventMockResponse = getEventMockedResponse({
      occurrences: fakeOccurrences(0),
    });
    const addOccurrenceMockResponse =
      getAddOccurrenceMockResponse(occurrenceData1);
    const occurrence1: Partial<OccurrenceNode> = {
      ...occurrenceData1,
      languages: fakeLanguages([{ id: 'en' }, { id: 'fi' }]),
      startTime: parseDate(
        occurrenceStartDateTime,
        DATETIME_FORMAT,
        new Date()
      ),
      endTime: parseDate(occurrenceEndDateTime, DATETIME_FORMAT, new Date()),
      placeId: placeId,
    };
    renderComponent({
      mocks: [
        eventMockResponse,
        getEventMockedResponse({
          occurrences: fakeOccurrences(1, [occurrence1]),
        }),
        addOccurrenceMockResponse,
      ],
    });

    const occurrence1RowText =
      `${placeName}${occurrenceStartDateTime}${occurrenceEndDateTime}` +
      'englanti, suomi' +
      `${occurrenceData1.amountOfSeats}${occurrenceData1.minGroupSize}` +
      `${occurrenceData1.maxGroupSize}`;

    // Wait for form to have been initialized
    await screen.findByTestId('time-and-location-form');

    await fillAndSubmitOccurrenceForm({
      occurrenceStartDate,
      occurrenceStartTime,
      occurrenceEndTime,
    });
    await screen.findByTestId(occurrencesTableTestId);

    const occurrencesTable = within(screen.getByTestId(occurrencesTableTestId));

    await waitFor(() => {
      expect(occurrencesTable.getAllByRole('row')[1]).toHaveTextContent(
        occurrence1RowText
      );
    });

    const occurrenceStartDateInput = getOccurrenceFormElement('startDate');
    const occurrenceStartHoursInput = getOccurrenceFormElement('startHours');
    const occurrenceStartMinutesInput =
      getOccurrenceFormElement('startMinutes');
    const occurrenceEndHoursInput = getOccurrenceFormElement('endHours');
    const occurrenceEndMinutesInput = getOccurrenceFormElement('endMinutes');
    const occurrenceLocationInput = getOccurrenceFormElement('location')!;
    const seatsInput = getOccurrenceFormElement('seats');
    const minGroupSizeInput = getOccurrenceFormElement('min');
    const maxGroupSizeInput = getOccurrenceFormElement('max');

    // Only dates should be empty after save

    expect(seatsInput).toHaveValue(30);
    expect(minGroupSizeInput).toHaveValue(10);
    expect(maxGroupSizeInput).toHaveValue(20);
    expect(occurrenceLocationInput.parentElement).toHaveTextContent(
      'Sellon kirjasto'
    );

    const [startHours, startMinutes] = occurrenceStartTime.split(':');
    const [endHours, endMinutes] = occurrenceEndTime.split(':');
    await waitFor(() => {
      expect(occurrenceEndMinutesInput).toHaveValue(endMinutes);
    });
    expect(occurrenceStartDateInput).toHaveValue(occurrenceStartDate);
    expect(occurrenceStartHoursInput).toHaveValue(startHours);
    expect(occurrenceStartMinutesInput).toHaveValue(startMinutes);
    expect(occurrenceEndHoursInput).toHaveValue(endHours);

    // Occurrence should still be in the document after event refetch
    expect(occurrencesTable.getAllByRole('row')[1]).toHaveTextContent(
      occurrence1RowText
    );
    await actWait();
  });

  // FIXME: After upgrading the dependencies, the apollo-query's update command is no longer mocked properly.
  test.skip('can create multiday occurrence', async () => {
    const {
      occurrenceEndTime,
      occurrenceStartDate,
      occurrenceStartTime,
      occurrenceStartDateTime,
      occurrenceEndDateTime,
      occurrenceEndDate,
    } = getDefaultOccurrenceValues();

    const occurrenceData1 = {
      amountOfSeats: 30,
      seatType: graphql.OccurrenceSeatType.ChildrenCount,
      languages: ['fi', 'en'],
      minGroupSize: 10,
      maxGroupSize: 20,
      endTime: occurrenceEndTime,
      startTime: occurrenceStartTime,
    };
    const eventMockResponse = getEventMockedResponse({
      occurrences: fakeOccurrences(0),
    });
    const addOccurrenceMockResponse =
      getAddOccurrenceMockResponse(occurrenceData1);
    const occurrence1: Partial<OccurrenceNode> = {
      ...occurrenceData1,
      languages: fakeLanguages([{ id: 'en' }, { id: 'fi' }]),
      startTime: parseDate(
        occurrenceStartDateTime,
        DATETIME_FORMAT,
        new Date()
      ),
      endTime: parseDate(occurrenceEndDateTime, DATETIME_FORMAT, new Date()),
      placeId: placeId,
    };
    renderComponent({
      mocks: [
        eventMockResponse,
        getEventMockedResponse({
          occurrences: fakeOccurrences(1, [occurrence1]),
        }),
        addOccurrenceMockResponse,
      ],
    });

    const occurrence1RowText =
      `${placeName}${occurrenceStartDateTime}${occurrenceEndDateTime}` +
      'englanti, suomi' +
      `${occurrenceData1.amountOfSeats}${occurrenceData1.minGroupSize}` +
      `${occurrenceData1.maxGroupSize}`;

    // Wait for form to have been initialized
    await screen.findByTestId('time-and-location-form');

    await fillAndSubmitOccurrenceForm({
      occurrenceStartDate,
      occurrenceStartTime,
      occurrenceEndDate,
      occurrenceEndTime,
    });

    const occurrencesTable = within(screen.getByTestId(occurrencesTableTestId));

    await waitFor(() => {
      expect(occurrencesTable.getAllByRole('row')[1]).toHaveTextContent(
        occurrence1RowText
      );
    });

    const occurrenceStartDateInput = getOccurrenceFormElement('startDate');
    const occurrenceStartHoursInput = getOccurrenceFormElement('startHours');
    const occurrenceStartMinutesInput =
      getOccurrenceFormElement('startMinutes');
    const occurrenceEndDateInput = getOccurrenceFormElement('endDate');
    const occurrenceEndHoursInput = getOccurrenceFormElement('endHours');
    const occurrenceEndMinutesInput = getOccurrenceFormElement('endMinutes');
    const occurrenceLocationInput = getOccurrenceFormElement('location')!;
    const seatsInput = getOccurrenceFormElement('seats');
    const minGroupSizeInput = getOccurrenceFormElement('min');
    const maxGroupSizeInput = getOccurrenceFormElement('max');

    expect(seatsInput).toHaveValue(30);
    expect(minGroupSizeInput).toHaveValue(10);
    expect(maxGroupSizeInput).toHaveValue(20);
    expect(occurrenceLocationInput.parentElement).toHaveTextContent(
      'Sellon kirjasto'
    );

    const [startHours, startMinutes] = occurrenceStartTime.split(':');
    const [endHours, endMinutes] = occurrenceEndTime.split(':');
    await waitFor(() => {
      expect(occurrenceEndMinutesInput).toHaveValue(endMinutes);
    });
    expect(occurrenceStartDateInput).toHaveValue(occurrenceStartDate);
    expect(occurrenceStartHoursInput).toHaveValue(startHours);
    expect(occurrenceStartMinutesInput).toHaveValue(startMinutes);
    expect(occurrenceEndDateInput).toHaveValue(occurrenceEndDate);
    expect(occurrenceEndHoursInput).toHaveValue(endHours);

    // Occurrence should still be in the document after event refetch
    await waitFor(() => {
      expect(occurrencesTable.getAllByRole('row')[1]).toHaveTextContent(
        occurrence1RowText
      );
    });
  });

  // FIXME: After upgrading the dependencies, the apollo-query's update command is no longer mocked properly.
  test.skip('can create new occurrence without internal enrolment', async () => {
    const {
      occurrenceEndTime,
      occurrenceStartDate,
      occurrenceStartTime,
      occurrenceStartDateTime,
      occurrenceEndDateTime,
    } = getDefaultOccurrenceValues();

    const occurrenceData1 = {
      amountOfSeats: 0,
      seatType: graphql.OccurrenceSeatType.ChildrenCount,
      languages: ['fi', 'en'],
      minGroupSize: null,
      maxGroupSize: null,
      endTime: occurrenceEndTime,
      startTime: occurrenceStartTime,
    };
    const eventMockResponse = getEventMockedResponse({
      occurrences: fakeOccurrences(0),
    });
    const addOccurrenceMockResponse =
      getAddOccurrenceMockResponse(occurrenceData1);
    const occurrence1: Partial<OccurrenceNode> = {
      ...occurrenceData1,
      languages: fakeLanguages([{ id: 'en' }, { id: 'fi' }]),
      startTime: parseDate(
        occurrenceStartDateTime,
        DATETIME_FORMAT,
        new Date()
      ),
      endTime: parseDate(occurrenceEndDateTime, DATETIME_FORMAT, new Date()),
      placeId: placeId,
    };
    renderComponent({
      mocks: [
        eventMockResponse,
        getEventMockedResponse({
          occurrences: fakeOccurrences(1, [occurrence1]),
        }),
        addOccurrenceMockResponse,
      ],
    });

    const occurrence1RowText = `Sellon kirjasto10.5.2021 10:0010.5.2021 11:00englanti, suomi–––`;

    // Wait for form to have been initialized
    await screen.findByTestId('time-and-location-form');

    await userEvent.click(getFormElement('noEnrolmentButton'));

    await fillAndSubmitOccurrenceForm({
      occurrenceStartDate,
      occurrenceStartTime,
      occurrenceEndTime,
      seatsInputs: false,
    });

    expect(screen.getAllByRole('row')[1]).toHaveTextContent(occurrence1RowText);

    const occurrenceStartDateInput = getOccurrenceFormElement('startDate');
    const occurrenceStartHoursInput = getOccurrenceFormElement('startHours');
    const occurrenceStartMinutesInput =
      getOccurrenceFormElement('startMinutes');
    const occurrenceEndHoursInput = getOccurrenceFormElement('endHours');
    const occurrenceEndMinutesInput = getOccurrenceFormElement('endMinutes');
    const occurrenceLocationInput = getOccurrenceFormElement('location')!;
    expect(occurrenceLocationInput.parentElement).toHaveTextContent(
      'Sellon kirjasto'
    );

    const [startHours, startMinutes] = occurrenceStartTime.split(':');
    const [endHours, endMinutes] = occurrenceEndTime.split(':');
    await waitFor(() => {
      expect(occurrenceEndMinutesInput).toHaveValue(endMinutes);
    });
    expect(occurrenceStartDateInput).toHaveValue(occurrenceStartDate);
    expect(occurrenceStartHoursInput).toHaveValue(startHours);
    expect(occurrenceStartMinutesInput).toHaveValue(startMinutes);
    expect(occurrenceEndHoursInput).toHaveValue(endHours);

    // Occurrence should still be in the document after event refetch
    expect(screen.getAllByRole('row')[1]).toHaveTextContent(occurrence1RowText);
  });

  // FIXME: After upgrading the dependencies, the apollo-query's update command is no longer mocked properly.
  test.skip('occurrence can be deleted from occurrence table', async () => {
    const { occurrenceStartDateTime, occurrenceEndDateTime } =
      getDefaultOccurrenceValues();

    const occurrence: Partial<OccurrenceNode> = {
      amountOfSeats: 30,
      seatType: graphql.OccurrenceSeatType.ChildrenCount,
      minGroupSize: 10,
      maxGroupSize: 20,
      languages: fakeLanguages([{ id: 'en' }, { id: 'fi' }]),
      startTime: parseDate(
        occurrenceStartDateTime,
        DATETIME_FORMAT,
        new Date()
      ),
      endTime: parseDate(occurrenceEndDateTime, DATETIME_FORMAT, new Date()),
      placeId: placeId,
    };
    const occurrenceId1 = 'occurrence1';
    const occurrenceId2 = 'occurrence2';
    const eventMockResponse = getEventMockedResponse({
      occurrences: fakeOccurrences(2, [
        { ...occurrence, id: occurrenceId1 },
        { ...occurrence, id: occurrenceId2 },
      ]),
    });
    const eventWithOneDeletedOccurrenceMockResponse = getEventMockedResponse({
      occurrences: fakeOccurrences(1, [{ ...occurrence, id: occurrenceId2 }]),
    });
    const eventWithTwoDeletedOccurrenceMockResponse = getEventMockedResponse({
      occurrences: fakeOccurrences(0),
    });
    const deleteOccurrenceMockResponse1 =
      getDeleteOccurrenceMockResponse(occurrenceId1);
    const deleteOccurrenceMockResponse2 =
      getDeleteOccurrenceMockResponse(occurrenceId2);
    renderComponent({
      mocks: [
        eventMockResponse,
        deleteOccurrenceMockResponse1,
        eventWithOneDeletedOccurrenceMockResponse,
        deleteOccurrenceMockResponse2,
        eventWithTwoDeletedOccurrenceMockResponse,
      ],
    });

    const occurrence1RowText =
      `${placeName}${occurrenceStartDateTime}${occurrenceEndDateTime}` +
      'englanti, suomi' +
      `${occurrence.amountOfSeats}${occurrence.minGroupSize}` +
      `${occurrence.maxGroupSize}`;

    await screen.findByTestId(occurrencesTableTestId);
    const occurrencesTable = within(screen.getByTestId(occurrencesTableTestId));

    const [, occurrence1, occurrence2] = occurrencesTable.getAllByRole('row');
    await waitFor(() => {
      expect(occurrence2).toHaveTextContent(occurrence1RowText);
    });
    expect(occurrence1).toHaveTextContent(occurrence1RowText);

    const [, occurrenceRow1] = occurrencesTable.getAllByRole('row');

    const deleteOccurrenceButton = within(occurrenceRow1).getByRole('button', {
      name: 'Poista tapahtuma-aika',
    });
    expect(occurrencesTable.getAllByRole('row')).toHaveLength(3);
    await userEvent.click(deleteOccurrenceButton);
    await waitFor(() => {
      expect(occurrencesTable.getAllByRole('row')).toHaveLength(2);
    });

    const occurrenceRow2 = occurrencesTable.getAllByRole('row')[1];

    const deleteOccurrenceButton2 = within(occurrenceRow2).getByRole('button', {
      name: 'Poista tapahtuma-aika',
    });
    await userEvent.click(deleteOccurrenceButton2);
    await waitFor(() => {
      expect(
        screen.queryByTestId(occurrencesTableTestId)
      ).not.toBeInTheDocument();
    });
  });

  test('yesterday is not valid event start day', async () => {
    const currentDate = new Date('2021-05-20');
    vi.setSystemTime(currentDate);
    renderComponent({
      mocks: [getEventMockedResponse({ occurrences: mockOccurrences })],
    });

    // Wait for form to have been initialized
    await screen.findByTestId('time-and-location-form');

    const dateInput = getOccurrenceFormElement('startDate')!;
    await userEvent.type(
      dateInput,
      format(addDays(currentDate, -1), DATE_FORMAT)
    );
    fireEvent.blur(dateInput);
    expect(dateInput).toHaveValue('19.5.2021');

    await waitFor(() => {
      expect(
        screen.getByText('Päivämäärä ei voi olla menneisyydessä')
      ).toBeInTheDocument();
    });
    expect(dateInput).toHaveAttribute('aria-describedby');
    await actWait();
  });

  test('occurrence date time cannot be before enrolments ending day', async () => {
    vi.setSystemTime(new Date('2021-05-20'));
    const enrolmentStart = new Date('2021-05-21T12:00:00');
    const enrolmentEndDays = 2;
    const eventMockResponse = getEventMockedResponse({
      enrolmentStart: enrolmentStart.toISOString(),
      enrolmentEndDays,
      occurrences: fakeOccurrences(0),
    });
    renderComponent({ mocks: [eventMockResponse] });

    // Wait for form to have been initialized
    await screen.findByTestId('time-and-location-form');

    const dateInput = getOccurrenceFormElement('startDate')!;
    const startHoursInput = getOccurrenceFormElement('startHours')!;
    const startMinutesInput = getOccurrenceFormElement('startMinutes')!;
    await userEvent.type(
      dateInput,
      format(addDays(enrolmentStart, enrolmentEndDays), DATE_FORMAT)
    );
    await userEvent.type(startHoursInput, '11');
    await userEvent.type(startMinutesInput, '00');
    expect(dateInput).toHaveValue('23.5.2021');

    await screen.findByText(
      /Päivämäärän on oltava aikaisintaan 23\.5\.2021 12:00/i
    );

    // enter valid time -> error text should disappear
    await userEvent.type(startHoursInput, '13');
    await waitFor(() => {
      expect(
        screen.queryByText(
          /Päivämäärän on oltava aikaisintaan 23\.5\.2021 12:00/i
        )
      ).not.toBeInTheDocument();
    });
    await actWait();
  });
});
