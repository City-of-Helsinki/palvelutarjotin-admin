import { MockedProvider } from '@apollo/react-testing';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import { MyProfileDocument } from '../../../../generated/graphql';
import mockMyProfile from '../../../myProfile/__mocks__/myProfile.json';
import { store } from '../../store';
import PageLayout from '../PageLayout';

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

it('PageLayout matches snapshot', () => {
  const { container } = render(
    <MockedProvider mocks={mocks} addTypename={true}>
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <PageLayout>
            <div>Page layout children</div>
          </PageLayout>
        </MemoryRouter>
      </Provider>
    </MockedProvider>
  );
  expect(container.firstChild).toMatchSnapshot();
});
