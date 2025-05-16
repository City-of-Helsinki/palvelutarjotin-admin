/* eslint-disable no-console */
import { Page } from '@playwright/test';

import { BrowserTestJWTConfig } from '../config';
import { generateOIDCUserData } from '../oidc';
import type { OIDCUserDataType, OIDCUserProfileType } from '../types';
import { BROWSER_TEST_ADMIN_USER } from '../users';

const oidcAuthority = BrowserTestJWTConfig.oidcAuthority;
const oidcClientId = BrowserTestJWTConfig.oidcClientId;

/**
 * The session storage key for the OIDC user data.
 *
 * WARNING!
 *     This NEEDS to MATCH with the value use when building the UI application,
 *     or the OIDC client won't find the user data in the session storage.
 */
const oidcUserStoreKey = `oidc.user:${oidcAuthority}:${oidcClientId}`;

const storeOIDCUserResponse = async (
  page: Page,
  oidcUserData: OIDCUserDataType
) => {
  console.debug(
    `Storing OIDC user response to session storage at ${oidcUserStoreKey}`
  );
  await page.evaluate(
    ([key, value]) => sessionStorage.setItem(key, value),
    [oidcUserStoreKey, JSON.stringify(oidcUserData)]
  );
};

export const authorize = async (
  page: Page,
  oidcUser: OIDCUserProfileType = BROWSER_TEST_ADMIN_USER
) => {
  console.debug(
    `Setting ${oidcUser.given_name}'s test JWT to session storage at ${oidcUserStoreKey}`
  );

  const oidcUserData = generateOIDCUserData(oidcUser);
  await storeOIDCUserResponse(page, oidcUserData);

  console.debug('Test JWT has now been set to session storage');
};
