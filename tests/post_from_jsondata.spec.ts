import { test, expect } from '@playwright/test'
import apiData from '../test-data/api-data.json'

test.describe.serial('Test from JSON data', () => {

    let bookingID: number
    let tokenID: string
    test('TOKEN Creation', async ({ request }) => {
        const response = await request.post('https://restful-booker.herokuapp.com/auth',
            {
                data: {
                    "username": "admin",
                    "password": "password123"
                }
            }
        )
        const body = await response.json()
        tokenID = body.token
        
    })

    test('Create booking', async ({ request }) => {
        const respone = await request.post('https://restful-booker.herokuapp.com/booking',
            {
                data: apiData.orderPayload
            }
        )
        const body = await respone.json()

        bookingID = body.bookingid
        expect(respone.status()).toBe(200)

    })

    test('GET created booking', async ({ request }) => {
        const response = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingID}`)
        const body = await response.json()

        expect(response.status()).toBe(200)
        expect(body).toEqual(apiData.orderPayload)
    })

    test('DELETE booking', async ({ request }) => {
        const response = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingID}`,
            {
                headers: {
                    Cookie: `token=${tokenID}`
                }
            }
        )
        const body = await response.text()
        expect(response.status()).toBe(201)
        expect(body).toEqual("Created")
    })

    test('GET deleted booking', async({request})=>{
        const response = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingID}`)
        const body = await response.text()

        expect(response.status()).toBe(404)
        expect(body).toEqual("Not Found")
    })

})