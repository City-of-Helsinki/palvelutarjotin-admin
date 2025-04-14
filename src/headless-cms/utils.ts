import AppConfig from '../domain/app/AppConfig';

export const slugsToUriSegments = (slugs: string[]): string[] => {
  return slugs.map((slug, index) => {
    return `/${slugs.slice(0, index + 1).join('/')}/`;
  });
};

export const stripLocaleFromUri = (uri: string): string => {
  return uri.replace(/^\/(en|sv|fi)(?![a-z0-9])/i, '');
};

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

export const getCmsUriFromPath = (path: string) => {
  return path.replace(/(\/?(fi|en|sv))?\/?cms-page/, '');
};

/**
 * Remove a single slash from given path's beginning and from its end.
 * @param path
 * @returns Input path with single slash, if present, removed from its beginning
 * and similarly from its end.
 * */
export const removeSurroundingSlashes = (path: string) => {
  return path.replace(/(^\/|\/$)/g, '');
};

export const normalizeCmsUri = (uri: string) => {
  return removeSurroundingSlashes(stripLocaleFromUri(uri));
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

/**
 * Rewrite the URLs with internal URLS.
 * @param apolloResponseData The fetch result in JSON format
 * @returns A JSON with manipulated content transformed with URLRewriteMapping
 */
export function rewriteInternalURLs(
  apolloResponseData: Record<string, unknown>
): Record<string, unknown> {
  const replacer = (key: string, value: unknown) => {
    if (typeof value === 'string') {
      for (const { regex, replace, skip } of AppConfig.URLRewriteMapping) {
        const re = new RegExp(regex, 'g');
        if (re.test(value)) {
          if (skip) {
            return value;
          }
          return value.replace(re, replace);
        }
      }
    }
    return value;
  };
  return JSON.parse(JSON.stringify(apolloResponseData, replacer));
}
