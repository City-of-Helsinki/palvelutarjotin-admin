import type { OIDCUserProfileType } from './types';

// Test administrator
export const BROWSER_TEST_ADMIN_USER = {
  sub: '8897f932-f386-412d-95f4-90177a2f9555',
  preferred_username: 'kultus-admin-ui-browser-test-admin-user',
  email: 'kultus-admin-ui-browser-test-admin-user@kultus.hel.fi',
  given_name: 'Test-admin',
  family_name: 'Browser-Test',
} as const satisfies OIDCUserProfileType;
