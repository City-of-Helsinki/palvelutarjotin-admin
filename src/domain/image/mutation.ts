import gql from 'graphql-tag';

export const MUTATION_IMAGE = gql`
  mutation UploadSingleImage($image: UploadImageMutationInput!) {
    uploadImageMutation(image: $image) {
      response {
        statusCode
        body {
          id
          internalId
          license
          name
          url
          cropping
          photographerName
          altText
        }
      }
    }
  }
`;
