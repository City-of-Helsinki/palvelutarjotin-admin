import * as React from 'react';

import { MyProfileDocument } from '../../../../generated/graphql';
import { fakePerson } from '../../../../utils/mockDataUtils';
import { render, screen, userEvent } from '../../../../utils/testUtils';
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
  const { container } = render(<Header />, { mocks });
  expect(container.firstChild).toMatchSnapshot();
});

it('focuses skip link first', () => {
  render(<Header />);
  userEvent.tab();
  expect(screen.getByText('Siirry sisältöön')).toHaveFocus();
});
