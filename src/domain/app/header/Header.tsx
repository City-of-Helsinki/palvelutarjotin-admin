import { IconAngleRight, IconSignout, IconUser, Navigation } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { MenuItem } from '../../../common/components/menuDropdown/MenuDropdown';
import { ROUTER_LANGUAGES, SUPPORT_LANGUAGES } from '../../../constants';
import {
  OrganisationNodeFieldsFragment,
  useMyProfileQuery,
} from '../../../generated/graphql';
import {
  LanguageCodeEnum,
  MenuNodeIdTypeEnum,
  Page,
  useMenuQuery,
} from '../../../generated/graphql-cms';
import apolloClient from '../../../headless-cms/client';
import { MENU_NAME } from '../../../headless-cms/constants';
import useHistory from '../../../hooks/useHistory';
import { LanguageSelectorLanguage } from '../../../types';
import updateLocaleParam from '../../../utils/updateLocaleParam';
import { logoutTunnistamo } from '../../auth/authenticate';
import { isAuthenticatedSelector } from '../../auth/selectors';
import { setActiveOrganisation } from '../../organisation/actions';
import { activeOrganisationSelector } from '../../organisation/selector';
import { MAIN_CONTENT_ID } from '../layout/PageLayout';
import { ROUTES } from '../routes/constants';
import styles from './header.module.scss';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const locale = i18n.language;
  const [menuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const closeMenu = () => setMenuOpen(false);

  const isTabActive = (pathname: string): boolean => {
    return (
      typeof window !== 'undefined' &&
      window.location.pathname.includes(
        `${ROUTES.CMS_PAGE.replace(':id', pathname)}`
      )
    );
  };

  const goToPage =
    (pathname: string) =>
    (event?: React.MouseEvent<HTMLAnchorElement> | Event) => {
      event?.preventDefault();
      history.push(pathname);
      closeMenu();
    };

  const isAuthenticated = useSelector(isAuthenticatedSelector);

  const { data: myProfileData } = useMyProfileQuery({ skip: !isAuthenticated });

  const organisations: OrganisationNodeFieldsFragment[] =
    myProfileData?.myProfile?.organisations.edges.map((edge) => ({
      ...(edge?.node as OrganisationNodeFieldsFragment),
    })) || [];

  const { data: navigationItems, loading: cmsMenuLoading } = useMenuQuery({
    client: apolloClient,
    skip: !locale || !myProfileData,
    variables: {
      id: MENU_NAME.Header,
      idType: MenuNodeIdTypeEnum.Name,
      language: locale.toString().toUpperCase() as LanguageCodeEnum,
    },
  });

  return (
    <Navigation
      menuOpen={menuOpen}
      onMenuToggle={toggleMenu}
      menuToggleAriaLabel={t('header.menuToggleAriaLabel')}
      skipTo={`#${MAIN_CONTENT_ID}`}
      skipToContentLabel={t('common.linkSkipToContent')}
      onTitleClick={goToPage(`/${locale}${ROUTES.HOME}`)}
      logoLanguage={locale === 'sv' ? 'sv' : 'fi'}
      title={t('appName')}
    >
      {!cmsMenuLoading && navigationItems && (
        <Navigation.Row variant="inline">
          {navigationItems?.menu?.menuItems?.nodes
            ?.map((node, index) => {
              const page = node?.connectedNode?.node as Page;
              const item = page?.translation;
              if (!item) return null;
              const translatedPageId = item.id as string;
              return (
                <Navigation.Item
                  key={index}
                  active={isTabActive(item.id)}
                  label={item.title}
                  onClick={goToPage(
                    `${ROUTES.CMS_PAGE.replace(':id', translatedPageId)}`
                  )}
                />
              );
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
      {getLanguageOptions().map((option) => (
        <Navigation.Item
          key={option.value}
          lang={option.value}
          label={option.text}
          onClick={() => handleLanguageChange(option)}
        />
      ))}
    </Navigation.LanguageSelector>
  );
};

export default Header;
