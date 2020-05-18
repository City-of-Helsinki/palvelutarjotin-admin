import React from 'react';
import { useTranslation } from 'react-i18next';

import TextTitle from '../../../common/components/textTitle/TextTitle';
import { EventQuery } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import getLocalizedString from '../../../utils/getLocalizedString';
import PlaceInfo from '../../place/placeInfo/PlaceInfo';
import styles from './eventLocation.module.scss';

type Props = {
  eventData: EventQuery;
};

const EventLocation: React.FC<Props> = ({ eventData }) => {
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
      <TextTitle>
        {t('eventDetails.location.labelLocationDescription')}
      </TextTitle>
      <p>TODO</p>
    </div>
  );
};

export default EventLocation;