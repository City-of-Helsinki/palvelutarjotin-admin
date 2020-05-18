import React from 'react';
import { useTranslation } from 'react-i18next';

import TextTitle from '../../../common/components/textTitle/TextTitle';
import { EventQuery } from '../../../generated/graphql';
import { Language } from '../../../types';
import getLocalizedString from '../../../utils/getLocalizedString';
import styles from './eventBasicInfo.module.scss';

type Props = {
  eventData: EventQuery;
  language: Language;
};

const EventBasicInfo: React.FC<Props> = ({ eventData, language }) => {
  const { t } = useTranslation();

  const name = getLocalizedString(eventData.event?.name || {}, language);
  const shortDescription = getLocalizedString(
    eventData.event?.shortDescription || {},
    language
  );
  const description = getLocalizedString(
    eventData.event?.description || {},
    language
  );

  const duration = eventData.event?.pEvent?.duration;
  const neededOccurrences = eventData.event?.pEvent?.neededOccurrences;

  const infoUrl = getLocalizedString(eventData.event?.infoUrl || {}, language);
  const inLanguage = eventData.event?.inLanguage;
  const audience = eventData.event?.audience;

  const keywords = eventData.event?.keywords;

  return (
    <div className={styles.eventBasicInfo}>
      <h2>{t('eventDetails.basicInfo.title')}</h2>
      {name && (
        <>
          <TextTitle>{t('eventDetails.basicInfo.labelName')}</TextTitle>
          <p>{name}</p>
        </>
      )}

      {shortDescription && (
        <>
          <TextTitle>
            {t('eventDetails.basicInfo.labelShortDescription')}
          </TextTitle>
          <p>{shortDescription}</p>
        </>
      )}

      {description && (
        <>
          <TextTitle>{t('eventDetails.basicInfo.labelDescription')}</TextTitle>
          <p>{description}</p>
        </>
      )}

      <TextTitle>{t('eventDetails.basicInfo.labelImage')}</TextTitle>
      <p>TODO</p>

      {infoUrl && (
        <>
          <TextTitle>{t('eventDetails.basicInfo.labelInfoUrl')}</TextTitle>
          <p>{infoUrl}</p>
        </>
      )}

      <div className={styles.durationRow}>
        <div>
          <TextTitle>{t('eventDetails.basicInfo.labelDuration')}</TextTitle>
          <p>{duration}</p>
        </div>
        <div>
          <TextTitle>{t('eventDetails.basicInfo.labelInLanguage')}</TextTitle>
          <p>
            {inLanguage
              ?.map((item) => getLocalizedString(item.name || {}, language))
              .filter((item) => item)
              .sort()
              .join(', ') || '-'}
          </p>
        </div>
        <div>
          <TextTitle>{t('eventDetails.basicInfo.labelAudience')}</TextTitle>
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

      <div className={styles.neededOccurrencesRow}>
        <div>
          <TextTitle>
            {t('eventDetails.basicInfo.labelNeededOccurrences')}
          </TextTitle>
          <p>{neededOccurrences}</p>
        </div>
        <div>
          <TextTitle>Toiminnan tyyppi</TextTitle>
          <p>TODO</p>
        </div>
        <div>
          <TextTitle>VASU / OPS sisällöt</TextTitle>
          <p>TODO</p>
        </div>
      </div>

      <TextTitle>Hinta</TextTitle>
      <p>TODO</p>
      <TextTitle>{t('eventDetails.basicInfo.labelKeywords')}</TextTitle>
      <p>
        {keywords
          ?.map((keyword) => getLocalizedString(keyword.name || {}, language))
          .filter((item) => item)
          .sort()
          .join(', ') || '-'}
      </p>
    </div>
  );
};

export default EventBasicInfo;
