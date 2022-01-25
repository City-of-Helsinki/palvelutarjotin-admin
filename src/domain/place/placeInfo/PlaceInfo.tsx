import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { usePlaceQuery } from '../../../generated/graphql';
import { Language } from '../../../types';
import getLocalizedString from '../../../utils/getLocalizedString';
import VenueInfo from '../../venue/venueInfo/VenueInfo';
import { generateHslLink, generateServiceMapLink } from '../utils';
import styles from './placeInfo.module.scss';

interface Props {
  id: string;
  language: Language;
  onEditButtonClick?: (show: boolean) => void;
  showEditButton?: boolean;
  showVenueInfo?: boolean;
}

const PlaceInfo: React.FC<Props> = ({
  id,
  language,
  onEditButtonClick,
  showEditButton,
  showVenueInfo,
}) => {
  const { t } = useTranslation();
  const { data } = usePlaceQuery({ variables: { id }, skip: !id });

  if (!data) return null;

  const name = getLocalizedString(data.place?.name || {}, language);
  const streetAddress = getLocalizedString(
    data.place?.streetAddress || {},
    language
  );
  const telephone = getLocalizedString(data.place?.telephone || {}, language);
  const addressLocality = getLocalizedString(
    data.place?.addressLocality || {},
    language
  );
  const serviceMapLink = generateServiceMapLink(id, language);
  const hslLink = generateHslLink(streetAddress, addressLocality, language);

  const handleEditButtonClick = () => {
    if (onEditButtonClick) {
      onEditButtonClick(true);
    }
  };

  return (
    <div className={styles.placeInfo}>
      {name && (
        <div>
          {name}{' '}
          {showEditButton && (
            <button
              className={styles.buttonChange}
              onClick={handleEditButtonClick}
              type="button"
            >
              {t('form.placeInfo.buttonEdit')}
            </button>
          )}
        </div>
      )}
      {streetAddress && <p>{streetAddress}</p>}
      {telephone && <p>{telephone}</p>}
      <div className={styles.linkRow}>
        <div className={styles.linkTitle}>
          {t('form.placeInfo.labelServicemap')}
        </div>
        <a href={serviceMapLink} rel="noopener noreferrer" target="_blank">
          {serviceMapLink}
        </a>
      </div>
      <div className={styles.linkRow}>
        <div className={styles.linkTitle}>
          {t('form.placeInfo.labelReittiopas')}
        </div>
        <a href={hslLink} rel="noopener noreferrer" target="_blank">
          {hslLink}
        </a>
      </div>

      {showVenueInfo && <VenueInfo language={language} placeId={id} />}
    </div>
  );
};

export default PlaceInfo;
