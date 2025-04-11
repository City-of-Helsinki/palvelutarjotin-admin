import { fakeOrganisation } from '../../../../utils/mockDataUtils';

const activeOrganisation = fakeOrganisation({
  id: 'active-organisation',
  name: 'Active Organisation',
});

const defaultMockReturnValue = {
  activeOrganisation,
  setActiveOrganisation: vi.fn(),
};

/**
 * Mock for the `useStoredOrganisationState` hook.
 *
 * This hook typically interacts with a context provider to manage the active organisation state.
 * This mock provides a default mocked return value for tests.
 *
 * **Centralized Mocking:**
 * Defined here (under `__mocks__` directory) for automatic application in all tests.
 * Configure `vite.config.ts` or `vitest.config.ts` to map the hook's import path to this file.
 *
 * **Conditional Mocking:**
 * To use the real implementation or a different mock in specific tests,
 * use `vi.unmock('path/to/your/useStoredOrganisationState')` at the top of the test file or within a test block.
 *
 * **Dynamic Mocking:**
 * Within individual tests, you can customize the mock's behavior using methods like:
 * - `useStoredOrganisationState.mockReturnValue(newValue)`
 * - `useStoredOrganisationState.mockImplementation(() => customReturnValue)`
 * - `useStoredOrganisationState.mockClear()` (to reset call history)
 * - `useStoredOrganisationState.mockReset()` (to reset call history and implementation)
 */
export const useStoredOrganisationState = vi.fn(() => defaultMockReturnValue);
