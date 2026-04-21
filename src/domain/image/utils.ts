import { NotificationProps } from 'hds-react';

import { ImageDocument, ImageQuery } from '../../generated/graphql';
import { initializeApolloClient } from '../app/apollo/apolloClient';

export const getImageName = (
  id: string,
  addNotification: (props: NotificationProps) => void
) => {
  const apolloClient = initializeApolloClient(undefined, addNotification);
  const data = apolloClient.readQuery<ImageQuery>({
    query: ImageDocument,
    variables: { id },
  });
  return data?.image?.name;
};
