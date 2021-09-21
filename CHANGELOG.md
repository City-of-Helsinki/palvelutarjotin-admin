# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.3.4](https://github.com/City-of-Helsinki/palvelutarjotin-admin/compare/v0.3.3...v0.3.4) (2021-09-21)


### Features

* add external enrolment url support ([df829df](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/df829dfeeb73498548c6cb37bc9496503a16cd90))
* add import to calendar button to occurrence row action dropdown ([6d2116d](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/6d2116dc3c3657794ea7f4b3bc761d489f5edb83))
* add placeIds to profile mutation and quries ([188175d](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/188175de8d2e1089946023db57b78ccea3545cd2))
* **cms:** add breadcrumbs + other refactoring ([0a45a08](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/0a45a089ba473259bc32c4d0655c7d4e69b9c659))
* **cms:** add sub page search ([4455e1a](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/4455e1ae44dcd40020f836ee9c6bd9287d35f9eb))
* **cms:** cms navigation and page component ([c619f82](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/c619f82fbf19ad204ed787dad0748f4e38e2d570))
* **enrolment-type:** an enrolment type selector implemented. ([cd79c7f](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/cd79c7f2c094893b98bdcd31f1b818db005d807e))
* **enrolment-type:** different validation on each enrolment type ([8af9d4a](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/8af9d4ad2f5f4d645fdc9a1b03c3316f7fce0568))
* **enrolment-type:** Enrolment type effects on occurrence table. ([4885abc](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/4885abc5b993b56d023df6bafe5783830d875279))
* **enrolment-type:** events enrolment info differs on different enrolment type ([2bb28d1](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/2bb28d1baba216389daece7e273ee3d168c8935d))
* location selector to profile form ([104ba6a](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/104ba6a12e73a624ae8397c7fb56192a12b2c705))


### Bug Fixes

* changes to min and max labelling in occurrence form. ([56dbd54](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/56dbd549b5d884881f6a7b68586c703c1a898ac5))
* enrolment info validation ([2a6efe4](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/2a6efe46fb6f8ae74e3857c83a0602644707d29f))
* **enrolment-type:** removed an unimplemented event-has-no-occurrences -field. ([90bf75c](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/90bf75cacdd4a83ddb7cf51ddd6e3aa8b7c43f12))
* **enrolment-type:** resolved the linter issues ([cf66469](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/cf66469dec89228b7ef5ced3309beb1e25b2602c))
* pt-1141 hide group size inputs when external enrolment ([62bef91](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/62bef918e4e38bf065ad493c491640c1d15c0445))
* types/dompurify to prod deps ([8b2a5ba](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/8b2a5ba5f805c1806957018c5b5035aede3701ed))

### [0.3.3](https://github.com/City-of-Helsinki/palvelutarjotin-admin/compare/v0.3.2...v0.3.3) (2021-09-07)


### Features

* **cms:** added a feature flag for headless cms implementation. ([b0a1174](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/b0a11745e00a18174f2a09016fd4410057bbc35d))
* **cms:** CMS page navigation. ([7ea9a0a](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/7ea9a0a6463b1e231e8ebeffdc8dec90986e9027))
* **cms:** CMS page navigation. ([29689fd](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/29689fd6b5e87f1a4cf5abcc1e494fd1dba56f5e))
* **cms:** integrated the headless cms to render a language specific page menu ([fcf3a6a](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/fcf3a6a01be667e8861119cc7b2fed7bbbaabc82))
* **navigation:** refactored header to use HDS navigation. ([5b36974](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/5b3697422a8027f78828a9074504dd61c2b4fd1c))
* **profile:** added a language selector to my profile form. ([278bf48](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/278bf484338b8ffd490e050122090a00e9c13d67))


### Bug Fixes

* event pagination error and improve tests ([46d3dc2](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/46d3dc21fe2d48f84d5a47f2acc0f8dbfe5a4865))
* **occurrence:** removed the unpublish event button ([31ac36d](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/31ac36d6643d1f12751efa87ac2627ca6f2f6910))

### [0.3.2](https://github.com/City-of-Helsinki/palvelutarjotin-admin/compare/v0.3.1...v0.3.2) (2021-08-20)


### Features

* **events:** show error message if fetching more event fails ([707c397](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/707c3979a702f7b2287cfd5df48da2e3a76e0a57))


### Bug Fixes

* pagination when server returns error ([68918c9](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/68918c9bfbf484b28e7f625086063c53cbdd5548))
* show only first and last occurrences if over 5 are in the future when deleting event ([a006bc1](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/a006bc1aa72c21f5ed0bd78685039f6b3ce17c80))
* update fetch more error translations ([037c489](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/037c489179857ff712d26decabdb540292d73707))

### [0.3.1](https://github.com/City-of-Helsinki/palvelutarjotin-admin/compare/v0.3.0...v0.3.1) (2021-08-18)


### Bug Fixes

* **editor:** strip pasted styles in event description editor ([b033279](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/b033279b1223ff479e44f6432f797139d4241437))
* hard coded a Finnish registration pending text instead of lorem ipsum. ([240dc7b](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/240dc7bdb77fed47dd3bff49f72e551cf7bf8c9b))

## 0.3.0 (2021-07-15)


### Bug Fixes

* change locations to location in query ([18f250d](https://github.com/City-of-Helsinki/palvelutarjotin-admin/commit/18f250d0d57c7640ac403a610418a619bacf2792))
