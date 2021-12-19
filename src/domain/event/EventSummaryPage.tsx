import { isPast } from 'date-fns';
import { Button } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

import { useDownloadEventsEnrolmentsCsvQuery } from '../../clients/apiReportClient/useReportClientQuery';
import BackButton from '../../common/components/backButton/BackButton';
import EditButton from '../../common/components/editButton/EditButton';
import EventSteps from '../../common/components/EventSteps/EventSteps';
import FormHelperText from '../../common/components/FormHelperText/FormHelperText';
import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import {
  OccurrenceFieldsFragment,
  useCancelOccurrenceMutation,
  useDeleteOccurrenceMutation,
  useEventQuery,
} from '../../generated/graphql';
import useHistory from '../../hooks/useHistory';
import useLocale from '../../hooks/useLocale';
import getLocalizedString from '../../utils/getLocalizedString';
import useQueryStringWithReturnPath from '../../utils/useQueryStringWithReturnPath';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import ErrorPage from '../errorPage/ErrorPage';
import EventPreviewCard from '../event/eventPreviewCard/EventPreviewCard';
import { PUBLICATION_STATUS } from '../events/constants';
import { EnrolmentType } from '../occurrence/constants';
import { getEnrolmentType } from '../occurrence/utils';
import OccurrencesTableSummary from '../occurrences/occurrencesTableReadOnly/OccurrencesTableSummary';
import ActiveOrganisationInfo from '../organisation/activeOrganisationInfo/ActiveOrganisationInfo';
import EventPublish from './eventPublish/EventPublish';
import styles from './eventSummaryPage.module.scss';

const PAST_OCCURRENCE_AMOUNT = 4;
interface Params {
  id: string;
}

const EventSummaryPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const queryStringWithReturnPath = useQueryStringWithReturnPath();
  const { id: eventId } = useParams<Params>();
  const locale = useLocale();
  const lang = i18n.language;
  const [showAllPastEvents, setShowAllPastEvents] = React.useState(false);
  const [loadingOccurrences, setLoadingOccurrences] = React.useState<string[]>(
    []
  );
  const {
    data: eventData,
    loading,
    refetch: refetchEventData,
  } = useEventQuery({
    variables: {
      id: eventId,
      include: ['location', 'keywords', 'in_language'],
    },
  });

  const downloadEnrolmentsQuery = useDownloadEventsEnrolmentsCsvQuery(
    eventData?.event?.pEvent?.id
  );
  const [cancelOccurrence] = useCancelOccurrenceMutation();
  const [deleteOccurrence] = useDeleteOccurrenceMutation();

  const enrolmentType = eventData?.event && getEnrolmentType(eventData.event);
  const organisationId = eventData?.event?.pEvent?.organisation?.id || '';
  const isEventDraft =
    eventData?.event?.publicationStatus === PUBLICATION_STATUS.DRAFT;
  const isInternalEnrolment = enrolmentType === EnrolmentType.Internal;

  const occurrences =
    (eventData?.event?.pEvent?.occurrences?.edges.map(
      (edge) => edge?.node
    ) as OccurrenceFieldsFragment[]) || [];

  const comingOccurrences = occurrences.filter(
    (item) => !isPast(new Date(item.endTime))
  );
  const pastOccurrences = occurrences.filter((item) =>
    isPast(new Date(item.endTime))
  );

  const eventPreviewLink = `/${lang}${ROUTES.EVENT_PREVIEW.replace(
    ':id',
    eventId
  )}`;

  const addLoadingOccurrence = (id: string) => {
    setLoadingOccurrences((ids) => [...ids, id]);
  };

  const deleteLoadingOccurrence = (occurrenceId: string) => {
    setLoadingOccurrences((ids) => ids.filter((id) => id !== occurrenceId));
  };

  const goToEventDetailsPage = () => {
    history.pushWithReturnPath(ROUTES.EVENT_DETAILS.replace(':id', eventId));
  };

  const goToCreateOccurrence = () => {
    history.pushWithLocale(ROUTES.CREATE_OCCURRENCE.replace(':id', eventId));
  };

  const copyEventToNewTemplate = () => {
    history.pushWithReturnPath(ROUTES.COPY_EVENT.replace(':id', eventId));
  };

  const goToHome = () => history.pushWithLocale(ROUTES.HOME);

  // Export CSV file from API reports view
  const downloadEnrolments = () => {
    downloadEnrolmentsQuery && downloadEnrolmentsQuery();
  };

  const getEditLink = () => {
    return `/${lang}${ROUTES.EDIT_EVENT.replace(
      ':id',
      eventId
    )}${queryStringWithReturnPath}`;
  };

  const handleCancelOccurrence = async (
    occurrence: OccurrenceFieldsFragment,
    message?: string
  ) => {
    try {
      addLoadingOccurrence(occurrence.id);
      await cancelOccurrence({
        variables: { input: { id: occurrence.id, reason: message } },
      });
      await refetchEventData();
      deleteLoadingOccurrence(occurrence.id);
      toast.success(t('occurrences.cancelSuccess'));
    } catch (e) {
      deleteLoadingOccurrence(occurrence.id);
      toast.error(t('occurrences.cancelError'));
    }
  };

  const handleDeleteOccurrence = async (
    occurrence: OccurrenceFieldsFragment
  ) => {
    try {
      addLoadingOccurrence(occurrence.id);
      await deleteOccurrence({
        variables: { input: { id: occurrence.id } },
      });
      await refetchEventData();
      deleteLoadingOccurrence(occurrence.id);
      toast.success(t('occurrences.deleteSuccess'));
    } catch (e) {
      deleteLoadingOccurrence(occurrence.id);
      toast.error(t('occurrences.deleteError'));
    }
  };

  const editOccurrencesButtonLink = isEventDraft
    ? `/${locale}${ROUTES.CREATE_OCCURRENCE.replace(':id', eventId)}`
    : `/${locale}${ROUTES.EDIT_OCCURRENCES.replace(':id', eventId)}`;

  return (
    <PageWrapper title="occurrences.pageTitle">
      <LoadingSpinner isLoading={loading}>
        {eventData?.event ? (
          <Container>
            <div className={styles.eventSummaryPage}>
              <ActiveOrganisationInfo organisationId={organisationId} />
              {isEventDraft ? (
                <BackButton onClick={goToCreateOccurrence}>
                  {t('eventSummary.buttonBack')}
                </BackButton>
              ) : (
                <BackButton onClick={goToHome}>{t('common.leave')}</BackButton>
              )}

              <div className={styles.titleRow}>
                <h1>
                  {getLocalizedString(eventData.event?.name || {}, locale)}
                </h1>
                <Button onClick={copyEventToNewTemplate} variant="secondary">
                  {t('occurrences.buttonCloneEventDetails')}
                </Button>
                <Button onClick={goToEventDetailsPage} variant="secondary">
                  {t('occurrences.buttonEventDetails')}
                </Button>
              </div>
              {isEventDraft && (
                <div className={styles.stepsContainer}>
                  <EventSteps step={3} />
                </div>
              )}
              <div className={styles.summarySection}>
                <div className={styles.sectionTitleRow}>
                  <div>
                    <h2>{t('eventSummary.titleEventSummary')}</h2>
                    <FormHelperText
                      text={t('eventSummary.titleEventSummaryHelper')}
                    />
                  </div>
                  <EditButton
                    text={t('eventSummary.buttonEditBasicInfo')}
                    link={getEditLink()}
                  />
                </div>
                <EventPreviewCard
                  event={eventData.event}
                  link={eventPreviewLink}
                />
              </div>

              <div className={styles.summarySection}>
                {!isEventDraft && isInternalEnrolment && (
                  <div className={styles.exportEnrolmentsButtonRow}>
                    <Button onClick={downloadEnrolments} variant="secondary">
                      {t('eventSummary.buttonExportEnrolments')}
                    </Button>
                  </div>
                )}
                <div className={styles.sectionTitleRow}>
                  <h2>
                    {t('occurrences.titleOccurrences')}{' '}
                    <span className={styles.count}>
                      {t('occurrences.count', {
                        count: comingOccurrences.length,
                      })}
                    </span>
                  </h2>
                  <EditButton
                    text={t('eventSummary.buttonEditOccurrences')}
                    link={editOccurrencesButtonLink}
                  />
                </div>
                {!!comingOccurrences.length ? (
                  <OccurrencesTableSummary
                    eventData={eventData}
                    occurrences={comingOccurrences}
                    onCancel={handleCancelOccurrence}
                    onDelete={handleDeleteOccurrence}
                    loadingOccurrences={loadingOccurrences}
                  />
                ) : (
                  <div>{t('occurrences.textNoComingOccurrences')}</div>
                )}
                {!!pastOccurrences.length && (
                  <>
                    <h2>
                      {t('occurrences.titlePastOccurrences')}{' '}
                      <span className={styles.count}>
                        {t('occurrences.count', {
                          count: pastOccurrences.length,
                        })}
                      </span>
                    </h2>
                    <OccurrencesTableSummary
                      loadingOccurrences={loadingOccurrences}
                      eventData={eventData}
                      occurrences={
                        showAllPastEvents
                          ? pastOccurrences
                          : pastOccurrences.slice(0, PAST_OCCURRENCE_AMOUNT)
                      }
                    />
                    {!showAllPastEvents &&
                      pastOccurrences.length > PAST_OCCURRENCE_AMOUNT && (
                        <div className={styles.showMoreButtonWrapper}>
                          <button
                            className={styles.link}
                            onClick={() => setShowAllPastEvents(true)}
                          >
                            {t('occurrences.buttonShowMore')}
                          </button>
                        </div>
                      )}
                  </>
                )}
              </div>
              <EventPublish event={eventData?.event} />
            </div>
          </Container>
        ) : (
          <ErrorPage />
        )}
      </LoadingSpinner>
    </PageWrapper>
  );
};

export default EventSummaryPage;
