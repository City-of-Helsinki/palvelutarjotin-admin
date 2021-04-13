import { useSelector } from 'react-redux';

import {
  PersonFieldsFragment,
  useMyProfileQuery,
} from '../../../generated/graphql';
import { getSelectedOrganisation } from '../../myProfile/utils';
import { activeOrganisationSelector } from '../../organisation/selector';

export default function useOrganisationPersons() {
  const { data: myProfileData } = useMyProfileQuery();
  const activeOrganisation = useSelector(activeOrganisationSelector);
  const selectedOrganisation =
    myProfileData?.myProfile &&
    getSelectedOrganisation(myProfileData.myProfile, activeOrganisation);
  const persons =
    selectedOrganisation?.persons.edges.map(
      (edge) => edge?.node as PersonFieldsFragment
    ) || [];

  return {
    organisation: selectedOrganisation,
    persons,
  };
}
