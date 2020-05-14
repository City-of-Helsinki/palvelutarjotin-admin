import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import Button from '../../common/components/button/Button';
import useLocale from '../../hooks/useLocale';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import styles from './eventsPage.module.scss';

const EventsPage = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const locale = useLocale();

  const moveToCreateEventPage = () => {
    history.push(`/${locale}${ROUTES.CREATE_EVENT}`);
  };

  return (
    <PageWrapper>
      <Container>
        <div className={styles.eventsPage}>
          <h1>{t('events.title')}</h1>

          <div className={styles.comingEventsTitleWrapper}>
            <h2>
              {t('events.titleComingEvents')}{' '}
              <span className={styles.eventCount}>
                {t('events.textEventCount', { count: 0 })}
              </span>
            </h2>
            <div className={styles.searchWrapper}>
              <Button onClick={moveToCreateEventPage}>
                {t('events.buttonNewEvent')}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </PageWrapper>
  );
};

export default EventsPage;
