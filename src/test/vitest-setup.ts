import dotenv from 'dotenv';
import { cleanup } from '@testing-library/react';
import * as matchers from 'vitest-axe/matchers';
import { beforeEach, beforeAll, afterEach, afterAll, vi, expect } from 'vitest';

import { server } from './msw/server';
import i18n from './testi18nInit';

import '@testing-library/jest-dom/vitest';

dotenv.config({ path: './.env.test' });

expect.extend(matchers);

// eslint-disable-next-line no-console
const originalConsoleError = console.error;
// eslint-disable-next-line no-console
console.error = (message) => {
  // Hide CSS processing failure in JSDOM
  // @see https://github.com/jsdom/jsdom/issues/2005
  // @example "Error: Could not parse CSS stylesheet"
  //          at exports.createStylesheet
  //             (jsdom/lib/jsdom/living/helpers/stylesheets.js)
  //          at HTMLStyleElementImpl._updateAStyleBlock
  //             (jsdom/lib/jsdom/living/nodes/HTMLStyleElement-impl.js)
  if (
    message &&
    typeof message === 'string' &&
    message.startsWith('Error: Could not parse CSS stylesheet') &&
    message.includes('jsdom') &&
    message.includes('at HTMLStyleElementImpl._updateAStyleBlock')
  ) {
    return;
  }
  originalConsoleError(message);
};

// eslint-disable-next-line no-console
const originalConsoleWarn = console.warn;
// eslint-disable-next-line no-console
console.warn = (msg, ...optionalParams) => {
  // Hide Helsinki Design System's RadioButton warning from:
  // eslint-disable-next-line max-len
  // https://github.com/City-of-Helsinki/helsinki-design-system/blob/v3.5.0/packages/react/src/components/radioButton/RadioButton.tsx#L65
  if (
    msg
      .toString()
      .startsWith(
        'Using ReactElement as a label is against good usability and accessibility practices.'
      )
  ) {
    return;
  }
  originalConsoleWarn(msg, ...optionalParams);
};

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockScrollTo = vi.fn((x?: number | ScrollToOptions, y?: number) => {});

window.scrollTo = mockScrollTo;

beforeEach(() => {
  i18n.changeLanguage('fi');
});

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

// runs a cleanup after each test case (e.g. clearing jsdom)
afterAll(() => {
  cleanup();
  server.close();
});
