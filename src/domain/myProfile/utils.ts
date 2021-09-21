import {
  MyProfileFieldsFragment,
  OrganisationNodeFieldsFragment,
  OrganisationProposalNodeInput,
} from '../../generated/graphql';
import {
  MyProfileCreateFormFields,
  MyProfileEditFormFields,
} from './myProfileForm/MyProfileForm';

export const getMyProfileCreatePayload = (
  values: MyProfileCreateFormFields
) => ({
  name: values.name,
  phoneNumber: values.phoneNumber,
  emailAddress: values.emailAddress,
  language: values.language,
  placeIds: values.locations,
  organisations: values.organisations,
  organisationProposals: values.organisationProposals
    ? [{ name: values.organisationProposals } as OrganisationProposalNodeInput]
    : [],
});

export const getMyProfileEditPayload = (values: MyProfileEditFormFields) => ({
  name: values.name,
  phoneNumber: values.phoneNumber,
  emailAddress: values.emailAddress,
  placeIds: values.locations,
  language: values.language,
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
