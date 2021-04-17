/* eslint-disable @typescript-eslint/no-explicit-any */
import userEvent from '@testing-library/user-event';
import { advanceTo } from 'jest-date-mock';
import * as React from 'react';
import Router from 'react-router';

import {
  contactEmail,
  contactPhoneNumber,
  createFinnishLocalisedObject,
  description,
  editMocks,
  eventName,
  infoUrl,
  keywordMockResponse,
  organizationName,
  personName,
  photoAltText,
  photographerName,
  shortDescription,
  venueDescription,
  venueQueryResponse,
} from '../../../test/EventPageTestUtil';
import { render, screen, waitFor, within } from '../../../utils/testUtils';
import apolloClient from '../../app/apollo/apolloClient';
import EditEventPage, { NAVIGATED_FROM } from '../EditEventPage';

beforeEach(() => {
  jest.spyOn(Router, 'useParams').mockReturnValue({
    id: '123',
  });
});

jest
  .spyOn(apolloClient, 'readQuery')
  .mockImplementation(({ variables }: any) => {
    if (variables.id === 'yso:p4363') {
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
    'name.fi': eventName,
    'shortDescription.fi': shortDescription,
    'infoUrl.fi': infoUrl,
    contactEmail: contactEmail,
    contactPhoneNumber: contactPhoneNumber,
    enrolmentStart: '13.08.2020 03:45',
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

  userEvent.click(
    screen.getByRole('button', {
      name: 'Tallenna',
    })
  );

  await waitFor(() => {
    expect(goBack).toHaveBeenCalled();
  });
});

test('virtual event checkbox works correctly', async () => {
  const { history } = render(<EditEventPage />, { mocks: editMocks });

  const goBack = jest.spyOn(history, 'goBack');

  expect(screen.queryByTestId('loading-spinner')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.queryByText(organizationName)).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getAllByText('Sellon kirjasto')).toHaveLength(2);
  });

  userEvent.click(
    screen.getByRole('checkbox', {
      name: /tapahtuma järjestetään virtuaalisesti/i,
    })
  );

  // Location shouldn't be shown after virtual event checkbox has been clicked
  await waitFor(() => {
    expect(screen.queryByText('Sellon kirjasto')).not.toBeInTheDocument();
  });

  userEvent.click(
    screen.getByRole('button', {
      name: 'Tallenna',
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
    routes: [`/moi?navigationFrom=${NAVIGATED_FROM.OCCURRENCES}`],
  });

  const historyPush = jest.spyOn(history, 'push');

  await waitFor(() => {
    expect(
      screen.queryByText('Kulttuurin ja vapaa-ajan toimiala')
    ).toBeInTheDocument();
  });

  userEvent.type(screen.getByLabelText(/Tapahtuman nimi/), 'Testinimi');

  await waitFor(() => {
    expect(
      screen.queryByText('Sivulla on tallentamattomia muutoksia')
    ).toBeInTheDocument();
  });

  userEvent.click(
    screen.getByRole('button', {
      name: 'Tallenna',
    })
  );

  await waitFor(() => {
    expect(historyPush).toHaveBeenCalledWith(
      '/fi/events/123/occurrences/create'
    );
  });
});
