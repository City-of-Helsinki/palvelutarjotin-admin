import {
  MyProfileCreateFormFields,
  MyProfileEditFormFields,
} from './myProfileForm/MyProfileForm';
import {
  MyProfileFieldsFragment,
  OrganisationNode,
  OrganisationProposalNodeInput,
} from '../../generated/graphql';

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
): OrganisationNode | null => {
  const organisations =
    myProfile.organisations.edges?.map((edge) => ({
      ...(edge?.node as OrganisationNode),
    })) || [];

  const fallbackOrganisation = useFirstAsDefault ? organisations[0] : null;
  const organisation = activeOrganisation
    ? organisations.find((item) => item.id === activeOrganisation)
    : null;

  return organisation ?? fallbackOrganisation ?? null;
};
