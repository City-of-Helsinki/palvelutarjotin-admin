export enum ROUTES {
  CALLBACK = '/callback',
  CREATE_EVENT = '/events/create',
  COPY_EVENT = '/events/copy/:id',
  CREATE_OCCURRENCE = '/events/:id/occurrences/create',
  CREATE_FIRST_OCCURRENCE = '/events/:id/occurrences/createfirst',
  EDIT_OCCURRENCE = '/events/:id/occurrences/:occurrenceId/edit',
  ENROLMENT_DETAILS = '/events/:id/occurrences/:occurrenceId/enrolments/:enrolmentId',
  EDIT_ENROLMENT = '/events/:eventId/enrolments/:enrolmentId/edit',
  EDIT_EVENT = '/events/:id/edit',
  EVENT_DETAILS = '/events/:id',
  EVENT_SUMMARY = '/events/:id/summary',
  EVENT_PREVIEW = '/events/:id/preview',
  HOME = '/',
  MY_PROFILE = '/profile',
  OCCURRENCES = '/events/:id/occurrences',
  OCCURRENCE_DETAILS = '/events/:id/occurrences/:occurrenceId',
  SILENT_CALLBACK = '/silent-callback',
}

export const IGNORE_SCROLL_TO_TOP = [
  ROUTES.ENROLMENT_DETAILS,
  ROUTES.OCCURRENCE_DETAILS,
];

export const FORCE_SCROLL_TO_TOP = [
  ROUTES.CREATE_OCCURRENCE,
  ROUTES.CREATE_FIRST_OCCURRENCE,
];
