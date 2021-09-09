import {
  PageIdType,
  usePageQuery as useOriginalPageQuery,
} from '../generated/graphql-cms';
import cmsClient from './client';
import { removeSurroundingSlashes } from './utils';

// Takes care of removing surrounding slashes so basically same requests are not repeated
// instead they are fetched from the cache
const usePageQuery = (uri: string) => {
  return useOriginalPageQuery({
    client: cmsClient,
    variables: {
      id: removeSurroundingSlashes(uri),
      idType: PageIdType.Uri,
    },
  });
};

export { usePageQuery };
