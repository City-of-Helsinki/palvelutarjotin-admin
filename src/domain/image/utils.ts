import { ImageDocument, ImageQuery } from '../../generated/graphql';
import apolloClient from '../app/apollo/apolloClient';

export const getImageName = (id: string) => {
  const data = apolloClient.readQuery<ImageQuery>({
    query: ImageDocument,
    variables: { id },
  });
  return data?.image?.name;
};
