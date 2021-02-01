import {
  EnrolmentFieldsFragment,
  Language,
  NotificationType,
  UpdateEnrolmentMutationInput,
} from '../../generated/graphql';
import { EnrolmentFormFields } from './types';

export const getEnrolmentFields = (
  enrolment: EnrolmentFieldsFragment | undefined | null
) =>
  enrolment
    ? {
        extraNeeds: enrolment.studyGroup.extraNeeds,
        language:
          enrolment.person?.language || enrolment.studyGroup.person.language,
        personInfo: [
          enrolment.person?.phoneNumber,
          enrolment.person?.emailAddress,
        ].filter((e) => e),
        studyGroupPersonInfo: [
          enrolment.studyGroup.person.phoneNumber,
          enrolment.studyGroup.person.emailAddress,
        ].filter((e) => e),
      }
    : {};

const getNotificationType = (
  values: EnrolmentFormFields
): NotificationType | undefined => {
  if (values.hasEmailNotification && values.hasSmsNotification)
    return NotificationType.EmailSms;
  else if (values.hasEmailNotification) return NotificationType.Email;
  else if (values.hasSmsNotification) return NotificationType.Sms;

  return undefined;
};

export const getUpdateEnrolmentPayload = ({
  enrolmentId,
  values,
}: {
  enrolmentId: string;
  values: EnrolmentFormFields;
}): UpdateEnrolmentMutationInput => {
  return {
    enrolmentId,
    notificationType: getNotificationType(values),
    person: values.isSameResponsiblePerson
      ? undefined
      : { ...values.person, language: values.language as Language },
    studyGroup: {
      ...values.studyGroup,
      amountOfAdult: Number(values.studyGroup.amountOfAdult),
      groupSize: Number(values.studyGroup.groupSize),
      person: {
        ...values.studyGroup.person,
        language: values.language as Language,
      },
      studyLevels: values.studyGroup.studyLevels,
    },
  };
};
