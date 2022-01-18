import React from 'react';
import { useLocation, useParams } from 'react-router';

import {
  MenuNodeIdTypeEnum,
  MenuPageFieldsFragment,
  useMenuQuery,
} from '../generated/graphql-cms';
import useIsMounted from '../hooks/useIsMounted';
import useLocale from '../hooks/useLocale';
import { isFeatureEnabled } from '../utils/featureFlags';
import cmsClient from './client';
import { MENU_NAME } from './constants';
import { usePageQuery } from './usePageQuery';
import {
  queryPageWithUri,
  stripLocaleFromUri,
  uriToBreadcrumbs,
} from './utils';

export const useCmsMenuItems = () => {
  const locale = useLocale();
  const { slug } = useParams<{ slug: string }>();
  const { data: navigationData, loading: cmsMenuLoading } = useMenuQuery({
    client: cmsClient,
    skip: !isFeatureEnabled('HEADLESS_CMS') || !locale,
    variables: {
      id: MENU_NAME.Header,
      idType: MenuNodeIdTypeEnum.Name,
    },
  });

  // contains menu items as arrays with all the translations
  const menuItemArrays = navigationData?.menu?.menuItems?.nodes?.map(
    (menuItem) => {
      const item = menuItem?.connectedNode?.node;
      if (isPageNode(item)) {
        const translationItems = item.translations?.map((translation) => ({
          ...translation,
          locale: translation?.language?.code,
          uri: stripLocaleFromUri(translation?.uri ?? ''),
          // find all child translations that have same language
          children: item.children?.nodes
            ?.filter(isPageNode)
            .map((childNode) =>
              childNode.translations?.find(
                (childTranslation) =>
                  translation?.language === childTranslation?.language
              )
            ),
        }));

        return [
          {
            ...item,
            locale: item?.language?.code,
            uri: stripLocaleFromUri(item.uri ?? ''),
            children: item.children?.nodes?.filter(isPageNode),
          },
          ...(translationItems ?? []),
        ];
      }

      return null;
    }
  );

  const menuItems = menuItemArrays
    ?.map((item) => {
      return item?.find((i) => i.locale?.toLowerCase() === (locale as string));
    })
    .filter((i) => i);

  const navigationSlugs = menuItemArrays?.find((a) => {
    return a?.some((b) => {
      if (Array.isArray(slug)) {
        return b.slug === slug?.[0];
      }
      return false;
    });
  });

  return {
    navigationData,
    cmsMenuLoading,
    menuItems,
    navigationSlugs,
  };
};

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
    fetchNavigation();
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
  }, [slug, locale, isMounted]);

  return { breadcrumbs, loading };
};

const isPageNode = (node?: any): node is MenuPageFieldsFragment => {
  return Boolean(node && 'title' in node);
};
