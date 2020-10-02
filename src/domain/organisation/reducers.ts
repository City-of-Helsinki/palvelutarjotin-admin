import { createReducer } from '@reduxjs/toolkit';

import { ORGANISATION_ACTIONS } from './constants';
import { OrganisationState } from './types';

export const defaultOrganisationState: OrganisationState = {
  activeOrganisation: null,
};

const organisationReducer = createReducer(defaultOrganisationState, {
  [ORGANISATION_ACTIONS.CLEAR_ACTIVE_ORGANISATION]: (state) => ({
    ...state,
    activeOrganisation: null,
  }),
  [ORGANISATION_ACTIONS.SET_ACTIVE_ORGANISATION]: (state, action) => ({
    ...state,
    activeOrganisation: action.payload,
  }),
});

export default organisationReducer;
