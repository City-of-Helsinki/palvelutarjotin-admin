import { Checkbox } from 'hds-react';
import capitalize from 'lodash/capitalize';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { SUPPORT_LANGUAGES } from '../../../constants';
import styles from './formLanguageSelector.module.scss';

const FormLanguageSelector: React.FC<{
  selectedLanguages: string[];
  onLanguageClick: React.ChangeEventHandler<HTMLInputElement>;
}> = ({ selectedLanguages, onLanguageClick }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.languagesSelectorContainer}>
      <p>{t('eventForm.formLanguageSelectorTitle')}</p>
      <div className={styles.checkboxContainer}>
        {Object.values(SUPPORT_LANGUAGES).map((lang) => (
          <Checkbox
            key={lang}
            id={`lang-checkbox-${lang}`}
            label={capitalize(t(`common.languages.${lang}`))}
            value={lang}
            checked={selectedLanguages.includes(lang)}
            onChange={onLanguageClick}
          />
        ))}
      </div>
    </div>
  );
};

export default FormLanguageSelector;
