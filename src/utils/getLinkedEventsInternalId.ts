import { LINKEDEVENTS_CONTENT_TYPE } from '../constants';

const getLinkedEventsInternalId = (
  type: LINKEDEVENTS_CONTENT_TYPE,
  id: string
) => `${import.meta.env.VITE_APP_LINKEDEVENTS_API_URI}/${type}/${id}/`;

export default getLinkedEventsInternalId;
