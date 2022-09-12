/// <reference types="cypress" />

describe('Casos de teste sobre a rota /usuarios da API Serverest', () => {
  it('Deve retornar todos os usuários cadastrados na Serverest', () => {
    cy.request('/usuarios').then(res => {
      expect(res).to.be.a('object')
      expect(res.body.quantidade).to.be.a('number')
      expect(res.body.quantidade).to.be.greaterThan(0)
    })
  })

  it.only('Não deve postar um novo usuário administrador existente', () => {
    cy.postarUsuarioSemSucesso().then( res => {
      expect(res).to.be.a('object')
      expect(res.body.message).to.be.a('string')
      expect(res.body.message).to.be.equal('Este email já está sendo usado')
    })
  })

  // it.only('Deve validar o comando personalizado', () => {
  //   cy.rest('GET', '/usuarios').then(res => {
  //     expect(res).to.be.a('object')
  //   })
  // })
})
