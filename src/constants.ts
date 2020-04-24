/**
 * Check is the instance that is rendering component client (not SSR)
 */
export const IS_CLIENT = typeof window !== 'undefined';

/**
 * Endpoint to get api token
 */
export const TUNNISTAMO_API_TOKEN_ENDPOINT = `${process.env.REACT_APP_OIDC_AUTHORITY}/api-tokens/`;

// Supported languages
export enum SUPPORT_LANGUAGES {
  FI = 'fi',
  SV = 'sv',
  EN = 'en',
}
