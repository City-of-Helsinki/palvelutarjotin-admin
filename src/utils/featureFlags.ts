export type FeatureFlags = {
  HEADLESS_CMS: boolean;
};

export const getFeatureFlags = (): FeatureFlags => ({
  HEADLESS_CMS: process.env.REACT_APP_HEADLESS_CMS_ENABLED === 'true',
});

export const isFeatureEnabled = (feature: keyof FeatureFlags): boolean =>
  getFeatureFlags()[feature];
