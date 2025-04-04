import type { TFunction } from 'i18next';
import capitalize from 'lodash/capitalize';

import {
  EnrolmentFieldsFragment,
  NotificationType,
} from '../../../generated/graphql';
import { translateValue } from '../../../utils/translateUtils';

export const getNotificationInfoText = (
  enrolment: EnrolmentFieldsFragment,
  t: TFunction
) => {
  const language = translateValue(
    'common.languages.',
    enrolment.person?.language || 'fi',
    t
  );

  let notificationsText = '';
  const hasEmailNotifications = t('enrolmentForm.labelHasEmailNotification');
  const hasSmsNotifications = t('enrolmentForm.labelHasSmsNotification');

  if (enrolment.notificationType === NotificationType.Email) {
    notificationsText = hasEmailNotifications;
  } else if (enrolment.notificationType === NotificationType.Sms) {
    notificationsText = hasSmsNotifications;
  } else if (enrolment.notificationType === NotificationType.EmailSms) {
    notificationsText = `${hasSmsNotifications}, ${hasEmailNotifications}`;
  }
  return capitalize(
    `${notificationsText}, ${t('enrolmentForm.labelLanguage')}: ${language}`
  );
};
