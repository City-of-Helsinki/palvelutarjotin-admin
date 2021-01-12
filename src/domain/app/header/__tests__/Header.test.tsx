import { MockedProvider } from '@apollo/react-testing';
import { render } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import { MyProfileDocument } from '../../../../generated/graphql';
import { fakePerson } from '../../../../utils/mockDataUtils';
import { store } from '../../store';
import Header from '../Header';

const profileResponse = {
  data: {
    myProfile: fakePerson(),
  },
};

const mocks = [
  {
    request: {
      query: MyProfileDocument,
    },
    result: profileResponse,
  },
];

it('Header matches snapshot', () => {
  const { container } = render(
    <MockedProvider mocks={mocks}>
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    </MockedProvider>
  );
  expect(container.firstChild).toMatchSnapshot();
});
