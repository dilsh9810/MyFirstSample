import { expect, test} from '@playwright/test';


test.beforeEach(async({page}) => {

  await page.goto('http://localhost:4200/')

  await page.getByRole('link', { name: 'Forms' }).first().click()

})


test('first test record', async ({ page }) => {
  
  const formlayout = page.getByRole('link', {name: 'Form Layouts'})

  await formlayout.click()

  await page.getByRole('textbox',{name:'Jane Doe'}).fill('Dilshika')

  await page.getByPlaceholder('Email').nth(0).fill('dilshika98@gmail.com')

  await page.getByRole('button').filter({hasText:'SUBMIT'}).nth(0).click()

  const UsingtheGrid = await page.locator('nb-card').nth(1).getByRole('button').textContent()
  expect (UsingtheGrid).toEqual('Sign in')

  const Formwithoutlabels = await page.locator('nb-card').nth(2).getByRole('textbox').nth(1)
  await Formwithoutlabels.fill('Accessability done')
  const Subjectvalue = await Formwithoutlabels.inputValue()
  expect (Subjectvalue).toEqual('Accessability done')

  const Receip = await page.getByRole('textbox').nth(4)
  const Recipienttext = await Receip.getAttribute('placeholder')
  expect (Recipienttext).toEqual('Recipients')

})

test('Second test', async({page}) => {

  const mdl =  page.getByRole('link').nth(8)
  await mdl.click()

})



