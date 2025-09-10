import * as gatewayTool from './gatewayTool' 

export function enterWorkSpace(workSpaceName){
  cy.get(`[data-testid="workspace-link-${workSpaceName}"]`)
    .click()
  cy.get('h3 > .title').should('have.text','Overview') 
}

export function gotoSidebar(sidebar){
  cy.window().then((win) => {
    if(win.innerWidth < 1024) {
      cy.get('.sidebar-menu-toggle')
        .click()
      cy.get(`[data-testid="sidebar-item-${sidebar}"] > .sidebar-item-link`)
        .click()
    } else {
      cy.get(`[data-testid="sidebar-item-${sidebar}"] > .sidebar-item-link`)
        .click()
    }
  });
}

export function uploadCertificates(cert, key, certalt, keyalt, snis, tags){

}

export function uploadCACertificates(cert, certdigest, tags){
  
}

export function addNewGatewayService(config){

  
  // wait untill the xhr request finished
  //cy.intercept('GET', '/repos/kong/kong').as('getServices')
  //cy.wait('@getServices')
  cy.wait(5000)
  // see if the create page empty and enter
  cy.get('.k-table-view.k-table-data')
    .then((data) => {
      if(data.find('.empty-state-content').length > 0) {
        cy.get('[data-testid="empty-state-action"]')
          .click()
      } else {
        cy.get('[data-testid="toolbar-add-gateway-service"]')
        .click()
      }
        })
  // chose service mode
  if(config.serviceMode === 'url'){
    // enter url mode configuration
    cy.get(`[data-testid="gateway-service-${config.serviceMode}-radio-label"]`) 
      .click()
    cy.get('[data-testid="gateway-service-url-input"]')
      .type(config.urlFullUrl) 
  } else{
    // enter protocol mode configuration
    cy.get(`[data-testid="gateway-service-${config.serviceMode}-radio-label"]`) 
      .click()
    // chose protocol
    switch(config.protocolProtocol){
      case "grpc":
      case "grpcs":
      case "tcp":
      case "tls":
      case "tls_passthrough":
      case "udp":
        // select protocol
        cy.get('[data-testid="gateway-service-protocol-select"]')
          .click()
          .get(`[data-testid="select-item-${config.protocolProtocol}"] > .select-item-container > button > .select-item-label`)
          .click()
        // input host
        cy.get('[data-testid="gateway-service-host-input"]')
          .type(config.protocolHost)
        // input port
        cy.get('[data-testid="gateway-service-port-input"]')
          .type('{selectall}')
          .type(config.protocolPort)
        break

      case "http":
      case "https":
      case "ws":
      case "wss":
        // select protocol
        cy.get('[data-testid="gateway-service-protocol-select"]')
          .click()
          .get(`[data-testid="select-item-${config.protocolProtocol}"] > .select-item-container > button > .select-item-label`)
          .click()
        // input host
        cy.get('[data-testid="gateway-service-host-input"]')
          .type(config.protocolHost)
        // input path
        cy.get('[data-testid="gateway-service-path-input"]')
          .type(config.protocolPath)
        // input port
        cy.get('[data-testid="gateway-service-port-input"]')
          .type('{selectall}')
          .type(config.protocolPort)
        break
    }
  }

  // advanced configuration
  // set retries, connection timeout, write timeout, read timeout
  function set4(){
    cy.get('[data-testid="gateway-service-retries-input"]')
      .type('{selectall}')
      .type(config.retries)
    cy.get('[data-testid="gateway-service-connTimeout-input"]')
      .type('{selectall}')
      .type(config.connectionTimeout)
    cy.get('[data-testid="gateway-service-writeTimeout-input"]')
      .type('{selectall}')
      .type(config.writeTimeout)
    cy.get('[data-testid="gateway-service-readTimeout-input"]')
      .type('{selectall}')
      .type(config.readTimeout)
  }
  // set tls verify
  function setTlsVerify(){
    if(config.tlsVerifyFlag){
      cy.get('[data-testid="gateway-service-tls-verify-checkbox"]')
        .check({ force: true })
      cy.get(`[data-testid="gateway-service-tls-verify-${config.tlsVerify}-option"]`)
        .check()
    }
  }
  // input advanced configuration
  if(config.advancedCofigFlag){
    // open advanced configuration page
    cy.get('[data-testid="advanced-fields-collapse"] > .collapse-heading > .collapse-trigger > [data-testid="collapse-trigger-content"] > [data-testid="collapse-trigger-label"]')
      .click()
    // input fullurl advanced configuration
    if(config.serviceMode === 'url'){
      set4()
      setTlsVerify()
    } else{
    // input protocol advanced configuration
      switch(config.protocolProtocol){ 
        case "grpc":
        case "grpcs":
        case "tcp":
        case "tls_passthrough":  
        case "udp":
        case "http":
        case "ws":
          set4()
          break
        case "wss":
          set4()
          // cy.get('[data-testid="gateway-service-clientCert-input"]')
            // .type('{selectall}')
            // .type(config.clientCertificate)
          setTlsVerify()
          break
        case "tls":
        case "https":
          set4()
          // cy.get('[data-testid="gateway-service-clientCert-input"]')
          //   .type('{selectall}')
          //   .type(config.clientCertificate)
          // cy.get('[data-testid="gateway-service-ca-certs-input"]')
          //   .type('{selectall}')
          //   .type(config.caCertificates)
          setTlsVerify()
          break
      }
    }
  }

  //set general information
  // set name
  if(config.name !== ""){
    cy.get('[data-testid="gateway-service-name-input"]')
      .type('{selectall}')
      .type(config.name)
  }
  // set tag
  if(config.tagFlag){
  cy.get('[data-testid="tags-collapse"] > .collapse-heading > .collapse-trigger > [data-testid="collapse-trigger-content"] > [data-testid="collapse-trigger-label"]')
    .click()
  cy.get('[data-testid="gateway-service-tags-input"]')
    .type(config.tag)
  }
  // save
  // cy.get('[data-testid="service-create-form-view-configuration"]')
  //cy.get('[data-testid="service-create-form-cancel"]')
  cy.get('[data-testid="service-create-form-submit"]')
    .click()

  // assertion
  function checkConfig(key, value){
      cy.get(`[data-testid="${key}-plain-text"] > .attrs-data-text`)
        .should('have.text', value)
  }
  
  function checkAdnvancedCustomise(...args) {
      args.forEach(arg => {
          switch (arg) {
              case 'retries':
                  // check retries
                  checkConfig('retries', config.retries)
                  break
              case 'connectTimeout':
                  // check connect_timeout
                  checkConfig('connect_timeout', config.connectionTimeout)
                  break
              case 'writeTimeout':
                  // check write_timeout
                  checkConfig('write_timeout', config.writeTimeout)
                  break
              case 'readTimeout':
                  // check read_timeout
                  checkConfig('read_timeout', config.readTimeout)
                  break
              case 'clientCertificate':
                  // check clientCertificate
                  cy.get('[data-testid="client_certificate-property-value"]')
                    .should('have.text', config.clientCertificate)
                  break
              case 'caCertificates':
                  // check caCertificates
                  for (let i = 0; i < config.caCertificates.length; i++) {
                      cy.get(`[data-testid="ca_certificates-badge-tag-${i}"] > .k-popover > .popover-trigger-wrapper > .badge-content > .badge-content-wrapper`)
                        .should('have.text', config.caCertificates[i])
                  }
                  break
              case 'tlsVerify':
                  // check tlsVerify
                  if(config.tlsVerifyFlag) {
                      if (config.tlsVerify === 'true'){
                          cy.get('[data-testid="tls_verify-property-value"]')
                            .should('have.text', 'On')
                      } else {
                          cy.get('[data-testid="tls_verify-property-value"]')
                            .should('have.text', 'Off')
                      }
                  } else{
                      cy.get('[data-testid="tls_verify-property-value"]')
                        .should('have.text', config.tlsVerifyDefault)
                  }
                  break
          }
      })
  }
  
  function checkAdnvancedDefault(){
      // check retries
      checkConfig('retries', config.retriesDefault)
      // check connect_timeout
      checkConfig('connect_timeout', config.connectionTimeoutDefault)
      // check write_timeout
      checkConfig('write_timeout', config.writeTimeoutDefault)
      // check read_timeout
      checkConfig('read_timeout', config.readTimeoutDefault)
      // check clientCertificate
      cy.get('[data-testid="client_certificate-property-value"]')
        .should('have.text', config.clientCertificateDefault)
      // check caCertificates
      cy.get('[data-testid="ca_certificates-no-value"]')
        .should('have.text', config.caCertificatesDefault)
      // check tlsVerify
      cy.get('[data-testid="tls_verify-property-value"]')
        .should('have.text', config.tlsVerifyDefault)
  }

  function checkFullUrlUrl() {
      // analyze url
      const url = new URL(config.urlFullUrl)
      // check port
      checkConfig('port', url.port)
      // check host
      checkConfig('host', url.hostname)
      // check protocol
      checkConfig('protocol', url.protocol.replace(':', ''))
      // check path
      if (url.pathname === "/") {
          if (config.urlFullUrl.endsWith("/")){
              checkConfig('path', url.pathname)
          } else {
              cy.get('[data-testid="path-no-value"]')
                .should('have.value', '')
          }
      } else {
          checkConfig('path', url.pathname)
      }
  }

  function checkNameStatusTags() {
      // check name
      if(config.name != ''){
          checkConfig('name', config.name)
      }
      // check status
      cy.get('[data-testid="enabled-badge-status"] > .badge-content > .badge-content-wrapper')
        .should('have.text', 'Enabled')
      // check tags
      if(config.tagFlag){
          cy.get('[data-testid="tags-badge-tag-0"] > .badge-content > .badge-content-wrapper')
            .should('have.text', config.tag)
      } else{
          cy.get('[data-testid="tags-no-value"]')
            .should('have.text', config.tagDefault)
      }
  }

  function checkProtocolUrl(...args) {
      args.forEach(arg => {
          switch (arg) {
              case 'port':
                  checkConfig('port', config.protocolPort)
                  break
              case 'host':
                  checkConfig('host', config.protocolHost)
                  break
              case 'protocol':
                  checkConfig('protocol',config.protocolProtocol)
                  break
              case 'path':
                  checkConfig('path',config.protocolPath)
                  break
              case 'pathDefault':
                  cy.get('[data-testid="path-no-value"]')
                    .should('have.text', config.protocolPathDefault)
                  break
          }
      })
  }

  if(config.serviceMode === 'url'){
      
      checkFullUrlUrl()
      checkNameStatusTags()
      if(config.advancedCofigFlag) {
          console.log('111111111111111')
          checkAdnvancedCustomise('retries', 'connectTimeout', 'writeTimeout', 'readTimeout', 'clientCertificate', 'caCertificates', 'tlsVerify')
      } else {
          checkAdnvancedDefault()
      }
  } else {
      checkNameStatusTags()
      switch(config.protocolProtocol){ 
          case "grpc":
          case "grpcs":
          case "tcp":
          case "tls_passthrough":  
          case "udp":
              checkProtocolUrl('port', 'host', 'protocol', 'pathDefault')
              if(config.advancedCofigFlag) {
                  checkAdnvancedCustomise('retries', 'connectTimeout', 'writeTimeout', 'readTimeout')
              } else {
                  checkAdnvancedDefault()
              }
              break
          case "http":
          case "ws":
              checkProtocolUrl('port', 'host', 'protocol', 'path')
              if(config.advancedCofigFlag) {
                  checkAdnvancedCustomise('retries', 'connectTimeout', 'writeTimeout', 'readTimeout')
              } else {
                  checkAdnvancedDefault()
              }
              break
          case "wss":
              checkProtocolUrl('port', 'host', 'protocol', 'path')
              if(config.advancedCofigFlag) {
                  //checkAdnvancedCustomise('retries', 'connectTimeout', 'writeTimeout', 'readTimeout', 'clientCertificate', 'tlsVerify')
                  checkAdnvancedCustomise('retries', 'connectTimeout', 'writeTimeout', 'readTimeout', 'tlsVerify')
              } else {
                  checkAdnvancedDefault()
              }
              break
          case "tls":
              checkProtocolUrl('port', 'host', 'protocol', 'pathDefault')
              if(config.advancedCofigFlag) {
                  //checkAdnvancedCustomise('retries', 'connectTimeout', 'writeTimeout', 'readTimeout', 'clientCertificate', 'caCertificates', 'tlsVerify')
                  checkAdnvancedCustomise('retries', 'connectTimeout', 'writeTimeout', 'readTimeout', 'tlsVerify')
              } else {
                  checkAdnvancedDefault()
              }
              break
          case "https":
              checkProtocolUrl('port', 'host', 'protocol', 'path')
              if(config.advancedCofigFlag) {
                  //checkAdnvancedCustomise('retries', 'connectTimeout', 'writeTimeout', 'readTimeout', 'clientCertificate', 'caCertificates', 'tlsVerify')
                  checkAdnvancedCustomise('retries', 'connectTimeout', 'writeTimeout', 'readTimeout', 'tlsVerify')
                  
              } else {
                  checkAdnvancedDefault()
              }
              break
      }
  }
        
}

