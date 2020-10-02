import React from 'react';
import { useTranslation } from 'react-i18next';

import TextTitle from '../../../common/components/textTitle/TextTitle';
import TextWithLineBreaks from '../../../common/components/textWithLineBreaks/TextWithLineBreaks';
import { EventQuery } from '../../../generated/graphql';
import { Language } from '../../../types';
import formatDate from '../../../utils/formatDate';
import getLocalizedString from '../../../utils/getLocalizedString';
import getTimeFormat from '../../../utils/getTimeFormat';
import ImageInfo from '../../image/imageInfo/ImageInfo';
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

  const imageId = eventData.event?.images[0]?.id;

  const duration = eventData.event?.pEvent?.duration;

  const infoUrl = getLocalizedString(eventData.event?.infoUrl || {}, language);
  const enrolmentStart = eventData.event?.pEvent?.enrolmentStart
    ? t('eventDetails.basicInfo.enrolmentStart', {
        date: formatDate(new Date(eventData.event?.pEvent?.enrolmentStart)),
        time: formatDate(
          new Date(eventData.event?.pEvent?.enrolmentStart),
          getTimeFormat(language)
        ),
      })
    : '';

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
          <TextWithLineBreaks
            text={description}
            className={styles.description}
          />
        </>
      )}

      {imageId && <ImageInfo imageId={imageId} />}

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
          <TextTitle>
            {t('eventDetails.basicInfo.labelEnrolmentStart')}
          </TextTitle>
          <p>{enrolmentStart}</p>
        </div>
        <div>
          <TextTitle>
            {t('eventDetails.basicInfo.labelEnrolmentEndDays')}
          </TextTitle>
          <p>{eventData.event?.pEvent?.enrolmentEndDays}</p>
        </div>
      </div>
    </div>
  );
};

export default EventBasicInfo;
