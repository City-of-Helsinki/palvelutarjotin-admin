import { StoreState } from '../../types';

export const activeOrganisationSelector = (state: StoreState): string | null =>
  state.organisation.activeOrganisation;
