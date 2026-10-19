import type { ThirdPartyLicensesConfig } from '@city-of-helsinki/license-notices';

/**
 * Everything about the third-party license notices that is specific to this
 * repository. The generator itself comes from the license-notices package and
 * knows nothing about this project.
 */
export const thirdPartyLicensesConfig: ThirdPartyLicensesConfig = {
  repositoryUrl: 'https://github.com/City-of-Helsinki/palvelutarjotin-admin',

  licenseDecisions: {
    // Bundled through @city-of-helsinki/react-helsinki-headless-cms and
    // isomorphic-dompurify.
    dompurify: {
      license: 'Apache-2.0',
      note:
        'Offered by its author under "(MPL-2.0 OR Apache-2.0)". This ' +
        'distribution elects Apache-2.0, so the MPL-2.0 obligations do not ' +
        'apply to this component.',
    },
  },

  // CSS modules inline hds-core stylesheets through `composes: … from
  // '~hds-core/…'`, which the bundler never sees. hds-design-tokens is not
  // listed: only its breakpoint variables are used, and Sass emits nothing
  // from that file but the values themselves.
  sassResolvedPackages: ['hds-core'],
};
