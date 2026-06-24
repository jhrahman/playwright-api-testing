import {test, expect} from '@playwright/test'

test('Get with  Query Parameter', async({request})=>{
    const response = await request.get('/booking?firstname=John&lastname=Smith')
    console.log(await response.json())
    // await expect(res.status()).toBe(200)
    await expect(response.status()).toBeTruthy()
})