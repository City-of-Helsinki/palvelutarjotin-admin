/* eslint-disable no-console */
import './test/testi18nInit';
import '@testing-library/jest-dom/extend-expect';

import { toHaveNoViolations } from 'jest-axe';
import * as React from 'react';
import { TextDecoder, TextEncoder } from 'util';

import { server } from './test/msw/server';
// To avoid error: ReferenceError: TextEncoder is not defined
// discussed here: https://github.com/jsdom/jsdom/issues/2524
global.TextEncoder = TextEncoder;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.TextDecoder = TextDecoder as any;

expect.extend(toHaveNoViolations);

jest.setTimeout(50000);

(React.useLayoutEffect as any) = React.useEffect;

// Mock scrollTo function
window.scrollTo = jest.fn();

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
