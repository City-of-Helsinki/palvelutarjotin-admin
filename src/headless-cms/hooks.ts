import React from 'react';
import { useLocation, useParams } from 'react-router';

import {
  MenuNodeIdTypeEnum,
  Page,
  useMenuQuery,
} from '../generated/graphql-cms';
import useIsMounted from '../hooks/useIsMounted';
import useLocale from '../hooks/useLocale';
import { isFeatureEnabled } from '../utils/featureFlags';
import cmsClient from './client';
import { NavigationObject, SEARCH_PANEL_TRESHOLD } from './components/CmsPage';
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

export type Breadcrumb = { title: string; uri: string };

export const useCmsNavigation = (slug: string) => {
  const [loading, setLoading] = React.useState(true);
  const [navigation, setNavigation] = React.useState<
    NavigationObject[][] | null
  >(null);
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
          .filter((i) => !!i.length && i.length < SEARCH_PANEL_TRESHOLD);

        if (isMounted.current) {
          setNavigation(navigationLevels);
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

  // TODO: Fetch locale specific pages also, only finnish works correctly atm
  const fetchPageChildrenToApolloCache = (page: Page) => {
    if ((page.children?.nodes?.length ?? 0) < SEARCH_PANEL_TRESHOLD) {
      page?.children?.nodes?.forEach((child) => {
        if (child && 'uri' in child && child.uri) {
          queryPageWithUri(child.uri);
        }
      });
    }
  };

  return { navigation, breadcrumbs, loading };
};
