import { test, expect } from '@playwright/test'

test.describe.serial('CREATE -> GET, DELETE -> GET', () => {

    let bookingID: number
    let tokenID: string

    const bookingPayload = {
        firstname: "Rakibur",
        lastname: "Rahman",
        totalprice: 500,
        depositpaid: true,
        bookingdates: {
            checkin: "2024-01-01",
            checkout: "2026-01-01",
        },
        additionalneeds: "Gym Membership",
    };

    const updatePayload = {
        firstname: "Ahsan",
        lastname: "Ahmed",
        totalprice: 500,
        depositpaid: true,
        bookingdates: {
            checkin: "2024-01-01",
            checkout: "2026-01-01",
        },
        additionalneeds: "Gym Membership",
    }


    test('Create TOKEN', async ({ request }) => {
        const response = await request.post('https://restful-booker.herokuapp.com/auth', {
            data: {
                "username": "admin",
                "password": "password123"
            }
        })
        const body = await response.json()
        tokenID = body.token
        expect(typeof body.token).toBe('string')
        console.log(tokenID)
    })



    test('CREATE', async ({ request }) => {
        const response = await request.post('https://restful-booker.herokuapp.com/booking', {
            data: bookingPayload
        })
        const body = await response.json()
        expect(response.status()).toBe(200) // status validation
        expect(body.booking).toMatchObject(bookingPayload)
        bookingID = body.bookingid
        console.log("Created BookingID: ", bookingID)
    })
    test('GET', async ({ request }) => {
        const response = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingID}`)
        const body = await response.json()
        // console.log(body)
        expect(response.status()).toBe(200) //status validation
        expect(body).toMatchObject(bookingPayload)
    })

    test('UPDATE', async ({ request }) => {
        const response = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingID}`, {
            headers: {
                Cookie: `token=${tokenID}`
            },
            data: updatePayload
        })
        expect(response.status()).toBe(200)
        const body = await response.json()
        expect(body.firstname).toBe("Ahsan")
        expect(body.lastname).toBe("Ahmed")
    })


    test('GET Updated booking ID', async ({ request }) => {
        const response = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingID}`)
        expect(response.status()).toBe(200) //status validation after deletion
        const body = await response.json()
        expect(body.firstname).toBe("Ahsan")
        expect(body.lastname).toBe("Ahmed")
        expect(body).toMatchObject(updatePayload)
    })

    test('DELETE', async ({ request }) => {
        const response = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingID}`, {
            headers: {
                Cookie: `token=${tokenID}`
            }
        })
        expect(response.status()).toBe(201)
    })

    test('GET deleted booking ID', async ({ request }) => {
        const response = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingID}`)
        expect(response.status()).toBe(404) //status validation after deletion
    })
})