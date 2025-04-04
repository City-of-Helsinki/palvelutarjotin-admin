import * as React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './eventBasicInfo.module.scss';
import TextTitle from '../../../common/components/textTitle/TextTitle';
import TextWithHTMLOrLineBreaks from '../../../common/components/textWithHTMLOrLineBreaks/TextWithHTMLOrLineBreaks';
import { EventQuery } from '../../../generated/graphql';
import { Language } from '../../../types';
import getLocalizedString from '../../../utils/getLocalizedString';
import { formatIntoDate, formatIntoTime } from '../../../utils/time/format';
import ImageInfo from '../../image/imageInfo/ImageInfo';
import { EnrolmentType } from '../../occurrence/constants';
import { getEnrolmentType } from '../../occurrence/utils';

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
  const mandatoryAdditionalInformation =
    eventData.event?.pEvent?.mandatoryAdditionalInformation;
  const isQueueingAllowed = eventData.event?.pEvent?.isQueueingAllowed;
  const imageId = eventData.event?.images[0]?.id;
  const infoUrl = getLocalizedString(eventData.event?.infoUrl || {}, language);
  const enrolmentType = eventData.event && getEnrolmentType(eventData.event);
  const isInternalEnrolment = EnrolmentType.Internal === enrolmentType;

  const enrolmentStart = eventData.event?.pEvent?.enrolmentStart
    ? t('eventDetails.basicInfo.enrolmentStart', {
        date: formatIntoDate(new Date(eventData.event?.pEvent?.enrolmentStart)),
        time: formatIntoTime(new Date(eventData.event?.pEvent?.enrolmentStart)),
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
          <TextWithHTMLOrLineBreaks
            text={description}
            className={styles.description}
          />
        </>
      )}
      <>
        <TextTitle>
          {t('eventDetails.basicInfo.labelMandatoryAdditionalInformation')}
        </TextTitle>
        <p>
          {mandatoryAdditionalInformation
            ? t('eventDetails.basicInfo.mandatoryAdditionalInformation')
            : t('eventDetails.basicInfo.optionalAdditionalInformation')}
        </p>
      </>
      <>
        <TextTitle>{t('eventDetails.basicInfo.labelQueueing')}</TextTitle>
        <p>
          {isQueueingAllowed
            ? t('eventDetails.basicInfo.queueingAllowed')
            : t('eventDetails.basicInfo.queueingNotAllowed')}
        </p>
      </>
      {imageId && <ImageInfo imageId={imageId} />}
      {infoUrl && (
        <>
          <TextTitle>{t('eventDetails.basicInfo.labelInfoUrl')}</TextTitle>
          <p>{infoUrl}</p>
        </>
      )}
      {isInternalEnrolment && (
        <div className={styles.durationRow}>
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
      )}
    </div>
  );
};

export default EventBasicInfo;
