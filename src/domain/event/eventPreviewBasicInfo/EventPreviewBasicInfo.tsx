import {
  IconFaceSmile,
  IconInfoCircle,
  IconLock,
  IconLockOpen,
  IconTicket,
} from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import TextWithHTMLOrLineBreaks from '../../../common/components/textWithHTMLOrLineBreaks/TextWithHTMLOrLineBreaks';
import { EventFieldsFragment } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import addUrlSlashes from '../../../utils/addUrlSlashes';
import EventKeywords from '../eventKeywords/EventKeywords';
import { getEventFields } from '../utils';
import styles from './eventPreviewBasicInfo.module.scss';

interface EventPreviewBasicInfoProps {
  event: EventFieldsFragment;
}

const QueueingAllowed: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <IconLockOpen />
      <p>{t('events.eventCard.queueingAllowed')}</p>
    </div>
  );
};

const QueueingNotAllowed: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <IconLock />
      <p>{t('events.eventCard.queueingNotAllowed')}</p>
    </div>
  );
};

const EventPreviewBasicInfo: React.FC<EventPreviewBasicInfoProps> = ({
  event,
}) => {
  const locale = useLocale();
  const { t } = useTranslation();

  const {
    description,
    eventName,
    shortDescription,
    isEventFree,
    isQueueingAllowed,
    organization,
    contactEmail,
    contactPerson,
    contactPhoneNumber,
    infoUrl,
  } = getEventFields(event, locale);

  return (
    <section className={styles.eventBasicInfo}>
      <div className={styles.descriptionPart}>
        <h1>{eventName}</h1>
        <p className={styles.shortDescription}>{shortDescription}</p>
        <TextWithHTMLOrLineBreaks
          text={description}
          className={styles.description}
        />
        <EventKeywords event={event} />
      </div>
      <div className={styles.infoRight}>
        {/* TODO: Add price information when it is implemented to palveluntarjotin-admin prject */}
        {isEventFree && (
          <div>
            <IconTicket />
            <p>{t('events.eventCard.free')}</p>
          </div>
        )}
        {isQueueingAllowed ? <QueueingAllowed /> : <QueueingNotAllowed />}
        {infoUrl && (
          <div>
            <IconInfoCircle />
            <a
              href={addUrlSlashes(infoUrl)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {infoUrl}
            </a>
          </div>
        )}
        <div>
          <IconFaceSmile />
          <div>
            <p className={styles.organization}>{organization}</p>
            {contactPerson && (
              <div className={styles.contactInfo}>
                <p>{t('eventDetails.contactPerson.title')}</p>
                <p>{contactPerson}</p>
                {contactEmail && <p>{contactEmail}</p>}
                {contactPhoneNumber && <p>{contactPhoneNumber}</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventPreviewBasicInfo;
