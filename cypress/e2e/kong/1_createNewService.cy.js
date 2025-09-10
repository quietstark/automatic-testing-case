import * as gateway from './gatewayActions' 

describe("createNewService", () => {

    // input the parameters
    let mainPage
    let config
    before("load parameters", () => {         
        cy.fixture('mainPage.json').then((data) => {
            mainPage = data
        })
        cy.fixture('createNewService.cy.json').then((data) => {
            config = data
        })
    })

    beforeEach("visit mainPage", () => {         
        // main page customised by fixtures/mainPage.json
        cy.visit(`${mainPage.scheme}://${mainPage.host}:${mainPage.port}`)  
    })

    it('checkWorkSpaces', () => {
        cy.get('.last-row > :nth-child(1)')
          .should('exist')      
          .and('be.visible')
    })

    it('createNewGatewayService', () => {
        gateway.enterWorkSpace('default')
        gateway.gotoSidebar('gateway-services')
        // gateway.uploadCertificates('gateway-services')
        // gateway.uploadCACertificates('gateway-services')
        gateway.addNewGatewayService(config)
    })

    
})