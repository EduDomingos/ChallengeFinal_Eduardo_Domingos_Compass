const Ajv = require('ajv')
const { default: Factory } = require('../fixtures/factory')
const ajv = new Ajv({ allErrors: true, verbose: true, strict: false })
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

Cypress.Commands.add('contractValidation', (res, schema, status) => {
    cy.log('Validando contrato para ' + schema + ' com status ' + status)
    cy.fixture(`schemas/${schema}/${status}.json`).then(schema => {
        const validate = ajv.compile(schema)
        const valid = validate(res.body)

        if (!valid) {
            var errors = ''
            for (let each in validate.errors) {
                let err = validate.errors[each]
                errors += `\n ${err.instancePath} ${
                    err.message
                }, but received ${typeof err.data}`
            }
            throw new Error(
                'Erros encontrados na validação de contrato, por favor verifique: ' +
                    errors
            )
        }
        return true
    })
})

Cypress.Commands.add('postarUsuarioSemSucesso', () => {
    return cy.request({
        method: 'POST',
        url: '/usuarios',
        failOnStatusCode: false,
        body: {
            nome: 'Teagan Wunsch',
            email: 'automation-postUserKenna.Bashirian@gmail.com',
            password: '1234',
            administrador: 'true'
        }
    })
})

Cypress.Commands.add(
    'rest',
    (url = '/', method = 'GET', body = null, failOnStatusCode = false) => {
        return cy.request({
            method: method,
            url: url,
            failOnStatusCode: failOnStatusCode,
            body: body
        })
    }
)

Cypress.Commands.add('logar', (email, senha) => {
    cy.request({
        method: 'POST',
        url: '/login',
        failOnStatusCode: false,
        body: {
            email: email,
            password: senha
        }
    })
})

Cypress.Commands.add('buscarUsuarioParaLogin', () => {
    const inteiro = Factory.gerarInteiroAleatorio()
    cy.rest('/usuarios').then(res => {
        expect(res.body).to.haveOwnProperty('usuarios')

        return {
            email: res.body.usuarios[inteiro].email,
            senha: res.body.usuarios[inteiro].password
        }
    })
})
