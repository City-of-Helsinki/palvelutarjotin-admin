import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import {
  PageDocument,
  PageIdType,
  PageQuery,
  PageQueryVariables,
} from '../generated/graphql-cms';
import { normalizeCmsUri } from './utils';

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
