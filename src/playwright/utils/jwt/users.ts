import type { OIDCUserProfileType } from './types';

/**
 * Test administrator.
 */
export const browserTestAdminUser: OIDCUserProfileType = {
  sub: '8897f932-f386-412d-95f4-90177a2f9555',
  preferred_username: 'kultus-admin-ui-browser-test-admin-user',
  email: 'kultus-admin-ui-browser-test-admin-user@kultus.hel.fi',
  given_name: 'Test-admin',
  family_name: 'Browser-Test',
};

/**
 * Unauthorized user.
 */
export const browserTestUnauthorizedUser: OIDCUserProfileType = {
  sub: '361a2b6f-0c45-4803-b316-3b58ca893d9b',
  preferred_username: 'kultus-admin-ui-browser-test-unauthorized-user',
  email: 'kultus-admin-ui-browser-test-unauthorized-user@kultus.hel.fi',
  given_name: 'Unauthorized-user',
  family_name: 'Browser-Test',
};
