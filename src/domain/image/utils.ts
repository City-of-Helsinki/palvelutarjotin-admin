import { ImageDocument, ImageQuery } from '../../generated/graphql';
import { initializeApolloClient } from '../app/apollo/apolloClient';

export const getImageName = (id: string) => {
  const apolloClient = initializeApolloClient();
  const data = apolloClient.readQuery<ImageQuery>({
    query: ImageDocument,
    variables: { id },
  });
  return data?.image?.name;
};
