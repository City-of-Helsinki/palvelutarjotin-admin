export const isTestEnv = () => {
  return import.meta.env.NODE_ENV === 'test';
};
