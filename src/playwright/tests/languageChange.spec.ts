import { test } from '../testWithFixtures';

test('login page language can be changed using header language selector', async ({
  loginPage,
}) => {
  await loginPage.clickHeaderButton('Suomi');
  await loginPage.isReady();
  await loginPage.isFinnish();
  await loginPage.clickHeaderButton('Svenska');
  await loginPage.isReady();
  await loginPage.isSwedish();
  await loginPage.clickHeaderButton('English');
  await loginPage.isReady();
  await loginPage.isEnglish();
  await loginPage.clickHeaderButton('Suomi');
  await loginPage.isReady();
  await loginPage.isFinnish();
});

test('/ page is in English', async ({ loginPage }) => {
  await loginPage.isEnglish();
});

test('/fi page is in Finnish', async ({ loginPageFi }) => {
  await loginPageFi.isFinnish();
});

test('/sv page is in Swedish', async ({ loginPageSv }) => {
  await loginPageSv.isSwedish();
});

test('/en page is in English', async ({ loginPageEn }) => {
  await loginPageEn.isEnglish();
});
