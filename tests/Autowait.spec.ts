import { test, expect } from '@playwright/test';


test.beforeEach('test', async ({ page }) => {
  
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()

})

test('autowaiting', async({page}) => {

 const successbtn = page.locator('.bg-success')
 await successbtn.click()

})

test('wait', async({page}) => {

    await page.waitForSelector('.bg-success')
    
})