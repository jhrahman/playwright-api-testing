import {test} from '@playwright/test'

test('Get with  Query Parameter', async({request})=>{
    const res = await request.get('/booking?firstname=John&lastname=Smith')
    console.log(await res.json())
})