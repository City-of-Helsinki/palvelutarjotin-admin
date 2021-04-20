import {
  OrganisationNodeFieldsFragment,
  PersonFieldsFragment,
} from '../../generated/graphql';

export const getPersons = (
  organisation: OrganisationNodeFieldsFragment | null | undefined
): PersonFieldsFragment[] =>
  organisation?.persons.edges.map(
    (edge) => edge?.node as PersonFieldsFragment
  ) || [];
