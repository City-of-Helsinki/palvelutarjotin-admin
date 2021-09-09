import React from 'react';
import { useLocation, useParams } from 'react-router';

import {
  MenuNodeIdTypeEnum,
  Page,
  PageDocument,
  PageIdType,
  PageQuery,
  PageQueryVariables,
  useMenuQuery,
} from '../generated/graphql-cms';
import useIsMounted from '../hooks/useIsMounted';
import useLocale from '../hooks/useLocale';
import { isFeatureEnabled } from '../utils/featureFlags';
import cmsClient from './client';
import { NavigationObject } from './components/CmsPage';
import { MENU_NAME } from './constants';
import { usePageQuery } from './usePageQuery';
import {
  removeSurroundingSlashes,
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
      if (item && 'title' in item) {
        const translationItems = item.translations?.map((translation) => ({
          ...translation,
          locale: translation?.language?.code,
          uri: stripLocaleFromUri(translation?.uri ?? ''),
        }));

        return [
          {
            ...item,
            locale: item?.language?.code,
            uri: stripLocaleFromUri(item.uri ?? ''),
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

export const useCmsLanguageOptions = () => {
  const location = useLocation();
  const cmsUri = location.pathname.replace(/(\/?(fi|en|sv))?\/?cms-page/, '');
  const { data: pageData } = usePageQuery(cmsUri);

  return [
    {
      uri: pageData?.page?.uri,
      locale: pageData?.page?.language?.code?.toLowerCase(),
    },
    ...(pageData?.page?.translations?.map((translation) => ({
      uri: translation?.uri,
      locale: translation?.language?.code?.toLowerCase(),
    })) ?? []),
  ];
};

export const useCmsNavigation = (slug: string) => {
  const [loading, setLoading] = React.useState(true);
  const [navigation, setNavigation] = React.useState<
    NavigationObject[][] | null
  >(null);
  const isMounted = useIsMounted();
  const locale = useLocale();

  React.useEffect(() => {
    const uriSegments = uriToBreadcrumbs(slug);
    fetchNavigation();
    async function fetchNavigation() {
      setLoading(true);
      try {
        const promises = uriSegments.map((uriSegment) =>
          cmsClient.query<PageQuery, PageQueryVariables>({
            query: PageDocument,
            variables: {
              id: removeSurroundingSlashes(uriSegment),
              idType: PageIdType.Uri,
            },
          })
        );

        const pagesResults = await Promise.all(promises);
        const pages = pagesResults.map((m) => m.data.page);

        // Makes navigating to children pages faster (no loading spinner)
        fetchPageChildrenToApolloCache(pages[pages.length - 1] as Page);

        // Form array of navigation arrays of all the sub menus of current cms page
        const navigationLevels = pages
          .map((page) => {
            const navigationItems: NavigationObject[] = [];
            page?.children?.nodes?.forEach((p) => {
              if (p && 'uri' in p) {
                navigationItems.push({
                  uri: stripLocaleFromUri(p.uri ?? '') as string,
                  locale: p.language?.code?.toLowerCase() ?? 'fi',
                  title: p.title ?? '',
                });
              }
            });
            return navigationItems;
          })
          .filter((i) => !!i.length);

        if (isMounted.current) {
          setNavigation(navigationLevels);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    }
  }, [slug, locale, isMounted]);

  // TODO: Fetch locale specific pages also, only finnish works correctly atm
  const fetchPageChildrenToApolloCache = (page: Page) => {
    page?.children?.nodes?.forEach((child) => {
      if (child && 'uri' in child) {
        cmsClient.query<PageQuery, PageQueryVariables>({
          query: PageDocument,
          variables: {
            id: removeSurroundingSlashes(child.uri!),
            idType: PageIdType.Uri,
          },
        });
      }
    });
  };

  return { navigation, loading };
};
