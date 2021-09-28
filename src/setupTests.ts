/* eslint-disable no-console */
import './test/testi18nInit';
import '@testing-library/jest-dom/extend-expect';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure } from 'enzyme';
import { toHaveNoViolations } from 'jest-axe';
import * as React from 'react';

import { server } from './test/msw/server';

expect.extend(toHaveNoViolations);

jest.setTimeout(50000);

(React.useLayoutEffect as any) = React.useEffect;

// Mock scrollTo function
window.scrollTo = jest.fn();

configure({ adapter: new Adapter() });

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

const originalWarn = console.warn.bind(console.warn);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
console.warn = (msg: any, ...optionalParams: any[]) =>
  !msg
    .toString()
    .includes(
      'Using ReactElement as a label is against good usability and accessibility practices.'
    ) && originalWarn(msg, ...optionalParams);
