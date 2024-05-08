import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import BackButton from '../../common/components/backButton/BackButton';
import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import { useEventQuery } from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import useNavigate from '../../hooks/useNavigate';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import NotFoundPage from '../notFound/NotFoundPage';
import EventImage from './eventImage/EventImage';
import styles from './eventPage.module.scss';
import EventPreviewBasicInfo from './eventPreviewBasicInfo/EventPreviewBasicInfo';
import { getEventFields } from './utils';

const EventPreviewPage: React.FC = () => {
  const { pushWithLocale } = useNavigate();
  const { t } = useTranslation();
  const locale = useLocale();

  const { id: eventId } = useParams<{ id: string }>();

  const { data: eventData, loading } = useEventQuery({
    variables: { id: eventId as string, include: ['keywords', 'location'] },
  });

  const { eventName, imageUrl, imageAltText, photographerName } =
    getEventFields(eventData?.event, locale);

  const goToSummaryPage = () => {
    eventId && pushWithLocale(ROUTES.EVENT_SUMMARY.replace(':id', eventId));
  };

  return (
    <PageWrapper title={eventName || t('event:pageTitle')}>
      <LoadingSpinner isLoading={loading}>
        {eventData?.event ? (
          <Container className={styles.eventPage}>
            <BackButton onClick={goToSummaryPage}>
              {t('eventPreview.buttonGoToPublishing')}
            </BackButton>
            <div className={styles.previewSection}>
              <EventImage
                imageUrl={imageUrl}
                imageAltText={imageAltText || t('event:eventImageAltText')}
                photographerName={photographerName}
              />
              <EventPreviewBasicInfo event={eventData.event} />
            </div>
          </Container>
        ) : (
          <NotFoundPage />
        )}
      </LoadingSpinner>
    </PageWrapper>
  );
};

export default EventPreviewPage;
