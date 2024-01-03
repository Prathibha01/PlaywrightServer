import {test, expect} from '@playwright/test'

test ('Demo Login Test1', async({page}) => {
    await page.goto('https://demo.applitools.com/')
    await page.pause()  
    await page.locator('[placeholder="Enter your username"]').fill('prathi')
    await page.locator('[placeholder="Enter your password"]').fill('1234')
    await page.locator('[id="log-in"]').click()

})