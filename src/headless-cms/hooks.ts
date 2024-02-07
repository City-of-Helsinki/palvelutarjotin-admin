import React from 'react';
import { useLocation } from 'react-router-dom';

import useIsMounted from '../hooks/useIsMounted';
import useLocale from '../hooks/useLocale';
import { usePageQuery } from './usePageQuery';
import { queryPageWithUri, uriToBreadcrumbs } from './utils';

export const useCmsLanguageOptions = ({
  skip = false,
}: { skip?: boolean } = {}) => {
  const location = useLocation();

  const cmsPageRegexp = /(\/?(fi|en|sv))?\/?cms-page/;
  const cmsUri = location.pathname.replace(cmsPageRegexp, '');
  const { data: pageData } = usePageQuery(cmsUri, { skip });

  return !skip
    ? [
        {
          uri: pageData?.page?.uri,
          locale: pageData?.page?.language?.code?.toLowerCase(),
        },
        ...(pageData?.page?.translations?.map((translation) => ({
          uri: translation?.uri,
          locale: translation?.language?.code?.toLowerCase(),
        })) ?? []),
      ]
    : [];
};

export type Breadcrumb = { title: string; uri: string };

export const useCmsNavigation = (slug: string) => {
  const [loading, setLoading] = React.useState(true);
  const [breadcrumbs, setBreadcrumbs] = React.useState<Breadcrumb[] | null>(
    null
  );
  const isMounted = useIsMounted();
  const locale = useLocale();

  React.useEffect(() => {
    const uriSegments = uriToBreadcrumbs(slug);
    async function fetchNavigation() {
      setLoading(true);
      try {
        const promises = uriSegments.map((uriSegment) =>
          queryPageWithUri(uriSegment)
        );
        const pagesResults = await Promise.all(promises);
        const pages = pagesResults.map((m) => m.data.page);
        const breadcrumbs = pages.map((page) => ({
          uri: page?.uri ?? '',
          title: page?.title ?? '',
        }));

        if (isMounted.current) {
          setBreadcrumbs(breadcrumbs);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    }
    if (slug) {
      fetchNavigation();
    }
  }, [slug, locale, isMounted]);

  return { breadcrumbs, loading };
};
