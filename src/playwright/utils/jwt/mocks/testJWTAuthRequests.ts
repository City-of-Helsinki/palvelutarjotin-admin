import { Page } from '@playwright/test';

import { envUrl } from '../../settings';
import BrowserTestJWTConfig from '../config';
import { generateTestJwt } from '../jwt';
import {
  generateTokenEndpointResponse,
  generateUserInfoEndpointResponse,
} from '../oidc';
import type {
  OIDCOpenIdConfigurationResponseType,
  OIDCUserProfileType,
} from '../types';
import { browserTestAdminUser } from '../users';

/**
 * Sets up auth service request interception on the given page.
 */
export async function setupAuthServiceInterception(
  page: Page,
  user: OIDCUserProfileType = browserTestAdminUser
): Promise<void> {
  // eslint-disable-next-line no-console
  console.info(
    'Setting up auth service interception to mock Helsinki-Profile OIDC requests!',
    { oidcAuthority: BrowserTestJWTConfig.oidcAuthority, user }
  );

  // Fetch the OIDC configuration
  const oidcConfiguration = await fetchOIDCEndpointsConfiguration();
  const {
    authorization_endpoint: authEndpoint,
    token_endpoint: tokenEndpoint,
    userinfo_endpoint: userInfoEndpoint,
  } = oidcConfiguration;

  if (!authEndpoint || !tokenEndpoint || !userInfoEndpoint) {
    throw new Error(
      'The mandatory OIDC endpoint information could not be fetched! ' +
        'The auth service request interception could not be set up.'
    );
  }

  // Intercept auth endpoint requests - match base URL without query params
  await page.route(
    (url) => {
      // Compare URL paths, ignoring query parameters
      const endpointUrl = new URL(authEndpoint);
      return (
        url.origin + url.pathname === endpointUrl.origin + endpointUrl.pathname
      );
    },
    async (route) => {
      await route.fulfill({
        status: 307,
        headers: { Location: envUrl() },
      });
    }
  );

  // Intercept token endpoint requests
  await page.route(tokenEndpoint, async (route) => {
    const tokenResponseData = generateTokenEndpointResponse(user);
    await route.fulfill({
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tokenResponseData),
    });
  });

  // Intercept userinfo endpoint requests
  await page.route(userInfoEndpoint, async (route) => {
    const userInfoData = generateUserInfoEndpointResponse(user);
    await route.fulfill({
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfoData),
    });
  });
}

/**
 * Sets up JWT bearer authorization for API requests.
 */
export async function setupApiJwtBearerAuthorization(
  page: Page,
  user: OIDCUserProfileType = browserTestAdminUser
): Promise<void> {
  // eslint-disable-next-line no-console
  console.info('Setting up API JWT bearer authorization!', {
    kultusApiGraphqlEndpoint: BrowserTestJWTConfig.kultusApiGraphqlEndpoint,
    user,
  });

  const { encodedToken: apiToken } = generateTestJwt({
    user,
    prefix: 'Bearer',
    type: 'Bearer',
  });

  // Add authorization header to all API requests
  await page.route(
    BrowserTestJWTConfig.kultusApiGraphqlEndpoint,
    async (route) => {
      const headers = route.request().headers();
      headers['Authorization'] = apiToken;
      await route.continue({ headers });
    }
  );
}

/**
 * Fetches OIDC endpoints configuration.
 */
async function fetchOIDCEndpointsConfiguration(): Promise<OIDCOpenIdConfigurationResponseType> {
  const oidcConfigurationEndpoint =
    BrowserTestJWTConfig.oidcConfigurationEndpoint;
  // eslint-disable-next-line no-console
  console.info(
    'Fetching OIDC endpoints configuration from',
    oidcConfigurationEndpoint
  );

  const response = await fetch(oidcConfigurationEndpoint);
  // eslint-disable-next-line no-console
  console.info('OIDC endpoints configuration response', {
    status: response.status,
    statusText: response.statusText,
  });
  return response.json() as Promise<OIDCOpenIdConfigurationResponseType>;
}
