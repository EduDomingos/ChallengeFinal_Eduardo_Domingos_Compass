/// <reference types="cypress" />

describe('Casos de teste sobre a rota /usuarios da API Serverest', () => {

it.only('Não deve cadastrar usuário adm duplicado', () => {
  /*
  cy.request({
      method: 'POST',
      url: '/usuarios',
      failOnStatusCode: false, //caso contrário os testes param qdo o retorno não é 200
      body: {                             //por algum motivo está retornando status 200 e realizando o POST  <<<<
          "nome": "Stephen Lynch",    
          "email": "Cortez80@yahoo.com",
          "password": "FFfGeIM80cpNNQt",
          "administrador": "false"
      }
  }).then(res => {
      expect(res).to.be.a('object');
      cy.log(res.body)
      //expect(res.body.message).to.be.a('string');
      //expect(res.body.message).to.be.eq('Este email já está sendo usado')
  }) */

  cy.postarUsuarioDuplicado().then(res => {
      expect(res).to.be.a('object');
      expect(res.body.message).to.be.a('string')
      expect(res.body.message).to.be.equal('Este email já está sendo usado')

      cy.log(JSON.stringify(res))
  })
})

})