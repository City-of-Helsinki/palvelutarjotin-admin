/* eslint-disable @typescript-eslint/no-explicit-any */
import userEvent from '@testing-library/user-event';
import { advanceTo } from 'jest-date-mock';
import * as React from 'react';
import Router from 'react-router';

import {
  contactEmail,
  contactPhoneNumber,
  defaultOrganizationName,
  description,
  editMocks,
  eventId,
  eventName,
  infoUrl,
  keyword,
  keywordId,
  keywordMockResponse,
  personName,
  photoAltText,
  photographerName,
  shortDescription,
  venueQueryResponse,
} from '../../../test/EventPageTestUtil';
import { render, screen, waitFor, within } from '../../../utils/testUtils';
import apolloClient from '../../app/apollo/apolloClient';
import EditEventPage, { NAVIGATED_FROM } from '../EditEventPage';

beforeEach(() => {
  jest.spyOn(Router, 'useParams').mockReturnValue({
    id: eventId,
  });
});

jest
  .spyOn(apolloClient, 'readQuery')
  .mockImplementation(({ variables }: any) => {
    if (variables.id === keywordId) {
      return keywordMockResponse;
    }
  });
jest.spyOn(apolloClient, 'query').mockResolvedValue(venueQueryResponse as any);

jest
  .spyOn(apolloClient, 'readQuery')
  .mockReturnValue(venueQueryResponse as any);

// Venue mutation mock
jest.spyOn(apolloClient, 'mutate').mockResolvedValue({});

advanceTo(new Date(2020, 7, 5));

test('edit event form initializes and submits correctly', async () => {
  const { history } = render(<EditEventPage />, { mocks: editMocks });

  const goBack = jest.spyOn(history, 'goBack');

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });
  await screen.findByText(defaultOrganizationName);
  await screen.findByText(keyword);

  expect(screen.getByLabelText(/Tapahtuman nimi/i)).toHaveValue(eventName);

  expect(screen.getByTestId('event-form')).toHaveFormValues({
    'name.fi': eventName,
    'shortDescription.fi': shortDescription,
    'infoUrl.fi': infoUrl,
    contactEmail: contactEmail,
    contactPhoneNumber: contactPhoneNumber,
    imagePhotographerName: photographerName,
    imageAltText: photoAltText,
  });

  expect(screen.getByLabelText(/Kuvaus/)).toHaveTextContent(description);

  const contactInfo = within(screen.getByTestId('contact-info'));
  expect(
    contactInfo.getByLabelText(/Nimi/, { selector: 'button' })
  ).toHaveTextContent(personName);

  userEvent.type(screen.getByLabelText(/Tapahtuman nimi/), 'Testinimi');

  await screen.findByText('Sivulla on tallentamattomia muutoksia');

  userEvent.click(
    screen.getByRole('button', {
      name: 'Tallenna tiedot',
    })
  );

  await waitFor(() => {
    expect(goBack).toHaveBeenCalled();
  });
});

test('returns to create occurrences page when it should after saving', async () => {
  jest
    .spyOn(apolloClient, 'query')
    .mockResolvedValue(venueQueryResponse as any);
  const { history } = render(<EditEventPage />, {
    mocks: editMocks,
    routes: [`/moi?navigatedFrom=${NAVIGATED_FROM.OCCURRENCES}`],
  });

  const historyPush = jest.spyOn(history, 'push');

  await screen.findByText(defaultOrganizationName);

  userEvent.type(screen.getByLabelText(/Tapahtuman nimi/), 'Testinimi');

  await screen.findByText('Sivulla on tallentamattomia muutoksia');

  userEvent.click(
    screen.getByRole('button', {
      name: 'Tallenna tiedot',
    })
  );

  await waitFor(() => {
    expect(historyPush).toHaveBeenCalledWith(
      `/fi/events/${eventId}/occurrences/create`
    );
  });
});
