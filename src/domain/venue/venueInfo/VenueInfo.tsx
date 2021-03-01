import { IconGroup, IconSignout } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import TextTitle from '../../../common/components/textTitle/TextTitle';
import { useVenueQuery } from '../../../generated/graphql';
import IconFood from '../../../icons/IconFood';
import IconGarderobe from '../../../icons/IconGarderobe';
import IconPlayIndoor from '../../../icons/IconPlayIndoor';
import IconPlayOutdoor from '../../../icons/IconPlayOutdoor';
import IconToilet from '../../../icons/IconToilet';
import { Language } from '../../../types';
import { getVenueDescription } from '../utils';
import styles from './venueInfo.module.scss';

interface Props {
  language: Language;
  placeId: string;
}

const VenueInfo: React.FC<Props> = ({ language, placeId }) => {
  const { t } = useTranslation();
  const { data: venueData } = useVenueQuery({
    fetchPolicy: 'network-only',
    variables: { id: placeId },
  });
  const venueDescription = getVenueDescription(venueData, language);
  const hasClothingStorage = venueData?.venue?.hasClothingStorage;
  const hasSnackEatingPlace = venueData?.venue?.hasSnackEatingPlace;
  const outdoorActivity = venueData?.venue?.outdoorActivity;
  const hasToiletNearby = venueData?.venue?.hasToiletNearby;
  const hasAreaForGroupWork = venueData?.venue?.hasAreaForGroupWork;
  const hasIndoorPlayingArea = venueData?.venue?.hasIndoorPlayingArea;
  const hasOutdoorPlayingArea = venueData?.venue?.hasOutdoorPlayingArea;

  return (
    <div className={styles.venueInfo}>
      {venueDescription && (
        <div className={styles.venueDescription}>
          <TextTitle>
            {t('eventDetails.location.labelLocationDescription')}
          </TextTitle>
          <p>{venueDescription}</p>
        </div>
      )}
      {(hasSnackEatingPlace ||
        hasClothingStorage ||
        outdoorActivity ||
        hasToiletNearby ||
        hasAreaForGroupWork ||
        hasIndoorPlayingArea ||
        hasOutdoorPlayingArea) && (
        <div className={styles.venueAmenities}>
          {hasSnackEatingPlace && (
            <div>
              <IconFood />
              {t('eventDetails.location.snackEatingPlace')}
            </div>
          )}
          {hasClothingStorage && (
            <div>
              <IconGarderobe />
              {t('eventDetails.location.clothingStorage')}
            </div>
          )}
          {outdoorActivity && (
            <div>
              <IconSignout />
              {t('eventDetails.location.outdoorActivity')}
            </div>
          )}
          {hasToiletNearby && (
            <div>
              <IconToilet />
              {t('eventDetails.location.toiletNearby')}
            </div>
          )}
          {hasAreaForGroupWork && (
            <div>
              <IconGroup />
              {t('eventDetails.location.areaForGroupWork')}
            </div>
          )}
          {hasIndoorPlayingArea && (
            <div>
              <IconPlayIndoor />
              {t('eventDetails.location.indoorPlayingArea')}
            </div>
          )}
          {hasOutdoorPlayingArea && (
            <div>
              <IconPlayOutdoor />
              {t('eventDetails.location.outdoorPlayingArea')}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VenueInfo;
