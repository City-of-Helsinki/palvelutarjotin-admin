function getEnvOrError(variable?: string, name?: string) {
  if (!variable) {
    throw Error(`Environment variable with name ${name} was not found`);
  }
  return variable;
}

class AppConfig {
  static get origin() {
    return getEnvOrError(import.meta.env.VITE_APP_ORIGIN, 'VITE_APP_ORIGIN');
  }

  /** Domain of the application. */
  static get domain() {
    return new URL(this.origin).origin;
  }

  /** Hostname of the application. */
  static get hostname() {
    return new URL(this.origin).hostname;
  }

  static get apiUri() {
    return getEnvOrError(import.meta.env.VITE_APP_API_URI, 'VITE_APP_API_URI');
  }

  static get apiDomain() {
    return new URL(this.apiUri).origin;
  }

  static get oidcAuthority() {
    return getEnvOrError(
      import.meta.env.VITE_APP_OIDC_AUTHORITY,
      'VITE_APP_OIDC_AUTHORITY'
    );
  }

  static get cmsUri() {
    return getEnvOrError(import.meta.env.VITE_APP_CMS_URI, 'VITE_APP_CMS_URI');
  }

  static get cmsDomain() {
    return new URL(this.cmsUri).origin;
  }

  static get linkedEventsApiUri() {
    return getEnvOrError(
      import.meta.env.VITE_APP_LINKEDEVENTS_API_URI,
      'VITE_APP_LINKEDEVENTS_API_URI'
    );
  }

  static get linkedEventsApiDomain() {
    return new URL(this.linkedEventsApiUri).origin;
  }

  static get internalHrefOrigins() {
    return [this.domain, this.cmsDomain, this.linkedEventsApiDomain];
  }
}

export default AppConfig;
