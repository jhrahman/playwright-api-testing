import { test, expect } from "@playwright/test"


test('Get booking id', async ({ request }) => {
    const response = await request.get('/booking/25')
    console.log(await response.json())
    expect(response.status()).toBe(200)
    // await expect(response.status()).toBeTruthy()
    expect(await response.json()).toMatchObject({
        firstname: 'Jane',
        lastname: 'Doe',
        totalprice: 111,
        depositpaid: true,
        bookingdates: { checkin: '2018-01-01', checkout: '2019-01-01' },
        additionalneeds: 'Extra pillows please'
    })
    const body = await response.json()
    expect(await body.firstname).toBe('Jane')
})