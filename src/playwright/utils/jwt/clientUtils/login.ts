import { Page } from '@playwright/test';

import { generateApiTokens, generateOIDCUserData } from '../oidc';
import OIDCLoginProviderStorage from '../storage';
import type { OIDCUserDataType, OIDCUserProfileType } from '../types';
import { browserTestAdminUser } from '../users';

const userStoreKey = OIDCLoginProviderStorage.getUserStoreKey();
const apiTokenStorageKey = OIDCLoginProviderStorage.apiTokenStorageKey;
const apiTokenUserReferenceKey =
  OIDCLoginProviderStorage.apiTokenUserReferenceKey;

const getOidcUserData = (oidcUser: OIDCUserProfileType) =>
  generateOIDCUserData(oidcUser);

const storeOIDCUserResponse = async (
  page: Page,
  oidcUserData: OIDCUserDataType
) => {
  // eslint-disable-next-line no-console
  console.info('Storing the OIDC user response.', {
    userStoreKey,
    oidcUserData,
  });
  await page.evaluate(
    ([key, value]) => sessionStorage.setItem(key, value),
    [userStoreKey, JSON.stringify(oidcUserData)]
  );
};

const storeApiToken = async (page: Page, apiToken: string) => {
  // eslint-disable-next-line no-console
  console.info('Storing the API token.', {
    apiTokenStorageKey,
    apiToken,
  });
  await page.evaluate(
    ([key, value]) => sessionStorage.setItem(key, value),
    [apiTokenStorageKey, apiToken]
  );
};

const storeAccessToken = async (page: Page, accessToken: string) => {
  // eslint-disable-next-line no-console
  console.info('Storing the user reference access token.', {
    apiTokenUserReferenceKey,
    accessToken,
  });
  await page.evaluate(
    ([key, value]) => sessionStorage.setItem(key, value),
    [apiTokenUserReferenceKey, accessToken]
  );
};

const hasAuthExpired = async (page: Page) => {
  // eslint-disable-next-line no-console
  console.info('Checking whether the authorization has expired!', {
    userStoreKey,
  });
  try {
    const userResponseAsString = await page.evaluate(
      (key) => sessionStorage.getItem(key),
      userStoreKey
    );
    if (!userResponseAsString) {
      return true;
    }
    const storedUserResponse = JSON.parse(userResponseAsString);
    const hasExpired = storedUserResponse?.expires_at * 1000 < Date.now();
    if (hasExpired) {
      // eslint-disable-next-line no-console
      console.warn('The authorization has expired!');
    }
    return hasExpired;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Could not read a token from the session storage', e);
    return true;
  }
};

export const authorize = async (
  page: Page,
  oidcUser: OIDCUserProfileType = browserTestAdminUser
) => {
  // eslint-disable-next-line no-console
  console.info('Handle the authorization JWT...');
  const hasExpired = await hasAuthExpired(page);
  if (hasExpired) {
    // eslint-disable-next-line no-console
    console.info(
      'Persisting test JWT to session storage to authorize the user to bypass the login process!',
      {
        userStoreKey,
        oidcUser,
      }
    );
    const oidcUserData = getOidcUserData(oidcUser);
    // eslint-disable-next-line no-console
    console.debug('Store OIDC data', {
      oidcUserData: JSON.stringify(oidcUserData),
      userStoreKey,
      apiTokenStorageKey,
    });
    await storeOIDCUserResponse(page, oidcUserData);
    const { apiToken, apiTokenUserReferenceToken } =
      generateApiTokens(oidcUserData);
    await storeApiToken(page, apiToken);
    await storeAccessToken(page, apiTokenUserReferenceToken);
    // eslint-disable-next-line no-console
    console.info(
      'The browser storage has now been populated with OIDC related data!'
    );
  }
  // eslint-disable-next-line no-console
  console.info('Authorization finished!');
};
