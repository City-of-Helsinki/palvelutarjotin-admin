import { Button, IconLocation, IconUser } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import {
  EventFieldsFragment,
  OccurrenceFieldsFragment,
} from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import IconClock from '../../../icons/IconClock';
import formatDate from '../../../utils/formatDate';
import formatTimeRange from '../../../utils/formatTimeRange';
import { ROUTES } from '../../app/routes/constants';
import { getEventFields } from '../../event/utils';
import PlaceInfo from '../../place/placeInfo/PlaceInfo';
import OccurrenceGroupInfo from '../occurrenceGroupInfo/OccurrenceGroupInfo';
import styles from './occurrenceInfo.module.scss';

interface Props {
  event: EventFieldsFragment;
  occurrence: OccurrenceFieldsFragment;
}

const OccurrenceInfo: React.FC<Props> = ({ event, occurrence }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const history = useHistory();
  const { eventName = '', id } = getEventFields(event, locale);

  const startTime = new Date(occurrence.startTime);
  const endTime = new Date(occurrence.endTime);
  const date = formatDate(startTime);
  const time = formatTimeRange(startTime, endTime, locale);

  const occurrenceId = occurrence.id;
  const placeId = occurrence.placeId || event.location?.id;

  const goToEventDetailsPage = () => {
    history.push(`/${locale}${ROUTES.EVENT_DETAILS.replace(':id', id || '')}`);
  };

  const goToEditOccurrencePage = () => {
    history.push(
      `/${locale}${ROUTES.EDIT_OCCURRENCE.replace(':id', id || '').replace(
        ':occurrenceId',
        occurrenceId
      )}`
    );
  };

  return (
    <div className={styles.occurrenceInfo}>
      <div className={styles.titleRow}>
        <h1>{eventName}</h1>
        <div className={styles.buttonWrapper}>
          <Button onClick={goToEventDetailsPage} variant="secondary">
            {t('occurrenceDetails.buttonEventDetails')}
          </Button>
        </div>
      </div>

      <div className={styles.titleRow}>
        <div className={styles.infoRow}>
          <div className={styles.iconWrapper}>
            <IconClock />
          </div>
          <p>{t('occurrenceDetails.textDateAndTime', { date, time })}</p>
        </div>
        <div className={styles.buttonWrapper}>
          <Button onClick={goToEditOccurrencePage} variant="supplementary">
            {t('occurrenceDetails.buttonEditOccurrence')}
          </Button>
        </div>
      </div>

      <div className={styles.infoRow}>
        <div className={styles.iconWrapper}>
          <IconUser />
        </div>
        <OccurrenceGroupInfo occurrence={occurrence} />
      </div>
      <div className={styles.infoRow}>
        <div className={styles.iconWrapper}>
          <IconLocation />
        </div>
        <div>
          {placeId ? (
            <PlaceInfo id={placeId} language={locale} showVenueInfo={true} />
          ) : (
            '-'
          )}
        </div>
      </div>
    </div>
  );
};

export default OccurrenceInfo;
