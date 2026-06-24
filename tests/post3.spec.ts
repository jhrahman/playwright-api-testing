import { test, expect } from '@playwright/test'

test.describe.skip('CREATE, GET and DELETE', () => {

    const cartPayload = {
        id: "1e5bde96-66fd-cde7-c4ad-734375183922",
        cookie: "user=a9691251-9a8b-fb80-9f1e-e940e7875b76",
        flag: false,
        prod_id: 5
    }

    test('CREATE', async ({ request }) => {

        const response = await request.post('https://api.demoblaze.com/addtocart', {
            data: cartPayload
        })
        const body = await response.text()
        //status validation
        expect(response.status()).toBe(200)

    })

    test('GET', async ({ request }) => {
        const response = await request.post('https://api.demoblaze.com/viewcart', {
            data: {
                cookie: cartPayload.cookie,
                flag: false
            }
        })
        const body = await response.text()
        console.log(body)

        // status validation
        expect(response.status()).toBe(200)
        expect(body).toMatchObject(cartPayload)
    })
    test('DELETE', async ({ request }) => {
        const response = await request.post('https://api.demoblaze.com/deleteitem', {
            data: {
                id:"1e5bde96-66fd-cde7-c4ad-734375183922"
            }
        })
        const body = await response.text()
        // status validation
        expect(response.status()).toBe(200)
        // delete validation
        expect(body).toBe('')
    })

})