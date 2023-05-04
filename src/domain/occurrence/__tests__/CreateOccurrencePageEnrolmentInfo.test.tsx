import { MockedResponse } from '@apollo/client/testing';
import { format, parse as parseDate } from 'date-fns';
import { advanceTo, clear } from 'jest-date-mock';
import * as React from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';

import { OccurrenceNode } from '../../../generated/graphql';
import * as graphql from '../../../generated/graphql';
import {
  baseApolloMocks,
  checkThatOnlyFinnishLanguageIsSelectedAndDisabled,
  eventId,
  fillAndSubmitOccurrenceForm,
  getAddOccurrenceMockResponse,
  getDefaultOccurrenceValues,
  getEventMockedResponse,
  getFormElement,
  getLanguageCheckboxes,
  getOccurrenceFormElement,
  getUpdateEventMockResponse,
  placeId,
  placeName,
  selectLocation,
  venueDescription,
} from '../../../test/CreateOccurrencePageTestUtils';
import { fakeLanguages, fakeOccurrences } from '../../../utils/mockDataUtils';
import {
  act,
  configure,
  renderWithRoute,
  screen,
  userEvent,
  waitFor,
  within,
} from '../../../utils/testUtils';
import {
  DATE_FORMAT,
  DATETIME_FORMAT,
  formatIntoDate,
  formatIntoTime,
} from '../../../utils/time/format';
import { ROUTES } from '../../app/routes/constants';
import CreateOccurrencePage from '../CreateOccurrencePage';

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

