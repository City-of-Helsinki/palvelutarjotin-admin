import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';

import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import { useEditEventMutation, useEventQuery } from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import EventForm, {
  defaultInitialValues,
  EventFormFields,
} from './eventForm/EventForm';
import styles from './eventPage.module.scss';
import { getEventPayload, getFirstAvailableLanguage } from './utils';

const EditEventPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const locale = useLocale();
  const history = useHistory();
  const [selectedLanguage, setSelectedLanguage] = React.useState(locale);

  const [initialValues, setInitialValues] = React.useState<EventFormFields>(
    defaultInitialValues
  );

  const { data: eventData, loading } = useEventQuery({
    variables: {
      id,
      include: ['audience', 'in_language', 'keywords', 'location'],
    },
  });

  const [editEvent] = useEditEventMutation();

  React.useEffect(() => {
    if (eventData) {
      setSelectedLanguage(getFirstAvailableLanguage(eventData));
    }
  }, [eventData]);

  React.useEffect(() => {
    if (eventData) {
      setInitialValues({
        audience: eventData.event?.audience.map((item) => item.id || '') || [],
        description: eventData.event?.description?.[selectedLanguage] || '',
        duration: eventData.event?.pEvent?.duration.toString() || '',
        infoUrl: eventData.event?.infoUrl?.[selectedLanguage] || '',
        inLanguage:
          eventData.event?.inLanguage.map((item) => item.id || '') || [],
        keywords: eventData.event?.keywords.map((item) => item.id || '') || [],
        location: eventData.event?.location?.id || '',
        name: eventData.event?.name[selectedLanguage] || '',
        neededOccurrences:
          eventData.event?.pEvent?.neededOccurrences.toString() || '',
        shortDescription:
          eventData.event?.shortDescription?.[selectedLanguage] || '',
      });
    }
  }, [eventData, selectedLanguage]);

  return (
    <PageWrapper title="editEvent.pageTitle">
      <LoadingSpinner isLoading={loading}>
        <Container>
          <div className={styles.eventPage}>
            <EventForm
              eventData={eventData}
              initialValues={initialValues}
              onSubmit={async (values) => {
                try {
                  await editEvent({
                    variables: {
                      event: {
                        id: eventData?.event?.id || '',
                        ...getEventPayload(values, selectedLanguage),
                      },
                    },
                  });
                  history.push(ROUTES.EVENT_DETAILS.replace(':id', id));
                } catch (e) {
                  // Check apolloClient to see error handling
                }
              }}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
              title={t('editEvent.title')}
            />
          </div>
        </Container>
      </LoadingSpinner>
    </PageWrapper>
  );
};

export default EditEventPage;
