import { MockedResponse } from '@apollo/client/testing';

import { Place, PlaceDocument } from '../../generated/graphql';
import { fakePlace } from '../../utils/mockDataUtils';

export const createPlaceQueryMock = (
  overrides: Partial<Place> & { id: Place['id'] }
): MockedResponse => ({
  request: {
    query: PlaceDocument,
    variables: {
      id: overrides.id,
    },
  },
  result: {
    data: {
      place: fakePlace(overrides),
    },
  },
});

export const createNotFoundPlaceQueryMock = (
  id: Place['id']
): MockedResponse => ({
  request: {
    query: PlaceDocument,
    variables: { id },
  },
  result: {
    errors: [
      {
        message: '404 Client Error: Not Found',
        extensions: { code: 'GENERAL_ERROR' },
      },
    ],
    data: {
      place: null,
    },
  },
});
