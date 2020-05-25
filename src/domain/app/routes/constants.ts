export enum ROUTES {
  CALLBACK = '/callback',
  CREATE_EVENT = '/events/create',
  CREATE_OCCURRENCE = '/events/:id/occurrences/create',
  EDIT_OCCURRENCE = '/events/:id/occurrences/:occurrenceId/edit',
  EDIT_EVENT = '/events/:id/edit',
  ENROLLMENTS = '/events/:id/occurrences/:occurrenceId/enrollments',
  EVENT_DETAILS = '/events/:id',
  HOME = '/',
  OCCURRENCES = '/events/:id/occurrences',
  SILENT_CALLBACK = '/silent-callback',
}
