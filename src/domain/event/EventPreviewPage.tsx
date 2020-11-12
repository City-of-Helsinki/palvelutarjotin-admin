import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import { useEventQuery } from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import NotFoundPage from '../notFound/NotFoundPage';
import EventImage from './eventImage/EventImage';
import styles from './eventPage.module.scss';
import EventPreviewBasicInfo from './eventPreviewBasicInfo/EventPreviewBasicInfo';
import { getEventFields } from './utils';

const EventPage: React.FC = () => {
  const { t } = useTranslation();
  const locale = useLocale();

  const { id: eventId } = useParams<{ id: string }>();

  const { data: eventData, loading } = useEventQuery({
    variables: { id: eventId as string, include: ['keywords', 'location'] },
  });

  const {
    eventName,
    imageUrl,
    imageAltText,
    photographerName,
  } = getEventFields(eventData?.event, locale);

  return (
    <PageWrapper title={eventName || t('event:pageTitle')}>
      <LoadingSpinner isLoading={loading}>
        {eventData?.event ? (
          <Container className={styles.eventPage}>
            <EventImage
              imageUrl={imageUrl}
              imageAltText={imageAltText || t('event:eventImageAltText')}
              photographerName={photographerName}
            />
            <EventPreviewBasicInfo event={eventData.event} />
          </Container>
        ) : (
          <NotFoundPage />
        )}
      </LoadingSpinner>
    </PageWrapper>
  );
};

export default EventPage;
