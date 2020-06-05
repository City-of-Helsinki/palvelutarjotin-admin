import React from 'react';
import { useTranslation } from 'react-i18next';

import TextTitle from '../../../common/components/textTitle/TextTitle';
import { EventQuery } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import { Language } from '../../../types';
import getLocalizedString from '../../../utils/getLocalizedString';
import PlaceInfo from '../../place/placeInfo/PlaceInfo';
import { getEventVenueDescription } from '../utils';
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
  const venueDescription = getEventVenueDescription(eventData, language);
  const hasClothingStorage = eventData.event?.venue?.hasClothingStorage;
  const hasSnackEatingPlace = eventData.event?.venue?.hasSnackEatingPlace;

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
      <div className={styles.venueAmenities}>
        {hasClothingStorage && (
          <div>{t('eventDetails.location.clothingStorage')}</div>
        )}
        {hasSnackEatingPlace && (
          <div>{t('eventDetails.location.snackEatingPlace')}</div>
        )}
      </div>
    </div>
  );
};

export default EventLocation;
