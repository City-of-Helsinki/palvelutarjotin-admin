import type { Language } from '../types';

export type Timeout = { timeout?: number };
export type Translation = Record<Language, string | RegExp>;
