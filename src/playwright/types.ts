import type { Locator } from '@playwright/test';

import type { Language } from '../types';

export type Timeout = { timeout?: number };
export type Translation = Record<Language, string | RegExp>;
export type Translations = Record<string, Translation>;

// First parameter of Locator.click is `options`
export type ClickOptions = Parameters<Locator['click']>[0];

// First parameter of Locator.getByRole is `role`
export type Role = Parameters<Locator['getByRole']>[0];
