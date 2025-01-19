class postHelper {

    payloadBody(date, latitude, longitude, name, phone_number) {

        return {

            "departure_date": date,
            "pickup": {
                "latitude": latitude,
                "longitude": longitude
            },
            "passenger": {
                "name": name,
                //"surname": surname,
                "phone_number": phone_number
            }
        }
    }

    async addPayloadSuccessfully(date, latitude, longitude, name, phone_number) {

        cy.request({

            method: 'POST',
            url: '/journeys',
            body: this.payloadBody(date, latitude, longitude, name, phone_number),
            failOnStatusCode: false,

        }).as('details')

        cy.get('@details').its('status').should('eq', 200)
        cy.get('@details').then((response) => {
            let userID = response.body._id
            cy.log(userID)
        })
    }

    async invalidCases(date, latitude, longitude, name, phone_number) {

        cy.request({

            method: 'POST',
            url: '/journeys',
            body: this.payloadBody(date, latitude, longitude, name, phone_number),
            failOnStatusCode: false,
        }).then((response) => {

            let userID = response.body._id
            cy.log(userID)
            expect(response.status).to.eq(400) //Assuming 400 Bad Request is returned
        })
    }

    async rateLimitHandling(date, longitude, laltitude, name, phoneNumber) {

        const maxRequests = 10
        const allowedRequests = 5

        for (let i = 0; i < maxRequests; i++) {
            cy.request({

                method: 'POST',
                url: '/journeys',
                body: this.payloadBody(date, longitude, laltitude, name, phoneNumber),
                failOnStatusCode: false,
            }).then((response) => {

                if (i < allowedRequests) {

                    expect(response.status).to.eq(200) //Success for the first few
                } else {

                    expect(response.status).to.eq(429) //429 Too Many Requests after limit
                }
            })
        }
    }

    async floatingNumbers(date, longitude, laltitude, phoneNumber) {

        cy.request({

            method: 'POST',
            url: '/journeys',
            body: this.payloadBody(date, longitude, laltitude, phoneNumber),
            failOnStatusCode: false,
        }).then((response) => {

            expect(response.status).to.eq(200);
            expect(response.body.pickup.latitude).to.eq(51.5) //Expect proper rounding
            expect(response.body.pickup.longitude).to.eq(-0.15)
        })
    }

    async interceptRequest(date, latitude, longitude, name, surname, phone_number) {

        cy.intercept('POST', '/journeys', (req) => {
            req.body = {
                surname: surname,
            }
        }).as('postJourneys')

        cy.request({

            method: 'POST',
            url: '/journeys',
            body: this.payloadBody(date, latitude, longitude, name, phone_number),
            failOnStatusCode: false,
        }).then((response) => {

            expect(response.status).to.eq(400) //Assuming 400 Bad Request is returned
        })
    }
}

module.exports = new postHelper()