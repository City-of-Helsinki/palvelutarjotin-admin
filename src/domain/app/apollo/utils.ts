import apolloClient from './apolloClient';

export const clearApolloCache = async () => {
  apolloClient.stop();
  await Promise.all([apolloClient.resetStore(), apolloClient.clearStore()]);
};
