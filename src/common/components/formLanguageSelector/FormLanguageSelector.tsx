import { Checkbox } from 'hds-react';
import capitalize from 'lodash/capitalize';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './formLanguageSelector.module.scss';
import { SUPPORT_LANGUAGES } from '../../../constants';

export const formLanguageSelectorTestId = 'formLanguageSelectorTestId';

const FormLanguageSelector: React.FC<{
  selectedLanguages: string[];
  onLanguageClick: React.ChangeEventHandler<HTMLInputElement>;
}> = ({ selectedLanguages, onLanguageClick }) => {
  const { t } = useTranslation();

  return (
    <div
      className={styles.languagesSelectorContainer}
      data-testid={formLanguageSelectorTestId}
    >
      <p>{t('eventForm.formLanguageSelectorTitle')}</p>
      <div className={styles.checkboxContainer}>
        {Object.values(SUPPORT_LANGUAGES).map((lang) => (
          <Checkbox
            key={lang}
            disabled={
              selectedLanguages.length === 1 && selectedLanguages.includes(lang)
            }
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
