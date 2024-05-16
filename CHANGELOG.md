# Changelog

All notable changes to this project will be documented in this file. See [Conventional Commits](https://www.conventionalcommits.org/) for commit guidelines.

## [1.11.0](https://github.com/City-of-Helsinki/palvelutarjotin-admin/compare/palvelutarjotin-admin-v1.10.0...palvelutarjotin-admin-v1.11.0) (2024-05-16)


### Features

* Add editing of study group's preferred times to EnrolmentForm ([eefc905](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/eefc905982be287d18ceac8960481d1e5b191503))
* Unit place selector search filter parameter ([3de3dd9](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/3de3dd9cb0a70274e4d0d781fab76fa3f1fc0f5d))

## [1.10.0](https://github.com/City-of-Helsinki/palvelutarjotin-admin/compare/palvelutarjotin-admin-v1.9.1...palvelutarjotin-admin-v1.10.0) (2024-04-26)


### Features

* Add pEvent.isQueueingAllowed & studyGroup.preferredTimes support ([d304d75](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/d304d758b9689d9e93d3199728d704d597c8e328))


### Bug Fixes

* Cms page title and lang meta tags ([#339](https://github.com/City-of-Helsinki/palvelutarjotin-admin/issues/339)) ([a27757c](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/a27757ccac36c5b5294138f51e968ba404a8044a))

## [1.9.1](https://github.com/City-of-Helsinki/palvelutarjotin-admin/compare/palvelutarjotin-admin-v1.9.0...palvelutarjotin-admin-v1.9.1) (2024-04-03)


### Bug Fixes

* Fix event links with double locale, e.g. /fi/fi/ -&gt; /fi/ ([135af9d](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/135af9dc2d2ed229f9dd4b5ab9e91f105eb6fd82))
* Fix image uploading by installing apollo-upload-client and using it ([d00df67](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/d00df671f81421eb6a0e5e818111d02034a1ddbd))
* Use correct Linked Events test URL in testing ([fc85aea](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/fc85aea08d794d749b3ccfba49d3837e8304138b))

## [1.9.0](https://github.com/City-of-Helsinki/palvelutarjotin-admin/compare/palvelutarjotin-admin-v1.8.0...palvelutarjotin-admin-v1.9.0) (2024-03-22)


### Features

* Migrate from CRA to Vite, TODO: tests & linting ([5f67228](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/5f67228482b6e16e62d5c2ab344d3e84c01669b6))
* Migrate from Jest to Vitest ([23c5e48](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/23c5e4863c196e7ac254177393700b39260247dd))
* Upgrade to HDS v3.5 & RHHC v1.0.0-alpha255 that uses HDS v3.5 ([613a794](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/613a7947b406d431476d40d4865a1002c5c4d471))
* Use HDS v3.5 breakpoints if possible, otherwise custom breakpoints ([42e1ab5](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/42e1ab59b9536161516da24b7cb67712f5df458a))
* Use HDS v3.5's hds-favicon-kit for favicons ([af3adc8](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/af3adc837743655e4faeb8654742044d6f111e0f))


### Bug Fixes

* **docker:** Pass REACT_APP_ORIGIN as argument to Dockerfile ([975c0d7](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/975c0d7618354828e872d5f660308e022f28c1d4))
* Fix production styles & running docker compose ([130fb3a](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/130fb3a183e5a5872444ff2bd1afb18a7e549ab1))
* Fix routing of CMS pages by fixing getRoutedInternalHref function ([14b9019](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/14b90196958ae14a3164a991e1f5b1c2ef0a680c))
* Fix showing selected menu item by fixing getIsItemActive function ([428e0e4](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/428e0e45acd611c7854c94ed62f0b88552e7ad9a))
* Remove non-working preview from (Approve|Decline)EnrolmentModal ([cc41530](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/cc415305cb31fd9cdd9dce4833b552ef40e6aade))
* Update .env* files ([177044b](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/177044ba9a123545fe82fce400acfca363f7bb28))
* Update .env* files ([c9f0425](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/c9f042505f12569eeafac9da739e818c2ff1fab5))

## [1.8.0](https://github.com/City-of-Helsinki/palvelutarjotin-admin/compare/palvelutarjotin-admin-v1.7.3...palvelutarjotin-admin-v1.8.0) (2023-12-27)


### Features

* Add helper text to the own places filter ([ebfedb7](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/ebfedb7a64b2af18bf10c35368b73f6656cc173c))


### Bug Fixes

* Cimode localization ([5249ce0](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/5249ce02eaff415959d065d646392e3a759cef80))
* Header logo should use a pointer as a cursor ([ab64715](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/ab64715a36128e7c59f56bd4ef59b22bb7db77d7))

## [1.7.3](https://github.com/City-of-Helsinki/palvelutarjotin-admin/compare/palvelutarjotin-admin-v1.7.2...palvelutarjotin-admin-v1.7.3) (2023-12-14)


### Bug Fixes

* Enrolment edit link ([9e5ff5c](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/9e5ff5c5065cc381009227cccb5f546a853a64b8))
* Enrolment edit when no audience limits are set ([6330af9](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/6330af93fb083be2f56c20fe9b49d7064904271b))
* No defaults should be given as a group size limit ([fbf1eb5](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/fbf1eb589f1da39c6b01f68f80098d4099d7914e))

## [1.7.2](https://github.com/City-of-Helsinki/palvelutarjotin-admin/compare/palvelutarjotin-admin-v1.7.1...palvelutarjotin-admin-v1.7.2) (2023-09-20)


### Bug Fixes

* App version information PT-1652 ([#302](https://github.com/City-of-Helsinki/palvelutarjotin-admin/issues/302)) ([10007d6](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/10007d6442cbc410074f923565108f6162fe39e3))

### [1.7.1](https://github.com/City-of-Helsinki/palvelutarjotin-admin/compare/v1.7.0...v1.7.1) (2023-06-29)

### Updates

- the Node has been updated to v. 20.
- all the dependencies has been updated to the latest, so also all the existing code needed some migration.

### Bug Fixes

- setFieldValue types and usage ([f83ebfe](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/f83ebfe58a3740c0b2ecbc6f5c04b0c86c88ad06))

## [1.7.0](https://github.com/City-of-Helsinki/palvelutarjotin-admin/compare/v1.6.2...v1.7.0) (2023-05-10)

### Features

- **queue:** enrolment queue table ([b44f5e5](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/b44f5e569da5d9636f6f05892a4719f1ccab5529))

### Bug Fixes

- **queue:** refresh the queue table on enrolment changes ([abfb62f](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/abfb62f4c04309bea352f9a4e35fe3f3161b5791))

## [1.6.2](https://github.com/City-of-Helsinki/palvelutarjotin-admin/compare/release-v.1.6.1...release-v.1.6.2) (2023-04-27)

### Bug Fixes

- node14 upgrade PT-1669 ([8c37cb4](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/8c37cb40e0af1e10d068d32bc293c32cedeb747e))

### [1.6.1](https://github.com/City-of-Helsinki/palvelutarjotin-admin/compare/v1.6.0...v1.6.1) (2023-03-27)

### Bug Fixes

- use correct contact infos in enrolment details ([138e1d7](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/138e1d74e06ddb6bb6e4f8a5811472bdd94ccebc))

## [1.6.0](https://github.com/City-of-Helsinki/palvelutarjotin-admin/compare/release-v.1.5.0...release-v.1.6.0) (2023-01-13)

### Features

- correct translations in UI
- update privacy policy links

### Bug Fixes

- update browser test localization ([8e4c013](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/8e4c013bfa766868904f8fb31ff7949656d7bd76))

## [1.5.0](https://github.com/City-of-Helsinki/palvelutarjotin-admin/compare/v1.4.0...v1.5.0) (2022-11-08)

### Features

- add terms of service page link to profile form ([e70abce](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/e70abcef48400f9978fb728249e15028e141f70f))
- update registration pending page text and contact info ([c75fb70](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/c75fb70b4782ee26d039be3ef68a5c391c455eb8))

## [1.4.0](https://github.com/City-of-Helsinki/palvelutarjotin-admin/compare/v1.1.1...v1.4.0) (2022-10-12)

### Features

- **autoAcceptanceMessage:** notification about the email content ([564d7ca](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/564d7ca00b40899676bb21060d96db81b5e99f30))
- **autoAcceptanceMessage:** updated the schema ([4f0c6da](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/4f0c6daaa977a67875304c5408b42babfe2add7d))
- cms menu loading skipped when user is not logged in ([cf70ac0](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/cf70ac04f282ca07f9c48e271ea6bca6798e801c))
- implement new occurrence form with HDS inputs ([dae2a51](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/dae2a516acb777261d39fc7ca749121853fa3b23))
- **navigation:** add dropdown menu and delete sub navigation bars ([d57c8a7](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/d57c8a7cdab562a90b2877e6c6db3182ebe06428))
- **profile:** email can be given in my profile form ([b62b489](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/b62b48957017f3c34239065915003eaa1a936f20))
- **sidebar:** add sidebar layout and link list ([f494789](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/f494789ffc362eecc0f03980a767579f34dd09f2))

### Bug Fixes

- a typo in the placeholder text "Etsi helsinkiläistä toimipistettä" ([2eb425a](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/2eb425a138261fc193f669e6d6bfc4ce92630752))
- add img and figure styles to fix cms page with bit image ([d7d5de2](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/d7d5de2c3124794fe45ed716105e0fa59858c7a3))
- **autoAcceptanceMessage:** a trivial style fix ([83191da](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/83191da23027c5e8d11569edde6ce68afe8c81a5))
- **autoAcceptanceMessage:** fixed edit event page mutation ([70bc6c7](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/70bc6c7170431489245ced41bf8fd6413af5acca))
- **autoAcceptanceMessage:** updated the Swedish translations ([01ace09](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/01ace09ed8c5814a56458e5f7b87dcccc73f73c6))
- back navigation to pages where it was inconsistent ([6176a2a](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/6176a2a986ac396c8180b7bfb324d22516cd58ef))
- delete padding:0 from sidebar container ([0945c40](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/0945c4048842b66cdd3b95e38cdb701ae81d4367))
- delete unused function from validation schema ([df2a04a](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/df2a04a57bc8f02e86cd2173dc560b2be02edd3f))
- delete unused import ([c977412](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/c977412d7c72a4cf29021884d5218f3a83624f70))
- EditOccurrencePage form fix ([c709c30](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/c709c306ba67513f0e659aca7c8b7ddb17d3630a))
- filter undefined children from menu ([4f0e951](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/4f0e95134246e7038f782c4b1718daf9600a4e04))
- multiday occurrence time in occurrences table ([54080e4](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/54080e4f666ba553affc4b604e5e04cdea915d50))
- new occurrence form text fixes ([4a73a1c](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/4a73a1c2b0c2103855144dcf80d3203d2541ee47))
- prevent fetching the places without place id ([7c6097b](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/7c6097b28239e0dc81367e98c4f13aac01f7d9f0))

## [1.3.0](https://github.com/City-of-Helsinki/palvelutarjotin-admin/compare/v1.1.1...v1.3.0) (2022-04-21)

### Features

- **autoAcceptanceMessage:** notification about the email content ([564d7ca](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/564d7ca00b40899676bb21060d96db81b5e99f30))
- **autoAcceptanceMessage:** updated the schema ([4f0c6da](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/4f0c6daaa977a67875304c5408b42babfe2add7d))
- implement new occurrence form with HDS inputs ([dae2a51](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/dae2a516acb777261d39fc7ca749121853fa3b23))
- **navigation:** add dropdown menu and delete sub navigation bars ([d57c8a7](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/d57c8a7cdab562a90b2877e6c6db3182ebe06428))
- **profile:** email can be given in my profile form ([b62b489](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/b62b48957017f3c34239065915003eaa1a936f20))
- **sidebar:** add sidebar layout and link list ([f494789](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/f494789ffc362eecc0f03980a767579f34dd09f2))

### Bug Fixes

- a typo in the placeholder text "Etsi helsinkiläistä toimipistettä" ([2eb425a](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/2eb425a138261fc193f669e6d6bfc4ce92630752))
- add img and figure styles to fix cms page with bit image ([d7d5de2](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/d7d5de2c3124794fe45ed716105e0fa59858c7a3))
- **autoAcceptanceMessage:** a trivial style fix ([83191da](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/83191da23027c5e8d11569edde6ce68afe8c81a5))
- **autoAcceptanceMessage:** fixed edit event page mutation ([70bc6c7](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/70bc6c7170431489245ced41bf8fd6413af5acca))
- **autoAcceptanceMessage:** updated the Swedish translations ([01ace09](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/01ace09ed8c5814a56458e5f7b87dcccc73f73c6))
- back navigation to pages where it was inconsistent ([6176a2a](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/6176a2a986ac396c8180b7bfb324d22516cd58ef))
- delete padding:0 from sidebar container ([0945c40](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/0945c4048842b66cdd3b95e38cdb701ae81d4367))
- delete unused function from validation schema ([df2a04a](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/df2a04a57bc8f02e86cd2173dc560b2be02edd3f))
- delete unused import ([c977412](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/c977412d7c72a4cf29021884d5218f3a83624f70))
- EditOccurrencePage form fix ([c709c30](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/c709c306ba67513f0e659aca7c8b7ddb17d3630a))
- filter undefined children from menu ([4f0e951](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/4f0e95134246e7038f782c4b1718daf9600a4e04))
- multiday occurrence time in occurrences table ([54080e4](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/54080e4f666ba553affc4b604e5e04cdea915d50))
- new occurrence form text fixes ([4a73a1c](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/4a73a1c2b0c2103855144dcf80d3203d2541ee47))
- prevent fetching the places without place id ([7c6097b](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/7c6097b28239e0dc81367e98c4f13aac01f7d9f0))

## [1.2.0](https://github.com/City-of-Helsinki/palvelutarjotin-admin/compare/v1.1.1...v1.2.0) (2022-01-12)

### Features

- **autoAcceptanceMessage:** notification about the email content ([564d7ca](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/564d7ca00b40899676bb21060d96db81b5e99f30))
- **autoAcceptanceMessage:** updated the schema ([4f0c6da](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/4f0c6daaa977a67875304c5408b42babfe2add7d))
- **profile:** email can be given in my profile form ([b62b489](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/b62b48957017f3c34239065915003eaa1a936f20))

### Bug Fixes

- **autoAcceptanceMessage:** a trivial style fix ([83191da](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/83191da23027c5e8d11569edde6ce68afe8c81a5))
- **autoAcceptanceMessage:** fixed edit event page mutation ([70bc6c7](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/70bc6c7170431489245ced41bf8fd6413af5acca))
- **autoAcceptanceMessage:** updated the Swedish translations ([01ace09](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/01ace09ed8c5814a56458e5f7b87dcccc73f73c6))
- back navigation to pages where it was inconsistent ([6176a2a](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/6176a2a986ac396c8180b7bfb324d22516cd58ef))
- multiday occurrence time in occurrences table ([54080e4](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/54080e4f666ba553affc4b604e5e04cdea915d50))

### [1.1.1](https://github.com/City-of-Helsinki/palvelutarjotin-admin/compare/v1.1.0...v1.1.1) (2021-12-17)

### Bug Fixes

- add missing Admin text to sv translation ([b865ede](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/b865ede8b69505386a47e9c8a41245ad5ab05002))
- delete beta texts ([bac5272](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/bac527267fcad0f082673b3e3c82ee565d4cbf11))
- occurrences listing in event summary showing ongoing events in the past section ([638eed6](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/638eed6025e166bd56509bbf5f769937be724fdd))

## [1.1.0](https://github.com/City-of-Helsinki/palvelutarjotin-admin/compare/v1.0.0...v1.1.0) (2021-12-10)

### Features

- add is orderable to school checkbox to create occurrences page ([98282f7](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/98282f7d78c9a317ed1119b9162ce508128d455f))
- update enrolment link label to also have email ([8c63d67](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/8c63d675235b006f3c9a632801c255e9e9d1c2a0))

## [1.0.0](https://github.com/City-of-Helsinki/palvelutarjotin-admin/compare/v0.3.6...v1.0.0) (2021-12-08)

### Features

- unit place selector uses schoolsAndKindergartens query ([aa0173c](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/aa0173ca022cf26cda173a45ed24fb0095d337d5))

### Bug Fixes

- delete unused variables ([53856c3](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/53856c3df7247aee68b6174dfe7e12e472852b3e))
- make phonenumber not required when editing enrolment ([c7b6951](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/c7b6951c0b84efeddb5818fa0445ae7983ccf370))
- unit id fields entries are filtered in lowercase format ([ce6b75e](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/ce6b75ed4e6be4019e931b7ff96708ee9da10b14))
- validation in edit enrolment page + add tests ([74bbc8a](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/74bbc8a5c5e8c4d34d61db6880ba0d19879e71cf))

### [0.3.6](https://github.com/City-of-Helsinki/palvelutarjotin-admin/compare/v0.3.5...v0.3.6) (2021-11-12)

### Features

- add ability to edit occurrences (add/delete) ([ebbcff7](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/ebbcff7d5eabd0591d214e17f55adfc42321eeaf))
- show loading indicator in occurrences table when deleting/canceling ([c1988d0](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/c1988d0363b001fd30b8bf58b71ce848f6df2984))
- study group unit field and selector ([37af0dc](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/37af0dcffd1928250e6c1c2370ada78c1234ae80))
- updated the study group and servicemap api schemas. ([9837ad1](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/9837ad1f209e8c9f265c080062224669a294eb4d))

### Bug Fixes

- add couple sv transltions ([07c69cc](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/07c69ccf6c338b9e3a670bf0b246190b0691e67e))
- better translation for unit field checkbox ([44eec53](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/44eec538f59c640bac373cf1c25bb6853b8a1c18))
- couple translation fixes ([0a50942](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/0a50942f76f9870613310caa448fec779cf84025))
- dont try to fetch language options from cms when not on cms page ([696b57b](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/696b57b5622234c86ba86b4df6ecea0f279b7df4))
- how multiday occurrences are shown and update date formatting to coply with HDS guidelines ([c21c56e](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/c21c56edc4a3794704afd5b545651b10ef61d6cc))
- show dash instead of 0 when amounOfSeats if 0 ([0874c5d](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/0874c5d82b0422378773e48eaa266d4b48437b76))
- show multi day occurrences as date range in event preview card ([8d15fd6](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/8d15fd6d85ccd85b9a9d9546ff3a447ae6deebd4))
- swedish translation dfor deleteSuccess ([5d3a1ae](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/5d3a1aee28854445f8667fde14058bf44f78fb6f))

### [0.3.5](https://github.com/City-of-Helsinki/palvelutarjotin-admin/compare/v0.3.4...v0.3.5) (2021-09-28)

### Features

- filter events by profile places ([91008e5](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/91008e5f1f3f1c2328e54d56d5324ec7aad14a73))

### Bug Fixes

- add missing sv translations ([b3e4e89](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/b3e4e89745e8c2bcfbaffc4c7681348af25cfd8f))
- add swedish translation for my profile form ([f8cb897](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/f8cb897c33aa38bc0595bd5a2fa804f0749b12ec))
- browser tests ([e7f820e](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/e7f820e04871318093fba767cacdd2f79bc6774e))
- build ts error by ignoring cmsMockDataUtils type check ([c799856](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/c7998561ae68b88c79486afa29c75bf9971621b4))
- delete unused imports ([6b36018](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/6b36018ca2b8a7176045dc1ba876f0aa2ac06dd7))
- events page tests after translation changes ([aa43bd6](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/aa43bd6a9cf984f00a677f12b43e1677c0e83c69))
- hide also seats input when not internal enrolment ([1525db8](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/1525db82d4c52722bac70d68efbef191065b69c0))
- hide min and max fields when not internal enrolment + improve tests ([88f910b](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/88f910b36bf12a3ad8fcd4a41f5a537c81176a01))
- some translation improvements for places selector ([847d92c](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/847d92c416fbbfb2b90275f003453a42589d35b4))

### [0.3.4](https://github.com/City-of-Helsinki/palvelutarjotin-admin/compare/v0.3.3...v0.3.4) (2021-09-21)

### Features

- add external enrolment url support ([df829df](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/df829dfeeb73498548c6cb37bc9496503a16cd90))
- add import to calendar button to occurrence row action dropdown ([6d2116d](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/6d2116dc3c3657794ea7f4b3bc761d489f5edb83))
- add placeIds to profile mutation and quries ([188175d](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/188175de8d2e1089946023db57b78ccea3545cd2))
- **cms:** add breadcrumbs + other refactoring ([0a45a08](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/0a45a089ba473259bc32c4d0655c7d4e69b9c659))
- **cms:** add sub page search ([4455e1a](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/4455e1ae44dcd40020f836ee9c6bd9287d35f9eb))
- **cms:** cms navigation and page component ([c619f82](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/c619f82fbf19ad204ed787dad0748f4e38e2d570))
- **enrolment-type:** an enrolment type selector implemented. ([cd79c7f](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/cd79c7f2c094893b98bdcd31f1b818db005d807e))
- **enrolment-type:** different validation on each enrolment type ([8af9d4a](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/8af9d4ad2f5f4d645fdc9a1b03c3316f7fce0568))
- **enrolment-type:** Enrolment type effects on occurrence table. ([4885abc](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/4885abc5b993b56d023df6bafe5783830d875279))
- **enrolment-type:** events enrolment info differs on different enrolment type ([2bb28d1](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/2bb28d1baba216389daece7e273ee3d168c8935d))
- location selector to profile form ([104ba6a](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/104ba6a12e73a624ae8397c7fb56192a12b2c705))

### Bug Fixes

- changes to min and max labelling in occurrence form. ([56dbd54](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/56dbd549b5d884881f6a7b68586c703c1a898ac5))
- enrolment info validation ([2a6efe4](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/2a6efe46fb6f8ae74e3857c83a0602644707d29f))
- **enrolment-type:** removed an unimplemented event-has-no-occurrences -field. ([90bf75c](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/90bf75cacdd4a83ddb7cf51ddd6e3aa8b7c43f12))
- **enrolment-type:** resolved the linter issues ([cf66469](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/cf66469dec89228b7ef5ced3309beb1e25b2602c))
- pt-1141 hide group size inputs when external enrolment ([62bef91](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/62bef918e4e38bf065ad493c491640c1d15c0445))
- types/dompurify to prod deps ([8b2a5ba](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/8b2a5ba5f805c1806957018c5b5035aede3701ed))

### [0.3.3](https://github.com/City-of-Helsinki/palvelutarjotin-admin/compare/v0.3.2...v0.3.3) (2021-09-07)

### Features

- **cms:** added a feature flag for headless cms implementation. ([b0a1174](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/b0a11745e00a18174f2a09016fd4410057bbc35d))
- **cms:** CMS page navigation. ([7ea9a0a](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/7ea9a0a6463b1e231e8ebeffdc8dec90986e9027))
- **cms:** CMS page navigation. ([29689fd](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/29689fd6b5e87f1a4cf5abcc1e494fd1dba56f5e))
- **cms:** integrated the headless cms to render a language specific page menu ([fcf3a6a](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/fcf3a6a01be667e8861119cc7b2fed7bbbaabc82))
- **navigation:** refactored header to use HDS navigation. ([5b36974](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/5b3697422a8027f78828a9074504dd61c2b4fd1c))
- **profile:** added a language selector to my profile form. ([278bf48](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/278bf484338b8ffd490e050122090a00e9c13d67))

### Bug Fixes

- event pagination error and improve tests ([46d3dc2](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/46d3dc21fe2d48f84d5a47f2acc0f8dbfe5a4865))
- **occurrence:** removed the unpublish event button ([31ac36d](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/31ac36d6643d1f12751efa87ac2627ca6f2f6910))

### [0.3.2](https://github.com/City-of-Helsinki/palvelutarjotin-admin/compare/v0.3.1...v0.3.2) (2021-08-20)

### Features

- **events:** show error message if fetching more event fails ([707c397](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/707c3979a702f7b2287cfd5df48da2e3a76e0a57))

### Bug Fixes

- pagination when server returns error ([68918c9](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/68918c9bfbf484b28e7f625086063c53cbdd5548))
- show only first and last occurrences if over 5 are in the future when deleting event ([a006bc1](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/a006bc1aa72c21f5ed0bd78685039f6b3ce17c80))
- update fetch more error translations ([037c489](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/037c489179857ff712d26decabdb540292d73707))

### [0.3.1](https://github.com/City-of-Helsinki/palvelutarjotin-admin/compare/v0.3.0...v0.3.1) (2021-08-18)

### Bug Fixes

- **editor:** strip pasted styles in event description editor ([b033279](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/b033279b1223ff479e44f6432f797139d4241437))
- hard coded a Finnish registration pending text instead of lorem ipsum. ([240dc7b](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/240dc7bdb77fed47dd3bff49f72e551cf7bf8c9b))

## 0.3.0 (2021-07-15)

### Bug Fixes

- change locations to location in query ([18f250d](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/18f250d0d57c7640ac403a610418a619bacf2792))
