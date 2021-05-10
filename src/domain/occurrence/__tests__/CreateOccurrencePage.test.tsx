import { MockedResponse } from '@apollo/react-testing';
import { addDays, format, parse as parseDate } from 'date-fns';
import { advanceTo, clear } from 'jest-date-mock';
import * as React from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';

import {
  editVenueMockResponse,
  emptyVenueMockResponse,
  eventId,
  getAddOccurrenceMockResponse,
  getDeleteOccurrenceMockResponse,
  getEventMockedResponse,
  getUpdateEventMockResponse,
  myProfileMockResponse,
  placeId,
  placeMockResponse,
  placeName,
  placesMockResponse,
  selloVenueMockResponse,
  venueDescription,
} from '../__mocks__/CreateOccurrencePage.mocks';
import { DATE_FORMAT } from '../../../common/components/datepicker/contants';
import { OccurrenceNode } from '../../../generated/graphql';
import * as graphql from '../../../generated/graphql';
import { fakeLanguages, fakeOccurrences } from '../../../utils/mockDataUtils';
import {
  configure,
  fireEvent,
  renderWithRoute,
  screen,
  userEvent,
  waitFor,
  within,
} from '../../../utils/testUtils';
import { ROUTES } from '../../app/routes/constants';
import CreateOccurrencePage from '../CreateOccurrencePage';
import { occurrencesFormTestId } from '../occurrencesFormPart/OccurrencesFormPart';

configure({ defaultHidden: true });

afterAll(() => {
  clear();
});

afterEach(() => {
  jest.restoreAllMocks();
});

const baseApolloMocks = [
  myProfileMockResponse,

  // mocked when place input is given search term (Sello)
  placesMockResponse,

  // Mock for single place query
  placeMockResponse,

  // mocked when place is selected and venue data fetched
  selloVenueMockResponse,

  // empty call is done when component mounts and no place is still selected
  emptyVenueMockResponse,
];

const renderComponent = ({ mocks = [] }: { mocks?: MockedResponse[] } = {}) => {
  return renderWithRoute(<CreateOccurrencePage />, {
    mocks: [...baseApolloMocks, ...mocks],
    routes: [ROUTES.CREATE_OCCURRENCE.replace(':id', eventId)],
    path: ROUTES.CREATE_OCCURRENCE,
  });
};

advanceTo('2021-04-02');

