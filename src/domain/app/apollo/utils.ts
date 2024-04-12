import apolloClient from './apolloClient';

export const clearApolloCache = async () => {
  apolloClient.stop();
  await Promise.all([apolloClient.resetStore(), apolloClient.clearStore()]);
};

/**
 * Invalidate given event's cache
 * @param eventId The ID of the event to invalidate
 */
export const invalidateEventCache = (eventId: string) =>
  apolloClient.cache.evict({ id: `Event:${eventId}` });