export function enterService(srvName) {
  cy.get(`[data-testid="${srvName}"] > [data-testid="name"]`)
    .click()
  cy.get('[data-testid="name-plain-text"] > .attrs-data-text')
    .should('have.text', srvName)
}

export function gatewayServiceAction (action) {
    cy.get('[data-testid="header-actions"]')
      .click()
  switch (action) {
    case 'addRoute':
      cy.get(':nth-child(2) > [data-testid="entity-button"]')
        .click()
      break
  }
}

export function createEntitles (config) {
  // enter name
  cy.get('[data-testid="route-form-name"]')
    .type(config.name)
    .should('have.value', config.name)
  // enter tags
  cy.get('[data-testid="route-form-tags"]')
    .type(config.tag)
    .should('have.value', config.tag)
  // chose route mode
  cy.get(`[data-testid="route-form-config-type-${config.routeMode}-label"]`)
    .click()
    .get(`[data-testid="route-form-config-type-${config.routeMode}"]`)
    .should('be.checked')
  // enter path
  cy.get('[data-testid="route-form-paths-input-1"]')
    .type(config.path)
    .should('have.value', config.path)
  // set stripPath
  if(config.stripPath) {
    cy.get('[data-testid="route-form-strip-path"]')
      .check()
      .should('be.checked')
  } else {
    cy.get('[data-testid="route-form-strip-path"]')
      .uncheck()
      .should('not.be.checked')
  }
  // chose method
  cy.get('.multiselect-icons-container')
    .click()
    for (let method of config.method){
      cy.get(`[data-testid="multiselect-item-${method}"] > .multiselect-item-container > button > .multiselect-item-label`)
        .click()
    }
    cy.get('body').type('{esc}')
    //.should////////////////////////////////////////////////////////////////////////////
  // enter host
  cy.get('[data-testid="route-form-hosts-input-1"]')
    .type(config.host)
    .should('have.value', config.host)
  // save
  // cy.get('[data-testid="route-create-form-view-configuration"]')
  // cy.get('[data-testid="route-create-form-cancel"]')
  cy.get('[data-testid="route-create-form-submit"]')
    .click()
  // assertion
  function checkRoutes(testid, ...args) {
    args.forEach((arg) => {
      switch(arg) {
        case 'name':
          cy.get(`[data-testid="${testid}"] > [data-testid="name"] > .cell-wrapper`)
            .should('have.text', config.name)
          break
        case 'protocol':
          cy.get(`[data-testid="${testid}"] > [data-testid="protocols"] > .cell-wrapper > .content-wrapper > .k-truncate`)
            .should('have.text', config.protocolDefault)
          break
        case 'host':
          cy.get(`[data-testid="${testid}"] > [data-testid="hosts"] > .cell-wrapper > .content-wrapper > .k-truncate`)
            .should('have.text', config.host)
          break
        case 'method':
          let fullmethod = ''
          let flag = -1
          for (let method of config.method) {
            fullmethod = fullmethod + method
            flag += 1
          }
          fullmethod = flag + fullmethod
          cy.get(`[data-testid="${testid}"] > [data-testid="methods"] > .cell-wrapper > .content-wrapper > .k-truncate`)
            .should('have.text', fullmethod)
          break
        case 'path':
          cy.get(`[data-testid="${testid}"] > [data-testid="paths"] > .cell-wrapper > .content-wrapper > .k-truncate`)
            .should('have.text', config.path)
          break
        case 'tag':
          cy.get(`[data-testid="${testid}"] > [data-testid="tags"] > .cell-wrapper > .content-wrapper > .k-truncate`)
            .should('have.text', config.tag)
          break
      }
    })
  }

  checkRoutes(config.name, 'name', 'protocol', 'host', 'method', 'path', 'tag')
}




  
