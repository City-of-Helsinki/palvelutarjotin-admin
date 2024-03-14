import * as React from 'react';
import { MockedResponse } from '@apollo/client/testing';
import {
  LanguagesDocument,
  MenuDocument,
} from 'react-helsinki-headless-cms/apollo';
import { vi } from 'vitest';

import Footer from '../Footer';
import { render, screen } from '../../../../utils/testUtils';
import { FOOTER_MENU_NAME } from '../../../../headless-cms/constants';
import languagesResponse from '../../../../test/apollo-mocks/queryResponses/languages.json';
import footerMenuResponse from '../../../../test/apollo-mocks/queryResponses/footerMenu.json';

vi.mock('hds-react', async () => {
  const actual = await vi.importActual('hds-react');
  return {
    ...actual,
    logoFi: 'mocked hds-react logoFi',
  };
});

const mocks: MockedResponse[] = [
  {
    request: {
      query: MenuDocument,
      variables: {
        id: FOOTER_MENU_NAME['fi'],
        menuIdentifiersOnly: true,
      },
    },
    result: footerMenuResponse,
  },
  {
    request: {
      query: LanguagesDocument,
    },
    result: languagesResponse,
  },
];

it('Footer matches snapshot', async () => {
  const { container } = render(<Footer />, { mocks });
  await screen.findByText('Kouluille ja päiväkodeille');
  expect(container.firstChild).toMatchSnapshot();
});
