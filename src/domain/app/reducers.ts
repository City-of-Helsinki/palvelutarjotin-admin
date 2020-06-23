import { combineReducers } from '@reduxjs/toolkit';

import authenticationReducers from '../auth/reducers';
import organisationReducers from '../organisation/reducers';

export default combineReducers({
  authentication: authenticationReducers,
  organisation: organisationReducers,
});
