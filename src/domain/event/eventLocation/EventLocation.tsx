import React from 'react';
import { useTranslation } from 'react-i18next';

import TextTitle from '../../../common/components/textTitle/TextTitle';
import { EventQuery } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
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
  const locale = useLocale();

  const name = getLocalizedString(
    eventData.event?.location?.name || {},
    locale
  );
  const streetAddress = getLocalizedString(
    eventData.event?.location?.streetAddress || {},
    locale
  );
  const id = eventData.event?.location?.id;
  const venueDescription =
    eventData?.event?.venue?.translations.find(
      (t) => t.languageCode === language.toUpperCase()
    )?.description || '';

  return (
    <div>
      <h2>{t('eventDetails.location.title')}</h2>
      {name && (
        <>
          <TextTitle>{t('eventDetails.location.labelLocation')}</TextTitle>
          <p>{[name, streetAddress].filter((item) => item).join(', ')}</p>
        </>
      )}
      <div className={styles.placeInfoWrapper}>
        <PlaceInfo id={id || ''} />
      </div>
      {venueDescription && (
        <>
          <TextTitle>
            {t('eventDetails.location.labelLocationDescription')}
          </TextTitle>
          <p>{venueDescription}</p>
        </>
      )}
    </div>
  );
};

export default EventLocation;
