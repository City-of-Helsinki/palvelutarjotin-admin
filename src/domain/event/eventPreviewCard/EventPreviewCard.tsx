/* eslint-disable jsx-a11y/anchor-is-valid */
import { IconLocation } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { EventFieldsFragment } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import IconClock from '../../../icons/IconClock';
import getLocalisedString from '../../../utils/getLocalizedString';
import PlaceText from '../../place/placeText/PlaceText';
import EventKeywords from '../eventKeywords/EventKeywords';
import { getEventPlaceholderImage, getEventStartTimeStr } from '../utils';
import styles from './eventPreviewCard.module.scss';

interface Props {
  event: EventFieldsFragment;
  link: string;
}

const EventCard: React.FC<Props> = ({ event, link }) => {
  const { t } = useTranslation();
  const locale = useLocale();

  const id = event.id;
  const name = getLocalisedString(event.name, locale);
  const description = getLocalisedString(event.description || {}, locale);
  const image = event.images[0]?.url;
  const time = getEventStartTimeStr(event, locale, t);

  return (
    <Link to={link} className={styles.eventCard}>
      <div
        className={styles.imageWrapper}
        style={{
          backgroundImage: `url(${
            image || getEventPlaceholderImage(id || '')
          })`,
        }}
      ></div>
      <div className={styles.contentWrapper}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>{name}</div>
          <div className={styles.description}>{description}</div>
        </div>
        <div className={styles.occurrenceInfoWrapper}>
          <div className={styles.textWithIcon}>
            <IconClock />
            {time}
          </div>
          <div className={styles.textWithIcon}>
            <IconLocation />
            <PlaceText placeId={event.location?.id || ''} />
          </div>
        </div>
        <EventKeywords event={event} />
      </div>
    </Link>
  );
};

export default EventCard;
