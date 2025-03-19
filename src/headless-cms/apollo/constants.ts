import AppConfig from '../../domain/app/AppConfig';

export const persistorLocalStorageKey = `${AppConfig.appName}-cms-${AppConfig.environment}-apollo-cache`;
// eslint-disable-next-line max-len
export const timePersistedLocalStorageKey = `${AppConfig.appName}-cms-${AppConfig.environment}-apollo-cache-persisted-at`;
