import { useSelector } from 'react-redux';

import {
  OrganisationNodeFieldsFragment,
  useMyProfileQuery,
} from '../../generated/graphql';
import { getSelectedOrganisation } from '../myProfile/utils';
import { activeOrganisationSelector } from './selector';

export const useSelectedOrganisation = ():
  | OrganisationNodeFieldsFragment
  | undefined
  | null => {
  const { data: myProfileData } = useMyProfileQuery();
  const activeOrganisation = useSelector(activeOrganisationSelector);
  return (
    myProfileData?.myProfile &&
    getSelectedOrganisation(myProfileData.myProfile, activeOrganisation)
  );
};
