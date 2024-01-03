import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.anz.com.au/personal/');
  await page.getByRole('link', { name: 'Bank accounts' }).click();
  await page.getByRole('link', { name: 'How to open an account' }).click();
  await page.locator('#inpagenav-1060713476').getByRole('link', { name: 'Savings accounts' }).click();
  await page.getByRole('link', { name: 'ANZ Plus transact + save bundle' }).click();
  await page.getByRole('link', { name: 'Apply for an ANZ Access Advantage account' }).click();
  await page.locator('.QSISlider > div:nth-child(7) > div').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Apply now for ANZ Access Advantage' }).first().click();
  const page1 = await page1Promise;
  await page1.locator('[data-test-id="appType_Single_button"]').check();
  await page1.locator('[data-test-id="customerType_No_button"]').check();
  await page1.locator('[data-test-id="healthCarePensioner_No_button"]').check();
  await page1.locator('[data-test-id="next-submit_button"]').click();
  await page1.locator('[data-test-id="onlineSaver_No_button"]').check();
  await page1.locator('[data-test-id="next-submit_button"]').click();
  await page1.locator('[data-test-id="personal\\.title_select"]').selectOption('Dr');
  await page1.locator('[data-test-id="personal\\.title_select"]').selectOption('Miss');
  await page1.locator('[data-test-id="personal\\.gender_Female_button"]').check();
  await page1.locator('[data-test-id="personal\\.firstName_input"]').click();
  await page1.locator('[data-test-id="personal\\.firstName_input"]').fill('Prathi');
  await page1.locator('[data-test-id="personal\\.isHavingMiddleName_No_button"]').check();
  await page1.locator('[data-test-id="personal\\.lastName_input"]').click();
  await page1.locator('[data-test-id="personal\\.lastName_input"]').fill('PS');
  await page1.locator('[data-test-id="personal\\.dateOfBirthDay_input"]').click();
  await page1.locator('[data-test-id="personal\\.dateOfBirthDay_input"]').fill('01');
  await page1.locator('[data-test-id="personal\\.dateOfBirthMonth_input"]').click();
  await page1.locator('[data-test-id="personal\\.dateOfBirthMonth_input"]').fill('09');
  await page1.locator('[data-test-id="personal\\.dateOfBirthYear_input"]').click();
  await page1.locator('[data-test-id="personal\\.dateOfBirthYear_input"]').fill('2000');
  await page1.locator('[data-test-id="personal\\.email_input"]').click();
  await page1.locator('[data-test-id="personal\\.email_input"]').fill('pprt@gmail.com');
  await page1.locator('[data-test-id="next-submit_button"]').click();
  await page1.locator('[data-test-id="address\\.residentialAddress\\.fullAddress_input"]').click();
  await page1.locator('[data-test-id="address\\.residentialAddress\\.fullAddress_input"]').fill('no.90, jp street');
  await page1.getByText('I have a different mailing address').click();
  await page1.getByText('I have a different mailing address').click();
  await page1.locator('[data-test-id="next-submit_button"]').click();
  await page1.locator('[data-test-id="error-summary-fullAddress"]').click();
  await page1.locator('[data-test-id="autocomplete-address\\.residentialAddress\\.fullAddress-result-0-action"]').click();
  await page1.locator('[data-test-id="address\\.residentialAddress\\.structuredAddress\\.streetNumber_input"]').click();
  await page1.locator('[data-test-id="address\\.residentialAddress\\.structuredAddress\\.streetNumber_input"]').fill('#40');
  await page1.locator('[data-test-id="address\\.residentialAddress\\.structuredAddress\\.streetName_input"]').click();
  await page1.locator('[data-test-id="address\\.residentialAddress\\.structuredAddress\\.streetName_input"]').fill('jp street');
  await page1.locator('[data-test-id="address\\.residentialAddress\\.structuredAddress\\.streetType_select"]').selectOption('ALLY');
  await page1.locator('[data-test-id="address\\.residentialAddress\\.city_input"]').click();
  await page1.locator('[data-test-id="address\\.residentialAddress\\.city_input"]').fill('retg');
  await page1.locator('[data-test-id="address\\.residentialAddress\\.state_select"]').selectOption('SA');
  await page1.locator('[data-test-id="address\\.residentialAddress\\.postcode_input"]').click();
  await page1.locator('[data-test-id="address\\.residentialAddress\\.postcode_input"]').fill('5344577');
  await page1.locator('form').click();
  await page1.locator('[data-test-id="menu"]').click();
  await page1.locator('[data-test-id="next-submit_button"]').click();
});