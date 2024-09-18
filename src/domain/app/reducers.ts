import { combineReducers } from '@reduxjs/toolkit';

import organisationReducers from '../organisation/reducers';

export default combineReducers({
  organisation: organisationReducers,
});
