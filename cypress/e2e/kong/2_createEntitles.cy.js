import * as gateway from './gatewayActions' 

describe("createEntitles", () => {

    // input the parameters
    let mainPage
    let config
    before("load parameters", () => {         
        cy.fixture('mainPage.json').then((data) => {
            mainPage = data
        })
        cy.fixture('createEntitles.cy.json').then((data) => {
            config = data
        })
    })

    beforeEach("visit mainPage", () => {       
        //cy.viewport(1000, 660)  
        // main page customised by fixtures/mainPage.json
        cy.visit(`${mainPage.scheme}://${mainPage.host}:${mainPage.port}`)  
    })

    it('checkWorkSpaces', () => {
        cy.get('.last-row > :nth-child(1)')
          .should('exist')      
          .and('be.visible')
    })

    it('creatEntitles', () => {
        gateway.enterWorkSpace('default')
        gateway.gotoSidebar('gateway-services')
        gateway.enterService(config.srvName)
        gateway.gatewayServiceAction(config.gatewayServiceAction)
        gateway.createEntitles(config)
    })



    
})