import { MockedResponse } from '@apollo/client/testing';
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
  waitFor,
} from '../../../utils/testUtils';
import { ROUTES } from '../../app/routes/constants';
import CreateOccurrencePage from '../CreateOccurrencePage';

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

describe('venue info', () => {
  test(
    'venue data can be changed and saved',
    async () => {
      vi.setSystemTime('2021-04-02');
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
      const { user } = renderComponent({
        mocks: [
          editVenueMockResponse,
          eventWithMultipleLanguagesMockedResponse,
          eventWithMultipleLanguagesMockedResponse,
          updateEventWithMultipleLanguagesMockResponse,
        ],
      });

      const toastSuccess = vi.spyOn(toast, 'success');

      // Wait for form to have been initialized
      await screen.findByTestId('time-and-location-form');

      const venueDescriptionInput = await screen.findByRole('textbox', {
        name: /tapahtumapaikan kuvaus \(en\)/i,
      });

      // FIXME: https://github.com/testing-library/user-event/discussions/970
      await user.type(venueDescriptionInput, 'fixme');
      await user.clear(venueDescriptionInput);
      await user.type(venueDescriptionInput, 'Changed venue description');
      await waitFor(() =>
        expect(venueDescriptionInput).toHaveValue('Changed venue description')
      );

      const hasOutdoorPlayingAreaCheckbox = getVenueCheckbox(
        'hasOutdoorPlayingArea'
      );
      const hasToiletNearby = getVenueCheckbox('hasToiletNearby');

      await user.click(hasToiletNearby);
      await user.click(hasOutdoorPlayingAreaCheckbox);
      await waitFor(() => expect(hasToiletNearby).toBeChecked());
      await waitFor(() => expect(hasOutdoorPlayingAreaCheckbox).toBeChecked());

      await user.click(getFormElement('saveButton'));

      await waitFor(
        () => {
          expect(toastSuccess).toHaveBeenCalledWith('Tiedot tallennettu');
        },
        { timeout: 10_000 }
      );
    },
    { timeout: 20_000 }
  );
});
