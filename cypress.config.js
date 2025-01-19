const { defineConfig } = require("cypress");

module.exports = defineConfig({

  e2e: {
    specPattern: 'cypress/test_case/**.cy.js',
    baseUrl: 'https://qa-interview-test.qa.splytech.dev/api',
    reporter: 'mochawesome',
    reporterOptions: {
      charts: true, //To display small circular charts regarding test results
      json: false, //Generate JSON file to create custom reports
      reportsDir: 'reports', //Customize the directory in which reports are saved
      reportFilename: 'test-result', //Customize the report file name
      overwrite: false //Generate new report file or overwrite the a single file
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      //require('cypress-mochawesome-reporter/plugin')(on)
    },
  },
});