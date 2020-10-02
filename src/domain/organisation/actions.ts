import { createAction } from '@reduxjs/toolkit';

import { ORGANISATION_ACTIONS } from './constants';

const clearActiveOrganisation = createAction(
  ORGANISATION_ACTIONS.CLEAR_ACTIVE_ORGANISATION
);
const setActiveOrganisation = createAction<string>(
  ORGANISATION_ACTIONS.SET_ACTIVE_ORGANISATION
);

export { clearActiveOrganisation, setActiveOrganisation };
