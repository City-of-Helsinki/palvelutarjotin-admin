import isNumber from 'lodash/isNumber';

import {
  EnrolmentFieldsFragment,
  EnrolmentStatus,
  EventQueueEnrolmentFieldsFragment,
  Language,
  NotificationType,
  OccurrenceSeatType,
  UpdateEnrolmentMutationInput,
} from '../../generated/graphql';
import { assertUnreachable } from '../../utils/typescript.utils';
import { EnrolmentFormFields } from './types';

export const getEnrolmentFields = (
  enrolment:
    | EnrolmentFieldsFragment
    | EventQueueEnrolmentFieldsFragment
    | undefined
    | null
) =>
  enrolment
    ? {
        extraNeeds: enrolment.studyGroup.extraNeeds,
        preferredTimes: enrolment.studyGroup.preferredTimes,
        language:
          enrolment.person?.language || enrolment.studyGroup.person?.language,
        personInfo: [
          enrolment.person?.phoneNumber,
          enrolment.person?.emailAddress,
        ].filter((e) => e),
        studyGroupPersonInfo: [
          enrolment.studyGroup.person?.phoneNumber,
          enrolment.studyGroup.person?.emailAddress,
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

export const getNumberOfParticipants = (
  enrolments: EnrolmentFieldsFragment[],
  status: EnrolmentStatus
) => {
  return enrolments
    .filter((e) => e.status === status)
    .reduce(
      (acc, cur) =>
        acc + cur.studyGroup.groupSize + cur.studyGroup.amountOfAdult,
      0
    );
};

export const getGroupSizeBoundaries = ({
  studyGroup,
  occurrence,
}: {
  studyGroup?: { amountOfAdult: number; groupSize: number };
  occurrence?: {
    remainingSeats: number;
    maxGroupSize?: number | null;
    minGroupSize?: number | null;
    seatType: OccurrenceSeatType;
  };
}): {
  minGroupSize: number;
  maxGroupSize: number;
} | null => {
  if (!occurrence || !studyGroup) {
    return null;
  }

  const { remainingSeats, maxGroupSize, seatType, minGroupSize } = occurrence;
  const { amountOfAdult, groupSize } = studyGroup;
  const wholeGroupSize = amountOfAdult + groupSize;

  if (isNumber(remainingSeats) && isNumber(maxGroupSize) && seatType) {
    let calculatedMaxGroupSize: number | null = null;
    switch (seatType) {
      case OccurrenceSeatType.ChildrenCount:
        // add wholeGroupSize to remaining seats because event could be already full
        // then remaining seats would be 0 and enrolment couldn't be edited
        calculatedMaxGroupSize = Math.min(
          maxGroupSize,
          remainingSeats + wholeGroupSize
        );
        break;
      case OccurrenceSeatType.EnrolmentCount:
        calculatedMaxGroupSize = maxGroupSize || 0;
        break;
      default:
        assertUnreachable(seatType);
    }

    if (isNumber(calculatedMaxGroupSize) && isNumber(minGroupSize)) {
      return {
        maxGroupSize: calculatedMaxGroupSize ?? null,
        minGroupSize: minGroupSize ?? null,
      };
    }
  }

  return null;
};
