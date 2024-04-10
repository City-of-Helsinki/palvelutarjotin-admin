import {
  PageDocument,
  PageIdType,
  PageQuery,
  PageQueryVariables,
} from '../generated/graphql-cms';
import cmsClient from './client';

// '/segment1/segment2/' -> ['/segment1/', '/segment1/segment2/']
// current implementation required both leading and trailing slashes
// to include all breadcrumbs
export const uriToBreadcrumbs = (uri: string): string[] => {
  return slugsToUriSegments(
    stripLocaleFromUri(uri)
      .split('/')
      // Filter out empty strings
      .filter((i) => i)
  );
};

export const slugsToUriSegments = (slugs: string[]): string[] => {
  return slugs.map((slug, index) => {
    return `/${slugs.slice(0, index + 1).join('/')}/`;
  });
};

export const stripLocaleFromUri = (uri: string): string => {
  return uri.replace(/^\/(en|sv|fi)(?![a-z0-9])/i, '');
};

export const getCmsUriFromPath = (path: string) => {
  return path.replace(/(\/?(fi|en|sv))?\/?cms-page/, '');
};

export const removeSurroundingSlashes = (path: string) => {
  return path.replace(/^\/|\/$/g, '');
};

export const normalizeCmsUri = (uri: string) => {
  return removeSurroundingSlashes(stripLocaleFromUri(uri));
};

export const queryPageWithUri = (uri: string) => {
  return cmsClient.query<PageQuery, PageQueryVariables>({
    query: PageDocument,
    variables: {
      // normalize uri so cache matches event different uri variations
      id: normalizeCmsUri(uri),
      idType: PageIdType.Uri,
    },
  });
};

export const replaceAll = (str: string, find: string, replace: string) => {
  return str.replace(new RegExp(find, 'g'), replace);
};

export const unescapeDash = (str?: string): string => {
  if (!str) {
    return str ?? '';
  }

  return replaceAll(str, '&#x2d;', '-');
};
