import { isPast } from 'date-fns';
import { Button, IconPen, RadioButton } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import BackButton from '../../common/components/backButton/BackButton';
import EventSteps from '../../common/components/EventSteps/EventSteps';
import FormHelperText from '../../common/components/FormHelperText/FormHelperText';
import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import ConfirmationModal from '../../common/components/modal/ConfirmationModal';
import {
  OccurrenceFieldsFragment,
  useCancelOccurrenceMutation,
  useDeleteOccurrenceMutation,
  useEventQuery,
  usePublishSingleEventMutation,
} from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import getLocalizedString from '../../utils/getLocalizedString';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import ErrorPage from '../errorPage/ErrorPage';
import EventPreviewCard from '../event/eventPreviewCard/EventPreviewCard';
import { PUBLICATION_STATUS } from '../events/constants';
import OccurrencesTable from '../occurrences/occurrencesTable/OccurrencesTable';
import { getEventPublishedTime } from '../occurrences/utils';
import ActiveOrganisationInfo from '../organisation/activeOrganisationInfo/ActiveOrganisationInfo';
import { NAVIGATED_FROM } from './EditEventPage';
import styles from './eventSummaryPage.module.scss';
import { getPublishEventPayload } from './utils';

const PAST_OCCURRENCE_AMOUNT = 4;

interface Params {
  id: string;
}

