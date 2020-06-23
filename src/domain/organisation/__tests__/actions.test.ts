import * as actions from '../actions';
import { ORGANISATION_ACTIONS } from '../constants';

describe('organisation actions', () => {
  it('should create an action to clear active organisation', () => {
    const expectedAction = {
      type: ORGANISATION_ACTIONS.CLEAR_ACTIVE_ORGANISATION,
    };
    expect(actions.clearActiveOrganisation()).toEqual(expectedAction);
  });

  it('should create an action to set active organisation', () => {
    const dummyId = '123';
    const expectedAction = {
      payload: dummyId,
      type: ORGANISATION_ACTIONS.SET_ACTIVE_ORGANISATION,
    };

    expect(actions.setActiveOrganisation(dummyId)).toEqual(expectedAction);
  });
});
