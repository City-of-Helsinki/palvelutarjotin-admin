const LOCAL_ENV_URL = 'http://localhost:3000';

export const getEnvUrl = (path = ''): string => {
  /**
   * Using process.env here instead of the preferred import.meta.env because
   * running browser tests failed with:
   *
   * The 'import.meta' meta-property is only allowed when the '--module' option
   * is 'es2020', 'es2022', 'esnext', 'system', 'node16', or 'nodenext'."
   *
   * and trying to set the module option in tsconfig.testcafe.json resulted in:
   *
   * "You cannot override the "module" compiler option in the TypeScript
   * configuration file.".
   */
  const baseUrl = process.env.BROWSER_TESTS_LOCAL_ENV_URL ?? LOCAL_ENV_URL;
  return `${baseUrl}${path?.startsWith('/') ? path : `/${path ?? ''}`}`;
};
