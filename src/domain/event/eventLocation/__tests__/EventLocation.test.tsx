import { MockedProvider } from '@apollo/react-testing';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Router from 'react-router';

import eventData from '../__mocks__/eventData.json';
import placeResponse from '../__mocks__/placeResponse.json';
import venueResponse from '../__mocks__/venueResponse.json';
import {
  EventQuery,
  PlaceDocument,
  VenueDocument,
} from '../../../../generated/graphql';
import EventLocation from '../EventLocation';

beforeEach(() => {
  jest.spyOn(Router, 'useHistory').mockReturnValue({} as any);
});

const mocks = [
  {
    request: {
      query: PlaceDocument,
      variables: {
        id: eventData.event.location.id,
      },
    },
    result: placeResponse,
  },
  {
    request: {
      query: VenueDocument,
      variables: {
        id: eventData.event.location.id,
      },
    },
    result: venueResponse,
  },
];

test('matches snapshot', async () => {
  render(
    <MockedProvider mocks={mocks}>
      <EventLocation
        eventData={eventData as EventQuery}
        language={'fi' as any}
      />
    </MockedProvider>
  );

  await screen.findByText('Tapahtumapaikan kuvaus');

  expect(
    screen.queryByRole('heading', { name: 'Tapahtumapaikka' })
  ).toBeVisible();
  expect(screen.queryByText('Soukan kirjasto, Soukantie 4')).toBeVisible();
  expect(screen.queryByText('Soukantie 4')).toBeVisible();
  expect(
    screen.queryByText('https://palvelukartta.hel.fi/fi/unit/15376')
  ).toBeVisible();
  expect(screen.queryByText('Eväidensyöntipaikka')).toBeVisible();
  expect(screen.queryByText('Vaatesäilytys')).toBeVisible();
});
