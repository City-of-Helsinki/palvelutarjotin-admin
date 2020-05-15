import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import { LINKEDEVENTS_CONTENT_TYPE } from '../../constants';
import { useCreateEventMutation } from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import getLinkedEventsInternalId from '../../utils/getLinkedEventsInternalId';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import EventForm from './eventForm/EventForm';
import styles from './eventPage.module.scss';

const CreateEventPage: React.FC = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const history = useHistory();

  const [createEvent] = useCreateEventMutation();
  // TODO: Get event language which user has selected when implemented
  const language = locale;

  return (
    <PageWrapper title="createEvent.pageTitle">
      <Container>
        <div className={styles.eventPage}>
          <h1>{t('createEvent.title')}</h1>
          <EventForm
            onSubmit={async (values) => {
              const payload = {
                name: { [language]: values.name },
                // start_date and offers are mandatory on LinkedEvents to use dummy data
                startTime: new Date().toISOString(),
                offers: [
                  {
                    isFree: true,
                  },
                ],
                shortDescription: { [language]: values.shortDescription },
                description: { [language]: values.description },
                infoUrl: { [language]: values.infoUrl },
                audience: values.audience.map((keyword) => ({
                  internalId: getLinkedEventsInternalId(
                    LINKEDEVENTS_CONTENT_TYPE.KEYWORD,
                    keyword
                  ),
                })),
                inLanguage: values.inLanguage.map((language) => ({
                  internalId: getLinkedEventsInternalId(
                    LINKEDEVENTS_CONTENT_TYPE.LANGUAGE,
                    language
                  ),
                })),
                keywords: values.keywords.map((keyword) => ({
                  internalId: getLinkedEventsInternalId(
                    LINKEDEVENTS_CONTENT_TYPE.KEYWORD,
                    keyword
                  ),
                })),
                location: {
                  internalId: getLinkedEventsInternalId(
                    LINKEDEVENTS_CONTENT_TYPE.PLACE,
                    values.location
                  ),
                },
                pEvent: {
                  duration: Number(values.duration),
                  neededOccurrences: Number(values.neededOccurrences),
                },
              };

              try {
                const data = await createEvent({
                  variables: { event: payload },
                });
                const id =
                  data.data?.addEventMutation?.response?.body?.id || '666';
                history.push(
                  `/${locale}${ROUTES.EVENT_DETAILS.replace(':id', id)}`
                );
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
