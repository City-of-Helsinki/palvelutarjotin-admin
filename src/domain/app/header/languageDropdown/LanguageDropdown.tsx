import { IconGlobe } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import MenuDropdown, {
  MenuItem,
} from '../../../../common/components/menuDropdown/MenuDropdown';
import { ROUTER_LANGUAGES, SUPPORT_LANGUAGES } from '../../../../constants';
import useHistory from '../../../../hooks/useHistory';
import { LanguageSelectorLanguage } from '../../../../types';
import updateLocaleParam from '../../../../utils/updateLocaleParam';

const LanguageDropdown: React.FC = () => {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const { pathname, search } = useLocation();
  const locale = i18n.language;

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

  const changeLanguage = (newLanguage: LanguageSelectorLanguage) => {
    history.push({
      pathname: updateLocaleParam(pathname, locale, newLanguage),
      search,
    });
  };

  const handleMenuItemClick = (item: MenuItem) => {
    changeLanguage(item.language || 'fi');
  };

  return (
    <MenuDropdown
      buttonAriaLabel={t('header.changeLanguage')}
      buttonText={locale.toUpperCase()}
      icon={<IconGlobe />}
      items={getLanguageOptions()}
      onMenuItemClick={handleMenuItemClick}
      value={locale}
    />
  );
};

export default LanguageDropdown;
