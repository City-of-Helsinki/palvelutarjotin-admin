export type ApiTokenData = {
  isFetchingToken: boolean;
  apiToken: string | null;
  errors: object;
};

export type ApiTokenResponse = {
  ['https://api.hel.fi/auth/palvelutarjotin']: string;
};
