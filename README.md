# API Automation with Cypress

## Project Hierarchy Overview
```bash
├── cypress
    ├── e2e  # helper function
        ├── getMethod_helper 
        ├── postMethod_helper 
    ├── screenshots  # stores test cases failed screen image
    ├── test_case # contains test steps 
        ├── get.cy.js
        ├── post.cy.js
    ├── mochawesome-report # stores generated reports here
        ├── test-result
├── cypress.config.js  # contains all necessary information about plugins
├── package.json  # stores packages and modules info
```

## Getting Started
In order to clone and run this project please install the necessary tools into your machine. Refer to below prerequisites

## Prerequisites
Ensure the below tools are installed in your machine
- [Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress)
- [Visual Studio Code](https://code.visualstudio.com/download)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [node](https://nodejs.dev/en/learn/how-to-install-nodejs/)

## Setup

#### 1. Clone this repository into you local env
#### 2. Launch this project using Visual Studio Code
#### 3. Launch the in build terminal of visual studio code and run this command
```
npm install
```
- This will install all the neccessary dependencies based on package.json file.

## Execute test suite via terminal
```
npx cypress run --reporter mochawesome
```

### Execute test suite with Cypress UI console

1. Launch Cypress using command 
```
npx cypress open
```
2. Select E2E testing and select chrome/electron as a browser you wants to execute the test and click on start

3. Once you land on specs file page, you may select any of the spec file to execute the runs