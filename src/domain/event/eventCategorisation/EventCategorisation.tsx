import React from 'react';
import { useTranslation } from 'react-i18next';

import TextTitle from '../../../common/components/textTitle/TextTitle';
import { EventQuery } from '../../../generated/graphql';
import { Language } from '../../../types';
import getLocalizedString from '../../../utils/getLocalizedString';
import styles from './eventCategorisation.module.scss';

type Props = {
  eventData: EventQuery;
  language: Language;
};

const EventCategorisation: React.FC<Props> = ({ eventData, language }) => {
  const { t } = useTranslation();

  const neededOccurrences = eventData.event?.pEvent?.neededOccurrences;

  const inLanguage = eventData.event?.inLanguage;
  const audience = eventData.event?.audience;

  const keywords = eventData.event?.keywords;

  return (
    <div className={styles.eventCategorisation}>
      <h2>{t('eventDetails.categorisation.title')}</h2>
      <div className={styles.languageRow}>
        <div>
          <TextTitle>
            {t('eventDetails.categorisation.labelInLanguage')}
          </TextTitle>
          <p>
            {inLanguage
              ?.map((item) => getLocalizedString(item.name || {}, language))
              .filter((item) => item)
              .sort()
              .join(', ') || '-'}
          </p>
        </div>
        <div>
          <TextTitle>
            {t('eventDetails.categorisation.labelAudience')}
          </TextTitle>
          <p>
            {audience
              ?.map((keyword) =>
                getLocalizedString(keyword.name || {}, language)
              )
              .filter((item) => item)
              .sort()
              .join(', ') || '-'}
          </p>
        </div>
      </div>

      <TextTitle>{t('eventDetails.categorisation.labelKeywords')}</TextTitle>
      <p>
        {keywords
          ?.map((keyword) => getLocalizedString(keyword.name || {}, language))
          .filter((item) => item)
          .sort()
          .join(', ') || '-'}
      </p>

      <div className={styles.priceRow}>
        <div>
          <TextTitle>{t('eventDetails.categorisation.labelPrice')}</TextTitle>
          <p>{t('eventDetails.categorisation.eventIsFree')}</p>
        </div>
        <div>
          <TextTitle>
            {t('eventDetails.categorisation.labelNeededOccurrences')}
          </TextTitle>
          <p>{neededOccurrences}</p>
        </div>
      </div>
    </div>
  );
};

export default EventCategorisation;
