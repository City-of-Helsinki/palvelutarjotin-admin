import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import React from 'react';
import type { Config, ModuleItemTypeEnum } from 'react-helsinki-headless-cms';
import { defaultConfig as rhhcDefaultConfig } from 'react-helsinki-headless-cms';
import { useTranslation } from 'react-i18next';

import AppConfig from '../domain/app/AppConfig';
import { MAIN_CONTENT_ID } from '../domain/app/layout/PageLayout';
import { getCmsPath } from '../domain/app/routes/utils';
import getLanguageCode from '../utils/getLanguageCode';
import useLocale from './useLocale';

const getIsHrefExternal = (href: string) =>
  !href?.startsWith('/') &&
  !AppConfig.internalHrefOrigins.some((origin) => href?.includes(origin));

const getRoutedInternalHref = (
  link?: string | null,
  type?: ModuleItemTypeEnum
): string => getCmsPath(link ?? '');

type Props = {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  eventsApolloClient: ApolloClient<NormalizedCacheObject>;
  venuesApolloClient: ApolloClient<NormalizedCacheObject>;
};

export default function useRHHCConfig({
  apolloClient,
  eventsApolloClient,
  venuesApolloClient,
}: Props): Config {
  const { t } = useTranslation();
  const locale = useLocale();

  return React.useMemo(() => {
    return {
      ...rhhcDefaultConfig,
      mainContentId: MAIN_CONTENT_ID,
      organisationPrefixes: [],
      components: {
        ...rhhcDefaultConfig.components,
      },
      siteName: t('appName'),
      currentLanguageCode: getLanguageCode(locale),
      apolloClient,
      eventsApolloClient,
      venuesApolloClient,
      utils: {
        ...rhhcDefaultConfig.utils,
        getIsHrefExternal,
        getRoutedInternalHref,
      },
      internalHrefOrigins: AppConfig.internalHrefOrigins,
      copy: {
        ...rhhcDefaultConfig.copy,
        menuToggleAriaLabel: 'toggle',
        skipToContentLabel: t('common.linkSkipToContent'),
      },
      htmlSanitizer: {
        allowedUnsafeTags: ['iframe'],
        trustedOrigins: ['https://www.youtube.com', 'https://player.vimeo.com'],
      },
    };
  }, [t, locale, apolloClient, eventsApolloClient, venuesApolloClient]);
}
