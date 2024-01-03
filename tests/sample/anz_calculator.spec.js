import { test, expect } from '@playwright/test';

test('Positive test', async ({ page }) => {

  await page.goto('https://www.anz.com.au/personal/home-loans/calculators-tools/much-borrow/');
  await page.getByRole('textbox', { name: 'Your annual income (before tax)' }).click();
  await page.getByRole('textbox', { name: 'Your annual income (before tax)' }).fill('8,0000');
  await page.getByRole('textbox', { name: 'Your annual other income (optional)' }).click();
  await page.getByRole('textbox', { name: 'Your annual other income (optional)' }).fill('1,0000');
  await page.getByRole('textbox', { name: 'Monthly living expenses' }).click();
  await page.getByRole('textbox', { name: 'Monthly living expenses' }).fill('500');
  await page.getByRole('textbox', { name: 'Other loan monthly repayments' }).click();
  await page.getByRole('textbox', { name: 'Other loan monthly repayments' }).fill('100');
  await page.getByRole('textbox', { name: 'Total credit card limits' }).click();
  await page.getByRole('textbox', { name: 'Total credit card limits' }).fill('1,0000');
  await page.getByRole('button', { name: 'Work out how much I could borrow' }).click();
  //await expect(page.getByText('$426,000')).toBeVisible();
  //await page.screenshot({ path: 'screenshot.png' });
  //const actual = await page.getByText('$482,000').textContent();
   await page.waitForTimeout(5000);
   const selector = '#borrowResultTextAmount';  //id value has been passed as a CSS selector value
   const actual = await page.$eval(selector, (element) => element.textContent);
   expect(actual).toEqual('$410,000');

});

  test('Negative test', async ({ page }) => {
    await page.goto('https://www.anz.com.au/personal/home-loans/calculators-tools/much-borrow/');
    await page.getByRole('textbox', { name: 'Your annual income (before tax)' }).click();
    await page.getByRole('textbox', { name: 'Your annual income (before tax)' }).fill('8,0000');
    await page.getByRole('textbox', { name: 'Your annual other income (optional)' }).click();
    await page.getByRole('textbox', { name: 'Your annual other income (optional)' }).fill('1,0000');
    await page.getByRole('textbox', { name: 'Monthly living expenses' }).click();
    await page.getByRole('textbox', { name: 'Monthly living expenses' }).fill('100');
    await page.getByRole('textbox', { name: 'Other loan monthly repayments' }).click();
    await page.getByRole('textbox', { name: 'Other loan monthly repayments' }).fill('25');
    await page.getByRole('textbox', { name: 'Total credit card limits' }).click();
    await page.getByRole('textbox', { name: 'Total credit card limits' }).fill('50');
    await page.getByRole('button', { name: 'Work out how much I could borrow' }).click();

    await page.waitForTimeout(10000);
    const selector = '#borrowResultTextAmount';  //id value has been passed as a CSS selector value
    const actual = await page.$eval(selector, (element) => element.textContent);
    expect(actual).toEqual('$482,000');
    
});