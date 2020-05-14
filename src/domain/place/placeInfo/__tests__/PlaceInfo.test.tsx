import { MockedProvider } from '@apollo/react-testing';
import pretty from 'pretty';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import wait from 'waait';

import mockPlace from '../../__mocks__/place.json';
import { PlaceDocument } from '../../../../generated/graphql';
import PlaceInfo from '../PlaceInfo';

const placeId = mockPlace.data.place.id;

const mocks = [
  {
    request: {
      query: PlaceDocument,
      variables: { id: placeId },
    },
    result: {
      ...mockPlace,
    },
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let container: any = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('PlaceInfo should match snapshot', async () => {
  await act(async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PlaceInfo id={placeId} />
      </MockedProvider>,
      container
    );

    await wait(); // wait for response
  });

  expect(pretty(container.innerHTML)).toMatchSnapshot();
});
