import * as React from 'react';
import { useTranslation } from 'react-i18next';

import TextTitle from '../../../common/components/textTitle/TextTitle';
import { EventQuery } from '../../../generated/graphql';
import PersonText from '../../person/personText/PersonText';

interface Props {
  eventData: EventQuery;
}

const EventContactPersonInfo: React.FC<Props> = ({ eventData }) => {
  const { t } = useTranslation();

  const personId = eventData.event?.pEvent?.contactPerson?.id;
  const email = eventData.event?.pEvent?.contactEmail;
  const phoneNumber = eventData.event?.pEvent?.contactPhoneNumber;
  return (
    <div>
      <h2>{t('eventDetails.contactPerson.title')}</h2>
      <TextTitle>{t('eventDetails.contactPerson.labelName')}</TextTitle>
      <p>{personId ? <PersonText id={personId} /> : '-'}</p>
      <TextTitle>{t('eventDetails.contactPerson.labelEmail')}</TextTitle>
      <p>{email || '-'}</p>
      <TextTitle>{t('eventDetails.contactPerson.labelPhone')}</TextTitle>
      <p>{phoneNumber || '-'}</p>
    </div>
  );
};

export default EventContactPersonInfo;
