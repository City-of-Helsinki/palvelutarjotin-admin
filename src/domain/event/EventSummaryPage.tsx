import { isPast } from 'date-fns';
import { Button } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';

import BackButton from '../../common/components/backButton/BackButton';
import EditButton from '../../common/components/editButton/EditButton';
import EventSteps from '../../common/components/EventSteps/EventSteps';
import FormHelperText from '../../common/components/FormHelperText/FormHelperText';
import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import {
  OccurrenceFieldsFragment,
  useEventQuery,
} from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import getLocalizedString from '../../utils/getLocalizedString';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import ErrorPage from '../errorPage/ErrorPage';
import EventPreviewCard from '../event/eventPreviewCard/EventPreviewCard';
import { PUBLICATION_STATUS } from '../events/constants';
import OccurrencesTableSummary from '../occurrences/occurrencesTableReadOnly/OccurrencesTableSummary';
import ActiveOrganisationInfo from '../organisation/activeOrganisationInfo/ActiveOrganisationInfo';
import { EDIT_EVENT_QUERY_PARAMS, NAVIGATED_FROM } from './EditEventPage';
import EventPublish from './eventPublish/EventPublish';
import styles from './eventSummaryPage.module.scss';

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

  const { data: eventData, loading } = useEventQuery({
    fetchPolicy: 'network-only',
    variables: { id: eventId, include: ['location', 'keywords'] },
  });

  const organisationId = eventData?.event?.pEvent?.organisation?.id || '';
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

  const copyEventToNewTemplate = () => {
    history.push(`/${locale}${ROUTES.COPY_EVENT.replace(':id', eventId)}`);
  };

  const goToHome = () => history.push(ROUTES.HOME);

  const getEditLink = () => {
    const searchParams = new URLSearchParams();
    searchParams.append(
      EDIT_EVENT_QUERY_PARAMS.NAVIGATED_FROM,
      NAVIGATED_FROM.EVENT_SUMMARY
    );
    return `/${locale}${ROUTES.EDIT_EVENT.replace(
      ':id',
      eventId
    )}?${searchParams.toString()}`;
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
                  {isEventDraft && (
                    <EditButton
                      text={t('eventSummary.buttonEditBasicInfo')}
                      link={getEditLink()}
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
                  <OccurrencesTableSummary
                    eventData={eventData}
                    occurrences={comingOccurrences}
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
