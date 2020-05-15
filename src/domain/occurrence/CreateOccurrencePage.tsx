import { Button } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import EventOccurrenceForm from './eventOccurrenceForm/EventOccurrenceForm';
import styles from './occurrencePage.module.scss';

const CreateOccurrencePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <PageWrapper title="createEventOccurrence.pageTitle">
      <Container>
        <div className={styles.eventOccurrencePage}>
          <div className={styles.headerContainer}>
            {/* TODO: use selected event name as title */}
            <h1>{t('createEventOccurrence.title')}</h1>
            {/* TODO: show eventi information when clicking this button */}
            <Button variant="secondary">
              {t('createEventOccurrence.buttonShowEventInfo')}
            </Button>
          </div>
          <EventOccurrenceForm />
        </div>
      </Container>
    </PageWrapper>
  );
};

export default CreateOccurrencePage;
