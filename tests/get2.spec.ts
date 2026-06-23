import {test} from "@playwright/test"


test('Get booking id', async({request})=>{
    const req6 = await request.get('/booking/500')
    console.log(await req6.json())
})