import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import { cleanup } from '@testing-library/react';
import dotenv from 'dotenv';
import { beforeEach, beforeAll, afterEach, afterAll, vi, expect } from 'vitest';
import * as matchers from 'vitest-axe/matchers';

import filterConsole from './filterConsole';
import { server } from './msw/server';
import i18n from './testi18nInit';

import '@testing-library/jest-dom/vitest';

dotenv.config({ path: './.env.test' });

expect.extend(matchers);

// Load error messages for Apollo client so it's easier to debug errors
loadDevMessages();
loadErrorMessages();

// Filter console messages to declutter test output
filterConsole();

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
