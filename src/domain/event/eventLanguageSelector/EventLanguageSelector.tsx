import classNames from 'classnames';
import { IconCheck, IconInfoCircle } from 'hds-react';
import React from 'react';

import { Language } from '../../../types';
import styles from './eventLanguageSelector.module.scss';

type LanguageOption = {
  isCompleted: boolean;
  isDisabled: boolean;
  label: string;
  value: Language;
};

type Props = {
  languages: LanguageOption[];
  onClick: (language: Language) => void;
  selectedLanguage: Language;
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
              {language.isCompleted ? (
                <IconCheck aria-hidden="true" />
              ) : (
                <IconInfoCircle aria-hidden="true" />
              )}
            </div>
            <span>{language.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default EventLanguageSelector;
