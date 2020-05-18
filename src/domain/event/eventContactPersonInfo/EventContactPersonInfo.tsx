import React from 'react';
import { useTranslation } from 'react-i18next';

import TextTitle from '../../../common/components/textTitle/TextTitle';

const EventContactPersonInfo = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h2>{t('eventDetails.contactPerson.title')}</h2>
      <TextTitle>{t('eventDetails.contactPerson.labelName')}</TextTitle>
      <p>TODO</p>
      <TextTitle>{t('eventDetails.contactPerson.labelEmail')}</TextTitle>
      <p>TODO</p>
      <TextTitle>{t('eventDetails.contactPerson.labelPhone')}</TextTitle>
      <p>TODO</p>
    </div>
  );
};

export default EventContactPersonInfo;
