import React from 'react';
import { useTranslation } from 'react-i18next';

import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import EventForm from './eventForm/EventForm';
import styles from './eventPage.module.scss';

const CreateEventPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <PageWrapper title="createEvent.pageTitle">
      <Container>
        <div className={styles.eventPage}>
          <h1>{t('createEvent.title')}</h1>
          <EventForm />
        </div>
      </Container>
    </PageWrapper>
  );
};

export default CreateEventPage;
