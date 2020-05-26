import { isPast } from 'date-fns';
import { Button } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';

import BackButton from '../../common/components/backButton/BackButton';
import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import {
  useDeleteOccurrenceMutation,
  useEventQuery,
} from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import getLocalizedString from '../../utils/getLocalizedString';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import styles from './occurrencesPage.module.scss';
import OccurrencesTable from './occurrencesTable/OccurrencesTable';
import { OccurrenceInTable } from './types';

const PAST_OCCURRENCE_AMOUNT = 4;

interface Params {
  id: string;
}

const OccurrencesPage: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { id: eventId } = useParams<Params>();
  const locale = useLocale();
  const [showAllPastEvents, setShowAllPastEvents] = React.useState(false);

  const { data: eventData, loading, refetch: refetchEventData } = useEventQuery(
    {
      fetchPolicy: 'network-only',
      variables: { id: eventId },
    }
  );
  const [deleteOccurrence] = useDeleteOccurrenceMutation();

  const occurrences =
    (eventData?.event?.pEvent?.occurrences.edges.map(
      (edge) => edge?.node
    ) as OccurrenceInTable[]) || [];
  const comingOccurrences = occurrences.filter(
    (item) => !isPast(new Date(item.startTime))
  );
  const pastOccurrences = occurrences.filter((item) =>
    isPast(new Date(item.startTime))
  );
  const goToEventList = () => {
    history.push(`/${locale}${ROUTES.HOME}`);
  };

  const goToEventDetailsPage = () => {
    history.push(`/${locale}${ROUTES.EVENT_DETAILS.replace(':id', eventId)}`);
  };

  const handleDeleteOccurrence = async (occurrence: OccurrenceInTable) => {
    try {
      await deleteOccurrence({ variables: { input: { id: occurrence.id } } });
      refetchEventData();
    } catch (e) {}
  };

  return (
    <PageWrapper title="occurrences.pageTitle">
      <LoadingSpinner isLoading={loading}>
        {eventData ? (
          <div className={styles.occurrencesPage}>
            <Container>
              <div>
                <BackButton onClick={goToEventList}>
                  {t('occurrences.buttonBack')}
                </BackButton>
                <div className={styles.titleRow}>
                  <h1>
                    {getLocalizedString(eventData.event?.name || {}, locale)}
                  </h1>
                  <div className={styles.buttonWrapper}>
                    <Button onClick={goToEventDetailsPage} variant="secondary">
                      {t('occurrences.buttonEventDetails')}
                    </Button>
                  </div>
                </div>
                <div className={styles.titleRow}>
                  <h2>
                    {t('occurrences.titleComingOccurrences')}{' '}
                    <span className={styles.count}>
                      {t('occurrences.count', {
                        count: comingOccurrences.length,
                      })}
                    </span>
                  </h2>
                  <div className={styles.buttonWrapper}>
                    <Link
                      className={styles.link}
                      to={`/${locale}${ROUTES.CREATE_OCCURRENCE.replace(
                        ':id',
                        eventId
                      )}`}
                    >
                      {t('occurrences.buttonCreateOccurrence')}
                    </Link>
                  </div>
                </div>
                {comingOccurrences.length ? (
                  <OccurrencesTable
                    eventId={eventId}
                    id="coming-occurrences"
                    occurrences={comingOccurrences}
                    onDelete={handleDeleteOccurrence}
                  />
                ) : (
                  <div>{t('occurrences.textNoComingOccurrences')}</div>
                )}

                {pastOccurrences.length && (
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
                      eventId={eventId}
                      id="past-occurrences"
                      occurrences={
                        showAllPastEvents
                          ? pastOccurrences
                          : pastOccurrences.slice(0, PAST_OCCURRENCE_AMOUNT)
                      }
                      onDelete={handleDeleteOccurrence}
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
            </Container>
          </div>
        ) : (
          <div>TODO: Event not found page</div>
        )}
      </LoadingSpinner>
    </PageWrapper>
  );
};

export default OccurrencesPage;