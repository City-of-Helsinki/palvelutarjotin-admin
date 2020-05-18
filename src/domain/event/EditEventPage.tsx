import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';

import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import { LINKEDEVENTS_CONTENT_TYPE } from '../../constants';
import { useEditEventMutation, useEventQuery } from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import getLinkedEventsInternalId from '../../utils/getLinkedEventsInternalId';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import EditEventButtons from './editEventButtons/EditEventButtons';
import EventForm, {
  defaultInitialValues,
  EventFormFields,
} from './eventForm/EventForm';
import styles from './eventPage.module.scss';
import { getFirstAvailableLanguage } from './utils';

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
            <EditEventButtons
              eventData={eventData}
              onClickLanguage={setSelectedLanguage}
              selectedLanguage={selectedLanguage}
            />
            <h1>{t('editEvent.title')}</h1>
            <EventForm
              initialValues={initialValues}
              onSubmit={async (values) => {
                const payload = {
                  id,
                  name: { [selectedLanguage]: values.name },
                  // start_date and offers are mandatory on LinkedEvents to use dummy data
                  startTime: new Date().toISOString(),
                  offers: [
                    {
                      isFree: true,
                    },
                  ],
                  shortDescription: {
                    [selectedLanguage]: values.shortDescription,
                  },
                  description: { [selectedLanguage]: values.description },
                  infoUrl: { [selectedLanguage]: values.infoUrl },
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
                  await editEvent({
                    variables: { event: payload },
                  });
                  history.push(ROUTES.EVENT_DETAILS.replace(':id', id));
                } catch (e) {
                  // Check apolloClient to see error handling
                }
              }}
            />
          </div>
        </Container>
      </LoadingSpinner>
    </PageWrapper>
  );
};

export default EditEventPage;
