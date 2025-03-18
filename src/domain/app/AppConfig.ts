function getEnvOrError(variable?: string, name?: string) {
  if (!variable) {
    throw Error(`Environment variable with name ${name} was not found`);
  }
  return variable;
}

/**
 * Fetches an environment variable value as a URL.
 *
 * @param varName The name of the environment variable.
 * @throws {Error} If the variable is not defined or is not a valid URL.
 */
function getEnvAsUrl(varName: string): URL {
  const value = getEnvOrError(import.meta.env[varName], varName);
  try {
    return new URL(value);
  } catch {
    throw new Error(
      `Environment variable ${varName} is not a valid URL: ${value}`
    );
  }
}

function getEnvAsList(variable?: string) {
  if (!variable) {
    return undefined;
  }
  return variable.split(',').map((e) => e.trim());
}

class AppConfig {
  /** The origin URL (protocol + hostname + port) of the application. */
  static get origin() {
    return getEnvAsUrl('VITE_APP_ORIGIN').origin;
  }

  static get kukkuuApiGraphqlEndpoint() {
    return getEnvOrError(import.meta.env.VITE_APP_API_URI, 'VITE_APP_API_URI');
  }

  static get cmsGraphqlEndpoint() {
    return getEnvOrError(import.meta.env.VITE_APP_CMS_URI, 'VITE_APP_CMS_URI');
  }

  static get helsinkiProfileUrl() {
    return getEnvOrError(
      import.meta.env.VITE_APP_HELSINKI_PROFILE_URL,
      'VITE_APP_HELSINKI_PROFILE_URL'
    );
  }

  static get oidcAuthority() {
    return getEnvOrError(
      import.meta.env.VITE_APP_OIDC_AUTHORITY,
      'VITE_APP_OIDC_AUTHORITY'
    );
  }

  /**
   * The audiences for OIDC tokens.
   * Can be a string or a comma-separated list of strings.
   *
   * @example
   * - Tunnistamo: undefined (leave the env var empty)
   * - Keycloak: 'kultus-admin-api-test,profile-api-test'
   */
  static get oidcAudiences() {
    return getEnvAsList(import.meta.env.VITE_APP_OIDC_AUDIENCES);
  }

  /**
   * OIDC client id for (this) kultus-admin-ui client.
   * Read env variable `VITE_APP_OIDC_CLIENT_ID`.
   */
  static get oidcClientId() {
    return getEnvOrError(
      import.meta.env.VITE_APP_OIDC_CLIENT_ID,
      'VITE_APP_OIDC_CLIENT_ID'
    );
  }

  /**
   * OIDC auth scope.
   * Read env variable `VITE_APP_OIDC_SCOPE`.
   */
  static get oidcScope() {
    return getEnvOrError(
      import.meta.env.VITE_APP_OIDC_SCOPE,
      'VITE_APP_OIDC_SCOPE,'
    );
  }

  /**
   * OIDC authorization code grant type.
   * Read env variable `VITE_APP_OIDC_RETURN_TYPE`.
   * Defaults to 'code' which is for "authorization code flow".
   * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.
   */
  static get oidcReturnType() {
    // "code" for authorization code flow.
    return import.meta.env.VITE_APP_OIDC_RETURN_TYPE ?? 'code';
  }

  static get oidcKultusAdminApiClientId() {
    return getEnvOrError(
      import.meta.env.VITE_APP_OIDC_API_CLIENT_ID,
      'VITE_APP_OIDC_API_CLIENT_ID'
    );
  }

  /**
   * Indicates the type of OIDC server being used.
   *
   * This is not a standard OIDC client attribute; it's used internally to determine
   * the appropriate configuration for the login provider.
   *
   * @throws {Error} If the `VITE_APP_OIDC_SERVER_TYPE` environment variable is not defined
   *                or has an invalid value (not 'KEYCLOAK' or 'TUNNISTAMO').
   */
  static get oidcServerType(): 'KEYCLOAK' | 'TUNNISTAMO' {
    const oidcServerType =
      import.meta.env.VITE_APP_OIDC_SERVER_TYPE ?? 'TUNNISTAMO';
    if (!['KEYCLOAK', 'TUNNISTAMO'].includes(oidcServerType)) {
      throw new Error(`Invalid OIDC server type: ${oidcServerType}`);
    }
    return oidcServerType;
  }

  /**
   * Read env variable `VITE_APP_OIDC_AUTOMATIC_SILENT_RENEW_ENABLED`.
   * Defaults to true.
   * */
  static get oidcAutomaticSilentRenew(): boolean {
    return Boolean(
      import.meta.env.VITE_APP_OIDC_AUTOMATIC_SILENT_RENEW_ENABLED ?? true
    );
  }

  /**
   * Read env variable `VITE_APP_OIDC_SESSION_POLLING_INTERVAL_MS`.
   * Defaults to 60000.
   * */
  static get oidcSessionPollerIntervalInMs(): number {
    return import.meta.env.VITE_APP_OIDC_SESSION_POLLING_INTERVAL_MS ?? 60_000;
  }

  /**
   * Read env variable `VITE_APP_IDLE_TIMEOUT_IN_MS`.
   * Defaults to 60 minutes.
   * */
  static get userIdleTimeoutInMs(): number {
    return import.meta.env.VITE_APP_IDLE_TIMEOUT_IN_MS ?? 3_600_000;
  }

  static get cmsDomain() {
    return getEnvAsUrl('VITE_APP_CMS_URI').origin;
  }

  static get linkedEventsApiDomain() {
    return getEnvAsUrl('VITE_APP_LINKEDEVENTS_API_URI').origin;
  }

  static get internalHrefOrigins() {
    return [this.origin, this.cmsDomain, this.linkedEventsApiDomain];
  }

  static get cmsOrigin() {
    return new URL(AppConfig.cmsGraphqlEndpoint).origin;
  }

  /**
   * URL rewrite mapping for internal URLs.
   * Replace the URL with the value in the mapping.
   * If the URL is a CMS URL for pages, articles or other content,
   * except not for files, the URL should be rewritten to the internal URL.
   *
   * Some examples that are valid:
   * - https://kultus.content.api.hel.fi/fi/
   * - https://kultus.content.api.hel.fi/sv/
   * - https://kultus.content.api.hel.fi/en/
   * - https://kultus.content.api.hel.fi/fi/asdas/asdas
   * - https://kultus.content.api.hel.fi/fi/something/
   *
   * Examples that are invalid:
   * - https://kultus.content.api.hel.fi/app/images
   * - https://kultus.content.api.hel.fi/app/pictures
   * - https://kultus.content.api.hel.fi/app/files
   */
  static get URLRewriteMapping() {
    return [
      // Exclusionary rule: URLs that should *not* be rewritten
      {
        regex: `^${AppConfig.cmsOrigin}/app/`,
        replace: '', // We don't need a replacement for exclusions.
        skip: true,
      },
      // Matches URLs with a locale prefix (fi, en, sv)
      {
        regex: `^${AppConfig.cmsOrigin}/(fi|en|sv)(.*)$`,
        replace: '/$1/cms-page$2',
      },
      // Matches root page
      {
        regex: `^${AppConfig.cmsOrigin}/$`,
        replace: '/cms-page/',
      },
      // Matches URLs without a locale prefix (other paths)
      {
        regex: `^${AppConfig.cmsOrigin}/(.*)$`,
        replace: '/cms-page/$1',
      },
    ];
  }
}

export default AppConfig;
