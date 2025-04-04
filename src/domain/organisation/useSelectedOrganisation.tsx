import { activeOrganisationSelector } from './selector';
import {
  OrganisationNodeFieldsFragment,
  useMyProfileQuery,
} from '../../generated/graphql';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getSelectedOrganisation } from '../myProfile/utils';

export const useSelectedOrganisation = ():
  | OrganisationNodeFieldsFragment
  | undefined
  | null => {
  const { data: myProfileData } = useMyProfileQuery();
  const activeOrganisation = useAppSelector(activeOrganisationSelector);
  return (
    myProfileData?.myProfile &&
    getSelectedOrganisation(myProfileData.myProfile, activeOrganisation)
  );
};
