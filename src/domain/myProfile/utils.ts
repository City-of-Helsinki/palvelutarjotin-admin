import {
  MyProfileFieldsFragment,
  OrganisationNodeFieldsFragment,
  OrganisationProposalNodeInput,
} from '../../generated/graphql';
import { MyProfileFormFields } from './myProfileForm/MyProfileForm';

export const getMyProfilePayload = (values: MyProfileFormFields) => ({
  name: values.name,
  phoneNumber: values.phoneNumber,
  emailAddress: values.emailAddress,
  organisations: values.organisations,
  organisationProposals: values.organisationProposals
    ? [{ name: values.organisationProposals } as OrganisationProposalNodeInput]
    : [],
});

export const getSelectedOrganisation = (
  myProfile: MyProfileFieldsFragment,
  activeOrganisation: string | null,
  useFirstAsDefault = true
): OrganisationNodeFieldsFragment | null => {
  const organisations =
    myProfile.organisations.edges.map((edge) => ({
      ...(edge?.node as OrganisationNodeFieldsFragment),
    })) || [];

  const organisation = activeOrganisation
    ? organisations.find((item) => item.id === activeOrganisation)
    : null;

  return organisation || (useFirstAsDefault ? organisations[0] : null);
};
