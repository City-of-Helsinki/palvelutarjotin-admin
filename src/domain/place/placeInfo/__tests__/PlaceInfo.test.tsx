import { screen } from '@testing-library/react';
import * as React from 'react';

import { PlaceDocument } from '../../../../generated/graphql';
import {
  fakeLocalizedObject,
  fakePlace,
} from '../../../../utils/mockDataUtils';
import { customRender } from '../../../../utils/testUtils';
import PlaceInfo from '../PlaceInfo';

const placeResult = {
  data: {
    place: fakePlace({
      name: fakeLocalizedObject('Sellon kirjasto'),
      streetAddress: fakeLocalizedObject('Leppävaarankatu 9'),
      telephone: fakeLocalizedObject('123321123'),
      addressLocality: fakeLocalizedObject('testi'),
    }),
  },
};

const placeId = placeResult.data.place.id;

const mocks = [
  {
    request: {
      query: PlaceDocument,
      variables: { id: placeId },
    },
    result: placeResult,
  },
];

test('PlaceInfo should match snapshot', async () => {
  const { container } = customRender(
    <PlaceInfo language="fi" id={placeId!} />,
    {
      mocks,
    }
  );

  expect(await screen.findByText('Sellon kirjasto')).toBeInTheDocument();

  expect(container.firstChild).toMatchSnapshot();
});
