export type ApiTokenData = {
  isFetchingToken: boolean;
  apiToken: string | null;
  errors: Record<string, unknown>;
};

export type ApiTokenResponse = {
  ['https://api.hel.fi/auth/palvelutarjotin']: string;
};
