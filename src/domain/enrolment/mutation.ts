import gql from 'graphql-tag';

export const MUTATION_ENROLMENT = gql`
  mutation approveEnrolment($input: ApproveEnrolmentMutationInput!) {
    approveEnrolment(input: $input) {
      enrolment {
        ...enrolmentFields
      }
      clientMutationId
    }
  }

  mutation declineEnrolment($input: DeclineEnrolmentMutationInput!) {
    declineEnrolment(input: $input) {
      enrolment {
        ...enrolmentFields
      }
      clientMutationId
    }
  }

  mutation deleteEnrolment($input: UnenrolOccurrenceMutationInput!) {
    unenrolOccurrence(input: $input) {
      occurrence {
        id
      }
      studyGroup {
        id
      }
      clientMutationId
    }
  }

  mutation updateEnrolment($input: UpdateEnrolmentMutationInput!) {
    updateEnrolment(input: $input) {
      enrolment {
        ...enrolmentFields
      }
      clientMutationId
    }
  }
`;
