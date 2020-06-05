import { Button, IconLocation, IconPerson } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';

import BackButton from '../../common/components/backButton/BackButton';
import LoadingSpinner from '../../common/components/loadingSpinner/LoadingSpinner';
import { useEventQuery, useOccurrenceQuery } from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import IconClock from '../../icons/IconClock';
import formatDate from '../../utils/formatDate';
import formatTimeRange from '../../utils/formatTimeRange';
import getLocalizedString from '../../utils/getLocalizedString';
import Container from '../app/layout/Container';
import PageWrapper from '../app/layout/PageWrapper';
import { ROUTES } from '../app/routes/constants';
import ErrorPage from '../errorPage/ErrorPage';
import PlaceInfo from '../place/placeInfo/PlaceInfo';
import OccurrenceGroupInfo from './occurrenceGroupInfo/OccurrenceGroupInfo';
import styles from './occurrencePage.module.scss';

interface Params {
  id: string;
  occurrenceId: string;
}

const OccurrenceDetailsPage = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const locale = useLocale();
  const { id, occurrenceId } = useParams<Params>();
  const { data: eventData, loading: loadingEvent } = useEventQuery({
    variables: { id, include: ['location'] },
  });
  const {
    data: occurrenceData,
    loading: loadingOccurrence,
  } = useOccurrenceQuery({
    variables: { id: occurrenceId },
  });
  const startTime = occurrenceData?.occurrence?.startTime
    ? new Date(occurrenceData?.occurrence?.startTime)
    : null;
  const endTime = occurrenceData?.occurrence?.endTime
    ? new Date(occurrenceData?.occurrence?.endTime)
    : null;
  const date = formatDate(startTime);
  const time = startTime && formatTimeRange(startTime, endTime, locale);

  const placeId =
    occurrenceData?.occurrence?.placeId || eventData?.event?.location?.id;

  const goToOccurrencesPage = () => {
    history.push(`/${locale}${ROUTES.OCCURRENCES.replace(':id', id)}`);
  };

  const goToEventDetailsPage = () => {
    history.push(`/${locale}${ROUTES.EVENT_DETAILS.replace(':id', id)}`);
  };

  return (
    <PageWrapper title="occurrenceDetails.pageTitle">
      <LoadingSpinner isLoading={loadingEvent || loadingOccurrence}>
        {eventData && occurrenceData ? (
          <div className={styles.eventOccurrencePage}>
            <Container>
              <div>
                <BackButton onClick={goToOccurrencesPage}>
                  {t('occurrenceDetails.buttonBack')}
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
                  <div className={styles.infoRow}>
                    <div className={styles.iconWrapper}>
                      <IconClock />
                    </div>
                    <p>
                      {t('occurrenceDetails.textDateAndTime', { date, time })}
                    </p>
                  </div>
                  <div className={styles.buttonWrapper}>
                    <Link
                      className={styles.link}
                      to={`/${locale}${ROUTES.EDIT_OCCURRENCE.replace(
                        ':id',
                        id
                      ).replace(':occurrenceId', occurrenceId)}`}
                    >
                      {t('occurrenceDetails.buttonEditOccurrence')}
                    </Link>
                  </div>
                </div>

                <div className={styles.infoRow}>
                  <div className={styles.iconWrapper}>
                    <IconPerson />
                  </div>
                  <OccurrenceGroupInfo occurrenceData={occurrenceData} />
                </div>
                <div className={styles.infoRow}>
                  <div className={styles.iconWrapper}>
                    <IconLocation />
                  </div>
                  <div>{placeId ? <PlaceInfo id={placeId} /> : '-'}</div>
                </div>
              </div>
            </Container>
          </div>
        ) : (
          <ErrorPage />
        )}
      </LoadingSpinner>
    </PageWrapper>
  );
};

export default OccurrenceDetailsPage;
