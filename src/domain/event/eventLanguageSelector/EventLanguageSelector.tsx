import classNames from 'classnames';
import { IconAttention, IconCheck } from 'hds-react';
import React from 'react';

import { SUPPORT_LANGUAGES } from '../../../constants';
import styles from './eventLanguageSelector.module.scss';

type LanguageOption = {
  isCompleted: boolean;
  isDisabled: boolean;
  label: string;
  value: SUPPORT_LANGUAGES;
};

type Props = {
  languages: LanguageOption[];
  onClick: (language: SUPPORT_LANGUAGES) => void;
  selectedLanguage: SUPPORT_LANGUAGES;
};

const EventLanguageSelector: React.FC<Props> = ({
  languages,
  onClick,
  selectedLanguage,
}) => {
  return (
    <div className={styles.eventLanguageSelector}>
      {languages.map((language, index) => {
        const isSelected = language.value === selectedLanguage;
        return (
          <button
            key={index}
            className={classNames(styles.languageButton, {
              [styles.isDisabled]: language.isDisabled,
              [styles.isSelected]: isSelected,
            })}
            disabled={language.isDisabled}
            onClick={() => {
              onClick(language.value);
            }}
            type="button"
          >
            <div
              className={classNames(styles.buttonIconWrapper, {
                [styles.isCompleted]: language.isCompleted,
              })}
            >
              {language.isCompleted ? <IconCheck /> : <IconAttention />}
            </div>
            <span>{language.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default EventLanguageSelector;
