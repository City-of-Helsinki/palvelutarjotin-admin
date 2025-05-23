import { MockedResponse } from '@apollo/client/testing';
import { configure, waitFor, within, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { format, parse as parseDate } from 'date-fns';
import * as React from 'react';
import Modal from 'react-modal';
import * as Router from 'react-router';
import { toast } from 'react-toastify';
import { vi } from 'vitest';

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
import { renderWithRoute } from '../../../utils/testUtils';
import {
  DATE_FORMAT,
  DATETIME_FORMAT,
  formatIntoDate,
  formatIntoTime,
} from '../../../utils/time/format';
import { ROUTES } from '../../app/routes/constants';
import CreateOccurrencePage from '../CreateOccurrencePage';
import { occurrencesTableTestId } from '../occurrencesFormPart/OccurrencesFormPart';

const navigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return { ...actual };
});
configure({ defaultHidden: true });

afterAll(() => {
  vi.setSystemTime(vi.getRealSystemTime());
  vi.useRealTimers();
});

afterEach(() => {
  vi.restoreAllMocks();
});

const renderComponent = ({ mocks = [] }: { mocks?: MockedResponse[] } = {}) => {
  return renderWithRoute(<CreateOccurrencePage />, {
    mocks: [...baseApolloMocks, ...mocks],
    routes: [ROUTES.CREATE_OCCURRENCE.replace(':id', eventId)],
    path: ROUTES.CREATE_OCCURRENCE,
  });
};

