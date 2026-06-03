import { LINKEDEVENTS_CONTENT_TYPE } from '../constants';
import { getEnvValue } from './envUtils';

const getLinkedEventsInternalId = (
  type: LINKEDEVENTS_CONTENT_TYPE,
  id: string
) => `${getEnvValue('VITE_APP_LINKEDEVENTS_API_URI')}/${type}/${id}/`;

export default getLinkedEventsInternalId;
