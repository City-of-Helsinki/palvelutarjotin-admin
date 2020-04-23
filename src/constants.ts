/**
 * Check is the instance that is rendering component client (not SSR)
 */
export const IS_CLIENT = typeof window !== 'undefined';

// Supported languages
export enum SUPPORT_LANGUAGES {
  FI = 'fi',
  SV = 'sv',
  EN = 'en',
}
