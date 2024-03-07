import dotenv from 'dotenv';
import { beforeEach, beforeAll, afterEach, afterAll, vi } from 'vitest';
import 'vitest-axe/extend-expect';
import { cleanup } from '@testing-library/react';

import '@testing-library/jest-dom/vitest';
import { server } from './msw/server';
import i18n from './testi18nInit';

dotenv.config({ path: './.env.test' });

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock scrollTo function
window.scrollTo = vi.fn();

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
