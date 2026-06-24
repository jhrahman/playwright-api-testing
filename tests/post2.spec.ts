import { test, expect } from "@playwright/test";

test.describe.serial('CREATE GET DELETE GET', () => {



    test("Create Booking", async ({ request }) => {
        const bookingPayload = {
            firstname: "Jahidur",
            lastname: "Rahman",
            totalprice: 500,
            depositpaid: true,
            bookingdates: {
                checkin: "2018-01-01",
                checkout: "2019-01-01",
            },
            additionalneeds: "Gym Membership",
        };
        const response = await request.post("/booking", {
            data: bookingPayload,
        });

        const body = await response.json()
        console.log(body)
        

        //verify post request response
        expect(body).toHaveProperty('bookingid') // chema/structure check
        expect(body).toHaveProperty('booking') // chema/structure check
        expect(response.status()).toBe(200); //validate 200OK status
        expect(body.bookingid).toBeGreaterThan(0); //validate booking id is greater than 0
        expect(typeof body.bookingid).toBe("number"); // validate booking id type is number
        expect(body.booking).toMatchObject(bookingPayload) //validate the payload


    });

    

})
