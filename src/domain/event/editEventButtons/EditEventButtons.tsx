import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import BackButton from '../../../common/components/backButton/BackButton';
import { SUPPORT_LANGUAGES } from '../../../constants';
import { EventQuery } from '../../../generated/graphql';
import { Language } from '../../../types';
import { ROUTES } from '../../app/routes/constants';
import EventLanguageSelector from '../eventLanguageSelector/EventLanguageSelector';
import styles from './editEventButtons.module.scss';

interface Props {
  eventData?: EventQuery;
  onClickLanguage: (language: Language) => void;
  selectedLanguage: Language;
}

const EditEventButtons: React.FC<Props> = ({
  eventData,
  onClickLanguage,
  selectedLanguage,
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  const moveToEventList = () => {
    history.push(ROUTES.HOME);
  };

  return (
    <div className={styles.editEventButtons}>
      <div>
        <BackButton onClick={moveToEventList}>
          {t('editEvent.buttons.buttonBack')}
        </BackButton>
      </div>
      <EventLanguageSelector
        languages={Object.values(SUPPORT_LANGUAGES).map((language) => ({
          isCompleted: !!eventData?.event?.name[language],
          isDisabled: false,
          label: t(`common.languages.${language}`),
          value: language,
        }))}
        onClick={onClickLanguage}
        selectedLanguage={selectedLanguage}
      />
    </div>
  );
};

export default EditEventButtons;
