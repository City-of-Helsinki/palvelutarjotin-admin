import { createAction, createReducer } from '@reduxjs/toolkit';

import { ORGANISATION_ACTIONS } from './constants';
import { OrganisationState } from './types';

export const defaultOrganisationState: OrganisationState = {
  activeOrganisation: null,
};

const clearActiveOrganisation = createAction(
  ORGANISATION_ACTIONS.CLEAR_ACTIVE_ORGANISATION
);
const setActiveOrganisation = createAction(
  ORGANISATION_ACTIONS.SET_ACTIVE_ORGANISATION
);

const organisationReducer = createReducer(
  defaultOrganisationState,
  (builder) => {
    builder
      .addCase(clearActiveOrganisation, (state) => ({
        ...state,
        activeOrganisation: null,
      }))
      .addCase(setActiveOrganisation, (state, action) => ({
        ...state,
        activeOrganisation: action.payload ?? '',
      }));
  }
);

export default organisationReducer;
