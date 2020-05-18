import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import { useCreateEventMutation } from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import EditEventButtons from './editEventButtons/EditEventButtons';
import EventForm from './eventForm/EventForm';
import styles from './eventPage.module.scss';
import { getEventPayload } from './utils';

const CreateEventPage: React.FC = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const history = useHistory();
  const [selectedLanguage, setSelectedLanguage] = React.useState(locale);

  const [createEvent] = useCreateEventMutation();

  return (
    <PageWrapper title="createEvent.pageTitle">
      <Container>
        <div className={styles.eventPage}>
          <EditEventButtons
            onClickLanguage={setSelectedLanguage}
            selectedLanguage={selectedLanguage}
          />
          <h1>{t('createEvent.title')}</h1>
          <EventForm
            onSubmit={async (values) => {
              try {
                const data = await createEvent({
                  variables: {
                    event: getEventPayload(values, selectedLanguage),
                  },
                });
                const id =
                  data.data?.addEventMutation?.response?.body?.id || '';
                history.push(ROUTES.EVENT_DETAILS.replace(':id', id));
              } catch (e) {
                // Check apolloClient to see error handling
              }
            }}
          />
        </div>
      </Container>
    </PageWrapper>
  );
};

export default CreateEventPage;
