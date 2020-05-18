import { Button } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import BackButton from '../../../common/components/backButton/BackButton';
import { SUPPORT_LANGUAGES } from '../../../constants';
import { EventQuery } from '../../../generated/graphql';
import { ROUTES } from '../../app/routes/constants';
import EventLanguageSelector from '../eventLanguageSelector/EventLanguageSelector';
import styles from './eventDetailsButtons.module.scss';

interface Props {
  eventData: EventQuery;
  onClickLanguage: (language: SUPPORT_LANGUAGES) => void;
  selectedLanguage: SUPPORT_LANGUAGES;
}

const EventDetailsButtons: React.FC<Props> = ({
  eventData,
  onClickLanguage,
  selectedLanguage,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const eventId = eventData.event?.id || '';

  const moveToEventList = () => {
    history.push(ROUTES.HOME);
  };

  const moveToEditPage = () => {
    history.push(ROUTES.EDIT_EVENT.replace(':id', eventId));
  };

  return (
    <div className={styles.eventDetailsButtons}>
      <div>
        <BackButton onClick={moveToEventList}>
          {t('eventDetails.buttons.buttonBack')}
        </BackButton>
      </div>
      <EventLanguageSelector
        languages={Object.values(SUPPORT_LANGUAGES).map((language) => ({
          isCompleted: !!eventData.event?.name[language],
          isDisabled: !eventData.event?.name[language],
          label: t(`common.languages.${language}`),
          value: language,
        }))}
        onClick={onClickLanguage}
        selectedLanguage={selectedLanguage}
      />
      <div>
        <Button onClick={moveToEditPage}>Muokkaa tapahtumaa</Button>
      </div>
    </div>
  );
};

export default EventDetailsButtons;
