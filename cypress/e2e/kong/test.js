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
        //cy.visit(`${mainPage.scheme}://${mainPage.host}:${mainPage.port}`)
        cy.visit('http://192.168.56.135:8002/default/services')
    })

    it('creatEntitles', () => {
        //cy.get('.k-table-view.k-table-data')
        cy.intercept('GET', '/repos/kong/kong').as('getServices')
        cy.wait('@getServices')
        cy.get('.k-card')
          .then((data) => {
            console.log(data.find('.empty-state-content').length)
            //console.log(data.find('.k-skeleton.not-spinner'))
        })
    })
})