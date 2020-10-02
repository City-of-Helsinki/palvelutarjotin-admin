import { LINKEDEVENTS_CONTENT_TYPE } from '../constants';

/**
 * Format internalId string to LinkedEvents
 * @param {string} type
 * @param {string} id
 * @return {string}
 */
export default (type: LINKEDEVENTS_CONTENT_TYPE, id: string) =>
  `${process.env.REACT_APP_LINKEDEVENTS_API_URI}/${type}/${id}/`;
