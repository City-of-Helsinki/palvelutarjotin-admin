import { IconAngleRight, IconSignout, IconUser, Navigation } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useRouteMatch } from 'react-router-dom';

import { MenuItem } from '../../../common/components/menuDropdown/MenuDropdown';
import { ROUTER_LANGUAGES, SUPPORT_LANGUAGES } from '../../../constants';
import {
  OrganisationNodeFieldsFragment,
  useMyProfileQuery,
} from '../../../generated/graphql';
import {
  useCmsLanguageOptions,
  useCmsMenuItems,
} from '../../../headless-cms/hooks';
import { stripLocaleFromUri } from '../../../headless-cms/utils';
import useHistory from '../../../hooks/useHistory';
import { LanguageSelectorLanguage } from '../../../types';
import updateLocaleParam from '../../../utils/updateLocaleParam';
import { logoutTunnistamo } from '../../auth/authenticate';
import { isAuthenticatedSelector } from '../../auth/selectors';
import { setActiveOrganisation } from '../../organisation/actions';
import { activeOrganisationSelector } from '../../organisation/selector';
import { MAIN_CONTENT_ID } from '../layout/PageLayout';
import { ROUTES } from '../routes/constants';
import { getCmsPath } from '../routes/utils';
import styles from './header.module.scss';
import HeaderLink from './HeaderLink';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const locale = i18n.language;
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { cmsMenuLoading, menuItems } = useCmsMenuItems();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const isTabActive = (path: string): boolean => {
    const pathWithoutTrailingSlash = path.replace(/\/$/, '');
    return (
      typeof window !== 'undefined' &&
      window.location.pathname.includes(getCmsPath(pathWithoutTrailingSlash))
    );
  };

  const goToPage =
    (pathname: string) =>
    (event?: React.MouseEvent<HTMLAnchorElement> | Event) => {
      event?.preventDefault();
      history.pushWithLocale(pathname);
      closeMenu();
    };

  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { data: myProfileData } = useMyProfileQuery({ skip: !isAuthenticated });

  const organisations: OrganisationNodeFieldsFragment[] =
    myProfileData?.myProfile?.organisations?.edges?.map((edge) => ({
      ...(edge?.node as OrganisationNodeFieldsFragment),
    })) || [];

  return (
    <Navigation
      menuOpen={menuOpen}
      onMenuToggle={toggleMenu}
      menuToggleAriaLabel={t('header.menuToggleAriaLabel')}
      skipTo={`#${MAIN_CONTENT_ID}`}
      skipToContentLabel={t('common.linkSkipToContent')}
      onTitleClick={goToPage(ROUTES.HOME)}
      logoLanguage={locale === 'sv' ? 'sv' : 'fi'}
      title={t('appName')}
    >
      {!cmsMenuLoading && menuItems?.length && (
        <Navigation.Row variant="inline">
          {menuItems
            ?.map((item, index) => {
              if (!item?.id) return null;
              if (!!item.children?.length) {
                return (
                  <Navigation.Dropdown label={item.title} key={item.id}>
                    <Navigation.Item
                      label={item.title}
                      as={HeaderLink}
                      to={`/${locale}${getCmsPath(
                        stripLocaleFromUri(item.uri ?? '')
                      )}`}
                    />
                    {item.children.map((child) => (
                      <Navigation.Item
                        key={child.id}
                        label={child?.title}
                        as={HeaderLink}
                        to={`/${locale}${getCmsPath(
                          stripLocaleFromUri(child?.uri ?? '')
                        )}`}
                      />
                    ))}
                  </Navigation.Dropdown>
                );
              } else {
                const translatedPageUri = `/${item.slug}` as string;
                return (
                  <Navigation.Item
                    key={index}
                    active={isTabActive(item.uri)}
                    label={item.title}
                    as={HeaderLink}
                    to={`/${locale}${getCmsPath(translatedPageUri)}`}
                  />
                );
              }
            })
            .filter((item) => item != null)}
        </Navigation.Row>
      )}
      <Navigation.Actions>
        {isAuthenticated && (
          <UserNavigation
            organisations={organisations}
            userLabel={myProfileData?.myProfile?.name || ''}
          />
        )}
        <LanguageNavigation />
      </Navigation.Actions>
    </Navigation>
  );
};

