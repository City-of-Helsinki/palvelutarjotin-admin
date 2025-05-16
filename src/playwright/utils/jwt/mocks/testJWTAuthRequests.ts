/* eslint-disable no-console */
import { Page } from '@playwright/test';

import { BrowserTestJWTConfig } from '../config';
import { generateTestJwt } from '../jwt';
import { generateTokenEndpointResponse } from '../oidc';
import type {
  OIDCOpenIdConfigurationResponseType,
  OIDCUserProfileType,
} from '../types';
import { BROWSER_TEST_ADMIN_USER } from '../users';

const oidcConfigurationEndpoint =
  BrowserTestJWTConfig.oidcConfigurationEndpoint;

/**
 * Sets up auth service request interception on the given page.
 */
export async function setupAuthServiceInterception(
  page: Page,
  user: OIDCUserProfileType = BROWSER_TEST_ADMIN_USER
): Promise<void> {
  console.debug(
    `Setting up auth service intercept for OIDC requests as user ${user.given_name}`
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
        status: 307, // Temporary Redirect
        headers: { Location: BrowserTestJWTConfig.kultusAdminUiAppOrigin },
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
    await route.fulfill({
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
  });
}

/**
 * Sets up JWT bearer authorization for API requests.
 */
export async function setupApiJwtBearerAuthorization(
  page: Page,
  user: OIDCUserProfileType = BROWSER_TEST_ADMIN_USER
): Promise<void> {
  console.debug(`Setting up API JWT bearer authz for user ${user.given_name}`);

  const apiTokenJwt = generateTestJwt({ user, prefix: 'Bearer' });

  // Add authorization header to all API requests
  await page.route(
    BrowserTestJWTConfig.kultusApiGraphqlEndpoint,
    async (route) => {
      const headers = route.request().headers();
      headers['Authorization'] = apiTokenJwt.encodedToken;
      await route.continue({ headers });
    }
  );
}

async function fetchOIDCEndpointsConfiguration(): Promise<OIDCOpenIdConfigurationResponseType> {
  console.debug(`Fetching OIDC endpoint config: ${oidcConfigurationEndpoint}`);
  const response = await fetch(oidcConfigurationEndpoint);
  console.debug(`OIDC endpoint config response status ${response.statusText}`);
  return response.json() as Promise<OIDCOpenIdConfigurationResponseType>;
}
