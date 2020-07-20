import gql from 'graphql-tag';

export const MUTATION_ENROLMENT = gql`
  mutation approveEnrolment($input: ApproveEnrolmentMutationInput!) {
    approveEnrolment(input: $input) {
      enrolment {
        id
      }
      clientMutationId
    }
  }
`;
