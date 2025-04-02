import rootReducer from './domain/app/reducers';

export type Language = 'en' | 'fi' | 'sv';
export type EmptyObject = Record<string, never>;

export type StoreState = ReturnType<typeof rootReducer>;

export const omitTypename = <T extends { __typename?: string }>(
  obj?: T | null
): Omit<T, '__typename'> | null => {
  if (!obj) {
    return null;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- __typename is removed
  const { __typename, ...rest } = obj;
  return rest;
};
