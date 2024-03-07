import * as React from 'react';
import { MockedResponse } from '@apollo/client/testing';
import { vi } from 'vitest';

import Footer from '../Footer';
import { render, screen } from '../../../../utils/testUtils';
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
  const { container } = render(<Footer />, { mocks });
  await screen.findByText('Kouluille ja päiväkodeille');
  expect(container.firstChild).toMatchSnapshot();
});
