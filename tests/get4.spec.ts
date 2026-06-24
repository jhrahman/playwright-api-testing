import {test, expect} from '@playwright/test'

test('Test GET with Query Params', async({request})=>{
        const res = await request.get('/booking', {
            params:{
                firstname: "John",
                lastname: "Smith"
            }
        })
        console.log(await res.json())
        await expect(res.status()).toBe(200)
})