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
    unitName: string;
    groupName: string;
    groupSize: string;
    amountOfAdult: string;
    studyLevels: string[];
    extraNeeds: string;
  };
}
