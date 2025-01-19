const postMethod_helper = require('../e2e/postMethod_helper.cy')

class getHelper {

    payloadBody(date, latitude, longitude, name, phone_number) {

        return {

            "departure_date": date,
            "pickup": {
                "latitude": latitude,
                "longitude": longitude
            },
            "passenger": {
                "name": name,
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
            cy.log(`UserID: ${userID}`)
            cy.wrap(userID).as('userID')
        })
    }

    async setUserID() {

        cy.wait(1000)
        cy.get('@userID').then((userID) => {
            cy.log(`UserID: ${userID}`)
            cy.request({

                method: 'GET',
                url: `/journeys/${userID}`,
                failOnStatusCode: false,
            }).then((response) => {

                expect(response.status).to.eq(200)
                cy.wrap(response.body.id).as('newJourneyId')
            })
        })
    }

    async invalidUserID(userID) {

        cy.wait(1000)
        cy.request({

            method: 'GET',
            url: `/journeys/${userID}`,
            failOnStatusCode: false,
        }).then((response) => {

            expect(response.status).to.eq(400) //Assuming 400 Bad Request is returned
        })
    }

    async sqlInjection() {

        const sqlInjection = "1' OR '1'='1"
        cy.wait(1000)
        cy.request({

            method: 'GET',
            url: `/journeys/${sqlInjection}`,
            failOnStatusCode: false,
        }).then((response) => {

            expect(response.status).to.satisfy((status) => [400, 404].includes(status))
        })
    }

    async securityTest() {

        const maliciousPayloads = [
            "<script>alert('XSS')</script>",
            "\"><img src=x onerror=alert(1)>",
            "\"><svg/onload=alert('XSS')>",
            "javascript:alert('XSS')"
        ]

        maliciousPayloads.forEach((maliciousInput) => {

            cy.request({

                method: 'GET',
                url: `/journeys/${maliciousInput}`,
                failOnStatusCode: false,
            }).then((response) => {

                expect(response.status).to.not.eq(200) //Expect the server to sanitize the input and prevent execution
            })
        })
    }

    async validatePOSTandGETResult(date, latitude, longitude, name, phone_number) {

        //POST Request
        cy.request({

            method: 'POST',
            url: '/journeys',
            body: this.payloadBody(date, latitude, longitude, name, phone_number),
            failOnStatusCode: false,
        }).then((postResponse) => {

            expect(postResponse.status).to.eq(200)
            cy.log('Full POST Response:', JSON.stringify(postResponse))

            const postResponseBody = postResponse.body
            const journeyId = postResponse.body.id || postResponse.body._id || postResponse.body.journeyId
            cy.log(`Extracted Journey ID: ${journeyId}`)
            expect(journeyId).to.exist

            //GET Request
            cy.request({

                method: 'GET',
                url: `/journeys/${journeyId}`,

            }).then((getResponse) => {

                expect(getResponse.status).to.eq(200)

                const getResponseBody = getResponse.body
                cy.log('GET Response:', getResponseBody)

                //Compare json fields
                const fieldsToValidate = [
                    'departure_date',
                    'pickup.latitude',
                    'pickup.longitude',
                    'passenger.name',
                    'passenger.phone_number',
                ]

                fieldsToValidate.forEach((field) => {

                    const postValue = Cypress._.get(postResponseBody, field, null)
                    const getValue = Cypress._.get(getResponseBody, field, null)
                    cy.log(`Validating field: ${field}`)

                    if (postValue === null || getValue === null) {

                        cy.log(`Field missing or null: ${field}`)
                    } else {

                        expect(getValue, `Mismatch in field: ${field}`).to.eq(postValue)
                    }
                })
            })
        })
    }
}

module.exports = new getHelper()