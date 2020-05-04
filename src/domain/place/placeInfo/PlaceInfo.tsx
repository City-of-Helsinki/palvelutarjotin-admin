import React from 'react';

import { usePlaceDetailsQuery } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import getLocalizedString from '../../../utils/getLocalizedString';
import { generateHslLink, generateServiceMapLink } from '../utils';
import styles from './placeInfo.module.scss';

interface Props {
  id: string;
}

const PlaceInfo: React.FC<Props> = ({ id }) => {
  const { data } = usePlaceDetailsQuery({ variables: { id } });
  const locale = useLocale();

  if (!data) return null;

  const name = getLocalizedString(data.placeDetails.name || {}, locale);
  const streetAddress = getLocalizedString(
    data.placeDetails.streetAddress || {},
    locale
  );
  const telephone = getLocalizedString(
    data.placeDetails.telephone || {},
    locale
  );
  const addressLocality = getLocalizedString(
    data.placeDetails.addressLocality || {},
    locale
  );
  const serviceMapLink = generateServiceMapLink(id);
  const hslLink = generateHslLink(streetAddress, addressLocality);
  return (
    <div className={styles.placeInfo}>
      {name && <p>{name}</p>}
      {streetAddress && <p>{streetAddress}</p>}
      {telephone && <p>{telephone}</p>}
      <div className={styles.linkRow}>
        <div className={styles.linkTitle}>Palvelukartta:</div>
        <a href={serviceMapLink} rel="noopener noreferrer" target="_blank">
          {serviceMapLink}
        </a>
      </div>
      <div className={styles.linkRow}>
        <div className={styles.linkTitle}>Reittiopas:</div>
        <a href={hslLink} rel="noopener noreferrer" target="_blank">
          {hslLink}
        </a>
      </div>
    </div>
  );
};

export default PlaceInfo;
