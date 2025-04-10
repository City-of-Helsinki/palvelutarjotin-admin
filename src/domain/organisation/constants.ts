import AppConfig from '../app/AppConfig';

const appLocalStorageKeyPrefix = `${AppConfig.appName}-${AppConfig.environment}`;
export const organisationLocalStorageKey = `${appLocalStorageKeyPrefix}-activeOrganisation`;
