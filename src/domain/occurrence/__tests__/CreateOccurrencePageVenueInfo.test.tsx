import { MockedResponse } from '@apollo/client/testing';
import { advanceTo, clear } from 'jest-date-mock';
import React from 'react';
import { toast } from 'react-toastify';

import {
  baseApolloMocks,
  editVenueMockResponse,
  eventId,
  getEventMockedResponse,
  getFormElement,
  getUpdateEventMockResponse,
  getVenueCheckbox,
} from '../../../test/CreateOccurrencePageTestUtils';
import {
  configure,
  renderWithRoute,
  screen,
  userEvent,
  waitFor,
} from '../../../utils/testUtils';
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
    const updateEventWithMultipleLanguagesMockResponse =
      getUpdateEventMockResponse({
        languages: ['fi', 'sv', 'en'],
        autoAcceptance: true,
        enrolmentEndDays,
        enrolmentStart: enrolmentStartDateTimeValue,
        neededOccurrences,
      });
    renderComponent({
      mocks: [
        editVenueMockResponse,
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

    await waitFor(
      () => {
        expect(toastSuccess).toHaveBeenCalledWith('Tiedot tallennettu');
      },
      { timeout: 10000 }
    );
  });
});
