import * as React from 'react';
import { useTranslation } from 'react-i18next';

import TextTitle from '../../../common/components/textTitle/TextTitle';
import {
  EventQuery,
  LocalisedFieldsFragment,
} from '../../../generated/graphql';
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
  const additionalCriteria = eventData.event?.additionalCriteria;
  const categories = eventData.event?.categories;
  const offer = eventData.event?.offers?.[0];
  const price = offer?.price?.[language];
  const priceDescription = offer?.description?.[language];
  const isFree = offer?.isFree ?? !price;
  const priceInfoUrl = offer?.infoUrl?.[language];

  // Get keywords that are not already included in categories or activities
  const filteredKeywords = keywords?.filter(
    (keyword) =>
      !categories?.find((category) => category.id === keyword.id) &&
      !additionalCriteria?.find((activity) => activity.id === keyword.id)
  );

  const createLink = (prefix: string, url: string) => (
    <>
      {prefix}{' '}
      <a href={url} rel="noopener noreferrer" target="_blank">
        {url}
      </a>
    </>
  );

  const arrayToText = (
    items: { name?: LocalisedFieldsFragment | null }[] | undefined
  ) => {
    return (
      items
        ?.map((item) => getLocalizedString(item.name || {}, language))
        .filter((item) => item)
        .sort()
        .join(', ') || '-'
    );
  };

  return (
    <div className={styles.eventCategorisation}>
      <h2>{t('eventDetails.categorisation.title')}</h2>
      <div className={styles.infoRow}>
        <div>
          <TextTitle>
            {t('eventDetails.categorisation.labelInLanguage')}
          </TextTitle>
          {<p>{arrayToText(inLanguage)}</p>}
        </div>
        <div>
          <TextTitle>
            {t('eventDetails.categorisation.labelAudience')}
          </TextTitle>
          <p>{arrayToText(audience)}</p>
        </div>
      </div>

      <div className={styles.infoRow}>
        <div>
          <TextTitle>
            {t('eventDetails.categorisation.labelCategories')}
          </TextTitle>
          {<p>{arrayToText(categories)}</p>}
        </div>
        <div>
          <TextTitle>
            {t('eventDetails.categorisation.labelActivities')}
          </TextTitle>
          <p>{arrayToText(additionalCriteria)}</p>
        </div>
      </div>

      <TextTitle>{t('eventDetails.categorisation.labelKeywords')}</TextTitle>
      <p>{arrayToText(filteredKeywords)}</p>

      <div className={styles.infoRow}>
        <div>
          <TextTitle>{t('eventDetails.categorisation.labelPrice')}</TextTitle>
          {isFree && <p>{t('eventDetails.categorisation.eventIsFree')}</p>}
          {!isFree && (
            <p className={styles.eventPriceMultiline}>
              {price}
              {priceDescription && `\n${priceDescription}`}
              {priceInfoUrl && createLink(`\nInfo: `, priceInfoUrl)}
            </p>
          )}
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
