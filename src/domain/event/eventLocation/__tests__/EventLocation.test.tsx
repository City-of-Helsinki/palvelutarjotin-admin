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

  await screen.findByRole('heading', { name: 'Tapahtumapaikka' });
  await screen.findByText(`${placeName}, ${streetAddress}`);
  await screen.findByText(streetAddress);
  await screen.findByRole('link', {
    name: 'https://palvelukartta.hel.fi/fi/unit/15376',
  });
  await screen.findByText(/eväidensyöntipaikka/i);
  await screen.findByText(/vaatesäilytys/i);
});
