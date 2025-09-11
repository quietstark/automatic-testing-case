# automatic-testing-case
For KONG gateway

### 1. prepare the environment
node.js version: v22.19.0  
npm version: 10.9.3

### 2. set the config
#### change the fixture/mainPage.json to the KONG Gateway address
```
{
  "scheme": "http",
  "host": "192.168.56.135",
  "port": "8002"
}
```
#### customize the fixture/createNewService.cy.json, fixture/createEntitles.cy.json to create in different parameters

### 3. run
#### **run in local**
```
npx cypress open
```
#### **run in GitHub Actions**
go to repository->Actions

### 4. test report
#### **run in local**
```
# run the test and report
npx cypress run --reporter mochawesome

# run the test and report with screenshot and video
npx cypress run --reporter cypress-mochawesome-reporter
```
#### **run in GitHub Actions**
go to repository->Actions