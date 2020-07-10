import { EnrolmentFieldsFragment } from '../../generated/graphql';

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