describe('location and enrolment info', () => {
  test('user can fill and save location and enrolment related info', async () => {
    // Mocked event response when user goes to time and location form for the first time
    // this mean that event data is fetched but fields in this form are still empty
    const enrolmentStartDateTimeValue = '2021-05-03T21:00:00.000Z';
    const eventWithoutEnrolmentAndLocationInfoMockedResponse =
      getEventMockedResponse({
        location: false,
        autoAcceptance: true,
        enrolmentEndDays: null,
        enrolmentStart: null,
        neededOccurrences: 1,
        occurrences: fakeOccurrences(0),
      });
    const updateEventMockResponse = getUpdateEventMockResponse({
      autoAcceptance: false,
      enrolmentEndDays: 1,
      enrolmentStart: enrolmentStartDateTimeValue,
      neededOccurrences: 1,
    });
    renderComponent({
      mocks: [
        eventWithoutEnrolmentAndLocationInfoMockedResponse,
        updateEventMockResponse,
      ],
    });

    const formattedEnrolmentStartDate = formatIntoDate(
      new Date(enrolmentStartDateTimeValue)
    );
    const formattedEnrolmentStartTime = formatIntoTime(
      new Date(enrolmentStartDateTimeValue)
    );
    const toastSuccess = jest.spyOn(toast, 'success');

    expect(screen.queryByTestId('loading-spinner')).toBeInTheDocument();

    // Wait for form to have been initialized
    await screen.findByTestId('time-and-location-form');

    checkThatOnlyFinnishLanguageIsSelectedAndDisabled();

    // Expect input to be empty initially
    const locationInput = getFormElement('location');
    expect(locationInput.parentElement).toHaveTextContent('');

    act(() => userEvent.click(locationInput));
    userEvent.type(locationInput, 'Sellon');

    const place = await screen.findByText(/Sellon kirjasto/i);
    act(() => userEvent.click(place));

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

    const enrolmentStartDateInput = getFormElement('enrolmentStartDate');
    const enrolmentStartHoursInput = getFormElement('enrolmentStartHours');
    const enrolmentStartMinutesInput = getFormElement('enrolmentStartMinutes');
    const enrolmentEndDaysInput = getFormElement('enrolmentEndDays');

    const [startHours, startMinutes] = formattedEnrolmentStartTime.split(':');

    act(() => userEvent.click(enrolmentStartDateInput));
    userEvent.type(enrolmentStartDateInput, formattedEnrolmentStartDate);
    userEvent.type(enrolmentStartHoursInput, startHours);
    userEvent.type(enrolmentStartMinutesInput, startMinutes);

    userEvent.type(enrolmentEndDaysInput, '1');

    await waitFor(() => {
      expect(enrolmentStartDateInput).toHaveValue(formattedEnrolmentStartDate);
      expect(enrolmentStartHoursInput).toHaveValue(startHours);
      expect(enrolmentStartMinutesInput).toHaveValue(startMinutes);
    });

    const autoAcceptanceCheckbox = getFormElement('autoAcceptance');
    expect(autoAcceptanceCheckbox).toBeChecked();
    userEvent.click(autoAcceptanceCheckbox);
    expect(autoAcceptanceCheckbox).not.toBeChecked();

    userEvent.click(getFormElement('saveButton'));

    const goToPublishingButton = getFormElement('goToPublishing');
    const addNewOccurrenceButton = getOccurrenceFormElement('submit');

    // Form buttons should be disabled during mutation request
    await waitFor(() => {
      expect(goToPublishingButton).toBeDisabled();
      expect(addNewOccurrenceButton).toBeDisabled();
    });

    await waitFor(() => {
      expect(toastSuccess).toHaveBeenCalledWith('Tiedot tallennettu');
    });

    expect(goToPublishingButton).toBeEnabled();
    expect(addNewOccurrenceButton).toBeEnabled();
  }, 75_000);

  test('user can edit and save location and enrolment related info', async () => {
    const enrolmentEndDays = 1;
    const neededOccurrences = 1;
    const enrolmentStartDateTimeValue = '2021-05-03T21:00:00.000Z';
    const eventWithEnrolmentAndLocationInfoMockedResponse =
      getEventMockedResponse({
        location: true,
        autoAcceptance: true,
        enrolmentEndDays,
        enrolmentStart: enrolmentStartDateTimeValue,
        neededOccurrences,
      });
    const updateEventMockResponse = getUpdateEventMockResponse({
      autoAcceptance: true,
      enrolmentEndDays: 2,
      enrolmentStart: '2021-04-30T21:00:00.000Z',
      neededOccurrences: 3,
    });
    renderComponent({
      mocks: [
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

    const enrolmentStartDateInput = getFormElement(
      'enrolmentStartDate'
    ) as HTMLInputElement;
    const enrolmentStartHoursInput = getFormElement('enrolmentStartHours');
    const enrolmentStartMinutesInput = getFormElement('enrolmentStartMinutes');
    const enrolmentEndDaysInput = getFormElement('enrolmentEndDays');
    const neededOccurrencesInput = getFormElement('neededOccurrences');

    expect(enrolmentStartDateInput).toHaveValue(
      format(new Date(enrolmentStartDateTimeValue), DATE_FORMAT)
    );
    expect(enrolmentEndDaysInput).toHaveValue(1);
    expect(neededOccurrencesInput).toHaveValue(1);

    act(() => userEvent.click(enrolmentStartDateInput));
    enrolmentStartDateInput.setSelectionRange(0, 15);
    userEvent.type(enrolmentStartDateInput, '{backspace}1.5.2021');
    userEvent.type(enrolmentStartHoursInput, '00');
    userEvent.type(enrolmentStartMinutesInput, '00');

    userEvent.clear(enrolmentEndDaysInput);
    userEvent.type(enrolmentEndDaysInput, '2');

    userEvent.clear(neededOccurrencesInput);
    userEvent.type(neededOccurrencesInput, '3');

    await waitFor(() => {
      expect(enrolmentStartDateInput).toHaveValue('1.5.2021');
      expect(enrolmentStartHoursInput).toHaveValue('00');
      expect(enrolmentStartMinutesInput).toHaveValue('00');
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
    const updateEventWithMultipleLanguagesMockResponse =
      getUpdateEventMockResponse({
        languages: ['fi', 'sv', 'en'],
        autoAcceptance: true,
        enrolmentEndDays: 2,
        enrolmentStart: enrolmentStartDateTimeValue,
        neededOccurrences,
      });
    renderComponent({
      mocks: [
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
    const {
      occurrenceEndTime,
      occurrenceStartDate,
      occurrenceStartTime,
      occurrenceStartDateTime,
      occurrenceEndDateTime,
    } = getDefaultOccurrenceValues();

    const formattedEnrolmentStartDate = formatIntoDate(
      new Date(enrolmentStartDateTimeValue)
    );
    const formattedEnrolmentStartTime = formatIntoTime(
      new Date(enrolmentStartDateTimeValue)
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
      startTime: parseDate(
        occurrenceStartDateTime,
        DATETIME_FORMAT,
        new Date()
      ),
      endTime: parseDate(occurrenceEndDateTime, DATETIME_FORMAT, new Date()),
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
        eventMockResponse,
        // refetch mock after saving
        updatedEventMockResponse,
        updatedEventWithOccurrenceMockResponse,
        updateEventMockResponse,
        addOccurrenceMockResponse,
      ],
    });
    Modal.setAppElement(container);
    const pushMock = jest.spyOn(history, 'push');
    const toastSuccess = jest.spyOn(toast, 'success');

    // Wait for form to have been initialized
    await screen.findByTestId('time-and-location-form');

    const goToPublishButton = screen.getByRole('button', {
      name: 'Siirry julkaisuun',
    });
    userEvent.click(goToPublishButton);

    // form should be validated and errors should appear
    expect(
      await screen.findAllByText(/Tämä kenttä on pakollinen/i)
    ).toHaveLength(3);

    // Modal should not appear at this point
    expect(
      screen.queryByRole('dialog', { hidden: false })
    ).not.toBeInTheDocument();

    const locationInput = getFormElement('location');

    act(() => userEvent.click(locationInput));
    userEvent.type(locationInput, 'Sellon');

    const place = await screen.findByText(/Sellon kirjasto/i);
    act(() => userEvent.click(place));

    const enrolmentStartDateInput = getFormElement('enrolmentStartDate');
    const enrolmentStartHoursInput = getFormElement('enrolmentStartHours');
    const enrolmentStartMinutesInput = getFormElement('enrolmentStartMinutes');
    const enrolmentEndDaysInput = getFormElement('enrolmentEndDays');

    act(() => userEvent.click(enrolmentStartDateInput));
    userEvent.type(enrolmentStartDateInput, formattedEnrolmentStartDate);
    userEvent.type(enrolmentStartHoursInput, formattedEnrolmentStartTime);
    userEvent.type(enrolmentStartMinutesInput, formattedEnrolmentStartTime);
    userEvent.type(enrolmentEndDaysInput, '1');

    await waitFor(() => {
      expect(enrolmentStartDateInput).toHaveValue(formattedEnrolmentStartDate);
    });

    // Try to go to publish page
    userEvent.click(goToPublishButton);
    await waitFor(() => {
      expect(toastSuccess).toHaveBeenCalledWith('Tiedot tallennettu');
    });

    // Modal should only have complaint about needing at least one occurrence
    const withinModal2 = within(screen.getByRole('dialog', { hidden: false }));
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
      occurrenceStartDate,
      occurrenceStartTime,
      occurrenceEndTime,
    });

    // Now everything should be ok
    userEvent.click(goToPublishButton);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith(
        `/fi${ROUTES.EVENT_SUMMARY}`.replace(':id', eventId)
      );
    });
  }, 75_000);

  test('user can choose no enrolment option and save form', async () => {
    const eventWithoutEnrolmentAndLocationInfoMockedResponse =
      getEventMockedResponse({
        autoAcceptance: false,
        enrolmentEndDays: null,
        enrolmentStart: null,
        neededOccurrences: 1,
        occurrences: fakeOccurrences(0),
      });

    const updateEventMockResponse = getUpdateEventMockResponse({
      autoAcceptance: false,
      enrolmentEndDays: null,
      enrolmentStart: null,
      neededOccurrences: 0,
    });

    renderComponent({
      mocks: [
        eventWithoutEnrolmentAndLocationInfoMockedResponse,
        updateEventMockResponse,
      ],
    });

    const toastSuccess = jest.spyOn(toast, 'success');

    // Wait for form to have been initialized
    await screen.findByTestId('time-and-location-form');
    await selectLocation();
    await screen.findByText('Test venue description');

    // Save event with no enrolment
    act(() => userEvent.click(getFormElement('noEnrolmentButton')));

    // grup min and max input should be hidden
    expect(getOccurrenceFormElement('min')).not.toBeInTheDocument();
    expect(getOccurrenceFormElement('max')).not.toBeInTheDocument();
    expect(getOccurrenceFormElement('seats')).not.toBeInTheDocument();

    userEvent.click(getFormElement('saveButton'));

    await waitFor(() => expect(toastSuccess).toHaveBeenCalled());
  });

  test('user can add external enrolment and save form', async () => {
    const externalEnrolmentUrl = 'https://kultus.fi/';
    const eventWithoutEnrolmentAndLocationInfoMockedResponse =
      getEventMockedResponse({
        autoAcceptance: false,
        enrolmentEndDays: null,
        enrolmentStart: null,
        neededOccurrences: 1,
        externalEnrolmentUrl: null,
        occurrences: fakeOccurrences(0),
      });

    const updateEventMockResponse = getUpdateEventMockResponse({
      autoAcceptance: false,
      enrolmentEndDays: null,
      enrolmentStart: null,
      neededOccurrences: 0,
      externalEnrolmentUrl,
    });

    renderComponent({
      mocks: [
        eventWithoutEnrolmentAndLocationInfoMockedResponse,
        updateEventMockResponse,
      ],
    });

    const toastSuccess = jest.spyOn(toast, 'success');

    // Wait for form to have been initialized
    await screen.findByTestId('time-and-location-form');
    await selectLocation();
    await screen.findByText('Test venue description');

    // should be found in the document before clicking externalEnrolment radio button
    expect(getOccurrenceFormElement('min')).toBeInTheDocument();
    expect(getOccurrenceFormElement('max')).toBeInTheDocument();

    act(() => userEvent.click(getFormElement('externalEnrolmentButton')));

    expect(
      screen.queryByText(/tämä kenttä on pakollinen/i)
    ).not.toBeInTheDocument();

    userEvent.click(getFormElement('saveButton'));

    // externalEnrolmentButton is required
    await screen.findByText(/tämä kenttä on pakollinen/i);

    const enrolmentUrlInput = await getFormElement('enrolmentUrl');
    userEvent.type(enrolmentUrlInput, externalEnrolmentUrl);

    // should be hidden when external enrolment is selected
    expect(getOccurrenceFormElement('min')).not.toBeInTheDocument();
    expect(getOccurrenceFormElement('max')).not.toBeInTheDocument();
    expect(getOccurrenceFormElement('seats')).not.toBeInTheDocument();

    userEvent.click(getFormElement('saveButton'));

    await waitFor(() => expect(toastSuccess).toHaveBeenCalled());
  });
});
