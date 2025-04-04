import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import { normalizeCmsUri } from './utils';
import {
  PageDocument,
  PageIdType,
  PageQuery,
  PageQueryVariables,
} from '../generated/graphql-cms';

export const queryPageWithUri = (
  cmsApolloClient: ApolloClient<NormalizedCacheObject>,
  uri: string
) => {
  return cmsApolloClient.query<PageQuery, PageQueryVariables>({
    query: PageDocument,
    variables: {
      // normalize uri so cache matches event different uri variations
      id: normalizeCmsUri(uri),
      idType: PageIdType.Uri,
    },
  });
};
