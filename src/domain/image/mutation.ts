import gql from 'graphql-tag';

export const MUTATION_IMAGE = gql`
  mutation UploadSingleImage($image: UploadImageMutationInput!) {
    uploadImageMutation(image: $image) {
      response {
        statusCode
        body {
          ...imageFields
        }
      }
    }
  }

  mutation UpdateSingleImage($image: UpdateImageMutationInput!) {
    updateImageMutation(image: $image) {
      response {
        statusCode
        body {
          ...imageFields
        }
      }
    }
  }
`;
