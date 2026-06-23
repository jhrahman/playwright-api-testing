import { test, request } from '@playwright/test'


let reqContext2: any
test.beforeAll('GET Req for All', async () => {
    reqContext2 = await request.newContext({
        baseURL: "https://restful-booker.herokuapp.com",
        extraHTTPHeaders: {
            Accept: "application/json"
        }
    })
})

test.skip('GET Request 1', async ({ request }) => {
    const resp1 = await request.get('https://restful-booker.herokuapp.com/booking')
    console.log(await resp1.json())
})

test.skip('GET Request 2', async () => {
    const reqContext = await request.newContext({
        baseURL: "https://restful-booker.herokuapp.com"
    })
    const resp2 = reqContext.get("/booking")
    console.log(await (await resp2).json())

})

test.skip('GET Call 3', async ({ request }) => {
    const req3 = await reqContext2.get("/booking")
    console.log(await req3.json())
})

test('GET Call 4', async ({ request }) => {
    const req3 = await request.get("/booking")
    console.log(await req3.json())
})