describe('location and enrolment info', () => {
  test('user can fill and save location and enrolment related info', async () => {
    // Mocked event response when user goes to time and location form for the first time
    // this mean that event data is fetched but fields in this form are still empty
    const enrolmentStartDateTimeValue = '2021-05-03T21:00:00.000Z';
    const eventWithoutEnrolmentAndLocationInfoMockedResponse = getEventMockedResponse(
      {
        location: false,
        autoAcceptance: true,
        enrolmentEndDays: null,
        enrolmentStart: null,
        neededOccurrences: 1,
      }
    );
    const updateEventMockResponse = getUpdateEventMockResponse({
      autoAcceptance: false,
      enrolmentEndDays: 1,
      enrolmentStart: enrolmentStartDateTimeValue,
      neededOccurrences: 1,
    });
    renderComponent({
      mocks: [
        // 2 components fetch this and third (3.) is needed for the refetch
        // 'network-only' is used which might be causing this
        eventWithoutEnrolmentAndLocationInfoMockedResponse,
        eventWithoutEnrolmentAndLocationInfoMockedResponse,
        eventWithoutEnrolmentAndLocationInfoMockedResponse,
        updateEventMockResponse,
      ],
    });

    const formattedEnrolmentStartTime = format(
      new Date(enrolmentStartDateTimeValue),
      'dd.MM.yyyy HH:mm'
    );
    const toastSuccess = jest.spyOn(toast, 'success');

    expect(screen.queryByTestId('loading-spinner')).toBeInTheDocument();

    // Wait for form to have been initialized
    await screen.findByTestId('time-and-location-form');

    checkThatOnlyFinnishLanguageIsSelectedAndDisabled();

    // Expect input to be empty initially
    const locationInput = getFormElement('location');
    expect(locationInput.parentElement).toHaveTextContent('');

    userEvent.click(locationInput);
    userEvent.type(locationInput, 'Sellon');

    const place = await screen.findByText(/Sellon kirjasto/i);
    userEvent.click(place);

    await waitFor(() => {
      expect(
        screen.getByLabelText('Tapahtumapaikan kuvaus (FI)')
      ).toHaveTextContent(venueDescription);
    });

    // Text is contained in a div that is sibling to the input
    expect(locationInput.parentElement).toHaveTextContent('Sellon kirjasto');

    expect(
      screen.getByRole('checkbox', {
        name: /ulkovaatesäilytys/i,
      })
    ).toBeChecked();

    expect(
      screen.getByRole('checkbox', {
        name: /leikkitilaa ulkona/i,
      })
    ).not.toBeChecked();

    const enrolmentStartDateTimeInput = getFormElement('enrolmentStart');
    const enrolmentEndDaysInput = getFormElement('enrolmentEndDays');

    userEvent.click(enrolmentStartDateTimeInput);
    userEvent.type(enrolmentStartDateTimeInput, formattedEnrolmentStartTime);
    fireEvent.blur(enrolmentStartDateTimeInput);
    userEvent.type(enrolmentEndDaysInput, '1');

    await waitFor(() => {
      expect(enrolmentStartDateTimeInput).toHaveValue(
        formattedEnrolmentStartTime
      );
    });

    const autoAcceptanceCheckbox = getFormElement('autoAcceptance');
    expect(autoAcceptanceCheckbox).toBeChecked();
    userEvent.click(autoAcceptanceCheckbox);
    expect(autoAcceptanceCheckbox).not.toBeChecked();

    userEvent.click(getFormElement('saveButton'));

    const goToPublishingButton = getFormElement('goToPublishing');
    // Button should be disabled during mutation request
    await waitFor(() => {
      expect(goToPublishingButton).toBeDisabled();
    });

    await waitFor(() => {
      expect(toastSuccess).toHaveBeenCalledWith('Tiedot tallennettu');
    });

    expect(goToPublishingButton).not.toBeDisabled();
  });

  test('user can edit and save location and enrolment related info', async () => {
    const enrolmentEndDays = 1;
    const neededOccurrences = 1;
    const enrolmentStartDateTimeValue = '2021-05-03T21:00:00.000Z';
    const eventWithEnrolmentAndLocationInfoMockedResponse = getEventMockedResponse(
      {
        location: true,
        autoAcceptance: true,
        enrolmentEndDays,
        enrolmentStart: enrolmentStartDateTimeValue,
        neededOccurrences,
      }
    );
    const updateEventMockResponse = getUpdateEventMockResponse({
      autoAcceptance: true,
      enrolmentEndDays: 2,
      enrolmentStart: '2021-04-30T21:00:00.000Z',
      neededOccurrences: 3,
    });
    renderComponent({
      mocks: [
        // 2 components fetch this and third (3.) is needed for the refetch
        // 'network-only' is used which might be causing this
        eventWithEnrolmentAndLocationInfoMockedResponse,
        eventWithEnrolmentAndLocationInfoMockedResponse,
        eventWithEnrolmentAndLocationInfoMockedResponse,
        updateEventMockResponse,
      ],
    });

    const toastSuccess = jest.spyOn(toast, 'success');

    expect(screen.queryByTestId('loading-spinner')).toBeInTheDocument();

    // Wait for form to have been initialized
    await screen.findByTestId('time-and-location-form');

    checkThatOnlyFinnishLanguageIsSelectedAndDisabled();

    const locationInput = getFormElement('location');
    expect(locationInput.parentElement).toHaveTextContent(placeName);

    expect(
      screen.getByLabelText('Tapahtumapaikan kuvaus (FI)')
    ).toHaveTextContent(venueDescription);

    const enrolmentStartDateTimeInput = getFormElement(
      'enrolmentStart'
    ) as HTMLInputElement;
    const enrolmentEndDaysInput = getFormElement('enrolmentEndDays');
    const neededOccurrencesInput = getFormElement('neededOccurrences');

    expect(enrolmentStartDateTimeInput).toHaveValue(
      format(new Date(enrolmentStartDateTimeValue), 'dd.MM.yyyy HH:mm')
    );
    expect(enrolmentEndDaysInput).toHaveValue(1);
    expect(neededOccurrencesInput).toHaveValue(1);

    userEvent.click(enrolmentStartDateTimeInput);
    enrolmentStartDateTimeInput.setSelectionRange(0, 15);
    userEvent.type(enrolmentStartDateTimeInput, '{backspace}01.05.2021 00:00');

    userEvent.clear(enrolmentEndDaysInput);
    userEvent.type(enrolmentEndDaysInput, '2');

    userEvent.clear(neededOccurrencesInput);
    userEvent.type(neededOccurrencesInput, '3');

    await waitFor(() => {
      expect(enrolmentStartDateTimeInput).toHaveValue('01.05.2021 00:00');
    });

    expect(enrolmentEndDaysInput).toHaveValue(2);
    expect(neededOccurrencesInput).toHaveValue(3);

    userEvent.click(getFormElement('saveButton'));

    const goToPublishingButton = getFormElement('goToPublishing');
    // Button should be disabled during mutation request
    await waitFor(() => {
      expect(goToPublishingButton).toBeDisabled();
    });

    await waitFor(() => {
      expect(toastSuccess).toHaveBeenCalledWith('Tiedot tallennettu');
    });

    expect(goToPublishingButton).not.toBeDisabled();
  });

  test('translation fields initialize correctly when event has multiple languages', async () => {
    const enrolmentEndDays = 1;
    const neededOccurrences = 1;
    const enrolmentStartDateTimeValue = '2021-05-03T21:00:00.000Z';
    const eventWithMultipleLanguagesMockedResponse = getEventMockedResponse({
      languages: ['fi', 'sv', 'en'],
      location: true,
      autoAcceptance: true,
      enrolmentEndDays,
      enrolmentStart: enrolmentStartDateTimeValue,
      neededOccurrences,
    });
    const updateEventWithMultipleLanguagesMockResponse = getUpdateEventMockResponse(
      {
        languages: ['fi', 'sv', 'en'],
        autoAcceptance: true,
        enrolmentEndDays: 2,
        enrolmentStart: enrolmentStartDateTimeValue,
        neededOccurrences,
      }
    );
    renderComponent({
      mocks: [
        eventWithMultipleLanguagesMockedResponse,
        eventWithMultipleLanguagesMockedResponse,
        eventWithMultipleLanguagesMockedResponse,
        updateEventWithMultipleLanguagesMockResponse,
      ],
    });

    const toastSuccess = jest.spyOn(toast, 'success');

    // Wait for form to have been initialized
    await screen.findByTestId('time-and-location-form');

    const {
      finnishLanguageCheckbox,
      englishLanguageCheckbox,
      swedishLanguageCheckbox,
    } = getLanguageCheckboxes();

    // All checkboxes should be selected because all languages are included in event data
    expect(finnishLanguageCheckbox).toBeChecked();
    expect(englishLanguageCheckbox).toBeChecked();
    expect(swedishLanguageCheckbox).toBeChecked();
    expect(finnishLanguageCheckbox).toBeEnabled();
    expect(englishLanguageCheckbox).toBeEnabled();
    expect(swedishLanguageCheckbox).toBeEnabled();

    const enrolmentEndDaysInput = getFormElement('enrolmentEndDays');

    // All venue description fields should be visible (all languages)
    screen.getByRole('textbox', {
      name: /tapahtumapaikan kuvaus \(fi\)/i,
    });
    screen.getByRole('textbox', {
      name: /tapahtumapaikan kuvaus \(en\)/i,
    });
    screen.getByRole('textbox', {
      name: /tapahtumapaikan kuvaus \(sv\)/i,
    });

    // Change value to get form dirty and save button enabled!
    userEvent.clear(enrolmentEndDaysInput);
    userEvent.type(enrolmentEndDaysInput, '2');

    userEvent.click(getFormElement('saveButton'));

    await waitFor(() => {
      expect(toastSuccess).toHaveBeenCalledWith('Tiedot tallennettu');
    });
  });

  test('notification modal works correctly when info is not filled', async () => {
    const enrolmentStartDateTimeValue = '2021-05-03T21:00:00.000Z';
    const occurrenceStartTime = '10.05.2021 10:00';
    const occurrenceEndTime = '10.05.2021 11:00';
    const formattedEnrolmentStartTime = format(
      new Date(enrolmentStartDateTimeValue),
      'dd.MM.yyyy HH:mm'
    );
    const occurrenceId = 'occurrenceId';
    const eventData = {
      autoAcceptance: true,
      enrolmentEndDays: 1,
      enrolmentStart: enrolmentStartDateTimeValue,
      neededOccurrences: 1,
    };
    const occurrenceData1 = {
      amountOfSeats: 30,
      seatType: graphql.OccurrenceSeatType.ChildrenCount,
      languages: ['fi', 'en'],
      minGroupSize: 10,
      maxGroupSize: 20,
      endTime: occurrenceEndTime,
      startTime: occurrenceStartTime,
    };
    const addOccurrenceMockResponse = getAddOccurrenceMockResponse({
      ...occurrenceData1,
      id: occurrenceId,
    });
    const occurrence1: Partial<OccurrenceNode> = {
      ...occurrenceData1,
      languages: fakeLanguages([{ id: 'en' }, { id: 'fi' }]),
      startTime: parseDate(occurrenceStartTime, 'dd.MM.yyyy HH:mm', new Date()),
      endTime: parseDate(occurrenceEndTime, 'dd.MM.yyyy HH:mm', new Date()),
      placeId: placeId,
      // Need matching id here that is is in the addOccurrence response
      id: occurrenceId,
    };
    const eventMockResponse = getEventMockedResponse({
      occurrences: fakeOccurrences(0),
    });
    const updatedEventMockResponse = getEventMockedResponse({
      occurrences: fakeOccurrences(0),
      location: true,
      ...eventData,
    });
    const updatedEventWithOccurrenceMockResponse = getEventMockedResponse({
      ...eventData,
      location: true,
      occurrences: fakeOccurrences(1, [occurrence1]),
    });
    const updateEventMockResponse = getUpdateEventMockResponse({
      ...eventData,
    });
    const { container, history } = renderComponent({
      mocks: [
        // 2 components fetch this and third (3.) is needed for the refetch
        // 'network-only' is used which might be causing this
        eventMockResponse,
        eventMockResponse,
        // refetch mock after saving
        updatedEventMockResponse,
        updatedEventWithOccurrenceMockResponse,
        updateEventMockResponse,
        addOccurrenceMockResponse,
      ],
    });

    const pushMock = jest.spyOn(history, 'push');

    const toastSuccess = jest.spyOn(toast, 'success');
    Modal.setAppElement(container);

    // Wait for form to have been initialized
    await screen.findByTestId('time-and-location-form');

    const goToPublishButton = screen.getByRole('button', {
      name: 'Siirry julkaisuun',
    });
    userEvent.click(goToPublishButton);

    // Modal should be visible and have all the errors
    const withinModal = within(screen.getByRole('dialog'));
    expect(
      withinModal.getByText(/tapahtumasta puuttuu tietoja/i)
    ).toBeInTheDocument();
    const expectedModalTexts = [
      'Tapahtuman sijainti',
      'Ilmoittautumisen alkamisaika',
      'Ilmoittautumisen päättyminen',
      'Tapahtumalla on oltava ainakin yksi tapahtuma-aika',
    ];
    expectedModalTexts.forEach((text) => {
      expect(withinModal.queryByText(text)).toBeInTheDocument();
    });

    const closeModalButton = withinModal.getByRole('button', { name: 'Sulje' });
    userEvent.click(closeModalButton);

    const locationInput = getFormElement('location');

    userEvent.click(locationInput);
    userEvent.type(locationInput, 'Sellon');

    const place = await screen.findByText(/Sellon kirjasto/i);
    userEvent.click(place);

    const enrolmentStartDateTimeInput = getFormElement('enrolmentStart');
    const enrolmentEndDaysInput = getFormElement('enrolmentEndDays');

    userEvent.click(enrolmentStartDateTimeInput);
    userEvent.type(enrolmentStartDateTimeInput, formattedEnrolmentStartTime);
    fireEvent.blur(enrolmentStartDateTimeInput);
    userEvent.type(enrolmentEndDaysInput, '1');

    await waitFor(() => {
      expect(enrolmentStartDateTimeInput).toHaveValue(
        formattedEnrolmentStartTime
      );
    });

    // Save the data
    userEvent.click(getFormElement('saveButton'));
    await waitFor(() => {
      expect(toastSuccess).toHaveBeenCalledWith('Tiedot tallennettu');
    });

    // Modal should only have complaint about needing at least one occurrence
    userEvent.click(goToPublishButton);
    const withinModal2 = within(screen.getByRole('dialog'));
    const notExpectedModalTexts = [
      'Tapahtuman sijainti',
      'Ilmoittautumisen alkamisaika',
      'Ilmoittautumisen päättyminen',
    ];
    notExpectedModalTexts.forEach((text) => {
      expect(withinModal2.queryByText(text)).not.toBeInTheDocument();
    });
    expect(
      withinModal2.queryByText(
        'Tapahtumalla on oltava ainakin yksi tapahtuma-aika'
      )
    ).toBeInTheDocument();

    // Close modal again
    userEvent.click(withinModal2.getByRole('button', { name: 'Sulje' }));

    await fillAndSubmitOccurrenceForm({
      occurrenceStartTime,
      occurrenceEndTime,
    });

    // No everything should be ok
    userEvent.click(goToPublishButton);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith(
        `/fi${ROUTES.EVENT_SUMMARY}`.replace(':id', eventId)
      );
    });
  });
});

