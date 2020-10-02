import { ORGANISATION_ACTIONS } from '../constants';
import reducer, { defaultOrganisationState } from '../reducers';

describe('organisation reducer', () => {
  it('should handle CLEAR_ACTIVE_ORGANISATION', () => {
    expect(
      reducer(defaultOrganisationState, {
        type: ORGANISATION_ACTIONS.CLEAR_ACTIVE_ORGANISATION,
      })
    ).toEqual({ activeOrganisation: null });
  });

  it('should handle SET_ACTIVE_ORGANISATION', () => {
    const dummyId = '123';
    expect(
      reducer(defaultOrganisationState, {
        payload: dummyId,
        type: ORGANISATION_ACTIONS.SET_ACTIVE_ORGANISATION,
      })
    ).toEqual({ activeOrganisation: dummyId });
  });
});
