import { MockedProvider } from '@apollo/react-testing';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import { MyProfileDocument } from '../../../../generated/graphql';
import mockMyProfile from '../../../myProfile/__mocks__/myProfile.json';
import { store } from '../../store';
import MobileNavbar from '../MobileNavbar';

const mocks = [
  {
    request: {
      query: MyProfileDocument,
    },
    result: {
      ...mockMyProfile,
    },
  },
];

it('MobileNavbar matches snapshot', () => {
  const { container } = render(
    <MockedProvider mocks={mocks}>
      <Provider store={store}>
        <MemoryRouter>
          <MobileNavbar />
        </MemoryRouter>
      </Provider>
    </MockedProvider>
  );
  expect(container.firstChild).toMatchSnapshot();
});
