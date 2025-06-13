import { generateTestJwt, getEpochTimeframeForTestJWt } from './jwt';
import type {
  OIDCTokenEndpointRefreshResponseType,
  OIDCUserDataType,
  OIDCUserProfileType,
} from './types';

/**
 * Generate the OIDC User data
 * @param user user information
 * @returns session storage value for OIDC user manager
 */
export function generateOIDCUserData(
  user: OIDCUserProfileType
): OIDCUserDataType {
  const authTime = new Date();
  const { expiresAt } = getEpochTimeframeForTestJWt(authTime);
  const accessTokenJwt = generateTestJwt({ user, authTime });
  const idTokenJwt = generateTestJwt({ user, type: 'ID', authTime });

  return {
    access_token: accessTokenJwt.encodedToken,
    expires_at: expiresAt,
    id_token: idTokenJwt.encodedToken,
    profile: idTokenJwt.payload,
    scope: 'openid profile email',
    session_state: 'session_state should be mocked out', // UUID v4 as string
    token_type: 'Bearer',
  };
}

/**
 * Generate a response for authorization service's token endpoint.
 * @param user user information
 * @returns json object of access and refresh tokens with their expiration info
 */
export function generateTokenEndpointResponse(
  user: OIDCUserProfileType
): OIDCTokenEndpointRefreshResponseType {
  const accessTokenJwt = generateTestJwt({ user });
  const refreshTokenJwt = generateTestJwt({ user, type: 'Refresh' });
  const nowTimestamp = Math.round(new Date().getTime() / 1000);

  return {
    upgraded: false,
    access_token: accessTokenJwt.encodedToken,
    expires_in: accessTokenJwt.payload.exp - nowTimestamp,
    refresh_expires_in: refreshTokenJwt.payload.exp - nowTimestamp,
    refresh_token: refreshTokenJwt.encodedToken,
    token_type: 'Bearer',
    'not-before-policy': 0,
  };
}
