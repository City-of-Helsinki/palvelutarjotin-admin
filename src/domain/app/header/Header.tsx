import {
  Button as HDSButton,
  Header as HDSHeader,
  IconAngleRight,
  IconLinkExternal,
  IconSignout,
  IconUser,
  useOidcClient,
} from 'hds-react';
import * as React from 'react';
import {
  Language as RHHCLanguage,
  LanguageCodeEnum,
  MenuItem,
  Navigation,
} from 'react-helsinki-headless-cms';
import {
  useLanguagesQuery,
  useMenuQuery,
} from 'react-helsinki-headless-cms/apollo';
import { useTranslation } from 'react-i18next';
import { useLocation, useMatch } from 'react-router-dom';

import styles from './header.module.scss';
import {
  OrganisationNodeFieldsFragment,
  useMyProfileQuery,
} from '../../../generated/graphql';
import { HEADER_MENU_NAME } from '../../../headless-cms/constants';
import { useCmsLanguageOptions } from '../../../headless-cms/hooks';
import { stripLocaleFromUri } from '../../../headless-cms/utils';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import useLocale from '../../../hooks/useLocale';
import useNavigate from '../../../hooks/useNavigate';
import { skipFalsyType } from '../../../utils/typescript.utils';
import updateLocaleParam from '../../../utils/updateLocaleParam';
import useLogout from '../../auth/useLogout';
import { setActiveOrganisation } from '../../organisation/actions';
import { activeOrganisationSelector } from '../../organisation/selector';
import AppConfig from '../AppConfig';
import { ROUTES } from '../routes/constants';
import { getCmsPath } from '../routes/utils';

const UserNavigation: React.FC<{
  organisations: OrganisationNodeFieldsFragment[];
  userLabel: string;
}> = ({ organisations, userLabel }) => {
  const logout = useLogout();
  const { t } = useTranslation();
  const { pushWithLocale } = useNavigate();
  const dispatch = useAppDispatch();

  const goToEditMyProfile = () => {
    pushWithLocale(ROUTES.MY_PROFILE);
  };

  const goToHelsinkiProfile = () => {
    if (typeof window !== 'undefined') {
      window.open(
        AppConfig.helsinkiProfileUrl,
        '_blank',
        'noopener,noreferrer'
      );
    }
  };

  const activeOrganisation = useAppSelector(activeOrganisationSelector);

  const changeActiveOrganisation = (id: string) => {
    dispatch(setActiveOrganisation(id));
  };

  return (
    <HDSHeader.ActionBarItem
      id="user-menu"
      dropdownClassName={styles.userMenuDropdown}
      icon={<IconUser />}
      ariaLabel={t('header.userMenu.ariaLabelButton')}
      label={userLabel}
      preventButtonResize
    >
      <HDSButton
        key={`edit-profile`}
        className={styles.dropdownButton}
        iconLeft={<IconUser />}
        onClick={goToEditMyProfile}
        variant="supplementary"
      >
        {t('header.userMenu.openMyProfile')}
      </HDSButton>
      <HDSButton
        key={`go-to-profile`}
        className={styles.dropdownButton}
        iconLeft={<IconLinkExternal />}
        onClick={goToHelsinkiProfile}
        variant="supplementary"
      >
        {t('header.userMenu.openHelsinkiProfile')}
      </HDSButton>
      {organisations?.map((organisation) => (
        <HDSButton
          key={`organisation-${organisation.id}`}
          className={
            activeOrganisation === organisation.id
              ? styles.activeDropdownButton
              : styles.dropdownButton
          }
          iconLeft={<IconAngleRight />}
          onClick={() => changeActiveOrganisation(organisation.id)}
          variant="supplementary"
        >
          {organisation.name || ''}
        </HDSButton>
      ))}
      <HDSButton
        key={`sign-out`}
        className={styles.dropdownButton}
        iconLeft={<IconSignout aria-hidden />}
        onClick={logout}
        variant="supplementary"
      >
        {t('header.userMenu.logout')}
      </HDSButton>
    </HDSHeader.ActionBarItem>
  );
};

const Header: React.FC = () => {
  const { isAuthenticated } = useOidcClient();
  const { pushWithLocale } = useNavigate();
  const locale = useLocale();
  const isCmsPage = !!useMatch(`/${locale}${ROUTES.CMS_PAGE}`);
  const cmsLanguageOptions = useCmsLanguageOptions({ skip: !isCmsPage });
  const { pathname, search } = useLocation();

  const isLoggedIn = isAuthenticated();

  const getCmsHref = (language: LanguageCodeEnum) => {
    const nav = cmsLanguageOptions?.find((cmsLanguageOption) => {
      return cmsLanguageOption.locale?.toLowerCase() === language.toLowerCase();
    });

    return `/${language.toLowerCase()}${getCmsPath(
      stripLocaleFromUri(nav?.uri ?? '')
    )}`;
  };

  const getOriginHref = (language: LanguageCodeEnum): string => {
    const url = new URL(AppConfig.origin);
    url.pathname = updateLocaleParam(pathname, locale, language);
    url.search = search;
    return url.toString();
  };

  const getIsItemActive = (menuItem: MenuItem): boolean => {
    const pathWithoutTrailingSlash = (menuItem.path ?? '').replace(/\/$/, '');
    return (
      typeof window !== 'undefined' &&
      window.location.pathname.includes(
        `/${locale}${getCmsPath(stripLocaleFromUri(pathWithoutTrailingSlash))}`
      )
    );
  };

  const getPathnameForLanguage = (language: RHHCLanguage): string => {
    const languageCode = language.code ?? LanguageCodeEnum.Fi;
    return isCmsPage ? getCmsHref(languageCode) : getOriginHref(languageCode);
  };

  const goToPage =
    (pathname: string) =>
    (event?: React.MouseEvent<HTMLAnchorElement> | Event) => {
      event?.preventDefault();
      pushWithLocale(pathname);
    };

  const { data: myProfileData } = useMyProfileQuery({ skip: !isLoggedIn });

  const organisations: OrganisationNodeFieldsFragment[] =
    myProfileData?.myProfile?.organisations?.edges?.map((edge) => ({
      ...(edge?.node as OrganisationNodeFieldsFragment),
    })) ?? [];

  const languagesQuery = useLanguagesQuery();
  const languages = languagesQuery.data?.languages?.filter(
    skipFalsyType<RHHCLanguage | null>
  );

  const menuQuery = useMenuQuery({
    skip: !isLoggedIn,
    variables: { id: HEADER_MENU_NAME[locale], menuIdentifiersOnly: true },
  });
  const menu = menuQuery.data?.menu;

  return (
    <Navigation
      languages={languages}
      menu={menu}
      onTitleClick={goToPage(ROUTES.HOME)}
      getIsItemActive={getIsItemActive}
      getPathnameForLanguage={getPathnameForLanguage}
      userNavigation={
        isLoggedIn && (
          <UserNavigation
            organisations={organisations}
            userLabel={myProfileData?.myProfile?.name ?? ''}
          />
        )
      }
    />
  );
};

export default Header;
