import isSameDay from 'date-fns/isSameDay';
import { Button, IconLocation, IconPen, IconUser } from 'hds-react';
import capitalize from 'lodash/capitalize';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import {
  EventFieldsFragment,
  OccurrenceFieldsFragment,
} from '../../../generated/graphql';
import useHistory from '../../../hooks/useHistory';
import useLocale from '../../../hooks/useLocale';
import IconClock from '../../../icons/IconClock';
import formatDate from '../../../utils/formatDate';
import formatTimeRange from '../../../utils/formatTimeRange';
import { ROUTES } from '../../app/routes/constants';
import { getEventFields } from '../../event/utils';
import { PUBLICATION_STATUS } from '../../events/constants';
import PlaceInfo from '../../place/placeInfo/PlaceInfo';
import { EnrolmentType } from '../constants';
import OccurrenceGroupInfo from '../occurrenceGroupInfo/OccurrenceGroupInfo';
import OccurrenceGroupLanguageInfo from '../occurrenceGroupInfo/OccurrenceGroupLanguageInfo';
import { getEnrolmentType } from '../utils';
import styles from './occurrenceInfo.module.scss';

interface Props {
  event: EventFieldsFragment;
  occurrence: OccurrenceFieldsFragment;
}

const OccurrenceInfo: React.FC<Props> = ({ event, occurrence }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const history = useHistory();
  const enrolmentType = getEnrolmentType(event);
  const hasInternalEnrolment = enrolmentType === EnrolmentType.Internal;
  const { eventName = '', id: eventId } = getEventFields(event, locale);

  const startTime = new Date(occurrence.startTime);
  const endTime = new Date(occurrence.endTime);
  const isEventDraft = event.publicationStatus === PUBLICATION_STATUS.DRAFT;

  const occurrenceId = occurrence.id;
  const placeId = occurrence.placeId || event.location?.id;

  const goToEventDetailsPage = () => {
    history.pushWithLocale(ROUTES.EVENT_DETAILS.replace(':id', eventId || ''));
  };

  const getOccurrenceDateTimeString = () => {
    if (!isSameDay(startTime, endTime)) {
      const startDateTimeString = t('occurrenceDetails.textDateAndTime', {
        date: capitalize(formatDate(startTime, 'd.M.yyyy', locale)),
        time: formatDate(startTime, 'HH:mm'),
      });
      const endDateTimeString = t('occurrenceDetails.textDateAndTime', {
        date: capitalize(formatDate(endTime, 'd.M.yyyy', locale)),
        time: formatDate(endTime, 'HH:mm'),
      });
      return `${startDateTimeString} — ${endDateTimeString}`;
    }

    return t('occurrenceDetails.textDateAndTime', {
      date: capitalize(formatDate(startTime, 'EEEE d.M.yyyy', locale)),
      time: formatTimeRange(startTime, endTime, locale),
    });
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
          <p>{getOccurrenceDateTimeString()}</p>
        </div>
        {isEventDraft && (
          <EditOccurrenceButton eventId={eventId} occurrenceId={occurrenceId} />
        )}
      </div>

      {hasInternalEnrolment && (
        <div className={styles.infoRow}>
          <div className={styles.iconWrapper}>
            <IconUser />
          </div>
          <OccurrenceGroupInfo occurrence={occurrence} />
        </div>
      )}

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
  const history = useHistory();
  const { t } = useTranslation();

  const goToEditOccurrencePage = () => {
    history.pushWithLocale(
      ROUTES.CREATE_OCCURRENCE.replace(':id', eventId || '').replace(
        ':occurrenceId',
        occurrenceId
      )
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
