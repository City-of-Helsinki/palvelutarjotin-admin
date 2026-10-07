import type {
  LicenseDecision,
  ThirdPartyLicensesConfig,
} from '@city-of-helsinki/license-notices';

// CKEditor 5 declares "SEE LICENSE IN LICENSE.md" in every package. Its
// LICENSE.md offers it under GPL-2.0-or-later or commercial terms, and the
// text editor configures it with licenseKey 'GPL'.
const ckeditorDecision: LicenseDecision = {
  declared: 'SEE LICENSE IN LICENSE.md',
  license: 'GPL-2.0-or-later',
  note:
    'Offered by CKSource under "GPL-2.0-or-later" or commercial terms. This ' +
    'application uses it under GPL-2.0-or-later, configured with the ' +
    'license key "GPL".',
};

/**
 * Everything about the third-party license notices that is specific to this
 * repository. The generator itself comes from the license-notices package and
 * knows nothing about this project.
 */
export const thirdPartyLicensesConfig: ThirdPartyLicensesConfig = {
  repositoryUrl: 'https://github.com/City-of-Helsinki/palvelutarjotin-admin',

  licenseDecisions: {
    ckeditor5: ckeditorDecision,
    '@ckeditor/*': ckeditorDecision,
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
