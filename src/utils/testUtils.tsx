import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import { createMemoryHistory, History } from 'history';
import React from 'react';
import { Router } from 'react-router';

export const arrowUpKeyPressHelper = () =>
  fireEvent.keyDown(document, { code: 38, key: 'ArrowUp' });

export const arrowDownKeyPressHelper = () =>
  fireEvent.keyDown(document, { code: 40, key: 'ArrowDown' });

export const escKeyPressHelper = () =>
  fireEvent.keyDown(document, { code: 27, key: 'Escape' });

export const tabKeyPressHelper = () =>
  fireEvent.keyDown(document, { code: 9, key: 'Tab' });

const customRender: CustomRender = (
  ui,
  {
    routes = ['/'],
    history = createMemoryHistory({ initialEntries: routes }),
    mocks = [],
  } = {}
) => {
  const Wrapper: React.FC = ({ children }) => (
    <MockedProvider mocks={mocks}>
      <Router history={history}>{children}</Router>
    </MockedProvider>
  );

  const renderResult = render(ui, { wrapper: Wrapper });
  return { ...renderResult, history };
};

type CustomRender = {
  (
    ui: React.ReactElement,
    options?: {
      routes?: string[];
      history?: History;
      mocks?: MockedResponse[];
    }
  ): CustomRenderResult;
};

type CustomRenderResult = RenderResult & { history: History };

export { customRender as render };

// re-export everything
export * from '@testing-library/react';
export { render as defaultRender } from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
