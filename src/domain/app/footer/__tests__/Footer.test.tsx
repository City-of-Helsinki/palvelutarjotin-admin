import { MockedResponse } from '@apollo/client/testing';
import { screen } from '@testing-library/react';
import * as React from 'react';
import { vi } from 'vitest';

import { footerMenuMock } from '../../../../test/apollo-mocks/footerMenuMock';
import { languagesMock } from '../../../../test/apollo-mocks/languagesMock';
import { customRender } from '../../../../utils/testUtils';
import Footer from '../Footer';

vi.mock('hds-react', async () => {
  const actual = await vi.importActual('hds-react');
  return {
    ...actual,
    logoFi: 'mocked hds-react logoFi',
  };
});

const mocks: MockedResponse[] = [{ ...footerMenuMock }, { ...languagesMock }];

it('Footer matches snapshot', async () => {
  const { container } = customRender(<Footer />, { mocks });
  await screen.findByText('Kouluille ja päiväkodeille');
  expect(container.firstChild).toMatchSnapshot();
});
