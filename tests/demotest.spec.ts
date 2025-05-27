import{test} from '@playwright/test';


test.beforeAll('first test', async ({page}) => {

    await page.goto('http://localhost:50553/')

})