import {
  EnrolmentTemplateContextQuery,
  EventNameQuery,
} from '../../../../generated/graphql';
import { Language } from '../../../../types';

export const getEnrolmentTemplateContextJSON = (
  templateContextData: EnrolmentTemplateContextQuery | undefined,
  eventData: EventNameQuery | undefined,
  message: string,
  locale: Language
) => {
  const enrolment = templateContextData?.enrolment;
  const event = eventData?.event;
  if (enrolment && event) {
    const { studyGroup, occurrence } = enrolment;
    return JSON.stringify({
      event: {
        name: {
          [locale]: event.name[locale],
        },
      },
      // eslint-disable-next-line @typescript-eslint/camelcase
      study_group: {
        name: studyGroup.name,
        person: {
          // eslint-disable-next-line @typescript-eslint/camelcase
          email_address: studyGroup.person.emailAddress,
        },
      },
      occurrence: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        start_time: occurrence.startTime,
        // eslint-disable-next-line @typescript-eslint/camelcase
        p_event: {
          // eslint-disable-next-line @typescript-eslint/camelcase
          linked_event_id: occurrence.pEvent?.linkedEventId,
        },
      },
      // eslint-disable-next-line @typescript-eslint/camelcase
      custom_message: message,
    });
  }
  return null;
};
