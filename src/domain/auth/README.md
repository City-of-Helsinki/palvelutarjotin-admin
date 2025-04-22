<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [HDS LoginProvider configurations](#hds-loginprovider-configurations)
  - [Tunnistamo (a local instance in local development)](#tunnistamo-a-local-instance-in-local-development)
- [Keycloak (a test environment in local development)](#keycloak-a-test-environment-in-local-development)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

TODO: FIX ME

# HDS LoginProvider configurations

Examples of the configurations for a local Tunnistamo and the Keycloak in the test environment.

> WARNING: If a developer is using a local Tunnistamo for Kultus-Admin-UI, also every other service needs to be configured to use the local Tunnistamo, or otherwise the OIDC issuer, audiences and most probably also the scopes would not match the configurations.

## Tunnistamo (a local instance in local development)

```json
{
  "userManagerSettings": {
    "authority": "http://tunnistamo-backend:8000/",
    "client_id": "https://api.hel.fi/auth/palvelutarjotin-admin",
    "scope": "openid profile https://api.hel.fi/auth/palvelutarjotin-admin",
    "redirect_uri": "http://localhost:3000/callback",
    "silent_redirect_uri": "http://localhost:3000/silent_renew.html",
    "post_logout_redirect_uri": "http://localhost:3000/"
  },
  "debug": false,
  "sessionPollerSettings": { "pollIntervalInMs": 10000 },
  "apiTokensClientSettings": {
    "url": "http://tunnistamo-backend:8000/api-tokens/",
    "maxRetries": 10,
    "retryInterval": 1000
  }
}
```

# Keycloak (a test environment in local development)

The test environment's Keycloak can also be used in a local development.

> NOTE: The configurations of the Keycloak and Helsinki-Profile should be described in a Confluence document: https://helsinkisolutionoffice.atlassian.net/wiki/spaces/KAN/pages/8679030785/Palveluintegraatio+HP+-+FIX URL.

There can be multiple valid `redirect_uri`s. During the initial launch of the service, these were given as options, which means that all these are valid (ports and domains) when developing locally:

```
http://localhost:3000/callback
http://localhost:3001/callback
http://localhost:3002/callback
http://kultus-admin-ui:3000/callback
```

The test env of the Keycloak is configured so that it can be used by the dev-service instances, so the both should be possible: using the Kultu-Admin-UI with a test-env Kultu Admin API or a local one. This affects in `audiences` – If a developer is using a local Kultu Admin API, the `audiences` needs to include `"kultus-api-dev"` and the Kultu Admin API needs to be configured to use that as a client id – If a develoer is using a test env's Kultu Admin API, the `audiences` needs to include `"kultus-admin-api-test"`.

For a test env's Kultu Admin API:

```json
"audiences": ["kultus-admin-api-test", "profile-api-test"]
```

For a local Kultus API:

```json
"audiences": ["kultus-admin-api-dev", "profile-api-test"]
```

An example of the full configuration for the login provider:

```json
{
  "userManagerSettings": {
    "authority": "https://tunnistus.test.hel.ninja/auth/realms/helsinki-tunnistus/",
    "client_id": "kultus-admin-ui-dev",
    "scope": "openid profile",
    "redirect_uri": "http://localhost:3000/callback",
    "silent_redirect_uri": "http://localhost:3000/silent_renew.html",
    "post_logout_redirect_uri": "http://localhost:3000/"
  },
  "debug": false,
  "sessionPollerSettings": { "pollIntervalInMs": 10000 },
  "apiTokensClientSettings": {
    "url": "https://tunnistus.test.hel.ninja/auth/realms/helsinki-tunnistus/protocol/openid-connect/token",
    "maxRetries": 10,
    "retryInterval": 1000,
    "queryProps": {
      "grantType": "urn:ietf:params:oauth:grant-type:uma-ticket",
      "permission": "#access"
    },
    "audiences": ["kultus-admin-api-test", "profile-api-test"]
  }
}
```
