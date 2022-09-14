/// <reference types="cypress" />

import Serverest from '../../services/serverest.service'
import ValidaServerest from '../../services/validaServerest.service'

describe('Casos de teste sobre a rota /usuarios da API Serverest', () => {

  it.only('Deve retornar todos os usuários cadastrados na Serverest', () => {
    Serverest.buscarUsuarios().then( res => {
      ValidaServerest.validarBuscaDeUsuarios(res)
    })
  })
  
  it('Não deve postar um novo usuário administrador existente', () => {
    cy.postarUsuarioSemSucesso().then( res => {
      expect(res).to.be.a('object')
      expect(res.body.message).to.be.a('string')
      expect(res.body.message).to.be.equal('Este email já está sendo usado')
    })
  })

  it('Deve validar o comando personalizado', () => {
    cy.rest().then( res => {
      expect(res).to.be.a('object')
      cy.log(JSON.stringify(res))
    })
  })

  it('Deve realizar login com sucesso', () => {
    cy.buscarUsuarioParaLogin().then( usuario => {
      cy.logar(usuario.email, usuario.senha).then(res=>{
        expect(res).to.be.a('object')
        expect(res.body.message).to.be.a('string')
        expect(res.body).to.haveOwnProperty('authorization')
        var bearer = res.body.authorization.slice(7)
        cy.log(bearer)
      })
    })
  })
})