import {test, expect} from '@playwright/test'

test('POST Request to get TOKEN', async({request})=>{
    const response = await request.post('/auth', {
        data:{
            "username" : "admin",
            "password" : "password123"
        }
    })
    const body = await response.json()
    console.log(body)

    // verify 200 OK response
    expect(response.status()).toBe(200)

    //verify post request response
    expect(body.token).toBeDefined() //validates token exists
    expect(typeof body.token).toBe('string') //validate token type is string
    expect(body.token.length).toBeGreaterThan(10) //validate token length is greater than 10

})