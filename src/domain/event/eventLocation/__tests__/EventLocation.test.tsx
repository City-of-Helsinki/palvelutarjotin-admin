import * as React from 'react';

import { PlaceDocument, VenueDocument } from '../../../../generated/graphql';
import {
  fakeEvent,
  fakeLocalizedObject,
  fakePlace,
  fakeVenue,
} from '../../../../utils/mockDataUtils';
import { render, screen } from '../../../../utils/testUtils';
import EventLocation from '../EventLocation';

const streetAddress = 'Soukantie 4';
const placeName = 'Soukan kirjasto';

const event = fakeEvent({
  location: fakePlace({
    streetAddress: fakeLocalizedObject(streetAddress),
    name: fakeLocalizedObject(placeName),
    id: 'tprek:15376',
  }),
});

const venueResponse = {
  data: {
    venue: fakeVenue({ hasSnackEatingPlace: true, hasClothingStorage: true }),
  },
};

const placeResponse = {
  data: {
    place: fakePlace({
      streetAddress: fakeLocalizedObject(streetAddress),
      name: fakeLocalizedObject(placeName),
    }),
  },
};

const mocks = [
  {
    request: {
      query: PlaceDocument,
      variables: {
        id: event.location.id,
      },
    },
    result: placeResponse,
  },
  {
    request: {
      query: VenueDocument,
      variables: {
        id: event.location.id,
      },
    },
    result: venueResponse,
  },
];

test('renders correctly', async () => {
  render(<EventLocation eventData={{ event }} language={'fi' as any} />, {
    mocks,
  });

  await screen.findByText('Tapahtumapaikan kuvaus');

  expect(
    screen.queryByRole('heading', { name: 'Tapahtumapaikka' })
  ).toBeVisible();
  expect(screen.queryByText(`${placeName}, ${streetAddress}`)).toBeVisible();
  expect(screen.queryByText(streetAddress)).toBeVisible();
  expect(
    screen.queryByText('https://palvelukartta.hel.fi/fi/unit/15376')
  ).toBeVisible();
  expect(screen.queryByText('Eväidensyöntipaikka')).toBeVisible();
  expect(screen.queryByText('Vaatesäilytys')).toBeVisible();
});
