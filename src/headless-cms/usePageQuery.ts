import {
  PageIdType,
  usePageQuery as useOriginalPageQuery,
} from '../generated/graphql-cms';
import { useCMSApolloClient } from './apollo/apolloClient';
import { normalizeCmsUri } from './utils';

// Takes care of removing surrounding slashes so basically same requests are not repeated
// instead they are fetched from the cache
const usePageQuery = (uri: string, { skip }: { skip?: boolean } = {}) => {
  const cmsClient = useCMSApolloClient();
  return useOriginalPageQuery({
    client: cmsClient,
    variables: {
      id: normalizeCmsUri(uri),
      idType: PageIdType.Uri,
    },
    skip: !!skip,
  });
};

export { usePageQuery };
