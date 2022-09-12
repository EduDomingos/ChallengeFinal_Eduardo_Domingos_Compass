// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// -- This is a parent command --
Cypress.Commands.add('postarUsuarioSemSucesso', () => {
  return cy.request({
    method: 'POST',
    url: '/usuarios',
    failOnStatusCode: false,
    body: {
      "nome": "Teagan Wunsch",
      "email": "automation-postUserKenna.Bashirian@gmail.com",
      "password": "1234",
      "administrador": "true",
    }
  })
})

// Cypress.Commands.add( 'rest', (method = 'GET', url = '/', body = null, failOnStatusCode = false) => {
//     return cy.request({
//       method: method,
//       url: url,
//       body: body,
//       failOnStatusCode: failOnStatusCode
//     })
//   }
// )
