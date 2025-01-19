/**
 * This test suite consists for several test case such as 
 */

const postMethod_helper = require('../e2e/postMethod_helper.cy')

describe('Test POST payload request - POST /api/journeys', () => {

    it('Should create a journey with all valid data', () => {

        postMethod_helper.addPayloadSuccessfully("2025-16-23T13:24:35.703Z", "700", "234", "Jakson", "+9382718247475")
    })

    it('Reject if departure date is in the past', () => {

        postMethod_helper.invalidCases("2018-01-23T13:24:35.703Z", "232", "665", "Damon", "+4717283748572")
    })

    it('Reject negative latitude and longitude', () => {

        postMethod_helper.invalidCases("2025-16-23T17:12:15.703Z", "1010", "-2000", "Dave", "+6518274831924")
    })

    it('Check for latitude and longitude floating numbers to round off', () => {

        postMethod_helper.floatingNumbers("2025-16-23T13:24:35.703Z", "51.50000000000001", "-0.150000000000001", "Guy", "+601283746284")
    })

    it('Should handle special characters in name or phone number', () => {

        postMethod_helper.invalidCases("2025-16-23T13:24:35.703Z", "100", "-200", "Kelly@Jun!? ", "+447594855516#$")
    })

    it('Detect duplicate records and reject any new entry', () => {

        //same phone number with different departure date, name, latitude, longitude
        postMethod_helper.addPayloadSuccessfully("2025-05-22T13:24:35.703Z", "100", "-200", "Ciro", "+447594855516")
        postMethod_helper.invalidCases("2025-06-23T15:34:35.703Z", "160", "-340", "Klevin", "++44 7594 855513")
    })

    it('Should handle rate limiting', () => {

        postMethod_helper.rateLimitHandling("2025-16-23T13:24:35.703Z", "100", "-200", "April ", "+4471639564728")
    })

    it('Should not generate a new ID for same set of input data', () => {

        postMethod_helper.addPayloadSuccessfully("2025-16-23T13:24:35.703Z", "100", "-200", "KellyJun", "+447594855516")
        postMethod_helper.invalidCases("2025-16-23T13:24:35.703Z", "100", "-200", "KellyJun", "+447594855516")
    })

    it('Should check phone number length', () => {

        postMethod_helper.invalidCases("2025-16-23T13:24:35.703Z", "100", "-200", "May ", "+447594")
    })

    it('Check if surname is not inputted and leave it empty data should still be created', () => {

        postMethod_helper.interceptRequest("2025-16-23T13:24:35.703Z", "100", "-200", "Jun", "", "+447594")
    })
})