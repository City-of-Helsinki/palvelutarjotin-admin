import {
  OrganisationNodeFieldsFragment,
  PersonFieldsFragment,
} from '../../generated/graphql';
import { MyProfileFormFields } from './myProfileForm/MyProfileForm';

export const getMyProfilePayload = (values: MyProfileFormFields) => ({
  name: values.name,
  phoneNumber: values.phoneNumber,
  emailAddress: values.emailAddress,
  organisations: values.organisations,
});

export const getSelectedOrganisation = (
  myProfile: PersonFieldsFragment,
  activeOrganisation: string | null
): OrganisationNodeFieldsFragment | null => {
  const organisations =
    myProfile.organisations.edges.map((edge) => ({
      ...(edge?.node as OrganisationNodeFieldsFragment),
    })) || [];

  const organisation = activeOrganisation
    ? organisations.find((item) => item.id === activeOrganisation)
    : null;

  return organisation || organisations[0];
};
