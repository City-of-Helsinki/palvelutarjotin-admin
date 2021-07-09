import gql from 'graphql-tag';

export const MUTATION_MY_PROFILE = gql`
  mutation CreateMyProfile($myProfile: CreateMyProfileMutationInput!) {
    createMyProfile(input: $myProfile) {
      myProfile {
        ...personFields
        organisationproposalSet {
          edges {
            node {
              name
            }
          }
        }
      }
    }
  }
  mutation UpdateMyProfile($myProfile: UpdateMyProfileMutationInput!) {
    updateMyProfile(input: $myProfile) {
      myProfile {
        ...personFields
        organisations {
          edges {
            node {
              ...organisationNodeFields
            }
          }
        }
        organisationproposalSet {
          edges {
            node {
              name
            }
          }
        }
      }
    }
  }
`;
