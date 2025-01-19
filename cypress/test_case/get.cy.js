/**
 * This test suite consists for several test case such as 
 */

const getMethod_helper = require('../e2e/getMethod_helper.cy')

describe('Test GET payload request - GET /api/journeys/:journey_id', () => {

    /*beforeEach(() => {

        getMethod_helper.addPayloadSuccessfully("2025-16-23T13:24:35.703Z", "700", "234", "Houston", "+9382718247475")
    })*/

    it('Set userID and retrieve information', () => {

        getMethod_helper.addPayloadSuccessfully("2025-16-23T13:24:35.703Z", "700", "234", "Houston", "+9382718247475")
        getMethod_helper.setUserID()
    })

    it('Invalid userID should fail and return error', () => {

        getMethod_helper.invalidUserID()
    })

    it('Should handle SQL injection attempts', () => {

        getMethod_helper.addPayloadSuccessfully("2025-16-23T13:24:35.703Z", "700", "234", "Houston", "+9382718247475")
        getMethod_helper.setUserID()
        getMethod_helper.sqlInjection()
    })

    it('Security Test', () => {

        getMethod_helper.securityTest()
    })

    it('Validate POST and GET response', () => {

        getMethod_helper.validatePOSTandGETResult("2025-16-23T13:24:35.703Z", "700", "234", "Houston", "+9382718247475")
    })
})