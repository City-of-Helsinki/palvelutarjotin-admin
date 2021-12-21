import { Button } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import BackButton from '../../../common/components/backButton/BackButton';
import { SUPPORT_LANGUAGES } from '../../../constants';
import { EventQuery } from '../../../generated/graphql';
import useGoBack from '../../../hooks/useGoBack';
import useHistory from '../../../hooks/useHistory';
import { Language } from '../../../types';
import useQueryStringWithReturnPath from '../../../utils/useQueryStringWithReturnPath';
import { ROUTES } from '../../app/routes/constants';
import EventLanguageSelector from '../eventLanguageSelector/EventLanguageSelector';
import { isEditableEvent } from '../utils';
import styles from './eventDetailsButtons.module.scss';

interface Props {
  eventData: EventQuery;
  onClickLanguage: (language: Language) => void;
  selectedLanguage: Language;
}

const EventDetailsButtons: React.FC<Props> = ({
  eventData,
  onClickLanguage,
  selectedLanguage,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const eventId = eventData.event?.id || '';
  const goBack = useGoBack({
    defaultReturnPath: ROUTES.HOME,
    pageQueryParams: ['language'],
  });
  const queryStringWithReturnPath = useQueryStringWithReturnPath();

  const goToEditPage = () => {
    const searchParams = new URLSearchParams(queryStringWithReturnPath);
    searchParams.append('language', selectedLanguage);
    history.pushWithLocale({
      pathname: ROUTES.EDIT_EVENT.replace(':id', eventId),
      search: searchParams.toString(),
    });
  };

  return (
    <div className={styles.eventDetailsButtons}>
      <div>
        <BackButton onClick={goBack}>{t('common.back')}</BackButton>
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
      {isEditableEvent(eventData) && (
        <div>
          <Button onClick={goToEditPage}>
            {t('eventDetails.buttons.buttonEdit')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EventDetailsButtons;
