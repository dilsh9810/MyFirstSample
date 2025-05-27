import { test, expect } from '@playwright/test';
import { link } from 'fs';

test.beforeEach(async ({ page }) => {

 await page.goto('http://localhost:4200/')
  
})

test.describe('Form Layouts Page', () =>{

test.beforeEach(async({page}) => {

  await page.getByText('Forms').click()
  await page.getByText('Form Layouts').click()

})

/*test('radiobtns', async({page}) =>{

   const testpagetext = page.locator('nb-card', {hasText: "Using the Grid"})

   //await testpagetext.getByLabel('Option 1').check({force:true})

   await testpagetext.getByRole('radio', {name:"Option 1"}).check({force:true})

   const radiostatus1 = await testpagetext.getByRole('radio', {name:"Option 1"}).isChecked()

   expect(radiostatus1).toBeTruthy()

   await testpagetext.getByLabel('Option 2').check({force:true})

   const radiostatus2 = await testpagetext.getByLabel('Option 2').isChecked()

   expect(radiostatus2).toBeTruthy()

   
})*/

test('checkbox', async({page}) => {

  await page.getByText('Modal & Overlays').click()
  await page.getByText('Toastr').click()

  const checkbox = await page.getByRole('checkbox', {name:"Hide On Click"}).uncheck({force:true})
  
  const checkbox1 =  await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).check({force:true})
  
  const checkbox2 = await page.getByRole('checkbox', {name:"Show toast with icon"}).uncheck({force:true})


  const allbox = page.getByRole('checkbox')
  for(const box of await allbox.all()){

    await box.check({force:true})
    expect(await box.isChecked()).toBeTruthy()

  } 

  const allboxes = page.getByRole('checkbox')

  for(const boxe of await allboxes.all()){

    await boxe.uncheck({force:true})
    expect(await boxe.isChecked()).toBeFalsy()
  }
  
})

/*test('Dropdowns', async({page}) => {

  const drpdwnmenu = page.locator('ngx-header nb-select')
  await drpdwnmenu.click()
  
   const listitems = page.getByRole('list').locator('nb-option')
   //const options = page.locator('nb-option-list nb-option')

  // await listitems.filter({hasText: "Dark"}).click()

   await listitems.filter({hasText: "Light"}).click()

  
   //await expect(options).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])

})*/

test('tooltip', async({page}) => {

  await page.getByText('Modal & Overlays').click()
  await page.getByText('Tooltip').click()
  
  const tooltip = await page.locator('nb-card', {hasText:"Tooltip with Icon"})
  await tooltip.locator('button', {hasText:"Show ToolTip"}).nth(0).hover()


})

test('dialogbox', async({page}) => {

  await page.getByText('Tables & Data').click()
  await page.getByText('Smart Table').click()

  page.on('dialog', dialog => {

    expect(dialog.message()).toEqual('Are you sure you want to delete?')
    dialog.accept()

  })

  const trashbin = await page.locator('table').locator('tr',{hasText:"fat@yandex.ru"}).locator('.nb-trash').click()
  await expect(page.locator('table tr').first()).not.toHaveText('fat@yandex.ru')
  
})




})


test('tables', async({page}) => {

  await page.getByText('Tables & Data').click()
  await page.getByText('Smart Table').click()

  await page.locator('.ng2-smart-pagination-nav').getByText("2").click()

  const getrowid =  page.getByRole('row', {name:"19"}).filter({has: page.locator('td').nth(57).getByText('19')})

  await page.locator('.nb-edit').nth(8).click()

  await page.locator('input-editor').getByPlaceholder('ID').clear()
  
  await page.locator('input-editor').getByPlaceholder('ID').fill('45')

  await page.locator('.nb-checkmark').click()


  // get the row based value in the specific column

  const ages = ['18', '30', '40', '70']

  for(let age of ages){

    await page.locator('input-filter').getByPlaceholder('Age').clear()

    await page.locator('input-filter').getByPlaceholder('Age').fill(age)

  }
    

  })

  test('datepicker', async({page}) => {

    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const dtpicker = page.getByPlaceholder('Form Picker')
    await dtpicker.click()

    let date = new Date()
    date.setDate(date.getDate() + 90)
    const expecteddate = date.getDate().toString()
    const expectedmon  = date.toLocaleString('EN-US', {month: 'short'})
    const expectedmonlo = date.toLocaleString('EN-US', {month: 'long'})
    const expectyear   = date.getFullYear()

    const expectdtf = `${expectedmon} ${expecteddate}, ${expectyear}`


    let calendaryearmonth = await page.locator('nb-calendar-view-mode').textContent()

    const expecteddatef = `${expectedmonlo} ${expectyear}`

    while(!calendaryearmonth.includes(expecteddatef)){

      await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
      
      calendaryearmonth = await page.locator('nb-calendar-view-mode').textContent()

    }

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expecteddate).click()

    await expect(dtpicker).toHaveValue(expectdtf)

    
  })

  test('sliders', async ({page}) => {

    await page.getByText('IoT Dashboard').click()

    const guage = page.locator('[tab-title="Temperature"] ngx-temperature-dragger circle')

    await guage.evaluate(node => {

      node.setAttribute('cx', '263.463')
      node.setAttribute('cy', '92.733')

  
    })

    await guage.click()


  })







