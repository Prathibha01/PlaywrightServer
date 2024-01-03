import { test, expect } from '@playwright/test';   //import

test.skip('anz', async ({ page }) => {

    await page.goto('https://www.myer.com.au/');
    //await page.pause();

    await page.getByRole('button', { name: 'Women' }).click()
    await page.getByRole('link', { name: 'Sneakers' }).click()
    page.waitForNavigation()
    await page.getByRole('link', { name: 'Skechers Summits Perfect Views Mesh Sneakers in Black' }).click()
    page.waitForNavigation()
    await page.getByRole('group', { name: 'size: size guide' }).getByText('US 7').click()
    page.waitForNavigation()
    await page.getByRole('button', { name: 'Add to Bag' }).click()
    await page.getByRole('button', { name: 'View Bag and Checkout' }).click()

       

    });

test.skip('myer', async({page}) =>  {

    await page.goto('https://www.myer.com.au/')
    await page.getByLabel('Search for product or brand').click();
    await page.getByLabel('Search for product or brand').fill('jacket');
    await page.getByRole('option', { name: 'Search for womens jackets' }).click();
    await page.getByRole('link', { name: 'Trenchcoats & Raincoats' }).click();
    await page.getByRole('link', { name: 'Review Foulard Trench Coat in Grey' }).click();
    await page.getByRole('link', { name: 'Pink colour' }).click();
    await page.getByRole('group', { name: 'size: size guide' }).getByText('AU 6').click();
    await page.getByRole('button', { name: 'Add to Bag' }).click();
    await page.getByRole('button', { name: 'Continue shopping' }).click();
    await page.getByRole('button', { name: '1', exact: true }).click();

    


});

