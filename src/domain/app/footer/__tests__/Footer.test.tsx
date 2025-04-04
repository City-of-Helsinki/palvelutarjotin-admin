import * as React from 'react';
import { MockedResponse } from '@apollo/client/testing';
import { vi } from 'vitest';
import { screen } from '@testing-library/react';

import Footer from '../Footer';
import { customRender } from '../../../../utils/testUtils';
import { footerMenuMock } from '../../../../test/apollo-mocks/footerMenuMock';
import { languagesMock } from '../../../../test/apollo-mocks/languagesMock';

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
