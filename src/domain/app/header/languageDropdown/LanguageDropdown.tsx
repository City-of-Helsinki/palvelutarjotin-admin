import { IconGlobe } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';

import MenuDropdown, {
  MenuItem,
} from '../../../../common/components/menuDropdown/MenuDropdown';
import { SUPPORT_LANGUAGES } from '../../../../constants';
import useLocale from '../../../../hooks/useLocale';
import { Language } from '../../../../types';
import updateLocaleParam from '../../../../utils/updateLocaleParam';

const LanguageDropdown: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { pathname, search } = useLocation();
  const locale = useLocale();

  const languageOptions = Object.values(SUPPORT_LANGUAGES).map((language) => {
    return {
      language,
      text: t(`header.languages.${language}`),
      value: language,
    };
  });

  const changeLanguage = (newLanguage: Language) => {
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
      items={languageOptions}
      onMenuItemClick={handleMenuItemClick}
      value={locale}
    />
  );
};

export default LanguageDropdown;