const EventSummaryPage: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { id: eventId } = useParams<Params>();
  const locale = useLocale();
  const [showAllPastEvents, setShowAllPastEvents] = React.useState(false);
  const [showPublishModal, setShowPublishModal] = React.useState(false);

  const { data: eventData, loading, refetch: refetchEventData } = useEventQuery(
    {
      fetchPolicy: 'network-only',
      variables: { id: eventId, include: ['location'] },
    }
  );
  const [publishEvent] = usePublishSingleEventMutation();
  const [cancelOccurrence] = useCancelOccurrenceMutation();

  const organisationId = eventData?.event?.pEvent?.organisation?.id || '';
  const [deleteOccurrence] = useDeleteOccurrenceMutation();
  const isEventPublished =
    eventData?.event?.publicationStatus === PUBLICATION_STATUS.PUBLIC;
  const isEventDraft =
    eventData?.event?.publicationStatus === PUBLICATION_STATUS.DRAFT;

  const occurrences =
    (eventData?.event?.pEvent?.occurrences.edges.map(
      (edge) => edge?.node
    ) as OccurrenceFieldsFragment[]) || [];

  const comingOccurrences = occurrences.filter(
    (item) => !isPast(new Date(item.startTime))
  );
  const pastOccurrences = occurrences.filter((item) =>
    isPast(new Date(item.startTime))
  );

  const eventPreviewLink = `/${locale}${ROUTES.EVENT_PREVIEW.replace(
    ':id',
    eventId
  )}`;

  const goToEventDetailsPage = () => {
    history.push(`/${locale}${ROUTES.EVENT_DETAILS.replace(':id', eventId)}`);
  };

  const goToCreateOccurrence = () => {
    history.push(
      `/${locale}${ROUTES.CREATE_OCCURRENCE.replace(':id', eventId)}`
    );
  };

  const handleDeleteOccurrence = async (
    occurrence: OccurrenceFieldsFragment
  ) => {
    try {
      await deleteOccurrence({ variables: { input: { id: occurrence.id } } });
      refetchEventData();
    } catch (e) {
      toast(t('occurrences.deleteError'), {
        type: toast.TYPE.ERROR,
      });
    }
  };

  const handleCancelOccurrence = async (
    occurrence: OccurrenceFieldsFragment,
    message?: string
  ) => {
    try {
      await cancelOccurrence({
        variables: { input: { id: occurrence.id, reason: message } },
      });
      refetchEventData();
    } catch (e) {
      toast(t('occurrences.cancelError'), {
        type: toast.TYPE.ERROR,
      });
    }
  };

  const handlePublishEvent = async () => {
    try {
      if (eventData?.event) {
        await publishEvent({
          variables: {
            event: getPublishEventPayload({
              event: eventData?.event,
              organisationId,
            }),
          },
        });
      }
      toast.success(t('eventSummary.eventHasBeenPublished'));
    } catch (error) {
      toast(t('occurrences.errorEventPublicationFailed'), {
        type: toast.TYPE.ERROR,
      });
    }
    setShowPublishModal(false);
  };

  const handlePublishEventClick = async () => {
    setShowPublishModal(true);
  };

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
                <BackButton onClick={() => history.push(ROUTES.HOME)}>
                  {t('common.leave')}
                </BackButton>
              )}

              <div className={styles.titleRow}>
                <h1>
                  {getLocalizedString(eventData.event?.name || {}, locale)}
                </h1>
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
                  {isEventDraft && (
                    <EditButton
                      text={t('eventSummary.buttonEditBasicInfo')}
                      link={`/${locale}${ROUTES.EDIT_EVENT.replace(
                        ':id',
                        eventId
                      )}?navigatedFrom=${NAVIGATED_FROM.EVENT_SUMMARY}`}
                    />
                  )}
                </div>
                <EventPreviewCard
                  event={eventData.event}
                  link={eventPreviewLink}
                />
              </div>

              <div className={styles.summarySection}>
                <div className={styles.sectionTitleRow}>
                  <h2>
                    {t('occurrences.titleOccurrences')}{' '}
                    <span className={styles.count}>
                      {t('occurrences.count', {
                        count: comingOccurrences.length,
                      })}
                    </span>
                  </h2>
                  {isEventDraft && (
                    <EditButton
                      text={t('eventSummary.buttonEditOccurrences')}
                      link={`/${locale}${ROUTES.CREATE_OCCURRENCE.replace(
                        ':id',
                        eventId
                      )}`}
                    />
                  )}
                </div>
                {!!comingOccurrences.length ? (
                  <OccurrencesTable
                    eventData={eventData}
                    id="coming-occurrences"
                    occurrences={comingOccurrences}
                    onDelete={handleDeleteOccurrence}
                    onCancel={handleCancelOccurrence}
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
                    <OccurrencesTable
                      eventData={eventData}
                      id="past-occurrences"
                      occurrences={
                        showAllPastEvents
                          ? pastOccurrences
                          : pastOccurrences.slice(0, PAST_OCCURRENCE_AMOUNT)
                      }
                      onDelete={handleDeleteOccurrence}
                      onCancel={handleCancelOccurrence}
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

              <div>
                <div className={styles.sectionTitleRow}>
                  <h2>{t('occurrences.titleEventPublishment')}</h2>
                </div>
                <div className={styles.publishSection}>
                  {isEventPublished ? (
                    <>
                      <div>
                        {t('occurrences.publishSection.textPublishedTime')}{' '}
                        {getEventPublishedTime(eventData.event)}
                      </div>
                      <Button
                        className={styles.publishButton}
                        onClick={() => alert('TODO: implement unpublish')}
                      >
                        {t(
                          'occurrences.publishSection.buttonCancelPublishment'
                        )}
                      </Button>
                    </>
                  ) : (
                    <>
                      <div>{t('occurrences.titleEventPublishment')}: </div>
                      <RadioButton
                        label={t('occurrences.publishSection.optionNow')}
                        id="publish-now"
                        checked
                      />
                      <Button
                        className={styles.publishButton}
                        onClick={handlePublishEventClick}
                      >
                        {t('occurrences.publishSection.buttonSetPublished')}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Container>
        ) : (
          <ErrorPage />
        )}
      </LoadingSpinner>
      <ConfirmationModal
        isOpen={showPublishModal}
        onConfirm={handlePublishEvent}
        confirmButtonText={t(
          'occurrences.publishSection.confirmPublicationButton'
        )}
        title={t('occurrences.publishSection.confirmModalTitle')}
        toggleModal={() => setShowPublishModal(false)}
      >
        <p>{t('occurrences.publishSection.confirmText1')}</p>
        <p>{t('occurrences.publishSection.confirmText2')}</p>
      </ConfirmationModal>
    </PageWrapper>
  );
};

const EditButton: React.FC<{ text: string; link: string }> = ({
  link,
  text,
}) => {
  return (
    <Link className={styles.link} to={link}>
      <IconPen />
      {text}
    </Link>
  );
};

export default EventSummaryPage;