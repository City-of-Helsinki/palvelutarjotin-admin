import * as React from 'react';
import { faker } from '@faker-js/faker';
import { screen } from '@testing-library/react';

import { PlaceDocument, VenueDocument } from '../../../../generated/graphql';
import {
  fakeEvent,
  fakeLocalizedObject,
  fakePlace,
  fakeVenue,
} from '../../../../utils/mockDataUtils';
import { customRender } from '../../../../utils/testUtils';
import EventLocation from '../EventLocation';

const streetAddress = 'Soukantie 4';
const placeName = 'Soukan kirjasto';
const placeId = 'tprek:15376';

const event = fakeEvent({
  location: fakePlace({
    streetAddress: fakeLocalizedObject(streetAddress),
    name: fakeLocalizedObject(placeName),
    id: placeId,
  }),
});

const venueResponse = {
  data: {
    venue: fakeVenue({
      hasSnackEatingPlace: true,
      hasClothingStorage: true,
      id: placeId,
    }),
  },
};

const placeResponse = {
  data: {
    place: fakePlace({
      id: event?.location?.id ?? faker.string.uuid(),
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
        id: placeId,
      },
    },
    result: placeResponse,
  },
  {
    request: {
      query: VenueDocument,
      variables: {
        id: placeId,
      },
    },
    result: venueResponse,
  },
];

test('renders correctly', async () => {
  customRender(<EventLocation eventData={{ event }} language={'fi' as any} />, {
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
