export enum ROUTES {
  CALLBACK = '/callback',
  CREATE_EVENT = '/events/create',
  CREATE_OCCURRENCE = '/events/:id/occurrences/create',
  EDIT_OCCURRENCE = '/events/:id/occurrences/:occurrenceId/edit',
  EDIT_EVENT = '/events/:id/edit',
  EVENT_DETAILS = '/events/:id',
  HOME = '/',
  MY_PROFILE = '/profile',
  OCCURRENCES = '/events/:id/occurrences',
  OCCURRENCE_DETAILS = '/events/:id/occurrences/:occurrenceId',
  SILENT_CALLBACK = '/silent-callback',
}
