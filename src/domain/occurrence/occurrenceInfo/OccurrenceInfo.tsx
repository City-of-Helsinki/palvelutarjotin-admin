import { Button, IconLocation, IconPen, IconUser } from 'hds-react';
import * as React from 'react';
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
import { PUBLICATION_STATUS } from '../../events/constants';
import PlaceInfo from '../../place/placeInfo/PlaceInfo';
import OccurrenceGroupInfo from '../occurrenceGroupInfo/OccurrenceGroupInfo';
import OccurrenceGroupLanguageInfo from '../occurrenceGroupInfo/OccurrenceGroupLanguageInfo';
import styles from './occurrenceInfo.module.scss';

interface Props {
  event: EventFieldsFragment;
  occurrence: OccurrenceFieldsFragment;
}

const OccurrenceInfo: React.FC<Props> = ({ event, occurrence }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const history = useHistory();
  const { eventName = '', id: eventId } = getEventFields(event, locale);

  const startTime = new Date(occurrence.startTime);
  const endTime = new Date(occurrence.endTime);
  const date = formatDate(startTime);
  const time = formatTimeRange(startTime, endTime, locale);
  const isEventDraft = event.publicationStatus === PUBLICATION_STATUS.DRAFT;

  const occurrenceId = occurrence.id;
  const placeId = occurrence.placeId || event.location?.id;

  const goToEventDetailsPage = () => {
    history.push(
      `/${locale}${ROUTES.EVENT_DETAILS.replace(':id', eventId || '')}`
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
        {isEventDraft && (
          <EditOccurrenceButton eventId={eventId} occurrenceId={occurrenceId} />
        )}
      </div>

      <div className={styles.infoRow}>
        <div className={styles.iconWrapper}>
          <IconUser />
        </div>
        <OccurrenceGroupInfo occurrence={occurrence} />
      </div>
      <div className={styles.infoRow}>
        <div className={styles.iconWrapper}></div>
        <OccurrenceGroupLanguageInfo occurrence={occurrence} />
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

const EditOccurrenceButton: React.FC<{
  eventId?: string;
  occurrenceId: string;
}> = ({ occurrenceId, eventId }) => {
  const locale = useLocale();
  const history = useHistory();
  const { t } = useTranslation();

  const goToEditOccurrencePage = () => {
    history.push(
      `/${locale}${ROUTES.CREATE_OCCURRENCE.replace(
        ':id',
        eventId || ''
      ).replace(':occurrenceId', occurrenceId)}`
    );
  };

  return (
    <div className={styles.buttonWrapper}>
      <Button
        onClick={goToEditOccurrencePage}
        variant="supplementary"
        iconLeft={<IconPen />}
      >
        {t('occurrenceDetails.buttonEditOccurrence')}
      </Button>
    </div>
  );
};

export default OccurrenceInfo;
