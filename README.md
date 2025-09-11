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
  
createNewService.cy.js
```
{
  "serviceMode": "protocol",
  "urlFullUrl": "https://192.168.80.128:12345/",
  "protocolProtocol": "https",
  "protocolHost": "192.168.80.128",
  "protocolPath": "/1/2/",
  "protocolPort": 12345,
  "protocolPathDefault": " – ",

  "advancedCofigFlag": true,
  "retries": 10,
  "connectionTimeout": 10,
  "writeTimeout": 10,
  "readTimeout": 10,
  "clientCertificate": "2669f7cf-261d-4d4d-a2b8-f8f87a8e2071",
  "caCertificates": ["51b1ef00-48ae-4af3-8931-a74859e59e60", "9c400c46-ab79-4774-9207-67a0b089406f"],
  "tlsVerifyFlag": true,
  "tlsVerify": "true",
  "retriesDefault": 5,
  "connectionTimeoutDefault": 60000,
  "writeTimeoutDefault": 60000,
  "readTimeoutDefault": 60000,
  "clientCertificateDefault": "–",
  "caCertificatesDefault": " – ",
  "tlsVerifyDefault": "Use default system setting",

  "name": "1",
  "tagFlag": true,
  "tag": "test-tag",
  "tagDefault": " – "
}
```  
  
createEntitles.cy.json  
```
{
  "srvName": "1",
  "gatewayServiceAction": "addRoute",
  "name": "11",
  "tag": "11",
  "routeMode": "basic",
  "path": "/test",
  "method": ["GET", "PUT", "POST", "OPTIONS"],
  "stripPath": false,
  "host": "quiet.com",

  "nameDefault": "",
  "protocolDefault": "1httphttps",
  "hostDefault": "",
  "methodDefault": "",
  "pathDefault": "",
  "tagDefault": ""
}
```

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