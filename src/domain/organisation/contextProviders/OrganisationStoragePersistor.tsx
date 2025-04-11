import { organisationLocalStorageKey } from '../constants';

/**
 * Provides utility methods for saving, loading, and clearing the active organisation ID from local storage.
 */
export default class OrganisationStoragePersistor {
  /**
   * Saves the provided organisation ID to local storage.
   *
   * @param organisationId - The ID of the organisation to save.
   * @example
   * OrganisationStoragePersistor.save('12345');
   */
  static save(organisationId: string): void {
    // eslint-disable-next-line no-console
    console.debug('OrganisationStoragePersistor:save', organisationId);
    localStorage.setItem(
      organisationLocalStorageKey,
      JSON.stringify(organisationId)
    );
  }

  /**
   * Loads the active organisation ID from local storage.
   *
   * @returns The organisation ID if found, otherwise null.
   * @example
   * const organisationId = OrganisationStoragePersistor.load();
   * if (organisationId) {
   * console.log('Loaded organisation ID:', organisationId);
   * }
   */
  static load(): string | null {
    const data = localStorage.getItem(organisationLocalStorageKey);
    try {
      const organisationId: string | null = data ? JSON.parse(data) : null;
      // eslint-disable-next-line no-console
      console.debug('OrganisationStoragePersistor:load', organisationId);
      return organisationId;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error parsing organisation ID from local storage:', error);
      return null;
    }
  }

  /**
   * Clears the active organisation ID from local storage.
   *
   * @example
   * OrganisationStoragePersistor.clear();
   */
  static clear(): void {
    // eslint-disable-next-line no-console
    console.debug('OrganisationStoragePersistor:clear');
    localStorage.removeItem(organisationLocalStorageKey);
  }
}
