import { test, expect } from '@playwright/test'

test.describe.serial('CREATE -> PATCH -> GET', () => {

    let tokenID: string
    let bookingID: number
    const bookingPayload = {
        "firstname": "James",
        "lastname": "Brown",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        },
        "additionalneeds": "Breakfast"
    }

    const partialPayload = {
        "firstname": "Rasel",
        "lastname": "Ahmed"
    }

    test('CREATE TOKEN: AUTH', async ({ request }) => {
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

    test('CREATE', async ({ request }) => {
        const response = await request.post('https://restful-booker.herokuapp.com/booking',
            {
                data: bookingPayload
            }
        )
        const body = await response.json()
        bookingID = body.bookingid
        console.log("Created bookingID: ", bookingID)
        expect(body.booking).toMatchObject(bookingPayload)
    })

    test('PATCH', async ({ request }) => {
        const response = await request.patch(`https://restful-booker.herokuapp.com/booking/${bookingID}`,
            {
                headers: {
                    Cookie: `token=${tokenID}`
                },
                data: partialPayload
            }
        )
        const body = await response.json()
        expect(response.status()).toBe(200)

        // NOW GET call to validate the PATCH request

        const getResponse = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingID}`)
        const getBody = await getResponse.json()

        expect(getResponse.status()).toBe(200)
        expect(getBody.firstname).toBe('Rasel')
        expect(getBody.lastname).toBe('Ahmed')

        // validate non updated fields are remained as it is
        expect(getBody).toEqual({
            "firstname": "Rasel",
            "lastname": "Ahmed",
            "totalprice": 111,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "Breakfast"
        })
    })
})