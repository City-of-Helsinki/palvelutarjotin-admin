import type { Config } from 'react-helsinki-headless-cms';
import { defaultConfig as rhhcDefaultConfig } from 'react-helsinki-headless-cms';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import useLocale from './useLocale';
import AppConfig from '../domain/app/AppConfig';
import { MAIN_CONTENT_ID } from '../domain/app/layout/PageLayout';
import { getCmsPath } from '../domain/app/routes/utils';
import { stripLocaleFromUri } from '../headless-cms/utils';
import getLanguageCode from '../utils/getLanguageCode';

const getIsHrefExternal = (href: string) =>
  !href?.startsWith('/') &&
  !AppConfig.internalHrefOrigins.some((origin) => href?.includes(origin));

type Props = Pick<
  Config,
  'apolloClient' | 'eventsApolloClient' | 'venuesApolloClient'
>;

export default function useRHHCConfig({
  apolloClient,
  eventsApolloClient,
  venuesApolloClient,
}: Props): Config {
  const { t } = useTranslation();
  const locale = useLocale();
  return {
    ...rhhcDefaultConfig,
    mainContentId: MAIN_CONTENT_ID,
    organisationPrefixes: [],
    components: {
      ...rhhcDefaultConfig.components,

      A: ({ href, ...props }) => <Link to={href ?? ''} {...props} />,

      Link: ({ href, ...props }) => <Link to={href ?? ''} {...props} />,
    },
    siteName: t('appName'),
    currentLanguageCode: getLanguageCode(locale),
    apolloClient,
    eventsApolloClient,
    venuesApolloClient,
    utils: {
      ...rhhcDefaultConfig.utils,
      getIsHrefExternal,
      getRoutedInternalHref: (link?: string | null) =>
        `/${locale.toLowerCase()}${getCmsPath(stripLocaleFromUri(link ?? ''))}`,
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
}
