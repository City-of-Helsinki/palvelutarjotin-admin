import { IconFaceSmile, IconInfoCircle } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import TextWithHTMLOrLineBreaks from '../../../common/components/textWithHTMLOrLineBreaks/TextWithHTMLOrLineBreaks';
import { EventFieldsFragment } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import IconTicket from '../../../icons/IconTicket';
import addUrlSlashes from '../../../utils/addUrlSlashes';
import EventKeywords from '../eventKeywords/EventKeywords';
import { getEventFields } from '../utils';
import styles from './eventPreviewBasicInfo.module.scss';

interface EventPreviewBasicInfoProps {
  event: EventFieldsFragment;
}

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