describe('occurrences form', () => {
  test('location input is prefilled when default location has been selected', async () => {
    const eventWithoutEnrolmentAndLocationInfoMockedResponse = getEventMockedResponse(
      {}
    );
    renderComponent({
      mocks: [
        // 2 components fetch this and third (3.) is needed for the refetch
        // 'network-only' is used which might be causing this
        eventWithoutEnrolmentAndLocationInfoMockedResponse,
        eventWithoutEnrolmentAndLocationInfoMockedResponse,
        eventWithoutEnrolmentAndLocationInfoMockedResponse,
      ],
    });

    // Wait for form to have been initialized
    await screen.findByTestId('time-and-location-form');
    const locationInput = getFormElement('location');

    userEvent.click(locationInput);
    userEvent.type(locationInput, 'Sellon');

    const place = await screen.findByText(/Sellon kirjasto/i);
    userEvent.click(place);

    const occurrenceLocationInput = getOccurrenceFormElement('location');

    await waitFor(() => {
      expect(occurrenceLocationInput.parentElement).toHaveTextContent(
        'Sellon kirjasto'
      );
    });
  });

  test('location input is disabled when virtual event checkbox is checked', async () => {
    renderComponent({ mocks: [getEventMockedResponse({})] });

    // Wait for form to have been initialized
    await screen.findByTestId('time-and-location-form');

    const virtualEventCheckbox = getFormElement('virtualEvent');
    userEvent.click(virtualEventCheckbox);

    expect(virtualEventCheckbox).toBeChecked();

    const placeInput = getFormElement('location');
    expect(placeInput).toBeDisabled();

    const occurrenceLocationInput = getOccurrenceFormElement('location');
    expect(occurrenceLocationInput).toBeDisabled();

    userEvent.click(virtualEventCheckbox);
    expect(occurrenceLocationInput).toBeEnabled();
  });

  test('seats input is disabled and has value 1 when one group fills checkbox is checked', async () => {
    renderComponent({ mocks: [getEventMockedResponse({})] });

    // Wait for form to have been initialized
    await screen.findByTestId('time-and-location-form');

    const oneGroupFillsCheckbox = getOccurrenceFormElement('oneGroupFills');
    userEvent.click(oneGroupFillsCheckbox);

    await waitFor(() => {
      expect(oneGroupFillsCheckbox).toBeChecked();
    });

    const seatsInput = getOccurrenceFormElement('seats');
    expect(seatsInput).toBeDisabled();
    expect(seatsInput).toHaveValue(1);

    userEvent.click(oneGroupFillsCheckbox);
    expect(seatsInput).toBeEnabled();
    expect(oneGroupFillsCheckbox).not.toBeChecked();
  });

  test('can create new occurrence and it is added to occurrences table', async () => {
    const occurrenceStartTime = '10.05.2021 10:00';
    const occurrenceEndTime = '10.05.2021 11:00';
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
    const addOccurrenceMockResponse = getAddOccurrenceMockResponse(
      occurrenceData1
    );
    const occurrence1: Partial<OccurrenceNode> = {
      ...occurrenceData1,
      languages: fakeLanguages([{ id: 'en' }, { id: 'fi' }]),
      startTime: parseDate(occurrenceStartTime, 'dd.MM.yyyy HH:mm', new Date()),
      endTime: parseDate(occurrenceEndTime, 'dd.MM.yyyy HH:mm', new Date()),
      placeId: placeId,
    };
    renderComponent({
      mocks: [
        eventMockResponse,
        eventMockResponse,
        getEventMockedResponse({
          occurrences: fakeOccurrences(1, [occurrence1]),
        }),
        addOccurrenceMockResponse,
      ],
    });

    const occurrence1RowText = `${placeName}${occurrenceStartTime}${occurrenceEndTime}englanti, suomi${occurrenceData1.amountOfSeats}${occurrenceData1.minGroupSize}${occurrenceData1.maxGroupSize}`;

    // Wait for form to have been initialized
    await screen.findByTestId('time-and-location-form');

    await fillAndSubmitOccurrenceForm({
      occurrenceStartTime,
      occurrenceEndTime,
    });

    expect(screen.getAllByRole('row')[1]).toHaveTextContent(occurrence1RowText);

    const occurrenceStartsAtInput = getOccurrenceFormElement('starts');
    const occurrenceEndsAtInput = getOccurrenceFormElement('ends');
    const occurrenceLocationInput = getOccurrenceFormElement('location');
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
    await waitFor(() => {
      expect(occurrenceStartsAtInput).toHaveValue('');
      expect(occurrenceEndsAtInput).toHaveValue('');
    });

    // Occurrence should still be in the document after event refetch
    expect(screen.getAllByRole('row')[1]).toHaveTextContent(occurrence1RowText);
  });

  test('occurrence can be deleted from occurrence table', async () => {
    const occurrenceStartTime = '10.05.2021 10:00';
    const occurrenceEndTime = '10.05.2021 11:00';
    const occurrence: Partial<OccurrenceNode> = {
      amountOfSeats: 30,
      seatType: graphql.OccurrenceSeatType.ChildrenCount,
      minGroupSize: 10,
      maxGroupSize: 20,
      languages: fakeLanguages([{ id: 'en' }, { id: 'fi' }]),
      startTime: parseDate(occurrenceStartTime, 'dd.MM.yyyy HH:mm', new Date()),
      endTime: parseDate(occurrenceEndTime, 'dd.MM.yyyy HH:mm', new Date()),
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
    const deleteOccurrenceMockResponse1 = getDeleteOccurrenceMockResponse(
      occurrenceId1
    );
    const deleteOccurrenceMockResponse2 = getDeleteOccurrenceMockResponse(
      occurrenceId2
    );
    renderComponent({
      mocks: [
        eventMockResponse,
        eventMockResponse,
        deleteOccurrenceMockResponse1,
        eventWithOneDeletedOccurrenceMockResponse,
        deleteOccurrenceMockResponse2,
        eventWithTwoDeletedOccurrenceMockResponse,
      ],
    });

    const occurrence1RowText = `${placeName}${occurrenceStartTime}${occurrenceEndTime}englanti, suomi${occurrence.amountOfSeats}${occurrence.minGroupSize}${occurrence.maxGroupSize}`;

    await waitFor(() => {
      const [, occurrence1, occurrence2] = screen.getAllByRole('row');
      expect(occurrence1).toHaveTextContent(occurrence1RowText);
      expect(occurrence2).toHaveTextContent(occurrence1RowText);
    });

    const [, occurrenceRow1] = screen.getAllByRole('row');

    const withinOccurrenceRow1 = within(occurrenceRow1);

    const deleteOccurrenceButton = withinOccurrenceRow1.getByRole('button', {
      name: 'Poista tapahtuma-aika',
    });
    userEvent.click(deleteOccurrenceButton);

    await waitFor(() => {
      expect(screen.queryAllByRole('row')).toHaveLength(2);
    });

    const occurrenceRow2 = screen.getAllByRole('row')[1];

    const withinOccurrenceRow2 = within(occurrenceRow2);
    const deleteOccurrenceButton2 = withinOccurrenceRow2.getByRole('button', {
      name: 'Poista tapahtuma-aika',
    });
    userEvent.click(deleteOccurrenceButton2);

    await waitFor(() => {
      expect(screen.queryByRole('row')).not.toBeInTheDocument();
    });
  });

  test('yesterday is not valid event start day', async () => {
    const currentDate = new Date('2021-05-20');
    advanceTo(currentDate);
    renderComponent({ mocks: [getEventMockedResponse({})] });

    // Wait for form to have been initialized
    await screen.findByTestId('time-and-location-form');

    const dateInput = getOccurrenceFormElement('starts');
    userEvent.click(dateInput);
    userEvent.type(dateInput, format(addDays(currentDate, -1), DATE_FORMAT));
    fireEvent.blur(dateInput);
    expect(dateInput).toHaveValue('19.05.2021 00:00');

    await waitFor(() => {
      expect(dateInput).toBeInvalid();
    });

    expect(dateInput).toHaveAttribute('aria-describedby');
    expect(
      screen.queryByText('Päivämäärä ei voi olla menneisyydessä')
    ).toBeInTheDocument();
  });

  test('occurrence date cannot be before enrolments ending day', async () => {
    const currentDate = new Date('2021-05-20');
    advanceTo(currentDate);
    const enrolmentStart = new Date('2021-05-21');
    const enrolmentEndDays = 2;
    const eventMockResponse = getEventMockedResponse({
      enrolmentStart: enrolmentStart.toISOString(),
      enrolmentEndDays,
    });
    renderComponent({ mocks: [eventMockResponse] });

    // Wait for form to have been initialized
    await screen.findByTestId('time-and-location-form');

    const dateInput = getOccurrenceFormElement('starts');
    userEvent.click(dateInput);
    userEvent.type(dateInput, format(addDays(enrolmentStart, 1), DATE_FORMAT));
    fireEvent.blur(dateInput);
    expect(dateInput).toHaveValue('22.05.2021 00:00');

    await waitFor(() => {
      expect(dateInput).toBeInvalid();
    });

    expect(dateInput).toHaveAttribute('aria-describedby');
    expect(
      screen.queryByText('Päivämäärän on oltava aikaisintaan 23.05.2021')
    ).toBeInTheDocument();
  });
});

describe('venue info', () => {
  test('venue data can be changed and saved', async () => {
    advanceTo('2021-04-02');
    const enrolmentEndDays = 1;
    const neededOccurrences = 1;
    const enrolmentStartDateTimeValue = '2021-05-03T21:00:00.000Z';
    const eventWithMultipleLanguagesMockedResponse = getEventMockedResponse({
      languages: ['fi', 'sv', 'en'],
      location: true,
      autoAcceptance: true,
      enrolmentEndDays,
      enrolmentStart: enrolmentStartDateTimeValue,
      neededOccurrences,
    });
    const updateEventWithMultipleLanguagesMockResponse = getUpdateEventMockResponse(
      {
        languages: ['fi', 'sv', 'en'],
        autoAcceptance: true,
        enrolmentEndDays,
        enrolmentStart: enrolmentStartDateTimeValue,
        neededOccurrences,
      }
    );
    renderComponent({
      mocks: [
        editVenueMockResponse,
        eventWithMultipleLanguagesMockedResponse,
        eventWithMultipleLanguagesMockedResponse,
        eventWithMultipleLanguagesMockedResponse,
        updateEventWithMultipleLanguagesMockResponse,
      ],
    });

    const toastSuccess = jest.spyOn(toast, 'success');

    // Wait for form to have been initialized
    await screen.findByTestId('time-and-location-form');

    const venueDescriptionInput = screen.getByRole('textbox', {
      name: /tapahtumapaikan kuvaus \(en\)/i,
    });

    userEvent.clear(venueDescriptionInput);
    userEvent.type(venueDescriptionInput, 'Changed venue description');

    const hasOutdoorPlayingAreaCheckbox = getVenueCheckbox(
      'hasOutdoorPlayingArea'
    );
    const hasToiletNearby = getVenueCheckbox('hasToiletNearby');

    userEvent.click(hasToiletNearby);
    userEvent.click(hasOutdoorPlayingAreaCheckbox);

    userEvent.click(getFormElement('saveButton'));

    await waitFor(() => {
      expect(toastSuccess).toHaveBeenCalledWith('Tiedot tallennettu');
    });
  });
});

const getLanguageCheckboxes = () => {
  const finnishLanguageCheckbox = screen.getByRole('checkbox', {
    name: 'Suomi',
  });

  const englishLanguageCheckbox = screen.getByRole('checkbox', {
    name: 'Englanti',
  });
  const swedishLanguageCheckbox = screen.getByRole('checkbox', {
    name: 'Ruotsi',
  });

  return {
    finnishLanguageCheckbox,
    englishLanguageCheckbox,
    swedishLanguageCheckbox,
  };
};

const checkThatOnlyFinnishLanguageIsSelectedAndDisabled = () => {
  const {
    finnishLanguageCheckbox,
    englishLanguageCheckbox,
    swedishLanguageCheckbox,
  } = getLanguageCheckboxes();

  expect(finnishLanguageCheckbox).toBeChecked();
  expect(finnishLanguageCheckbox).toBeDisabled();
  expect(englishLanguageCheckbox).not.toBeChecked();
  expect(swedishLanguageCheckbox).not.toBeChecked();
};

const getVenueCheckbox = (key: 'hasToiletNearby' | 'hasOutdoorPlayingArea') => {
  switch (key) {
    case 'hasToiletNearby':
      return screen.getByRole('checkbox', {
        name: /wc lähellä tilaa/i,
      });
    case 'hasOutdoorPlayingArea':
      return screen.getByRole('checkbox', {
        name: /leikkitilaa ulkona/i,
      });
  }
};

const getOccurrenceFormElement = (
  key:
    | 'location'
    | 'starts'
    | 'ends'
    | 'language'
    | 'seats'
    | 'min'
    | 'max'
    | 'oneGroupFills'
    | 'submit'
) => {
  const occurrencesForm = within(screen.getByTestId(occurrencesFormTestId));
  switch (key) {
    case 'location':
      return occurrencesForm.getByRole('textbox', {
        name: 'Tapahtumapaikka',
      });
    case 'starts':
      return occurrencesForm.getByRole('textbox', {
        name: 'Alkaa',
      });
    case 'ends':
      return occurrencesForm.getByRole('textbox', {
        name: 'Päättyy',
      });
    case 'language':
      return occurrencesForm.getByRole('button', {
        name: /tapahtuman kieli valitse\.\.\./i,
      });
    case 'seats':
      return occurrencesForm.getByRole('spinbutton', {
        name: 'Paikkoja',
      });
    case 'min':
      return screen.getByRole('spinbutton', {
        name: 'Min',
      });
    case 'max':
      return screen.getByRole('spinbutton', {
        name: 'Max',
      });
    case 'oneGroupFills':
      return screen.getByRole('checkbox', {
        name: /yksi ryhmä täyttää tapahtuman/i,
      });
    case 'submit':
      return screen.getByRole('button', {
        name: /lisää uusi tapahtuma-aika/i,
      });
  }
};

const getFormElement = (
  key:
    | 'location'
    | 'enrolmentStart'
    | 'enrolmentEndDays'
    | 'neededOccurrences'
    | 'autoAcceptance'
    | 'virtualEvent'
    | 'saveButton'
    | 'goToPublishing'
) => {
  switch (key) {
    case 'location':
      return screen.getByRole('textbox', { name: /oletustapahtumapaikka \*/i });
    case 'enrolmentStart':
      return screen.getByRole('textbox', {
        name: /ilmoittautuminen alkaa \*/i,
      });
    case 'enrolmentEndDays':
      return screen.getByRole('spinbutton', {
        name: /ilmoittautuminen sulkeutuu, päivää/i,
      });
    case 'neededOccurrences':
      return screen.getByRole('spinbutton', {
        name: /tarvittavat käyntikerrat/i,
      });
    case 'autoAcceptance':
      return screen.getByRole('checkbox', {
        name: /vahvista ilmoittautumiset automaattisesti osallistujamäärän puitteissa/i,
      });
    case 'virtualEvent':
      return screen.getByRole('checkbox', {
        name: /tapahtuma järjestetään virtuaalisesti/i,
      });
    case 'saveButton':
      return screen.getByRole('button', {
        name: /tallenna tiedot/i,
      });
    case 'goToPublishing':
      return screen.getByRole('button', {
        name: /siirry julkaisuun/i,
      });
  }
};

const fillAndSubmitOccurrenceForm = async ({
  occurrenceEndTime,
  occurrenceStartTime,
}: {
  occurrenceStartTime: string;
  occurrenceEndTime: string;
}) => {
  const withinOccurrencesForm = within(
    screen.getByTestId(occurrencesFormTestId)
  );
  const locationInput = getOccurrenceFormElement('location');

  userEvent.click(locationInput);
  userEvent.type(locationInput, 'Sellon');

  const place = await withinOccurrencesForm.findByText(/Sellon kirjasto/i);

  userEvent.click(place);

  const occurrenceLocationInput = getOccurrenceFormElement('location');

  await waitFor(() => {
    expect(occurrenceLocationInput.parentElement).toHaveTextContent(
      'Sellon kirjasto'
    );
  });

  const occurrenceStartsAtInput = getOccurrenceFormElement('starts');
  const occurrenceEndsAtInput = getOccurrenceFormElement('ends');

  userEvent.click(occurrenceStartsAtInput);
  userEvent.type(occurrenceStartsAtInput, occurrenceStartTime);
  expect(occurrenceStartsAtInput).toHaveValue(occurrenceStartTime);

  await waitFor(() => {
    // ends at input should be automatically filled with end time (one hour from start time)
    expect(occurrenceEndsAtInput).toHaveValue(occurrenceEndTime);
  });

  userEvent.click(occurrenceEndsAtInput);
  userEvent.clear(occurrenceEndsAtInput);
  userEvent.type(occurrenceEndsAtInput, occurrenceEndTime);
  expect(occurrenceEndsAtInput).toHaveValue(occurrenceEndTime);

  await waitFor(() => {
    // ends at input should be automatically filled with end time (one hour from start time)
    expect(occurrenceEndsAtInput).toHaveValue(occurrenceEndTime);
  });

  const languageSelector = getOccurrenceFormElement('language');
  userEvent.click(languageSelector);
  const withinLanguageSelector = within(languageSelector.parentElement);

  const optionFi = withinLanguageSelector.getByRole('option', {
    name: /suomi/i,
  });
  const optionEn = withinLanguageSelector.getByRole('option', {
    name: /englanti/i,
  });

  // select languages
  userEvent.click(optionFi);
  userEvent.click(optionEn);
  userEvent.click(languageSelector);

  const seatsInput = getOccurrenceFormElement('seats');
  const minGroupSizeInput = getOccurrenceFormElement('min');
  const maxGroupSizeInput = getOccurrenceFormElement('max');

  userEvent.type(seatsInput, '30');
  userEvent.type(minGroupSizeInput, '10');
  userEvent.type(maxGroupSizeInput, '20');

  await waitFor(() => {
    expect(seatsInput).toHaveValue(30);
  });

  expect(minGroupSizeInput).toHaveValue(10);
  expect(maxGroupSizeInput).toHaveValue(20);

  const submitButton = getOccurrenceFormElement('submit');
  userEvent.click(submitButton);

  await waitFor(() => {
    expect(occurrenceStartsAtInput).toHaveValue('');
    expect(occurrenceEndsAtInput).toHaveValue('');
  });
};
