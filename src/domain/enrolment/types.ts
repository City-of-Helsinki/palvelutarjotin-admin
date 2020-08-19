export interface EnrolmentFormFields {
  hasEmailNotification: boolean;
  hasSmsNotification: boolean;
  isSameResponsiblePerson: boolean;
  maxGroupSize: number;
  minGroupSize: number;
  language: string;
  person: {
    name: string;
    phoneNumber: string;
    emailAddress: string;
  };
  studyGroup: {
    person: {
      name: string;
      phoneNumber: string;
      emailAddress: string;
    };
    name: string;
    groupName: string;
    groupSize: string;
    amountOfAdult: string;
    studyLevel: string;
    extraNeeds: string;
  };
}

export enum TEMPLATE_TYPE {
  OCCURRENCE_UNENROLMENT = 'occurrence_unenrolment',
  OCCURRENCE_ENROLMENT = 'occurrence_enrolment',
  OCCURRENCE_ENROLMENT_SMS = 'occurrence_enrolment_sms',
  ENROLMENT_APPROVED = 'enrolment_approved',
  ENROLMENT_APPROVED_SMS = 'enrolment_approved_sms',
  ENROLMENT_DECLINED = 'enrolment_declined',
  ENROLMENT_DECLINED_SMS = 'enrolment_declined_sms',
  OCCURRENCE_UNENROLMENT_SMS = 'occurrence_unenrolment_sms',
}