vi.setSystemTime('2021-04-02');

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
        // FIXME: Some reason why this component needs a reload
        eventWithoutEnrolmentAndLocationInfoMockedResponse,
      ],
    });

    const formattedEnrolmentStartDate = formatIntoDate(
      new Date(enrolmentStartDateTimeValue)
    );
    const formattedEnrolmentStartTime = formatIntoTime(
      new Date(enrolmentStartDateTimeValue)
    );
    const toastSuccess = vi.spyOn(toast, 'success');

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

    // Wait for form to have been initialized
    await screen.findByTestId('time-and-location-form');

    checkThatOnlyFinnishLanguageIsSelectedAndDisabled();

    // Expect input to be empty initially
    const locationInput = getFormElement('location');
    expect(locationInput.parentElement).toHaveTextContent('');

    await selectLocation();

    await waitFor(() => {
      expect(
        screen.getByLabelText('Tapahtumapaikan kuvaus (FI)')
      ).toHaveTextContent(venueDescription);
    });

    await waitFor(() => {
      // Text is contained in a div that is sibling to the input
      expect(locationInput.parentElement).toHaveTextContent('Sellon kirjasto');
    });

    await waitFor(() => {
      expect(
        screen.getByRole('checkbox', {
          name: /ulkovaatesäilytys/i,
        })
      ).toBeChecked();
    });

    await waitFor(() => {
      expect(
        screen.getByRole('checkbox', {
          name: /leikkitilaa ulkona/i,
        })
      ).not.toBeChecked();
    });

    const enrolmentStartDateInput = getFormElement('enrolmentStartDate');
    const enrolmentStartHoursInput = getFormElement('enrolmentStartHours');
    const enrolmentStartMinutesInput = getFormElement('enrolmentStartMinutes');
    const enrolmentEndDaysInput = getFormElement('enrolmentEndDays');

    const [startHours, startMinutes] = formattedEnrolmentStartTime.split(':');

    await userEvent.click(enrolmentStartDateInput);
    await userEvent.type(enrolmentStartDateInput, formattedEnrolmentStartDate);
    await userEvent.type(enrolmentStartHoursInput, startHours);
    await userEvent.type(enrolmentStartMinutesInput, startMinutes);

    await userEvent.type(enrolmentEndDaysInput, '1');

    await waitFor(() =>
      expect(enrolmentStartMinutesInput).toHaveValue(startMinutes)
    );
    await waitFor(() =>
      expect(enrolmentStartDateInput).toHaveValue(formattedEnrolmentStartDate)
    );
    await waitFor(() =>
      expect(enrolmentStartHoursInput).toHaveValue(startHours)
    );

    const autoAcceptanceCheckbox = getFormElement('autoAcceptance');
    await waitFor(() => expect(autoAcceptanceCheckbox).toBeChecked());
    await userEvent.click(autoAcceptanceCheckbox);
    await waitFor(() => expect(autoAcceptanceCheckbox).not.toBeChecked());

    await userEvent.click(getFormElement('saveButton'));

    const goToPublishingButton = getFormElement('goToPublishing');
    const addNewOccurrenceButton = getOccurrenceFormElement('submit');

    await waitFor(() =>
      expect(toastSuccess).toHaveBeenCalledWith('Tiedot tallennettu')
    );

    await waitFor(() => expect(goToPublishingButton).toBeEnabled());
    await waitFor(() => expect(addNewOccurrenceButton).toBeEnabled());
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
        // FIXME: Some reason why this component needs a reload
        eventWithEnrolmentAndLocationInfoMockedResponse,
      ],
    });

    const toastSuccess = vi.spyOn(toast, 'success');

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

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

    await userEvent.click(enrolmentStartDateInput);
    await userEvent.clear(enrolmentStartDateInput);
    await userEvent.type(enrolmentStartDateInput, '1.5.2021');
    await userEvent.type(enrolmentStartHoursInput, '00');
    await userEvent.type(enrolmentStartMinutesInput, '00');

    await userEvent.clear(enrolmentEndDaysInput);
    await userEvent.type(enrolmentEndDaysInput, '2');

    await userEvent.clear(neededOccurrencesInput);
    await userEvent.type(neededOccurrencesInput, '3');

    await waitFor(() => expect(neededOccurrencesInput).toHaveValue(3));
    expect(enrolmentEndDaysInput).toHaveValue(2);
    expect(enrolmentStartDateInput).toHaveValue('1.5.2021');
    expect(enrolmentStartMinutesInput).toHaveValue('00');
    expect(enrolmentStartHoursInput).toHaveValue('00');

    await userEvent.click(getFormElement('saveButton'));

    const goToPublishingButton = getFormElement('goToPublishing');

    await waitFor(() =>
      expect(toastSuccess).toHaveBeenCalledWith('Tiedot tallennettu')
    );

    expect(goToPublishingButton).toBeEnabled();
  }, 30_000);

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
        // FIXME: Some reason why this component needs a reload
        eventWithMultipleLanguagesMockedResponse,
      ],
    });

    const toastSuccess = vi.spyOn(toast, 'success');

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
    await userEvent.clear(enrolmentEndDaysInput);
    await userEvent.type(enrolmentEndDaysInput, '2');

    await userEvent.click(getFormElement('saveButton'));

    await waitFor(() =>
      expect(toastSuccess).toHaveBeenCalledWith('Tiedot tallennettu')
    );
  });

  test('notification modal works correctly when info is not filled', async () => {
    vi.spyOn(Router, 'useNavigate').mockImplementation(() => navigate);

    // eslint-disable-next-line no-console
    const origConsoleLog = console.log;
    vi.spyOn(console, 'log').mockImplementation((message, ...args) => {
      const msgStr: string =
        typeof message === 'string' ? message : JSON.stringify(message);

      if (
        msgStr.includes('ValidationError') &&
        msgStr.includes('Tapahtumalla on oltava ainakin yksi tapahtuma-aika')
      ) {
        // This ValidationError is explicitly expected during this test and can
        // thus be omitted from the console.log output to make it cleaner.
      } else {
        // Show other console.log messages normally
        origConsoleLog(message, ...args);
      }
    });

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
      seatType: graphql.OccurrencesOccurrenceSeatTypeChoices.ChildrenCount,
      languages: ['fi', 'en'],
      minGroupSize: 10,
      maxGroupSize: 20,
      endTime: occurrenceEndDateTime,
      startTime: occurrenceStartDateTime,
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
      placeId,
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
    const { container } = renderComponent({
      mocks: [
        eventMockResponse,
        // refetch mock after saving
        updatedEventMockResponse,
        updatedEventWithOccurrenceMockResponse,
        updateEventMockResponse,
        addOccurrenceMockResponse,
        // FIXME: Some reason why this component needs a reload
        addOccurrenceMockResponse, // Mock used twice
        updatedEventWithOccurrenceMockResponse, // Mock used twice
      ],
    });
    Modal.setAppElement(container);

    const toastSuccess = vi.spyOn(toast, 'success');

    // Wait for form to have been initialized
    await screen.findByTestId('time-and-location-form');

    const goToPublishButton = screen.getByRole('button', {
      name: 'Siirry julkaisuun',
    });
    await userEvent.click(goToPublishButton);
    // form should be validated and errors should appear
    expect(
      await screen.findAllByText(/Tämä kenttä on pakollinen/i)
    ).toHaveLength(3);

    // Modal should not appear at this point
    expect(
      screen.queryByRole('dialog', { hidden: false })
    ).not.toBeInTheDocument();

    await selectLocation();

    const enrolmentStartDateInput = getFormElement('enrolmentStartDate');
    const enrolmentStartHoursInput = getFormElement('enrolmentStartHours');
    const enrolmentStartMinutesInput = getFormElement('enrolmentStartMinutes');
    const enrolmentEndDaysInput = getFormElement('enrolmentEndDays');

    await userEvent.click(enrolmentStartDateInput);
    await userEvent.type(enrolmentStartDateInput, formattedEnrolmentStartDate);
    await userEvent.type(enrolmentStartHoursInput, formattedEnrolmentStartTime);
    await userEvent.type(
      enrolmentStartMinutesInput,
      formattedEnrolmentStartTime
    );
    await userEvent.type(enrolmentEndDaysInput, '1');

    await waitFor(() =>
      expect(enrolmentStartDateInput).toHaveValue(formattedEnrolmentStartDate)
    );

    expect(toastSuccess).not.toHaveBeenCalled();

    // Try to go to publish page
    await userEvent.click(goToPublishButton);
    await waitFor(() => expect(toastSuccess).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(toastSuccess).toHaveBeenLastCalledWith('Tiedot tallennettu')
    );

    // Modal should only have complaint about needing at least one occurrence
    const withinModal2 = within(
      await screen.findByRole('dialog', { hidden: false })
    );
    const notExpectedModalTexts = [
      'Tapahtuman sijainti',
      'Ilmoittautumisen alkamisaika',
      'Ilmoittautumisen päättyminen',
    ];
    notExpectedModalTexts.forEach((text) => {
      expect(withinModal2.queryByText(text)).not.toBeInTheDocument();
    });
    expect(
      withinModal2.getByText(
        'Tapahtumalla on oltava ainakin yksi tapahtuma-aika'
      )
    ).toBeInTheDocument();

    // Close modal again
    await userEvent.click(withinModal2.getByRole('button', { name: 'Sulje' }));

    expect(
      screen.queryByTestId(occurrencesTableTestId)
    ).not.toBeInTheDocument();

    await fillAndSubmitOccurrenceForm({
      occurrenceStartDate,
      occurrenceStartTime,
      occurrenceEndTime,
    });

    const occurrencesTable = await screen.findByTestId(occurrencesTableTestId);

    // There should be one header row and one data row
    expect(within(occurrencesTable).getAllByRole('row')).toHaveLength(2);

    // The data row should be for "Sellon kirjasto" and should be removable
    expect(
      within(occurrencesTable).getAllByText(/sellon kirjasto/i)
    ).toHaveLength(1);
    expect(
      within(occurrencesTable).getAllByRole('button', {
        name: /poista tapahtuma-aika/i,
      })
    ).toHaveLength(1);

    await waitFor(() => expect(toastSuccess).toHaveBeenCalledTimes(2));
    await waitFor(() =>
      expect(toastSuccess).toHaveBeenLastCalledWith(
        'Tapahtuma-aika tallennettu'
      )
    );

    // Make sure the "Go to publish" button could be pressed
    expect(goToPublishButton).toBeVisible();
    expect(goToPublishButton).toBeEnabled();

    // FIXME: Occurrence gets saved a second time even when it shouldn't
    //        if the publish button is clicked. This explains why some mocks
    //        needed to be duplicated, but not the root cause why this happens.
    // await userEvent.click(goToPublishButton);

    // FIXME: Toast gets called a third time with "Tapahtuma-aika tallennettu",
    //        but it should not
    // await waitFor(() => expect(toastSuccess).toHaveBeenCalledTimes(2));

    // FIXME: the test is not working properly with requiredFieldsSchema.validateSync after dependency update
    // await waitFor(() => {
    //   expect(pushMock).toHaveBeenCalledWith(
    //     `/fi${ROUTES.EVENT_SUMMARY}`.replace(':id', eventId)
    //   );
    // });
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
        // FIXME: Some reason why this component needs a reload
        eventWithoutEnrolmentAndLocationInfoMockedResponse,
      ],
    });

    const toastSuccess = vi.spyOn(toast, 'success');

    // Wait for form to have been initialized
    await screen.findByTestId('time-and-location-form');
    await selectLocation();
    await screen.findByText('Test venue description');

    // Save event with no enrolment
    await userEvent.click(getFormElement('noEnrolmentButton'));

    // grup min and max input should be hidden
    expect(getOccurrenceFormElement('min')).not.toBeInTheDocument();
    expect(getOccurrenceFormElement('max')).not.toBeInTheDocument();
    expect(getOccurrenceFormElement('seats')).not.toBeInTheDocument();

    await userEvent.click(getFormElement('saveButton'));

    await waitFor(() => expect(toastSuccess).toHaveBeenCalled());
  });

  test('user can add external enrolment and save form', async () => {
    const externalEnrolmentUrl = 'https://kultus.hel.fi/';
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
        // FIXME: Some reason why this component needs a reload
        eventWithoutEnrolmentAndLocationInfoMockedResponse,
      ],
    });

    const toastSuccess = vi.spyOn(toast, 'success');

    // Wait for form to have been initialized
    await screen.findByTestId('time-and-location-form');
    await selectLocation();
    await screen.findByText('Test venue description');

    // should be found in the document before clicking externalEnrolment radio button
    expect(getOccurrenceFormElement('min')).toBeInTheDocument();
    expect(getOccurrenceFormElement('max')).toBeInTheDocument();

    const externalEnrolment = getFormElement('externalEnrolmentButton');
    await userEvent.click(externalEnrolment);
    expect(externalEnrolment).toBeChecked();
    const enrolmentUrlInput = getFormElement('enrolmentUrl');
    expect(enrolmentUrlInput).toHaveValue('');

    expect(
      screen.queryByText(/tämä kenttä on pakollinen/i)
    ).not.toBeInTheDocument();

    await userEvent.click(getFormElement('saveButton'));

    // externalEnrolmentButton is required
    await screen.findByText(/tämä kenttä on pakollinen/i);

    await userEvent.type(enrolmentUrlInput, externalEnrolmentUrl);

    // should be hidden when external enrolment is selected
    expect(getOccurrenceFormElement('min')).not.toBeInTheDocument();
    expect(getOccurrenceFormElement('max')).not.toBeInTheDocument();
    expect(getOccurrenceFormElement('seats')).not.toBeInTheDocument();

    await userEvent.click(getFormElement('saveButton'));

    await waitFor(() => expect(toastSuccess).toHaveBeenCalled());
  }, 20_000);
});
