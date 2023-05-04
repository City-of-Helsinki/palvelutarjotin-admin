import { MockedResponse } from '@apollo/client/testing';
import { addDays, format, parse as parseDate } from 'date-fns';
import { advanceTo, clear } from 'jest-date-mock';
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
  act,
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
  clear();
});

afterEach(() => {
  jest.restoreAllMocks();
});

const renderComponent = ({ mocks = [] }: { mocks?: MockedResponse[] } = {}) => {
  return renderWithRoute(<CreateOccurrencePage />, {
    mocks: [...baseApolloMocks, ...mocks],
    routes: [ROUTES.CREATE_OCCURRENCE.replace(':id', eventId)],
    path: ROUTES.CREATE_OCCURRENCE,
  });
};

advanceTo('2021-04-02');

describe('occurrences form', () => {
  test('location input is prefilled when default location has been selected', async () => {
    const eventWithoutEnrolmentAndLocationInfoMockedResponse =
      getEventMockedResponse({});
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
  });

  test('location input and orderable event checkbox are disabled when virtual event checkbox is checked', async () => {
    renderComponent({ mocks: [getEventMockedResponse({})] });

    // Wait for form to have been initialized
    await screen.findByTestId('time-and-location-form');

    const virtualEventCheckbox = getFormElement('virtualEvent');
    userEvent.click(virtualEventCheckbox);
    expect(virtualEventCheckbox).toBeChecked();

    const orderableEventCheckbox = getFormElement('orderableEvent');
    expect(orderableEventCheckbox).toBeDisabled();

    const placeInput = getFormElement('location');
    expect(placeInput).toBeDisabled();

    const occurrenceLocationInput = getOccurrenceFormElement('location');
    expect(occurrenceLocationInput).toBeDisabled();

    userEvent.click(virtualEventCheckbox);

    // await to get rid of act warnings
    await waitFor(() => {
      expect(occurrenceLocationInput).toBeEnabled();
      expect(placeInput).toBeEnabled();
      expect(virtualEventCheckbox).not.toBeChecked();
    });
  });

  test('location input and virtual event checkbox are disabled when orderable event checkbox is checked', async () => {
    renderComponent({ mocks: [getEventMockedResponse({})] });

    // Wait for form to have been initialized
    await screen.findByTestId('time-and-location-form');

    const orderableEventCheckbox = getFormElement('orderableEvent');
    userEvent.click(orderableEventCheckbox);

    expect(orderableEventCheckbox).toBeChecked();

    const virtualEventCheckbox = getFormElement('virtualEvent');
    expect(virtualEventCheckbox).toBeDisabled();

    const placeInput = getFormElement('location');
    expect(placeInput).toBeDisabled();

    const occurrenceLocationInput = getOccurrenceFormElement('location');
    expect(occurrenceLocationInput).toBeDisabled();

    userEvent.click(orderableEventCheckbox);

    // await to get rid of act warnings
    await waitFor(() => {
      expect(occurrenceLocationInput).toBeEnabled();
      expect(placeInput).toBeEnabled();
      expect(orderableEventCheckbox).not.toBeChecked();
    });
  });

  test('seats input is disabled and has value 1 when one group fills checkbox is checked', async () => {
    renderComponent({ mocks: [getEventMockedResponse({})] });

    // Wait for form to have been initialized
    await screen.findByTestId('time-and-location-form');

    const oneGroupFillsCheckbox = getOccurrenceFormElement('oneGroupFills')!;
    userEvent.click(oneGroupFillsCheckbox);

    await waitFor(() => {
      expect(oneGroupFillsCheckbox).toBeChecked();
    });

    const seatsInput = getOccurrenceFormElement('seats');
    expect(seatsInput).toBeDisabled();
    expect(seatsInput).toHaveValue(1);

    userEvent.click(oneGroupFillsCheckbox);

    await waitFor(() => {
      expect(seatsInput).toBeEnabled();
      expect(oneGroupFillsCheckbox).not.toBeChecked();
    });
  });

  test('can create new occurrence and it is added to occurrences table', async () => {
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

    const occurrence1RowText = `${placeName}${occurrenceStartDateTime}${occurrenceEndDateTime}englanti, suomi${occurrenceData1.amountOfSeats}${occurrenceData1.minGroupSize}${occurrenceData1.maxGroupSize}`;

    // Wait for form to have been initialized
    await screen.findByTestId('time-and-location-form');

    await fillAndSubmitOccurrenceForm({
      occurrenceStartDate,
      occurrenceStartTime,
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
      expect(occurrenceStartDateInput).toHaveValue(occurrenceStartDate);
      expect(occurrenceStartHoursInput).toHaveValue(startHours);
      expect(occurrenceStartMinutesInput).toHaveValue(startMinutes);
      expect(occurrenceEndHoursInput).toHaveValue(endHours);
      expect(occurrenceEndMinutesInput).toHaveValue(endMinutes);
    });

    // Occurrence should still be in the document after event refetch
    expect(occurrencesTable.getAllByRole('row')[1]).toHaveTextContent(
      occurrence1RowText
    );
  });

  test('can create multiday occurrence', async () => {
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

    const occurrence1RowText = `${placeName}${occurrenceStartDateTime}${occurrenceEndDateTime}englanti, suomi${occurrenceData1.amountOfSeats}${occurrenceData1.minGroupSize}${occurrenceData1.maxGroupSize}`;

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
      expect(occurrenceStartDateInput).toHaveValue(occurrenceStartDate);
      expect(occurrenceStartHoursInput).toHaveValue(startHours);
      expect(occurrenceStartMinutesInput).toHaveValue(startMinutes);
      expect(occurrenceEndDateInput).toHaveValue(occurrenceEndDate);
      expect(occurrenceEndHoursInput).toHaveValue(endHours);
      expect(occurrenceEndMinutesInput).toHaveValue(endMinutes);
    });

    // Occurrence should still be in the document after event refetch
    await waitFor(() => {
      expect(occurrencesTable.getAllByRole('row')[1]).toHaveTextContent(
        occurrence1RowText
      );
    });
  });

  test('can create new occurrence without internal enrolment', async () => {
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

    act(() => userEvent.click(getFormElement('noEnrolmentButton')));

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
      expect(occurrenceStartDateInput).toHaveValue(occurrenceStartDate);
      expect(occurrenceStartHoursInput).toHaveValue(startHours);
      expect(occurrenceStartMinutesInput).toHaveValue(startMinutes);
      expect(occurrenceEndHoursInput).toHaveValue(endHours);
      expect(occurrenceEndMinutesInput).toHaveValue(endMinutes);
    });

    // Occurrence should still be in the document after event refetch
    expect(screen.getAllByRole('row')[1]).toHaveTextContent(occurrence1RowText);
  });

  test('occurrence can be deleted from occurrence table', async () => {
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

    const occurrence1RowText = `${placeName}${occurrenceStartDateTime}${occurrenceEndDateTime}englanti, suomi${occurrence.amountOfSeats}${occurrence.minGroupSize}${occurrence.maxGroupSize}`;

    await waitFor(() => screen.getByTestId(occurrencesTableTestId));
    const occurrencesTable = within(screen.getByTestId(occurrencesTableTestId));

    await waitFor(() => {
      const [, occurrence1, occurrence2] = occurrencesTable.getAllByRole('row');
      expect(occurrence1).toHaveTextContent(occurrence1RowText);
      expect(occurrence2).toHaveTextContent(occurrence1RowText);
    });

    const [, occurrenceRow1] = occurrencesTable.getAllByRole('row');

    const withinOccurrenceRow1 = within(occurrenceRow1);

    const deleteOccurrenceButton = withinOccurrenceRow1.getByRole('button', {
      name: 'Poista tapahtuma-aika',
    });
    userEvent.click(deleteOccurrenceButton);

    await waitFor(() => {
      expect(occurrencesTable.queryAllByRole('row')).toHaveLength(2);
    });

    const occurrenceRow2 = occurrencesTable.getAllByRole('row')[1];

    const withinOccurrenceRow2 = within(occurrenceRow2);
    const deleteOccurrenceButton2 = withinOccurrenceRow2.getByRole('button', {
      name: 'Poista tapahtuma-aika',
    });
    userEvent.click(deleteOccurrenceButton2);

    await waitFor(() => {
      expect(
        screen.queryByTestId(occurrencesTableTestId)
      ).not.toBeInTheDocument();
    });
  });

  test('yesterday is not valid event start day', async () => {
    const currentDate = new Date('2021-05-20');
    advanceTo(currentDate);
    renderComponent({ mocks: [getEventMockedResponse({})] });

    // Wait for form to have been initialized
    await screen.findByTestId('time-and-location-form');

    const dateInput = getOccurrenceFormElement('startDate')!;
    userEvent.type(dateInput, format(addDays(currentDate, -1), DATE_FORMAT));
    fireEvent.blur(dateInput);
    expect(dateInput).toHaveValue('19.5.2021');

    await waitFor(() => {
      expect(dateInput).toHaveAttribute('aria-describedby');
      expect(
        screen.queryByText('Päivämäärä ei voi olla menneisyydessä')
      ).toBeInTheDocument();
    });
  });

  test('occurrence date time cannot be before enrolments ending day', async () => {
    advanceTo(new Date('2021-05-20'));
    const enrolmentStart = new Date('2021-05-21T12:00:00');
    const enrolmentEndDays = 2;
    const eventMockResponse = getEventMockedResponse({
      enrolmentStart: enrolmentStart.toISOString(),
      enrolmentEndDays,
    });
    renderComponent({ mocks: [eventMockResponse] });

    // Wait for form to have been initialized
    await screen.findByTestId('time-and-location-form');

    const dateInput = getOccurrenceFormElement('startDate')!;
    const startHoursInput = getOccurrenceFormElement('startHours')!;
    const startMinutesInput = getOccurrenceFormElement('startMinutes')!;
    userEvent.type(
      dateInput,
      format(addDays(enrolmentStart, enrolmentEndDays), DATE_FORMAT)
    );
    userEvent.type(startHoursInput, '11');
    userEvent.type(startMinutesInput, '00');
    expect(dateInput).toHaveValue('23.5.2021');

    await screen.findByText(
      /Päivämäärän on oltava aikaisintaan 23\.5\.2021 12:00/i
    );

    // enter valid time -> error text should disappear
    userEvent.type(startHoursInput, '13');
    await waitFor(() => {
      expect(
        screen.queryByText(
          /Päivämäärän on oltava aikaisintaan 23\.5\.2021 12:00/i
        )
      ).not.toBeInTheDocument();
    });
  });
});
