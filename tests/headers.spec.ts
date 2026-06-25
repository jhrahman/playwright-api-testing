import {test, expect} from '@playwright/test'

test('Headers verification', async({request})=>{
    const response = await request.get('https://restful-booker.herokuapp.com/booking/1')
    const body = await response.headers()
    // console.log(body)
    expect(body.server).toEqual("Heroku")
    expect(body["x-powered-by"]).toEqual("Express")

    const bodyArray = await response.headersArray()
    // console.log(bodyArray)
    
})