const UserNavigation: React.FC<{
  organisations: OrganisationNodeFieldsFragment[];
  userLabel: string;
}> = ({ organisations, userLabel }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const goToEditMyProfile = () => {
    history.pushWithLocale(ROUTES.MY_PROFILE);
  };

  const logout = () => {
    logoutTunnistamo();
  };

  const activeOrganisation = useSelector(activeOrganisationSelector);

  const changeActiveOrganisation = (id: string) => {
    dispatch(setActiveOrganisation(id));
  };

  return (
    <Navigation.User
      buttonAriaLabel={t('header.userMenu.ariaLabelButton')}
      label={userLabel}
      userName={userLabel}
      authenticated={true}
    >
      <Navigation.Item
        key={`edit-profile`}
        icon={<IconUser />}
        label={t('header.userMenu.openMyProfile')}
        onClick={goToEditMyProfile}
        variant="supplementary"
      />
      {organisations?.map((organisation) => (
        <Navigation.Item
          key={`organisation-${organisation.id}`}
          className={
            activeOrganisation === organisation.id
              ? styles.activeOrganisation
              : undefined
          }
          icon={<IconAngleRight />}
          label={organisation.name || ''}
          onClick={() => changeActiveOrganisation(organisation.id)}
          variant="supplementary"
        />
      ))}
      <Navigation.Item
        key={`sign-out`}
        icon={<IconSignout aria-hidden />}
        label={t('header.userMenu.logout')}
        onClick={logout}
        variant="supplementary"
      />
    </Navigation.User>
  );
};

const LanguageNavigation: React.FC = () => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;
  const { pathname, search } = useLocation();
  const history = useHistory();
  const isCmsPage = !!useRouteMatch(`/${locale}${ROUTES.CMS_PAGE}`);
  const languageOptions = useCmsLanguageOptions({ skip: !isCmsPage });

  const getCmsHref = (lang: string) => {
    const nav = languageOptions?.find((languageOption) => {
      return languageOption.locale?.toLowerCase() === lang;
    });

    return `/${lang}${getCmsPath(
      nav?.uri ? stripLocaleFromUri(nav?.uri) : ''
    )}`;
  };

  const changeLanguage = (newLanguage: LanguageSelectorLanguage) => {
    history.push({
      pathname: updateLocaleParam(pathname, locale, newLanguage),
      search,
    });
  };
  const getLanguageOptions = (): MenuItem[] => {
    const createOptions = (languages: LanguageSelectorLanguage[]) =>
      languages.map((language) => ({
        language,
        text: t(`header.languages.${language}`),
        value: language,
      }));

    if (process.env.REACT_APP_LANGUAGE_CIMODE_VISIBLE === 'true') {
      return createOptions(Object.values(ROUTER_LANGUAGES));
    }
    return createOptions(Object.values(SUPPORT_LANGUAGES));
  };
  const handleLanguageChange = (item: MenuItem) => {
    changeLanguage(item.language || 'fi');
  };
  return (
    <Navigation.LanguageSelector
      buttonAriaLabel={t('header.changeLanguage')}
      label={locale.toUpperCase()}
      closeOnItemClick
    >
      {getLanguageOptions().map((option) => {
        const handleOnClick = isCmsPage
          ? () => history.push(getCmsHref(option.value))
          : () => handleLanguageChange(option);
        return (
          <Navigation.Item
            key={option.value}
            lang={option.value}
            label={option.text}
            onClick={handleOnClick}
          />
        );
      })}
    </Navigation.LanguageSelector>
  );
};

export default Header;
