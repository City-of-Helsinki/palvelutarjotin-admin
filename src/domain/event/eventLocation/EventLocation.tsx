import React from 'react';
import { useTranslation } from 'react-i18next';

import TextTitle from '../../../common/components/textTitle/TextTitle';
import { EventQuery } from '../../../generated/graphql';
import { Language } from '../../../types';
import getLocalizedString from '../../../utils/getLocalizedString';
import PlaceInfo from '../../place/placeInfo/PlaceInfo';
import styles from './eventLocation.module.scss';

type Props = {
  eventData: EventQuery;
  language: Language;
};

const EventLocation: React.FC<Props> = ({ eventData, language }) => {
  const { t } = useTranslation();

  const name = getLocalizedString(
    eventData.event?.location?.name || {},
    language
  );
  const streetAddress = getLocalizedString(
    eventData.event?.location?.streetAddress || {},
    language
  );
  const id = eventData.event?.location?.id;

  return (
    <div className={styles.eventLocation}>
      <h2>{t('eventDetails.location.title')}</h2>
      {name && (
        <>
          <TextTitle>{t('eventDetails.location.labelLocation')}</TextTitle>
          <p>{[name, streetAddress].filter((item) => item).join(', ')}</p>
        </>
      )}
      {!!id && (
        <>
          <div className={styles.placeInfoWrapper}>
            <PlaceInfo id={id || ''} language={language} showVenueInfo={true} />
          </div>
        </>
      )}
    </div>
  );
};

export default EventLocation;
