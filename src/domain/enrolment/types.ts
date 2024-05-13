export interface EnrolmentFormFields {
  hasEmailNotification: boolean;
  hasSmsNotification: boolean;
  isSameResponsiblePerson: boolean;
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
    unitId: string;
    unitName: string;
    groupName: string;
    groupSize: string;
    amountOfAdult: string;
    studyLevels: string[];
    extraNeeds: string;
    preferredTimes: string;
  };
}
