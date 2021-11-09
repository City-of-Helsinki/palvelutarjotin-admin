import { EnrolmentTemplateContextQuery } from '../../../../generated/graphql';
import { Language } from '../../../../types';

export const getEnrolmentTemplateContextJSON = (
  templateContextData: EnrolmentTemplateContextQuery | undefined,
  message: string,
  locale: Language
) => {
  const enrolment = templateContextData?.enrolment;
  const event = templateContextData?.enrolment?.occurrence.linkedEvent;
  if (enrolment && event) {
    const { studyGroup, occurrence } = enrolment;
    return JSON.stringify({
      event: {
        name: {
          [locale]: event.name[locale],
        },
      },
      study_group: {
        name: studyGroup.unitName,
        person: {
          email_address: studyGroup.person.emailAddress,
        },
      },
      occurrence: {
        start_time: occurrence.startTime,
        p_event: {
          linked_event_id: occurrence.linkedEvent?.id,
        },
      },
      custom_message: message,
    });
  }
  return null;
};
