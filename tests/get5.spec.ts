import {test, expect} from '@playwright/test'

test('API test with UI Verification', async({request, page})=>{
    const response = await request.get('https://api.demoblaze.com/entries')
    const body = await response.json()
    const bodyTitle = body.Items[0].title 
    // console.log(bodyTitle)

    //verify with ui
    await page.goto('https://demoblaze.com/')
    await expect(page.getByRole('link', { name: 'Samsung galaxy s6' })).toHaveText(bodyTitle)
    
})