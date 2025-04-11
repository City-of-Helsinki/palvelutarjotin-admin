import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { organisationLocalStorageKey } from '../../constants';
import OrganisationStoragePersistor from '../OrganisationStoragePersistor';

describe('OrganisationStoragePersistor', () => {
  beforeEach(() => {
    // Mock localStorage before each test
    Object.defineProperty(global, 'localStorage', {
      value: {
        getItem: vi.fn(() => null),
        setItem: vi.fn(() => {}),
        removeItem: vi.fn(() => {}),
        clear: vi.fn(() => {}),
      },
      writable: true,
    });
  });

  afterEach(() => {
    // Restore localStorage after each test
    vi.restoreAllMocks();
  });

  it('should save the organisation ID to local storage', () => {
    const organisationId = 'test-org-id';
    OrganisationStoragePersistor.save(organisationId);

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      organisationLocalStorageKey,
      JSON.stringify(organisationId)
    );
  });

  it('should load the organisation ID from local storage when data exists', () => {
    const organisationId = 'loaded-org-id';
    (localStorage.getItem as ReturnType<typeof vi.fn>).mockReturnValue(
      JSON.stringify(organisationId)
    );

    const loadedId = OrganisationStoragePersistor.load();

    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem).toHaveBeenCalledWith(
      organisationLocalStorageKey
    );
    expect(loadedId).toBe(organisationId);
  });

  it('should load null when no organisation ID exists in local storage', () => {
    const loadedId = OrganisationStoragePersistor.load();

    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem).toHaveBeenCalledWith(
      organisationLocalStorageKey
    );
    expect(loadedId).toBeNull();
  });

  it('should clear the organisation ID from local storage', () => {
    OrganisationStoragePersistor.clear();

    expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
    expect(localStorage.removeItem).toHaveBeenCalledWith(
      organisationLocalStorageKey
    );
  });

  it('should handle different organisation ID types (string)', () => {
    const organisationId = 'another-test-id';
    OrganisationStoragePersistor.save(organisationId);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      organisationLocalStorageKey,
      JSON.stringify(organisationId)
    );

    (localStorage.getItem as ReturnType<typeof vi.fn>).mockReturnValue(
      JSON.stringify(organisationId)
    );
    expect(OrganisationStoragePersistor.load()).toBe(organisationId);
  });

  it('should handle empty string as organisation ID', () => {
    const organisationId = '';
    OrganisationStoragePersistor.save(organisationId);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      organisationLocalStorageKey,
      JSON.stringify(organisationId)
    );

    (localStorage.getItem as ReturnType<typeof vi.fn>).mockReturnValue(
      JSON.stringify(organisationId)
    );
    expect(OrganisationStoragePersistor.load()).toBe(organisationId);
  });
});
