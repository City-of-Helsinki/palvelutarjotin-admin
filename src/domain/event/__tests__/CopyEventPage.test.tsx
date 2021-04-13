import userEvent from '@testing-library/user-event';
import apolloClient from 'apollo-client';
import { advanceTo } from 'jest-date-mock';
import React from 'react';

import { render, screen, waitFor, within } from '../../../utils/testUtils';
import CopyEventPage from '../CopyEventPage';
import {
  contactEmail,
  contactPersonId,
  contactPhoneNumber,
  description,
  eventId,
  eventName,
  infoUrl,
  keywordId,
  keywordMockResponse,
  mocks,
  organizationName,
  personId,
  personName,
  photoAltText,
  photographerName,
  placeId,
  placeName,
  shortDescription,
  venueDescription,
  venueQueryResponse,
} from './EditEventPage.test';

advanceTo(new Date(2020, 7, 5));

test('copied event is initialized correctly', async () => {
  render(<CopyEventPage />, { mocks });

  expect(screen.queryByTestId('loading-spinner')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.queryByText(organizationName)).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByLabelText(/Tapahtuman nimi/i)).toHaveValue(eventName);
    expect(screen.queryByText('perheet')).toBeInTheDocument();
    expect(screen.getByLabelText(/Tapahtumapaikan kuvaus/i)).toHaveTextContent(
      venueDescription
    );
  });

  expect(screen.getByTestId('event-form')).toHaveFormValues({
    name: eventName,
    shortDescription: shortDescription,
    infoUrl: infoUrl,
    contactEmail: contactEmail,
    contactPhoneNumber: contactPhoneNumber,
    enrolmentStart: '',
    enrolmentEndDays: 3,
    neededOccurrences: 3,
    imagePhotographerName: photographerName,
    imageAltText: photoAltText,
  });

  expect(screen.getByLabelText(/Kuvaus/)).toHaveTextContent(description);

  const contactInfo = within(screen.getByTestId('contact-info'));
  expect(
    contactInfo.getByLabelText(/Nimi/, { selector: 'button' })
  ).toHaveTextContent(personName);

  await waitFor(() => {
    expect(screen.getAllByText('Sellon kirjasto')).toHaveLength(2);
  });

  expect(screen.getByLabelText('Ulkovaatesäilytys')).toBeChecked();
  expect(screen.getByLabelText('Eväidensyöntipaikka')).toBeChecked();

  userEvent.type(screen.getByLabelText(/Tapahtuman nimi/), 'Testinimi');

  await waitFor(() => {
    expect(
      screen.queryByText('Sivulla on tallentamattomia muutoksia')
    ).toBeInTheDocument();
  });

  expect(
    screen.getByRole('button', {
      name: 'Tallenna ja siirry tapahtuma-aikoihin',
    })
  ).toBeInTheDocument();
});
