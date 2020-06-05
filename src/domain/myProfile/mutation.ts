import gql from 'graphql-tag';

export const MUTATION_MY_PROFILE = gql`
  mutation CreateMyProfile($myProfile: CreateMyProfileMutationInput!) {
    createMyProfile(input: $myProfile) {
      myProfile {
        ...personFields
      }
    }
  }
`;
