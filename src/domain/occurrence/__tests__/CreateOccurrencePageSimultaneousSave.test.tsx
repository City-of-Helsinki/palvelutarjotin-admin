import { MockedResponse } from '@apollo/client/testing';
import { parse as parseDate } from 'date-fns';
import * as React from 'react';
import * as Router from 'react-router-dom';
import { toast } from 'react-toastify';
import { vi } from 'vitest';

import { OccurrenceNode } from '../../../generated/graphql';
import * as graphql from '../../../generated/graphql';
import {
  baseApolloMocks,
  eventId,
  fillAndSubmitOccurrenceForm,
  getAddOccurrenceMockResponse,
  getDefaultOccurrenceValues,
  getEventMockedResponse,
  getFormElement,
  getUpdateEventMockResponse,
  placeId,
  venueDescription,
} from '../../../test/CreateOccurrencePageTestUtils';
import { fakeLanguages, fakeOccurrences } from '../../../utils/mockDataUtils';
import {
  configure,
  renderWithRoute,
  screen,
  userEvent,
  waitFor,
} from '../../../utils/testUtils';
import {
  DATETIME_FORMAT,
  formatIntoDate,
  formatIntoTime,
} from '../../../utils/time/format';
import { ROUTES } from '../../app/routes/constants';
import CreateOccurrencePage from '../CreateOccurrencePage';

const navigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
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

describe('save occurrence and event info simultaneously', () => {
  const fillForm = async () => {
    const enrolmentStartDateTimeValue = '2021-05-03T21:00:00.000Z';
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
      endTime: occurrenceEndDateTime,
      startTime: occurrenceStartDateTime,
    };
    const formattedEnrolmentStartDate = formatIntoDate(
      new Date(enrolmentStartDateTimeValue)
    );
    const formattedEnrolmentStartTime = formatIntoTime(
      new Date(enrolmentStartDateTimeValue)
    );
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
      autoAcceptance: true,
      enrolmentEndDays: 1,
      enrolmentStart: enrolmentStartDateTimeValue,
      neededOccurrences: 1,
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
        eventWithoutEnrolmentAndLocationInfoMockedResponse,
        updateEventMockResponse,
        getEventMockedResponse({
          occurrences: fakeOccurrences(1, [occurrence1]),
        }),
        addOccurrenceMockResponse,
      ],
    });

    // Wait for form to have been initialized
    await screen.findByTestId('time-and-location-form');

    const locationInput = getFormElement('location');
    expect(locationInput.parentElement).toHaveTextContent('');

    await userEvent.click(locationInput);
    await userEvent.type(locationInput, 'Sellon');

    const place = await screen.findByText(/Sellon kirjasto/i);
    await userEvent.click(place);

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

    const enrolmentStartDateTimeInput = getFormElement('enrolmentStartDate');
    const enrolmentStartHoursInput = getFormElement('enrolmentStartHours');
    const enrolmentStartMinutesInput = getFormElement('enrolmentStartMinutes');
    const enrolmentEndDaysInput = getFormElement('enrolmentEndDays');

    const [startHours, startMinutes] = formattedEnrolmentStartTime.split(':');

    await userEvent.click(enrolmentStartDateTimeInput);
    await userEvent.type(
      enrolmentStartDateTimeInput,
      formattedEnrolmentStartDate
    );
    await userEvent.type(enrolmentStartHoursInput, startHours);
    await userEvent.type(enrolmentStartMinutesInput, startMinutes);
    await userEvent.type(enrolmentEndDaysInput, '1');

    await waitFor(() => {
      expect(enrolmentStartDateTimeInput).toHaveValue(
        formattedEnrolmentStartDate
      );
    });
    expect(enrolmentStartHoursInput).toHaveValue(startHours);
    expect(enrolmentStartMinutesInput).toHaveValue(startMinutes);

    await fillAndSubmitOccurrenceForm({
      occurrenceStartDate,
      occurrenceStartTime,
      occurrenceEndTime,
      submit: false,
    });
  };

  it('saves occurrence and event info when using save button', async () => {
    vi.setSystemTime('2021-04-02');
    const toastSuccess = vi.spyOn(toast, 'success');

    await fillForm();
    await userEvent.click(getFormElement('saveButton'));

    await waitFor(() => {
      expect(toastSuccess).toHaveBeenCalledTimes(2);
    });

    expect(toastSuccess).toHaveBeenCalledWith('Tapahtuma-aika tallennettu');
    expect(toastSuccess).toHaveBeenCalledWith('Tiedot tallennettu');
  }, 70_000);

  it('saves occurrence and event info when using to go to publish button', async () => {
    vi.spyOn(Router, 'useNavigate').mockImplementation(() => navigate);
    vi.setSystemTime('2021-04-02');
    const toastSuccess = vi.spyOn(toast, 'success');
    await fillForm();

    await userEvent.click(getFormElement('goToPublishing'));

    await waitFor(() => {
      expect(toastSuccess).toHaveBeenCalledTimes(2);
    });

    expect(toastSuccess).toHaveBeenCalledWith('Tapahtuma-aika tallennettu');
    expect(toastSuccess).toHaveBeenCalledWith('Tiedot tallennettu');

    // FIXME: Broken after dependency upgrade
    // await waitFor(() => {
    //   expect(navigate).toHaveBeenCalledWith(`/fi/events/${eventId}/summary`);
    // });
  }, 20_000);
});
